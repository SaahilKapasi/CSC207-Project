import unittest
from backend.data.data_generator import DataGenerator


class TestGenerateDate(unittest.TestCase):
    def test_data_with_intended_nulls(self):
        data_generator = DataGenerator()
        sample_size = 1000
        mock_no_null = data_generator.mock_data_with_all_protected_classes_not_null(sample_size)
        real_no_null = data_generator.fake_real_data_not_null(sample_size)
        real_has_null = data_generator.fake_real_data_has_null(sample_size)
        self.assertTrue(not any(list(mock_no_null.isnull().sum())))
        self.assertTrue(not any(list(real_no_null.isnull().sum())))
        self.assertTrue(any(list(real_has_null.isnull().sum())))


if __name__ == '__main__':
    unittest.main()
