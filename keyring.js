const { Keyring } = require('@polkadot/keyring');

const keyring = new Keyring({ type: 'sr25519' });

module.exports = ()=> ({
	alice: keyring.addFromUri('//Alice'),
	alex: keyring.addFromUri('//Alex'),
	bob: keyring.addFromUri('//Bob'),
	ian: keyring.addFromUri('//Ian'),
	cherry: keyring.addFromUri('//Cherry')
});
