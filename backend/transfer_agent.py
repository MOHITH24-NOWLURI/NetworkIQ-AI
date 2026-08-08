from inventory_agent import inventory_analysis


def transfer_recommendations():

    data = inventory_analysis().copy()

    # Handle missing values
    data["Inventory_Level"] = data["Inventory_Level"].fillna(0)
    data["Demand_Forecast"] = data["Demand_Forecast"].fillna(0)
    data["Reorder_Point"] = data["Reorder_Point"].fillna(0)

    data["Date"] = data["Date"].astype(str)

    # Use latest record for every SKU + Warehouse
    latest_data = (
        data.sort_values("Date")
        .groupby(["SKU_ID", "Warehouse_ID"])
        .tail(1)
        .reset_index(drop=True)
    )

    recommendations = []

    # Process each SKU separately
    for sku, sku_data in latest_data.groupby("SKU_ID"):

        sku_data = sku_data.copy()

        # Warehouses that need inventory
        needy = sku_data[
            sku_data["Inventory_Level"]
            < sku_data["Reorder_Point"]
        ].copy()

        # Warehouses that have surplus inventory
        surplus = sku_data[
            sku_data["Inventory_Level"]
            > (
                sku_data["Reorder_Point"]
                + sku_data["Demand_Forecast"]
            )
        ].copy()

        # Cannot transfer if either side is missing
        if needy.empty or surplus.empty:
            continue

        # Process each warehouse that needs stock
        for _, destination in needy.iterrows():

            destination_inventory = float(
                destination["Inventory_Level"]
            )

            destination_reorder = float(
                destination["Reorder_Point"]
            )

            destination_forecast = float(
                destination["Demand_Forecast"]
            )

            # How many units are needed
            shortage = (
                destination_reorder
                - destination_inventory
            )

            if shortage <= 0:
                continue

            # -----------------------------------------
            # PRIORITY CALCULATION
            # -----------------------------------------

            # How far below reorder point?
            shortage_ratio = (
                shortage / destination_reorder
                if destination_reorder > 0
                else 0
            )

            # Demand pressure
            demand_ratio = (
                destination_forecast
                / destination_inventory
                if destination_inventory > 0
                else 999
            )

            # Priority based on shortage + demand
            if (
                shortage_ratio >= 0.20
                or demand_ratio >= 0.15
            ):
                priority = "HIGH"

            elif (
                shortage_ratio >= 0.08
                or demand_ratio >= 0.08
            ):
                priority = "MEDIUM"

            else:
                priority = "LOW"

            # -----------------------------------------
            # FIND SURPLUS WAREHOUSE
            # -----------------------------------------

            for _, source in surplus.iterrows():

                # Don't transfer within same warehouse
                if (
                    source["Warehouse_ID"]
                    == destination["Warehouse_ID"]
                ):
                    continue

                source_inventory = float(
                    source["Inventory_Level"]
                )

                source_reorder = float(
                    source["Reorder_Point"]
                )

                source_forecast = float(
                    source["Demand_Forecast"]
                )

                # Inventory available for transfer
                available_surplus = (
                    source_inventory
                    - source_reorder
                    - source_forecast
                )

                if available_surplus <= 0:
                    continue

                # Transfer only what is needed
                transfer_quantity = min(
                    shortage,
                    available_surplus
                )

                transfer_quantity = int(
                    transfer_quantity
                )

                if transfer_quantity <= 0:
                    continue

                # -----------------------------------------
                # AI REASON
                # -----------------------------------------

                reason = (
                    f"{destination['Warehouse_ID']} is below "
                    f"its reorder point, while "
                    f"{source['Warehouse_ID']} has surplus "
                    f"inventory available for transfer."
                )

                # -----------------------------------------
                # ADD RECOMMENDATION
                # -----------------------------------------

                recommendations.append(
                    {
                        "SKU": sku,

                        "From_Warehouse":
                            source["Warehouse_ID"],

                        "To_Warehouse":
                            destination["Warehouse_ID"],

                        "Transfer_Quantity":
                            transfer_quantity,

                        "Source_Inventory":
                            int(source_inventory),

                        "Destination_Inventory":
                            int(destination_inventory),

                        "Demand_Forecast":
                            round(
                                destination_forecast,
                                2
                            ),

                        "Recommendation":
                            "Transfer Inventory",

                        "Priority":
                            priority,

                        "Reason":
                            reason
                    }
                )

                # Reduce remaining shortage
                shortage -= transfer_quantity

                # Stop if requirement is satisfied
                if shortage <= 0:
                    break

    # -----------------------------------------
    # SORT BY PRIORITY
    # -----------------------------------------

    priority_order = {
        "HIGH": 1,
        "MEDIUM": 2,
        "LOW": 3
    }

    recommendations.sort(
        key=lambda x: priority_order.get(
            x["Priority"],
            4
        )
    )

    return recommendations