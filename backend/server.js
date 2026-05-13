const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/upload',  require('./routes/upload'));


app.use('/api/reports', require('./routes/reports'));


app.use('/api/search',  require('./routes/search'));





app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));