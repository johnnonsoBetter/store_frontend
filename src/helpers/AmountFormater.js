export default function AmountFormater(input){
	const convertedInput = [...Number(input).toString()]
	let firstPart = null;
	let secondPart = null;
	let convertedAmount = null
	const amountShouldBeConverted = convertedInput.length > 3

	formatAmount()  

	function formatAmount(){
		firstPart = (convertedInput.length % 3) !== 0 ?[...convertedInput.slice(0, convertedInput.length % 3), ','] : []

		secondPart = convertedInput.slice(convertedInput.length % 3, convertedInput.length)

		let tracker = 0;

		for(var x = 1; x <= ((secondPart.length / 3) - 1); x++){

			let index = (x * 3) + tracker
			secondPart.splice(index, 0, ',')
			tracker++	
		}

		convertedAmount = firstPart.concat(secondPart).join('')

	}

	
	return {
		amount: ()=>{
			return amountShouldBeConverted ? convertedAmount : input
		}
	}

}