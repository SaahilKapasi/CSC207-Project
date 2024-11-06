from analysis import helpers
import pandas as pd


class File:
    df: pd.DataFrame
    categories: set

    def __init__(self, file):
        self.df = pd.read_csv(file)
        self.categories = helpers.get_categories_exist(self.df)
