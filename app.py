from fastapi import FastAPI

from demand_agent import demand_analysis
from inventory_agent import inventory_analysis
from transfer_agent import transfer_recommendations

app=FastAPI(title="NetworkIQ")

@app.get("/")
def home():

    return{

        "Project":"NetworkIQ",

        "Status":"Running"

    }


@app.get("/demand")

def demand():

    return demand_analysis().head(10).to_dict(orient="records")


@app.get("/inventory")

def inventory():

    return inventory_analysis().head(20).to_dict(orient="records")


@app.get("/recommendations")

def recommendations():

    return transfer_recommendations()