use ERD_Training

CREATE TABLE [ERD_Training].[bronze].BtestS (
    BranchCode        NVARCHAR(300),
    BranchName        NVARCHAR(300),

    DepartmentCode    NVARCHAR(300),
    DepartmentName    NVARCHAR(300),

    MainGroup         NVARCHAR(300),
    MainGroupName     NVARCHAR(300),

    SubGroup          NVARCHAR(300),
    SubGroupName      NVARCHAR(300),

    ItemCode          NVARCHAR(300),
    Barcode           NVARCHAR(300),
    ItemName          NVARCHAR(300),

    NetSalesQuantity  NVARCHAR(300),
    NetSalesValue     NVARCHAR(300)
);

CREATE TABLE [ERD_Training].[bronze].BtestP (
    NetPurchases      NVARCHAR(300),
    ReturnRatio       NVARCHAR(300),
    ReturnAmount      NVARCHAR(300),
    TotalValue        NVARCHAR(300),

    PurchaseBouin     NVARCHAR(300),
    PurchaseQuantity  NVARCHAR(300),

    ItemName          NVARCHAR(300),
    ItemCode          NVARCHAR(300)
);
