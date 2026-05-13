# Software Assignment

# How to Run
 
## Backend
```bash
cd backend
npm install
node server.js
```
 
## Frontend
```bash
cd frontend
npm install
npm run dev
```
 
## 📐 Gold Data Mart (usng sql_handle file)
 
```
                        ┌─────────────────┐
                        │    Dim_Item     │
                        │─────────────────│
                        │ ItemKey (PK)    |
                        | ItemCode        │
                        │ ItemName        │
                        └────────┬────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                                     │
   ┌──────────▼──────────┐              ┌───────────▼─────────┐
   │     Fact_Sales       │             │    Fact_Purchase    │
   │─────────────────────│              │─────────────────────│
   │ ItemKey  (FK)        │             │ ItemCode (FK)       │
   │ BranchCode (FK)      │             │ PurchaseQuantity    │
   │ DepartmentCode (FK)  │             │ ReturnQuantity      │
   │ MainGroup (FK)       │             │ TotalValue          │
   │ SubGroup (FK)        │             │ NetPurchases        │
   │ NetSalesQuantity     │             │ ReturnRatio         │
   │ NetSalesValue        │             └─────────────────────┘
   │ ReturnsQty           │
   └──────┬──────┬────────┘
          │      │        └──────────────────┐
          │      │                           │
  ┌───────▼──┐  ┌▼──────────────┐  ┌────────▼───────────┐
  │Dim_Branch│  │Dim_Department  │  │     Dim_Group       │
  │──────────│  │────────────────│  │────────────────────│
  │BranchCode│  │DepartmentCode  │  │ MainGroup (PK)      │
  │(PK)      │  │(PK)            │  │ MainGroupName       │
  │BranchName│  │DepartmentName  │  │ SubGroup            │
  └──────────┘  └────────────────┘  │ SubGroupName        │
                                    └────────────────────┘
```
 
---
