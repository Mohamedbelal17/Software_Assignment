CREATE TABLE silver.Purchase (
    ItemCode            INT,
    ItemName            NVARCHAR(255),
    ReturnQuantity      DECIMAL(18,3),
    PurchaseQuantity    DECIMAL(18,3),
    TransactionType     NVARCHAR(50),
    PurchaseBouin       NVARCHAR(50),
    TotalValue          DECIMAL(18,3),
    ReturnAmount        DECIMAL(18,3),
    ReturnRatio         DECIMAL(18,6),
    NetPurchases        DECIMAL(18,3),
);

WITH CleanedPurchase AS (
    SELECT
        ItemCode,
        ItemName,
        CASE
            WHEN PurchaseQuantity < 0 THEN ABS(PurchaseQuantity)
            ELSE 0
        END                                                  AS ReturnQuantity,
        CASE
            WHEN PurchaseQuantity > 0 THEN PurchaseQuantity
            ELSE 0
        END                                                  AS PurchaseQuantity,
        CASE
            WHEN PurchaseQuantity < 0 THEN 'Purchase Return'
            ELSE 'Purchase'
        END                                                  AS TransactionType,
        PurchaseBouin,
        CAST(REPLACE(TotalValue,    ',', '') AS FLOAT)       AS TotalValue,
        CAST(REPLACE(ReturnAmount,  ',', '') AS FLOAT)       AS ReturnAmount,
        CASE
            WHEN CAST(REPLACE(TotalValue,   ',', '') AS FLOAT) = 0
             AND CAST(REPLACE(ReturnAmount, ',', '') AS FLOAT) > 0
            THEN 1.0
            ELSE CAST(REPLACE(ReturnRatio, '%', '') AS FLOAT) / 100
        END                                                  AS ReturnRatio,
        CASE
            WHEN CAST(REPLACE(ReturnAmount, ',', '') AS FLOAT) >
                 CAST(REPLACE(TotalValue,   ',', '') AS FLOAT)
            THEN 0
            ELSE ABS(CAST(REPLACE(NetPurchases, ',', '') AS FLOAT))
        END                                                  AS NetPurchases
    FROM bronze.test
    WHERE ItemName IS NOT NULL
      AND PurchaseBouin != 'إجمالى المورد'
)

INSERT INTO silver.Purchase (
    ItemCode,
    ItemName,
    ReturnQuantity,
    PurchaseQuantity,
    TransactionType,
    PurchaseBouin,
    TotalValue,
    ReturnAmount,
    ReturnRatio,
    NetPurchases
	)
SELECT
    ItemCode,
    ItemName,
    ReturnQuantity,
    PurchaseQuantity,
    TransactionType,
    PurchaseBouin,
    TotalValue,
    ReturnAmount,
    ReturnRatio,
    NetPurchases
FROM CleanedPurchase;