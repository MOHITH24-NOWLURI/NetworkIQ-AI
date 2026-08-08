from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dashboard import dashboard
from demand_agent import demand_analysis
from inventory_agent import inventory_analysis
from transfer_agent import transfer_recommendations

app = FastAPI(title="NetworkIQ")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "Project": "NetworkIQ",
        "Status": "Running"
    }


@app.get("/dashboard")
def get_dashboard():
    return dashboard()


@app.get("/demand")
def demand():
    return demand_analysis().head(10).to_dict(orient="records")


@app.get("/inventory")
def inventory_data():
    return inventory_analysis().head(20).to_dict(orient="records")


@app.get("/recommendations")
def recommendations():
    return transfer_recommendations()