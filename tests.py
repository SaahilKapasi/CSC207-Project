import unittest
import main


class TestAPIMethods(unittest.TestCase):
    def test_calculation_1(self):
        self.assertEqual(10, main.calculation_1())

    def test_calculation_2(self):
        self.assertEqual(25, main.calculation_2())


if __name__ == '__main__':
    unittest.main()
