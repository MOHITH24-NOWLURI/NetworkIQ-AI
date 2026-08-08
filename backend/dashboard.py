from utils import sales, inventory

def dashboard():

    low_stock = len(
        inventory[inventory["Inventory_Level"] < inventory["Reorder_Point"]]
    )

    overstock = len(
        inventory[
            inventory["Inventory_Level"] >
            inventory["Demand_Forecast"] * 1.5
        ]
    )

    return {
        "total_products": sales["Product Name"].nunique(),
        "total_sales": round(sales["Sales"].sum(), 2),
        "total_profit": round(sales["Profit"].sum(), 2),
        "warehouses": inventory["Warehouse_ID"].nunique(),
        "total_inventory": int(inventory["Inventory_Level"].sum()),
        "stockouts": int(inventory["Stockout_Flag"].sum()),
        "low_stock_items": low_stock,
        "overstock_items": overstock
    }