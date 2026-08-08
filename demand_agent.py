from utils import sales

def demand_analysis():

    demand = (
        sales
        .groupby("Product Name")
        .agg({
            "Quantity":"sum",
            "Sales":"sum",
            "Profit":"sum"
        })
        .sort_values("Quantity",ascending=False)
    )

    return demand.reset_index()