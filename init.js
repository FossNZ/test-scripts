// use the following cmd to load
// .load init.js
const {ApiPromise} = require('@polkadot/api');

const typeDefs = {
	BeneficiaryShare: {
		address: 'AccountId',
		weight: 'u64'
	},
	LivingSwitchCond: {
		_enum: {
			None: "Null",
			BlockHeight: "BlockNumber",
			Timestamp: "Moment",
			ClockInInterval: "BlockNumber"
		}
	}
}

async function init(){
	return ApiPromise.create({types: typeDefs});
}


module.exports = init();