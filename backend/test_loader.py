from utils import sales, inventory

print("=" * 50)
print("SALES")
print(sales.head())

print("=" * 50)
print("INVENTORY")
print(inventory.head())

print("=" * 50)
print(sales.columns.tolist())

print("=" * 50)
print(inventory.columns.tolist())