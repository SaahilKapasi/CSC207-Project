import pandas as pd
import numpy as np
import random


def fetch_all_countries():
    """
    Loads a CSV file containing all country names.

    Returns:
        pd.DataFrame: A DataFrame containing country names.
    """
    return pd.read_csv("all_countries.csv")


def mock_data_with_all_protected_classes_not_null(n) -> pd.DataFrame:
    """
    Generates a DataFrame with mock data, ensuring all protected class columns are populated (not null).

    Args:
        n (int): The number of rows to generate.

    Returns:
        pd.DataFrame: A DataFrame containing mock data with fields representing protected classes.
    """

    # Define length of the array
    arr_len = n

    # Generate variables for each field
    id = list(range(arr_len))
    transaction_amount = np.random.randint(1000, 20000, size=arr_len)
    countries = list(
        {"US", "Canada", "China", "Korea", "Mexico", "US", "South Korea", "Canada", "Vietnam", "US", "US", "UK", "Brazil",
         "Argentina", "US", "Nigeria", "US", "South Korea", "Taiwan", "India", "Mexico", "China", "China", "Jordan",
         "South Korea", "US", "Hong Kong", "Brazil", "Canada", "US", "China", "UK", "Australia", "China", "US", "India",
         "US"})
    citizenship = np.random.choice(countries, arr_len)
    sex = np.random.choice(["Female", "Male"], arr_len)
    pregnancy = np.random.choice([0, 1], arr_len)
    race = np.random.choice(["White", "Black", "Asian", "Hispanic", "Arab"], arr_len)
    family_status = np.random.choice(["Single", "Married", "Divorced"], arr_len)
    place_of_origin = np.random.choice(["Canada", "US", "China", "South Korea", "Mexico"], arr_len)
    marital_status = np.random.choice(["Single", "Married", "Divorced"], arr_len)
    ethnic_origin = np.random.choice(["European", "African", "Asian", "Hispanic", "Middle Eastern"], arr_len)
    sexual_orientation = np.random.choice(["Heterosexual", "Homosexual", "Bisexual"], arr_len)
    color = np.random.choice(["White", "Black", "Yellow", "Brown"], arr_len)
    gender_identity = sex  # assuming gender identity matches sex for simplicity
    ancestry = np.random.choice(["Western", "African", "Asian", "Latin", "Middle Eastern"], arr_len)
    gender_expression = np.random.choice(["Feminine", "Masculine"], arr_len)
    disability = np.random.choice([0, 1], arr_len)
    public_assistance = np.random.choice([0, 1], arr_len)
    age = np.random.randint(20, 70, size=arr_len)
    record_of_offenses = np.random.choice([0, 1], arr_len)
    creed = np.random.choice(["Christian", "Muslim", "Buddhist", "Hindu", "Jewish", "Atheist"], arr_len)
    marked = np.random.choice([1, 0], arr_len)
    actual = np.random.choice([0, 1], arr_len)

    # Create DataFrame
    data = {
        "id": id,
        "transaction_amount": transaction_amount,
        "citizenship": citizenship,
        "sex": sex,
        "pregnancy": pregnancy,
        "race": race,
        "family_status": family_status,
        "place_of_origin": place_of_origin,
        "marital_status": marital_status,
        "ethnic_origin": ethnic_origin,
        "sexual_orientation": sexual_orientation,
        "color": color,
        "gender_identity": gender_identity,
        "ancestry": ancestry,
        "gender_expression": gender_expression,
        "disability": disability,
        "public_assistance": public_assistance,
        "age": age,
        "record_of_offenses": record_of_offenses,
        "creed": creed,
        "marked": marked,
        "actual": actual
    }

    df = pd.DataFrame(data)
    return df


def fake_real_data_not_null(n) -> pd.DataFrame:
    """
    Generates a realistic DataFrame of mock data for Cash App with no missing values.

    Args:
        n (int): The number of rows to generate.

    Returns:
        pd.DataFrame: A DataFrame with mock data representing user transaction information without nulls.
    """

    # Define length of the array
    arr_len = n
    all_countries = fetch_all_countries()

    # Generate variables for each field likely relevant to Cash App
    user_id = [f"user_{i}" for i in range(arr_len)]  # Unique identifier for each user
    name = [f"Person_{i}" for i in range(arr_len)]
    email = [f"person{i}@example.com" for i in range(arr_len)]
    phone_number = [f"+1-555-0{str(i).zfill(4)}" for i in range(arr_len)]
    transaction_amount = np.random.randint(1000, 20000, size=arr_len)
    transaction_history = [np.random.randint(1, 500) for _ in range(arr_len)]  # Number of past transactions
    countries = [i for i in all_countries["Name"]]
    citizenship = np.random.choice(countries, arr_len)
    sex = np.random.choice(["Female", "Male"], arr_len)
    race = np.random.choice(["White", "Black", "Asian", "Hispanic", "Arab"], arr_len)
    family_status = np.random.choice(["Single", "Married", "Divorced"], arr_len)
    place_of_origin = np.random.choice(["Canada", "US", "China", "South Korea", "Mexico"], arr_len)
    ethnic_origin = np.random.choice(["European", "African", "Asian", "Hispanic", "Middle Eastern"], arr_len)
    color = np.random.choice(["White", "Black", "Yellow", "Brown"], arr_len)
    age = np.random.randint(18, 65, size=arr_len)
    location_info = [f"{np.random.uniform(-90, 90):.4f}, {np.random.uniform(-180, 180):.4f}" for _ in range(arr_len)]
    device_info = [f"Device_{np.random.randint(1, 10)}" for _ in range(arr_len)]  # Mock device model info
    marked = np.random.choice([1, 0], arr_len)
    actual = np.random.choice([0, 1], arr_len)

    # Create DataFrame
    data = {
        "user_id": user_id,
        "name": name,
        "email": email,
        "phone_number": phone_number,
        "transaction_amount": transaction_amount,
        "transaction_history": transaction_history,
        "citizenship": citizenship,
        "sex": sex,
        "race": race,
        "family_status": family_status,
        "place_of_origin": place_of_origin,
        "ethnic_origin": ethnic_origin,
        "color": color,
        "age": age,
        "location_info": location_info,
        "device_info": device_info,
        "marked": marked,
        "actual": actual
    }

    df = pd.DataFrame(data)
    return df


def fake_real_data_has_null(n) -> pd.DataFrame:
    """
    Generates a realistic DataFrame of mock data for Cash App with some missing values in optional fields.

    Args:
        n (int): The number of rows to generate.

    Returns:
        pd.DataFrame: A DataFrame with mock data representing user transaction information, with some null values.
    """

    # Define length of the array
    arr_len = n
    all_countries = fetch_all_countries()

    # Generate variables for each field with certain key fields (user_id, transaction_amount) always populated
    user_id = [f"user_{i}" for i in range(arr_len)]  # Ensuring no nulls
    name = [f"Person_{i}" if random.random() > 0.05 else np.nan for i in range(arr_len)]
    email = [f"person{i}@example.com" if random.random() > 0.1 else np.nan for i in range(arr_len)]
    phone_number = [f"+1-555-0{str(i).zfill(4)}" if random.random() > 0.1 else np.nan for i in range(arr_len)]
    transaction_amount = np.random.randint(1000, 20000, size=arr_len)  # Ensuring no nulls
    transaction_history = [np.random.randint(1, 500) if random.random() > 0.1 else np.nan for _ in range(arr_len)]
    countries = [i for i in all_countries["Name"]]
    citizenship = [np.random.choice(countries) if random.random() > 0.1 else np.nan for _ in range(arr_len)]
    sex = [np.random.choice(["Female", "Male"]) if random.random() > 0.05 else np.nan for _ in range(arr_len)]
    race = [np.random.choice(["White", "Black", "Asian", "Hispanic", "Arab"]) if random.random() > 0.05 else np.nan for
            _ in range(arr_len)]
    family_status = [np.random.choice(["Single", "Married", "Divorced"]) if random.random() > 0.05 else np.nan for _ in
                     range(arr_len)]
    place_of_origin = [
        np.random.choice(["Canada", "US", "China", "South Korea", "Mexico"]) if random.random() > 0.05 else np.nan for _
        in range(arr_len)]
    ethnic_origin = [np.random.choice(
        ["European", "African", "Asian", "Hispanic", "Middle Eastern"]) if random.random() > 0.1 else np.nan for _ in
                     range(arr_len)]
    color = [np.random.choice(["White", "Black", "Yellow", "Brown"]) if random.random() > 0.05 else np.nan for _ in
             range(arr_len)]
    age = [np.random.randint(18, 65) if random.random() > 0.05 else np.nan for _ in range(arr_len)]
    location_info = [
        f"{np.random.uniform(-90, 90):.4f}, {np.random.uniform(-180, 180):.4f}" if random.random() > 0.1 else np.nan for
        _ in range(arr_len)]
    device_info = [f"Device_{np.random.randint(1, 10)}" if random.random() > 0.1 else np.nan for _ in range(arr_len)]
    marked = [np.random.choice([1, 0]) if random.random() > 0.05 else np.nan for _ in range(arr_len)]
    actual = [np.random.choice([0, 1]) if random.random() > 0.05 else np.nan for _ in range(arr_len)]

    # Create DataFrame
    data = {
        "user_id": user_id,
        "name": name,
        "email": email,
        "phone_number": phone_number,
        "transaction_amount": transaction_amount,
        "transaction_history": transaction_history,
        "citizenship": citizenship,
        "sex": sex,
        "race": race,
        "family_status": family_status,
        "place_of_origin": place_of_origin,
        "ethnic_origin": ethnic_origin,
        "color": color,
        "age": age,
        "location_info": location_info,
        "device_info": device_info,
        "marked": marked,
        "actual": actual
    }

    df = pd.DataFrame(data)
    return df


def convert_to_file(df: pd.DataFrame):
    """
    Prompts the user to specify a filename, then saves the provided DataFrame to a CSV file.

    Args:
        df (pd.DataFrame): The DataFrame to save to a CSV file.
    """
    csv_name = input("what csv name you want? (with suffix): ")
    # Display or save the DataFrame
    df.to_csv(csv_name, index=False)  # Uncomment to save as CSV
