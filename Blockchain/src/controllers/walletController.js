const walletService = require('../services/walletService');

const generateWallet = (req, res) => {
    try {
        const newWallet = walletService.generateWallet();
        res.json({
            address: newWallet.address.base58,
            privateKey: newWallet.privateKey,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const checkPayment = async (req, res) => {
    const txHash = req.params.txHash;

    try {
        const result = await walletService.checkPayment(txHash);
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const transferToMainWallet = async (req, res) => {
    const { amount, senderPrivateKey } = req.body;

    try {
        const result = await walletService.transferToMainWallet(amount, senderPrivateKey);
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    generateWallet,
    checkPayment,
    transferToMainWallet,
};
