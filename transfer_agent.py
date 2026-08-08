from inventory_agent import inventory_analysis

def transfer_recommendations():

    data = inventory_analysis()

    low_stock = data[data["Inventory_Status"]=="LOW"]

    recommendations=[]

    for _,row in low_stock.iterrows():

        recommendations.append({

            "SKU":row["SKU_ID"],

            "Warehouse":row["Warehouse_ID"],

            "Current Inventory":row["Inventory_Level"],

            "Demand Forecast":row["Demand_Forecast"],

            "Recommendation":"Transfer Inventory"

        })

    return recommendations