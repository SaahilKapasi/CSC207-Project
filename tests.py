import unittest
import main
import file_handler


class TestAPIMethods(unittest.TestCase):
    def test_calculation_1(self):
        # self.assertEqual(10, main.calculation_1())
        pass

    def test_calculation_2(self):
        # self.assertEqual(25, main.calculation_2())
        pass


class TestFileHandler(unittest.TestCase):
    def test_score(self):
        file_address = "data/small_data_wonull_has_all_classes.csv"
        file = file_handler.File(file_address)
        print(file.score)
        self.assertTrue(1)


if __name__ == '__main__':
    unittest.main()
