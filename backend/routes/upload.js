const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { pareFile } = require('../services/fileParse.js');

const {getPool , sql} = require('../config/db.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = /\.(csv|xlsx)$/i;
    if (allowed.test(file.originalname)) {
        cb(null, true);
    } else {
        cb(new Error('Only CSV and Excel files are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

router.post('/sales', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const data = pareFile(req.file.path, 'sales');
        const pool = await getPool();

        for (const row of data) {
            await pool.request()
                .input('branchCode', sql.NVarChar, row.branchCode)
                .input('branchName', sql.NVarChar, row.branchName)
                .input('deptCode',   sql.NVarChar, row.deptCode)
                .input('deptName',   sql.NVarChar, row.deptName)
                .input('MainGroup',  sql.NVarChar, row.MainGroup)
                .input('MainGroupName',   sql.NVarChar, row.MainGroupName)
                .input('SubGroup',   sql.NVarChar, row.SubGroup)
                .input('SubGroupName',sql.NVarChar, row.SubGroupName)
                .input('itemCode',   sql.NVarChar, row.itemCode)
                .input('BarCode',   sql.NVarChar, row.BarCode)
                .input('itemName',   sql.NVarChar, row.itemName)
                .input('quantity',   sql.NVarChar,  row.quantity)
                .input('totalValue', sql.NVarChar,  row.totalValue)
                .query(`INSERT INTO bronze.BtestS
                        (BranchCode, BranchName, DepartmentCode, DepartmentName, MainGroup, MainGroupName, SubGroup, SubGroupName, ItemCode, BarCode, ItemName, NetSalesQuantity, NetSalesValue)
                        VALUES (@branchCode, @branchName, @deptCode, @deptName, @MainGroup, @MainGroupName, @SubGroup, @SubGroupName, @itemCode, @BarCode, @itemName, @quantity, @totalValue)`);
        }


        fs.unlinkSync(req.file.path);
        fs.rmdirSync('uploads/');

        res.json({ message: 'Sales uploaded successfully', count: data.length });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/purchase', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const data = pareFile(req.file.path, 'purchase');
        const pool = await getPool();

        for (const row of data) {
            await pool.request()
                .input('NetPurchases',   sql.NVarChar, row.NetPurchases)
                .input('ReturnRatio',   sql.NVarChar, row.ReturnRatio)
                .input('ReturnAmount', sql.NVarChar, row.ReturnAmount)
                .input('TotalValue', sql.NVarChar, row.TotalValue)
                .input('PurchaseBouin',     sql.NVarChar, row.PurchaseBouin)
                .input('PurchaseQuantity',      sql.NVarChar, row.PurchaseQuantity)
                .input('ItemName',     sql.NVarChar, row.ItemName)
                .query(`INSERT INTO bronze.BtestP
                        (NetPurchases, ReturnRatio, ReturnAmount, TotalValue, PurchaseBouin, PurchaseQuantity, ItemName)
                        VALUES (@NetPurchases, @ReturnRatio, @ReturnAmount, @TotalValue, @PurchaseBouin, @PurchaseQuantity, @ItemName)`);
        }

        fs.unlinkSync(req.file.path);
        fs.rmdirSync('uploads/');
        
        res.json({ message: 'Purchase uploaded successfully', count: data.length });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;