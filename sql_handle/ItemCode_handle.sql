ALTER TABLE bronze.test
ADD [ItemCode] int;

  --- update ItemCode based on the name  ==
UPDATE t
SET t.[ItemCode] = s.[ItemCode]
FROM bronze.test AS t
INNER JOIN bronze.Sales_raw AS s 
  ON t.ItemName = s.ItemName;

--- handle the deadstock item code
WITH DeadstockItems AS (
    SELECT 
        ItemName,
        ROW_NUMBER() OVER (ORDER BY ItemName) AS rn
    FROM bronze.test
    WHERE ItemCode IS NULL
      AND ItemName IS NOT NULL
)


UPDATE t
SET t.ItemCode = 1000000 + d.rn
FROM bronze.test AS t
INNER JOIN DeadstockItems AS d
    ON t.ItemName = d.ItemName
WHERE t.ItemCode IS NULL
  AND t.ItemName IS NOT NULL;

 
   --- update ItemCode using the like based on the name 
WITH unS AS (
    SELECT DISTINCT ItemName, ItemCode 
    FROM silver.Sales
)
UPDATE p
SET p.ItemCode = s.ItemCode
FROM silver.Purchase p
INNER JOIN unS s ON p.ItemName LIKE N'%' + s.ItemName + N'%'
WHERE p.ItemCode > 1000000