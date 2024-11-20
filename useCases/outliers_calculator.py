from useCases import statistics_calculator as st

def identify_outliers(df, column):
    """
    Identify potential outliers in a specified column using the IQR method.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the infrastructure.
    column (str): The column name for which to identify outliers.

    Returns:
    pd.Series: A series containing the outlier values.
    """
    lower_bound = st.get_col_lower_bound(df, column)
    upper_bound = st.get_col_upper_bound(df, column)

    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
    return outliers[column]


def remove_outliers(df, column):
    """
    Remove outliers from the DataFrame based on the output of the identify_outliers function.

    Parameters:
    df (pd.DataFrame): The DataFrame containing the infrastructure.
    column (str): The column name from which to remove outliers.

    Returns:
    pd.DataFrame: A new DataFrame with the identified outliers removed.
    """
    outliers = identify_outliers(df, column)
    # Filter the DataFrame to exclude the identified outliers
    df_no_outliers = df[~df[column].isin(outliers)]
    return df_no_outliers