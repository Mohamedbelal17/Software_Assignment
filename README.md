<img width="1136" height="801" alt="image" src="https://github.com/user-attachments/assets/d5f4ab3f-89e5-4eff-b360-c43d62a5b815" /># Software Assignment

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
   │     Fact_Sales      │              │    Fact_Purchase    │
   │─────────────────────│              │─────────────────────│
   │ ItemKey  (FK)       │              │ ItemCode (FK)       │
   │ BranchCode (FK)     │              │ PurchaseQuantity    │
   │ DepartmentCode (FK) │              │ ReturnQuantity      │
   │ MainGroup (FK)      │              │ TotalValue          │
   │ SubGroup (FK)       │              │ NetPurchases        │
   │ NetSalesQuantity    │              │ ReturnRatio         │
   │ NetSalesValue       │              └─────────────────────┘
   │ ReturnsQty          │
   └──────┬──────┬───────┘
          │      │        └──────────────────┐
          │      │                           │
  ┌───────▼──┐  ┌▼──────────────┐  ┌────────▼──────────┐
  │Dim_Branch│  │Dim_Department │  │     Dim_Group     │
  │──────────│  │───────────────│  │───────────────────│
  │BranchCode│  │DepartmentCode │  │ MainGroup (PK)    │
  │(PK)      │  │(PK)           │  │ MainGroupName     │
  │BranchName│  │DepartmentName │  │ SubGroup          │
  └──────────┘  └───────────────┘  │ SubGroupName      │
                                   └───────────────────┘
```
 
---

<img width="1136" height="801" alt="image" src="https://github.com/user-attachments/assets/94c23fd9-f218-4b7d-a6cd-fddbfa578a42" />

