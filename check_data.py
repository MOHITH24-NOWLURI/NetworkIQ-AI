import pandas as pd

# ---------- SALES ----------
try:
    sales = pd.read_csv("../datasets/sales.csv")
except:
    sales = pd.read_csv("../datasets/sales.csv", encoding="latin1")

print("="*60)
print("SALES DATASET")
print("="*60)

print(sales.head())

print("\nColumns:\n")
print(sales.columns.tolist())

print("\nShape:")
print(sales.shape)

print("\n")

# ---------- INVENTORY ----------

try:
    inventory = pd.read_csv("../datasets/inventory.csv")
except:
    inventory = pd.read_csv("../datasets/inventory.csv", encoding="latin1")

print("="*60)
print("INVENTORY DATASET")
print("="*60)

print(inventory.head())

print("\nColumns:\n")
print(inventory.columns.tolist())

print("\nShape:")
print(inventory.shape)