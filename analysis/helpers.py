import itertools
import pandas as pd


# Function to generate filter criteria based on unique values of input columns
def generate_filter_criteria(df, columns):
    """
    Generate all possible combinations of filter criteria based on unique values in the specified columns.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    columns (list): A list of column names to generate filter criteria from.

    Returns:
    list: A list of dictionaries, each representing a unique set of filter criteria.
    """
    # Extract unique values for each specified column
    unique_values = [df[column].unique() for column in columns]

    # Generate all possible combinations of these unique values
    criteria_combinations = list(itertools.product(*unique_values))

    # Convert each combination into a dictionary
    # For example, if columns = ['Race', 'Gender'] and combination = ('White', 'Female'),
    # then zip(columns, combination) produces ('Race', 'White') and ('Gender', 'Female').
    filter_criterias = [dict(zip(columns, combination)) for combination in criteria_combinations]

    return filter_criterias

def filter_dataframe(df, filter_criteria):
    """
    Filter the DataFrame based on a dictionary of attribute criteria.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    filter_criteria (dict): A dictionary where keys are column names and values are the values to match.

    Returns:
    pd.DataFrame: A filtered DataFrame that matches the criteria.
    """
    filtered_df = df.copy(deep=True)
    for column, value in filter_criteria.items():
        filtered_df = filtered_df[filtered_df[column] == value]
    return filtered_df

def identify_outliers(df, column):
    """
    Identify potential outliers in a specified column using the IQR method.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    column (str): The column name for which to identify outliers.

    Returns:
    pd.Series: A series containing the outlier values.
    """
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
    return outliers[column]

def remove_outliers(df, column):
    """
    Remove outliers from the DataFrame based on the output of the identify_outliers function.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    column (str): The column name from which to remove outliers.

    Returns:
    pd.DataFrame: A new DataFrame with the identified outliers removed.
    """
    outliers = identify_outliers(df, column)
    # Filter the DataFrame to exclude the identified outliers
    df_no_outliers = df[~df[column].isin(outliers)]
    return df_no_outliers

def calculate_summary_statistics(df, column):
    """
    Calculate key summary statistics for a specified column in a DataFrame.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the data.
    column (str): The column name for which to calculate the statistics.

    Returns:
    pd.Series: A series containing the mean, median, and standard deviation.
    """
    summary = pd.Series({
        'Mean': df[column].mean(),
        'Median': df[column].median(),
        'Standard Deviation': df[column].std()
    })
    return summary


