import pandas as pd
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent / "datasets"

sales = pd.read_csv(BASE / "store_sales_data (2).csv")

inventory = pd.read_csv(BASE / "supply_chain_dataset1.csv")