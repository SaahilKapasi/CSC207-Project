import openai
from openai import OpenAIError

from backend.entities.dataset_files.dataset_file import DatasetFile
from backend.use_cases.bias_analyzers.bias_analyzer import BiasAnalyzer


class GPTAnalyzer(BiasAnalyzer):
    dataset: DatasetFile

    def get_overall_analysis(self) -> str:
        prompt = f"""
                The following pandas dataframe contains transactions and includes personal traits about people as well as whether an AI model flagged the transaction as fraud or not. Based on the pandas dataframe which was converted to text: {self.dataset.df.to_string()}
                Please give me back an overall analysis of how biased the dataset is, which groups are affected, any notable outliers, and any important insights. Please give this analysis as if you were reporting this to the executive of a top company.
                """
        try:
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=prompt,
                max_tokens=200,
                temperature=0.7
            )

            summary_analysis = response.choices[0].text.strip()
            return summary_analysis

        except OpenAIError as error:
            return str(error)

    def score_to_level(self, category="all") -> str:
        if category == "all":
            score = self.dataset.get_overall_score()
            if score < 3.3:
                return "high"
            elif score < 6.6:
                return "medium"
            else:
                return "low"

        categories = {cat: self.dataset.get_category_score(cat) for cat in self.dataset.categories}
        prompt = f"""
        Here is a set of categories along with their associated score to measure how biased they are, calculated individually for each category: {categories}
        Please give me back a level (and only this level, no other text), high, medium, or low based on how biased this category is in relation to the other categories.
        """
        try:
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=prompt,
                max_tokens=200,
                temperature=0.7
            )

            summary_analysis = response.choices[0].text.strip()
            return summary_analysis

        except OpenAIError as error:
            return str(error)
