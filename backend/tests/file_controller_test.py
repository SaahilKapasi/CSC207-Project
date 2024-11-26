import unittest


class TestFileHandler(unittest.TestCase):
    def test_score(self):
        file_address = "../data/small_data_wonull_has_all_classes.csv"
        file = file_controller.DatasetFile(file_address)
        print(file.score)
        self.assertTrue(1)


if __name__ == '__main__':
    unittest.main()
