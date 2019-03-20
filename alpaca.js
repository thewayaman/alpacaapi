const Alpaca = require('@alpacahq/alpaca-trade-api');
const alpaca = new Alpaca({
	keyId:'PKAPMZ0S6Q33WK60WFYY',
	secretKey:'MtnUcVHfBkrXGtSaXMdzBVT59nGW3vHB4TFNuFd4',
	paper:true,
});


const client = alpaca.websocket;
client.onConnect(function () {
	console.log("Connected")
	client.subscribe(['trade_updates', 'account_updates', 'T.FB', 'Q.AAPL', 'A.FB', 'AM.AAPL'])
	setTimeout(() => {
		client.disconnect()
	}, 30 * 1000)
});

client.onDisconnect(() => {
	console.log("Disconnected")
})
client.onStockQuotes(function (subject, data) {
	console.log(`Stock quotes: ${subject}, ${data}`)
})

client.onAccountUpdate(data => {
	console.log(`Account updates: ${JSON.stringify(data)}`)
})

client.onStateChange(newState => {
	console.log(`State changed to ${newState}`)
})

client.connect();

  alpaca.getAccount().then((account) => {
	console.log('Current Account:',account)
	});
  
alpaca.getAsset('AAPL')
	.then((aaplAsset) => {
			console.log(aaplAsset,"Goddamn assets")
		if (aaplAsset.tradable) {
			console.log('We can trade AAPL.')
		}
	})
// console.log(timer)	
alpaca.getClock().then((clock) => {
	console.log('The market is ' + clock.is_open ? 'open.' : 'closed.')
})
 
/* setInterval(()=>{
	alpaca.getAsset('AAPL')
	.then((aaplAsset) => {
			console.log(aaplAsset,"Goddamn assets")
		if (aaplAsset.tradable) {
			console.log('We can trade AAPL.')
		}
	})
}, 1500); */
const date = '2019-03-19'
alpaca.getCalendar({
    start: date,
    end: date
}).then((calendars) => {
    console.log(`The market opened at ${calendars[0].open} and closed at ${calendars[0].close} on ${date}.`)
})


// getCalendar({ start: Date, end: Date }) => Promise<Calendar[]>