const ApiP = require('./init');
const keyring = require('./keyring');
const {createType} = require('@polkadot/types');

const total = '10000000000000000000000000';

async function createAsset() {
	const api = await ApiP;
	const {
		alice
	} = keyring();

	return new Promise((resolve, reject) => {
		api.tx.assets.issue(total).signAndSend(alice, ({
			events = [],
			status
		}) => {
			if (status.isFinalized) {
				console.log('Completed at block hash', status.asFinalized.toHex());
				for (const {
						event: {
							method,
							data
						}
					} of events) {
					if (method === 'Issued') {
						resolve(data[0]);
					}
				}

			}
		})
	});
}

async function setBeneficiaries() {
	const api = await ApiP;
	const {
		alice, alex, ian, cherry
	} = keyring();
	const beneficiaries = [
		{
			address: alex.address,
			weight: 100
		},
		{
			address: ian.address,
			weight: 200
		},
		{
			address: cherry.address,
			weight: 100
		},
	]
	return new Promise((resolve, reject) => {
		api.tx.trustFund.setBeneficiaries(beneficiaries).signAndSend(alice, ({
			events = [],
			status
		}) => {
			if (status.isFinalized) {
				console.log('Completed at block hash', status.asFinalized.toHex());
				for (const {
						event: {
							method,
							data
						}
					} of events) {
					if (method === 'BeneficiariesSet') {
						resolve(data);
					}
				}

			}
		})
	});
}

async function setLivingSwitchCondition() {
	const api = await ApiP;
	const {
		alice, alex, ian, cherry
	} = keyring();

	const {number: currentBlockHeight} = await api.rpc.chain.getHeader();
	const switchCond = createType('LivingSwitchCond', currentBlockHeight + 5, 1)
	return new Promise((resolve, reject) => {
		api.tx.trustFund.setLivingSwitchCondition(switchCond).signAndSend(alice, ({
			events = [],
			status
		}) => {
			if (status.isFinalized) {
				console.log('Completed at block hash', status.asFinalized.toHex());
				for (const {
						event: {
							method,
							data
						}
					} of events) {
					if (method === 'LivingSwitchCondSet') {
						resolve(data);
					}
				}

			}
		})
	});
}

async function withdraw() {
	const api = await ApiP;
	const {
		alice, alex, ian, cherry
	} = keyring();

	return new Promise((resolve, reject) => {
		api.tx.trustFund.withdraw(alice.address, 0).signAndSend(alice, ({
			events = [],
			status
		}) => {
			if (status.isFinalized) {
				console.log('Completed at block hash', status.asFinalized.toHex());
				for (const {
						event: {
							method,
							data
						}
					} of events) {
					if (method === 'Withdraw') {
						resolve(data);
					}
				}

			}
		})
	});
}

module.exports.createAsset = createAsset;
module.exports.setBeneficiaries = setBeneficiaries;
module.exports.setLivingSwitchCondition = setLivingSwitchCondition;
module.exports.withdraw = withdraw;

