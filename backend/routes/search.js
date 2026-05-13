const express = require('express');
const router  = express.Router();
const { getPool } = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const name  = req.query.name || '';
        const pool = await getPool();
        const result = await pool.request()
            .input('name', `%${name}%`)
            .query(`SELECT ItemKey, ItemName FROM gold.Dim_Item WHERE ItemName LIKE N'%${name}%' ORDER BY ItemName`);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;