const express = require('express');
const router  = express.Router();
const { getPool } = require('../config/db');


router.get('/top-sales' , async (req , res) => {
    try {
        const n = parseInt(req.query.n) || 10;
        const pool = await getPool();
        const result = await pool.request()
        .input('n', n).query(`SELECT TOP (@n)
    i.ItemName,
    SUM(f.NetSalesValue)    AS TotalSalesValue,
    SUM(f.NetSalesQuantity) AS TotalSalesQty
FROM gold.Fact_Sales f
JOIN gold.Dim_Item i ON f.ItemKey = i.ItemKey
WHERE f.TransactionType = 'SALE'
GROUP BY i.ItemName
ORDER BY TotalSalesValue DESC`);
            res.json(result.recordset);
    } catch (error){
        res.status(500).json({ error: err.message });
    }
})





router.get('/DeadStock' , async (req , res) => {
    try {
        const pool = await getPool();
        const result = await pool.request()
        .query(`SELECT
    i.ItemName,
    SUM(p.PurchaseQuantity) AS TotalPurchased
FROM gold.Fact_Purchase p
JOIN gold.Dim_Item i ON p.ItemKey = i.ItemKey
LEFT JOIN gold.Fact_Sales s ON p.ItemKey = s.ItemKey
WHERE s.ItemKey IS NULL
GROUP BY i.ItemName
ORDER BY TotalPurchased DESC`);
            res.json(result.recordset);
    } catch (error){
        res.status(500).json({ error: err.message });
    }
})




router.get('/Profit' , async (req , res) => {
    try {
        const pool = await getPool();
        const result = await pool.request()
        .query(`SELECT
    i.ItemName,
    SUM(ISNULL(s.NetSalesValue, 0)) - SUM(ISNULL(p.NetPurchases, 0)) AS Profit
FROM gold.Dim_Item i
LEFT JOIN gold.Fact_Sales    s ON i.ItemKey = s.ItemKey AND s.TransactionType = 'SALE'
LEFT JOIN gold.Fact_Purchase p ON i.ItemKey = p.ItemKey AND p.TransactionType = 'Purchase'
GROUP BY i.ItemName
HAVING
    SUM(ISNULL(s.NetSalesValue, 0)) > 0
    AND SUM(ISNULL(p.NetPurchases, 0)) > 0
	and SUM(ISNULL(s.NetSalesValue, 0)) - SUM(ISNULL(p.NetPurchases, 0)) > 0
ORDER BY Profit DESC`);
            res.json(result.recordset);
    } catch (error){
        res.status(500).json({ error: err.message });
    }
})



module.exports = router;
