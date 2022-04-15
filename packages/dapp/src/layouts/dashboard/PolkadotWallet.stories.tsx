import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import PolkadotWallet from "./PolkadotWallet";

export default {
    title: 'Polkadot Wallet',
    component: PolkadotWallet,
    argTypes:{
        onAccountSelected:{action:"account selected"},
        onPermissionRequest:{action:"request wallet permission"}
    }
} as ComponentMeta<typeof PolkadotWallet>;


export const GrantedPermission = (args) => <PolkadotWallet
    permission={true}
    selectedAccount={test_data.wallet1[1]}
    accounts={test_data.wallet1}
    extensions={test_data.extensions1}
    {...args}
/>

export const NoWalletPermission = (args) => <PolkadotWallet
    permission={false}
    selectedAccount={undefined}
    accounts={undefined}
    extensions={[]}
    {...args}
/>

export const PermissionNotAccounts = (args) => <PolkadotWallet
    permission={true}
    selectedAccount={undefined}
    accounts={undefined}
    extensions={[]}
    {...args}
/>

export const PermissionNoSelectedAccounts = (args) => <PolkadotWallet
    permission={true}
    selectedAccount={undefined}
    accounts={test_data.wallet1}
    extensions={test_data.extensions1}
    {...args}
/>

const test_data = {
    // We can read the wallet!
    wallet1: [
        {
            "address":"14zV6AH1pQRq35ESHEQuz3rxcaXDRh2rrC3nUJEfoMGNLRB7",
            "meta":{
                "genesisHash":null,
                "name":"Test Account 1",
                "source":"polkadot-js"
            },
            "type":"sr25519"
        },
        {
            "address":"5FRvjNMCtB8EbBVioW8NgHZQPKuoaRw8nuyeYGv6nTgQUW5D",
            "meta":{
                "genesisHash":null,
                "name":"Test Account 2",
                "source":"polkadot-js"
            },
            "type":"sr25519"
        },
        {
            "address":"5EHqGhc76bL61EvTd79Dhf4wbrk4v88UhPdDnpc9qUPvHXw2",
            "meta":{
                "genesisHash":null,
                "name":"Test Account 3",
                "source":"polkadot-js"
            },
            "type":"sr25519"
        }
    ],
    // We dont get extensions: not installed, no permission, permission rejected.
    extensions0: [],
    extensions1: [
        {"name":"polkadot-js","version":"0.42.2","accounts":{},"metadata":{},"provider":{},"signer":{}}
    ]
}