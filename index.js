// 引入 web3.js 用于与以太坊网络进行交互
const Web3 = require('web3');

// 以太坊节点的 HTTP 连接地址
const providerUrl = 'http://localhost:8545'; // 请替换成你的以太坊节点地址

// 通过 providerUrl 连接到以太坊网络
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// 示例函数，用于发送以太币
async function sendEther(fromAddress, toAddress, amount) {
    try {
        // 获取当前最新的区块数
        const latestBlock = await web3.eth.getBlockNumber();
        console.log('Latest Block Number:', latestBlock);

        // 获取当前发送者的以太币余额
        const balance = await web3.eth.getBalance(fromAddress);
        console.log('Balance of Sender:', web3.utils.fromWei(balance, 'ether'), 'ETH');

        // 构建交易对象
        const txObject = {
            from: fromAddress,
            to: toAddress,
            value: web3.utils.toWei(amount.toString(), 'ether'),
        };

        // 使用私钥签名并发送交易
        const signedTx = await web3.eth.accounts.signTransaction(txObject, 'YOUR_PRIVATE_KEY');
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        // 打印交易哈希
        console.log('Transaction Hash:', txReceipt.transactionHash);
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    sendEther: sendEther
};
