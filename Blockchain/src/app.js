const express = require('express');
require('dotenv').config();

const walletRoutes = require('./routes/walletRoutes');

const app = express();
app.use(express.json());

app.use('/api/wallet', walletRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});