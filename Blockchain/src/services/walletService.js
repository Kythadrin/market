const { TronWeb } = require('tronweb');
require('dotenv').config();

const tronWeb = new TronWeb({
    fullHost: process.env.TRON_FULL_NODE,
    solidityNode: process.env.TRON_SOLIDITY_NODE,
    eventServer: process.env.TRON_EVENT_SERVER,
});

const mainWallet = tronWeb.address.fromPrivateKey(process.env.MAIN_WALLET_PRIVATE_KEY);

if (!mainWallet) {
    throw "Main wallet not found";
}

const generateWallet = () => {
    return tronWeb.utils.accounts.generateAccount();
};

const checkPayment = async (txHash) => {
    try {
        const txInfo = await tronWeb.trx.getTransactionInfo(txHash);
        if (txInfo.ret[0].contractRet === 'SUCCESS') {
            return { status: 'success', message: 'Payment confirmed!' };
        }
        return { status: 'failure', message: 'Payment not confirmed.' };
    } catch (error) {
        throw new Error('Error while checking payment: ' + error.message);
    }
};

const transferToMainWallet = async (amount, senderPrivateKey) => {
    try {
        const senderAddress = tronWeb.address.fromPrivateKey(senderPrivateKey);

        const tx = await tronWeb.trx.sendTransaction(mainWallet, amount, senderPrivateKey);

        if (tx.result) {
            return { status: 'success', message: 'Funds transferred successfully!' };
        }
        return { status: 'failure', message: 'Transfer failed.' };
    } catch (error) {
        throw new Error('Error while transferring funds: ' + error.message);
    }
};

module.exports = {
    generateWallet,
    checkPayment,
    transferToMainWallet,
};
