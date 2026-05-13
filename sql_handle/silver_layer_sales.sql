
CREATE TABLE silver.Sales (
    BranchCode          INT,
    BranchName          NVARCHAR(255),
    DepartmentCode      INT,
    DepartmentName      NVARCHAR(255),
    MainGroup           INT,
    MainGroupName       NVARCHAR(255),
    SubGroup            INT,
    SubGroupName        NVARCHAR(255),
    ItemCode            INT,
    Barcode             NVARCHAR(50),
    ItemName            NVARCHAR(255),
    NetSalesQuantity    DECIMAL(18,3),
    NetSalesValue       DECIMAL(18,3),
    HandleNetSalesValue DECIMAL(18,3),
    TransactionType     NVARCHAR(20),
    ReturnsQty          DECIMAL(18,3),
    ReturnsValue        DECIMAL(18,3),

);


WITH deduplicated AS (
    SELECT DISTINCT
        CAST(LTRIM(RTRIM([BranchCode]))     AS INT)          AS BranchCode,
        LTRIM(RTRIM([BranchName]))                           AS BranchName,
        CAST(LTRIM(RTRIM([DepartmentCode])) AS INT)          AS DepartmentCode,
        LTRIM(RTRIM([DepartmentName]))                       AS DepartmentName,
        CAST(LTRIM(RTRIM([MainGroup]))      AS INT)          AS MainGroup,
        LTRIM(RTRIM([MainGroupName]))                        AS MainGroupName,
        CAST(LTRIM(RTRIM([SubGroup]))       AS INT)          AS SubGroup,
        LTRIM(RTRIM([SubGroupName]))                         AS SubGroupName,
        CAST(LTRIM(RTRIM([ItemCode]))       AS INT)          AS ItemCode,
        LTRIM(RTRIM([Barcode]))                              AS Barcode,
        LTRIM(RTRIM([ItemName]))                             AS ItemName,
        CAST([NetSalesQuantity] AS DECIMAL(18,3))            AS NetSalesQuantity,
        CAST([NetSalesValue]    AS DECIMAL(18,3))            AS NetSalesValue,
        CASE
            WHEN CAST([NetSalesQuantity] AS DECIMAL(18,3)) = 0 THEN 0
            ELSE CAST([NetSalesValue] AS DECIMAL(18,3))
        END                                                  AS HandleNetSalesValue
    FROM bronze.Sales_Raw
    WHERE [NetSalesQuantity] IS NOT NULL
      AND NOT ([NetSalesQuantity] <> 0 AND [NetSalesValue] = 0)
),
cleaned AS (
    SELECT
        BranchCode,
        BranchName,
        DepartmentCode,
        DepartmentName,
        MainGroup,
        MainGroupName,
        SubGroup,
        SubGroupName,
        ItemCode,
        Barcode,
        ItemName,
        NetSalesQuantity,
        NetSalesValue,
        HandleNetSalesValue,
        CASE
            WHEN NetSalesQuantity < 0 OR NetSalesValue < 0 THEN 'RETURN'
            WHEN NetSalesQuantity = 0                      THEN 'DEADSTOCK'
            ELSE                                                'SALE'
        END AS TransactionType,
        CASE
            WHEN NetSalesQuantity < 0 THEN ABS(NetSalesQuantity)
            ELSE 0
        END AS ReturnsQty,
        CASE
            WHEN NetSalesQuantity < 0 THEN ABS(NetSalesValue)
            ELSE 0
        END AS ReturnsValue
    FROM deduplicated
)

INSERT INTO silver.Sales (
    BranchCode,
    BranchName,
    DepartmentCode,
    DepartmentName,
    MainGroup,
    MainGroupName,
    SubGroup,
    SubGroupName,
    ItemCode,
    Barcode,
    ItemName,
    NetSalesQuantity,
    NetSalesValue,
    HandleNetSalesValue,
    TransactionType,
    ReturnsQty,
    ReturnsValue
)
SELECT
    BranchCode,
    BranchName,
    DepartmentCode,
    DepartmentName,
    MainGroup,
    MainGroupName,
    SubGroup,
    SubGroupName,
    ItemCode,
    Barcode,
    ItemName,
    NetSalesQuantity,
    NetSalesValue,
    HandleNetSalesValue,
    TransactionType,
    ReturnsQty,
    ReturnsValue
FROM cleaned;

