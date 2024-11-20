def get_protected_classes():
    """
    Retrieve a set of protected classes as defined in regulatory or policy contexts.

    This function returns a set containing names of protected classes, which are categories
    often used to ensure non-discriminatory practices in areas such as employment, housing,
    and public accommodations.

    Returns:
        set: A set of strings, each representing a protected class (e.g., 'citizenship', 'race').
    """
    protected_classes = {
        "citizenship",
        "sex",
        "pregnancy",
        "race",
        "family status",
        "place of origin",
        "marital status",
        "ethnic origin",
        "sexual orientation",
        "color",
        "gender identity",
        "ancestry",
        "gender expression",
        "disability",
        "receipt of public assistance (in housing)",
        "age",
        "record of offenses (in employment)",
        "creed"
    }
    return protected_classes