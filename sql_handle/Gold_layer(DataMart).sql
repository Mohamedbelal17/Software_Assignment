
--create and insert dim tables 

create schema gold;



CREATE TABLE gold.Dim_Item (
	ItemKey    INT PRIMARY KEY,
    ItemCode    INT ,
    ItemName    NVARCHAR(255)
);

INSERT INTO gold.Dim_Item (ItemKey ,ItemCode , ItemName)
select 
ROW_NUMBER() over(order by ItemCode ,  ItemName ) as ItemKey ,
ItemCode ,  ItemName  from (
Select distinct ItemCode , ItemName from silver.Sales 
union
Select distinct ItemCode , ItemName from silver.Purchase) as comb

CREATE TABLE gold.Dim_Branch (
    BranchCode  INT PRIMARY KEY,
    BranchName  NVARCHAR(255)
);

insert into gold.Dim_Branch (BranchCode , BranchName)
select distinct BranchCode , BranchName from silver.Sales

CREATE TABLE gold.Dim_Department (
    DepartmentCode  INT PRIMARY KEY,
    DepartmentName  NVARCHAR(255)
);

insert into gold.Dim_Department (DepartmentCode , DepartmentName)
select distinct DepartmentCode , DepartmentName from silver.sales

CREATE TABLE gold.Dim_Group (
    MainGroup       INT PRIMARY KEY,
    MainGroupName   NVARCHAR(255),
);

insert into gold.Dim_Group (MainGroup, MainGroupName )
select distinct MainGroup, MainGroupName  from silver.Sales

--create and insert facts tables 

CREATE TABLE gold.Fact_Sales (
    SalesID             INT IDENTITY(1,1) PRIMARY KEY,
    ItemKey            INT REFERENCES gold.Dim_Item(ItemKey),
    BranchCode          INT REFERENCES gold.Dim_Branch(BranchCode),
    DepartmentCode      INT REFERENCES gold.Dim_Department(DepartmentCode),
    MainGroup           INT REFERENCES gold.Dim_Group(MainGroup),
    NetSalesQuantity    DECIMAL(18,3),
    NetSalesValue       DECIMAL(18,3),
    HandleNetSalesValue DECIMAL(18,3),
    TransactionType     NVARCHAR(20),
    ReturnsQty          DECIMAL(18,3),
    ReturnsValue        DECIMAL(18,3)
);

INSERT INTO gold.Fact_Sales (
    ItemKey, BranchCode, DepartmentCode, MainGroup,
    NetSalesQuantity, NetSalesValue, HandleNetSalesValue,
    TransactionType, ReturnsQty, ReturnsValue
)
select
    d.ItemKey,
    s.BranchCode,
    s.DepartmentCode,
    s.MainGroup,
    s.NetSalesQuantity,
    s.NetSalesValue,
    s.HandleNetSalesValue,
    s.TransactionType,
    s.ReturnsQty,
    s.ReturnsValue
from silver.Sales s
left join gold.Dim_Item d 
    on s.ItemCode = d.ItemCode 
    and s.ItemName = d.ItemName


CREATE TABLE gold.Fact_Purchase (
    PurchaseID          INT IDENTITY(1,1) PRIMARY KEY,
    ItemKey            INT REFERENCES gold.Dim_Item(ItemKey),
    PurchaseQuantity    DECIMAL(18,3),
    ReturnQuantity      DECIMAL(18,3),
    TransactionType     NVARCHAR(50),
    TotalValue          DECIMAL(18,3),
    ReturnAmount        DECIMAL(18,3),
    ReturnRatio         DECIMAL(18,6),
    NetPurchases        DECIMAL(18,3)
);


INSERT INTO gold.Fact_Purchase (
    ItemKey, PurchaseQuantity, ReturnQuantity,
    TransactionType, TotalValue, ReturnAmount,
    ReturnRatio, NetPurchases)
SELECT
    d.ItemKey,
    p.PurchaseQuantity,
    p.ReturnQuantity,
    p.TransactionType,
    p.TotalValue,
    p.ReturnAmount,
    p.ReturnRatio,
    p.NetPurchases
FROM silver.Purchase p
LEFT JOIN gold.Dim_Item d
    ON p.ItemCode = d.ItemCode
    AND p.ItemName = d.ItemName;
	