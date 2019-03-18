const Alpaca = require('@alpacahq/alpaca-trade-api')

const alpaca = new Alpaca({
	keyId:'PKAPMZ0S6Q33WK60WFYY',
	secretKey:'MtnUcVHfBkrXGtSaXMdzBVT59nGW3vHB4TFNuFd4',
	paper:true,
})

alpaca.getAccount().then((account) => {
console.log('Currnet Account:',account)
})