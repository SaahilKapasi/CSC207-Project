import unittest
from interface_adapters import file_controller


class TestFileHandler(unittest.TestCase):
    def test_score(self):
        file_address = "../infrastructure/small_data_wonull_has_all_classes.csv"
        file = file_controller.File(file_address)
        print(file.score)
        self.assertTrue(1)


if __name__ == '__main__':
    unittest.main()
