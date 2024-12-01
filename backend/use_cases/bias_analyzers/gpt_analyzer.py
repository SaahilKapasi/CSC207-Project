import openai
from openai import OpenAIError

from backend.entites.dataset_files.dataset_file import DatasetFile
from backend.use_cases.bias_analyzers.bias_analyzer import BiasAnalyzer


class GPTAnalyzer(BiasAnalyzer):
    """
    A bias analyzer that uses OpenAI's GPT model to provide detailed analysis of dataset bias.

    This class extends BiasAnalyzer to leverage GPT for generating comprehensive bias analysis
    and determining bias levels for individual categories or the entire dataset.

    Attributes:
        dataset (DatasetFile): The dataset file to be analyzed.
    """

    dataset: DatasetFile

    def get_overall_analysis(self) -> str:
        """
        Generate an overall analysis of bias in the dataset using GPT.

        This method sends the dataset to OpenAI's GPT model and requests a comprehensive
        analysis of bias, affected groups, notable outliers, and important insights.

        Returns:
            str: A detailed analysis of the dataset's bias, formatted as an executive report.

        Raises:
            OpenAIError: If there's an error in communicating with the OpenAI API.

        Note:
            The analysis is based on the entire dataset and uses the text-davinci-003 engine.
        """
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
        """
        Convert a numerical bias score to a qualitative level using GPT for individual categories.

        This method interprets the bias score for a given category or the overall dataset
        and returns a corresponding qualitative level. For individual categories, it uses
        GPT to determine the level in relation to other categories.

        Args:
            category (str, optional): The specific category to evaluate. Defaults to "all"
                                      for overall dataset score.

        Returns:
            str: The bias level as a string: "high", "medium", or "low".

        Raises:
            OpenAIError: If there's an error in communicating with the OpenAI API for individual categories.

        Note:
            - For the overall score (category="all"):
              - Scores < 3.3 are considered "high" bias
              - Scores >= 3.3 and < 6.6 are considered "medium" bias
              - Scores >= 6.6 are considered "low" bias
            - For individual categories, the level is determined by GPT based on relative comparison.
        """
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
