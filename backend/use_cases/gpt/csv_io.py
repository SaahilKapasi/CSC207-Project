import pandas as pd


def fetch_all_countries():
    """
    Loads a CSV file containing all country names.

    Returns:
        pd.DataFrame: A DataFrame containing country names.
    """
    return pd.read_csv("../../data/all_countries.csv")


def convert_to_file(df: pd.DataFrame):
    """
    Prompts the user to specify a filename, then saves the provided DataFrame to a CSV file.

    Args:
        df (pd.DataFrame): The DataFrame to save to a CSV file.
    """
    csv_name = input("what csv name you want? (with suffix): ")
    # Display or save the DataFrame
    df.to_csv(csv_name, index=False)  # Uncomment to save as CSV
