<img width="1876" height="960" alt="Home" src="https://github.com/user-attachments/assets/22a884d3-c9ac-411b-a8ad-d7e29244bbae" />
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
----
## Frontend Images
```bash
<img width="1876" height="960" alt="Home" src="https://github.com/user-attachments/assets/f4d69516-58d3-4c47-a584-598b29ecbb00" />
<img width="1813" height="684" alt="upload" src="https://github.com/user-attachments/assets/6421d24b-c794-4c70-b9f7-d74c18fea682" />
<img width="1875" height="963" alt="top_sales" src="https://github.com/user-attachments/assets/489a22cf-9796-463a-9682-eda7664c1892" />
<img width="1874" height="930" alt="search" src="https://github.com/user-attachments/assets/df79d838-99eb-46eb-843a-624595ecff65" />
<img width="1874" height="949" alt="profit" src="https://github.com/user-attachments/assets/7823b8c4-e79e-4059-95d6-2d725087a7e0" />
<img width="1877" height="962" alt="DeadStock" src="https://github.com/user-attachments/assets/3036bf8e-fde8-4913-aec6-54da01556d68" />

```
