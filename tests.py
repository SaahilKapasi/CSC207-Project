import unittest
import file_handler

class TestFileHandler(unittest.TestCase):
    def test_score(self):
        file_address = "data/small_data_wonull_has_all_classes.csv"
        file = file_handler.File(file_address)
        print(file.score)
        self.assertTrue(1)


if __name__ == '__main__':
    unittest.main()
