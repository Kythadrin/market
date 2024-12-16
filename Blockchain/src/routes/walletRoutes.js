const express = require('express');
const walletController = require('../controllers/walletController');

const router = express.Router();

router.post('/generate-wallet', walletController.generateWallet);
router.get('/check-payment/:txHash', walletController.checkPayment);
router.post('/transfer-to-main-wallet', walletController.transferToMainWallet);

module.exports = router;
