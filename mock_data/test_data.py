import unittest
import generate_data


class TestGenerateDate(unittest.TestCase):
    def test_data_with_intended_nulls(self):
        sample_size = 1000
        mock_no_null = generate_data.mock_data_with_all_protected_classes_not_null(sample_size)
        real_no_null = generate_data.fake_real_data_not_null(sample_size)
        real_has_null = generate_data.fake_real_data_has_null(sample_size)
        self.assertTrue(not any(list(mock_no_null.isnull().sum())))
        self.assertTrue(not any(list(real_no_null.isnull().sum())))
        self.assertTrue(any(list(real_has_null.isnull().sum())))
