How to use
```
const {createAsset, setBeneficiaries, setLivingSwitchCondition, withdraw} = require('./prepare');
api = await require('./init');
const {alice, alex, ian, cherry} = require('./keyring')()

// STEP 1 createAsset
const assetId = await createAsset();

// STEP 2 setBeneficiaries
// {
//        address: alex.address,
//        weight: 100
//    },
//    {
//        address: ian.address,
//        weight: 200
//    },
//    {
//        address: cherry.address,
//        weight: 100
//    }
//}
await setBeneficiaries();

// STEP 3 setLivingSwitchCondition
// current block height + 5
await setLivingSwitchCondition();

// STEP 4 withdraw
await withdraw();

```