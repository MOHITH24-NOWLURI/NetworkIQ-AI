from utils import inventory

def inventory_analysis():

    data = inventory.copy()

    data["Inventory_Status"] = data.apply(
        lambda row:
        "LOW"
        if row["Inventory_Level"] < row["Reorder_Point"]
        else "OK",
        axis=1
    )

    return data