import unittest
from analysis.helpers import *


class TestFPRAnalysis(unittest.TestCase):
    def setUp(self):
        """
        Create a sample DataFrame and other setup necessary for the tests.
        This method is called before each test method runs.
        """
        self.data = {
            'Race': ['White', 'White', 'Black', 'White', 'Asian', 'White', 'Black', 'Asian'],
            'Gender': ['Female', 'Male', 'Female', 'Female', 'Male', 'Female', 'Male', 'Female'],
            'Age Group': ['20-29', '30-39', '20-29', '40-49', '30-39', '20-29', '40-49', '30-39'],
            'False Positive Rate (FPR) over transactions': [0.1, 0.2, 0.05, 0.15, 0.25, 0.35, 0.4, 0.45]
        }
        self.df = pd.DataFrame(self.data)

    def test_generate_filter_criteria(self):
        columns = ['Race', 'Gender']
        filter_criteria_list = generate_filter_criteria(self.df, columns)

        # Expected number of filter criteria combinations
        expected_count = len(self.df['Race'].unique()) * len(self.df['Gender'].unique())
        self.assertEqual(len(filter_criteria_list), expected_count)

        # Check if specific filter criteria exist in the generated list
        self.assertIn({'Race': 'White', 'Gender': 'Female'}, filter_criteria_list)
        self.assertIn({'Race': 'Black', 'Gender': 'Male'}, filter_criteria_list)

    def test_filter_dataframe(self):
        filter_criteria = {'Race': 'White', 'Gender': 'Female'}
        filtered_df = filter_dataframe(self.df, filter_criteria)

        # Check that the filtered DataFrame has the correct number of rows
        expected_rows = len(self.df[(self.df['Race'] == 'White') & (self.df['Gender'] == 'Female')])
        self.assertEqual(len(filtered_df), expected_rows)

        # Check if all rows match the filter criteria
        for _, row in filtered_df.iterrows():
            self.assertEqual(row['Race'], 'White')
            self.assertEqual(row['Gender'], 'Female')

    def test_calculate_summary_statistics(self):
        summary = calculate_summary_statistics(self.df, 'False Positive Rate (FPR) over transactions')

        # Calculate expected statistics manually for comparison
        expected_mean = self.df['False Positive Rate (FPR) over transactions'].mean()
        expected_median = self.df['False Positive Rate (FPR) over transactions'].median()
        expected_std = self.df['False Positive Rate (FPR) over transactions'].std()

        self.assertAlmostEqual(summary['Mean'], expected_mean)
        self.assertAlmostEqual(summary['Median'], expected_median)
        self.assertAlmostEqual(summary['Standard Deviation'], expected_std)

    def test_identify_outliers(self):
        filter_criteria = {'Race': 'White'}
        outliers = identify_outliers(self.df, 'False Positive Rate (FPR) over transactions')

        # Calculate expected outliers manually
        filtered_df = self.df[self.df['Race'] == 'White']
        Q1 = filtered_df['False Positive Rate (FPR) over transactions'].quantile(0.25)
        Q3 = filtered_df['False Positive Rate (FPR) over transactions'].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        expected_outliers = filtered_df[(filtered_df['False Positive Rate (FPR) over transactions'] < lower_bound) |
                                        (filtered_df['False Positive Rate (FPR) over transactions'] > upper_bound)]

        self.assertTrue(all(outliers.values == expected_outliers['False Positive Rate (FPR) over transactions'].values))

    def test_remove_outliers_using_identified(self):
        filter_criteria = {'Race': 'White'}
        df_no_outliers = remove_outliers(self.df, 'False Positive Rate (FPR) over transactions')

        # Check that the returned DataFrame has no outliers
        outliers = identify_outliers(self.df, 'False Positive Rate (FPR) over transactions')
        for _, row in df_no_outliers.iterrows():
            self.assertNotIn(row['False Positive Rate (FPR) over transactions'], outliers.values)


if __name__ == '__main__':
    unittest.main()
