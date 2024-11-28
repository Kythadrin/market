const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/create-product', async (req, res) => {
    // TODO Implement product creation on blockchain
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});