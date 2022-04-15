import * as React from 'react';

import {ReactNode, createContext, useState, useContext, useEffect} from 'react';
import {web3Accounts, web3Enable} from "@polkadot/extension-dapp";

type PolkadotExtensionProps = {
    permission: boolean,
    selectedAccount: any,
    extensions: Array<any>,
    accounts: Array<any>,
    setSelectedAccount: (value: string|undefined) => void,
    setPermission: (value: boolean) => void,
}

const polkadotExtensionInitialState: PolkadotExtensionProps = {
    permission: false,
    selectedAccount: undefined,
    extensions: [],
    accounts: [],
    setSelectedAccount: ()=>{},
    setPermission: ()=>{}
}

export const PolkadotExtensionContext = createContext(polkadotExtensionInitialState);

export const usePolkadotExtensionContext = () => useContext(PolkadotExtensionContext);

export const PolkadotExtensionProvider = ({ children } :ReactNode) => {

    // whether we have asked user for wallet permission
    const [permission,setPermission] = useState(false);
    // the active address
    const [selectedAccount, setSelectedAccount] = useState<string>(undefined);
    // the detected extension/s
    const [extensions, setExtensions] = useState([]);
    // the available accounts
    const [accounts,setAccounts] = useState([]);

    useEffect(()=>{
        if(permission){
            web3Enable('Polkawatch').then(exts => {
                setExtensions(exts);
                return web3Accounts({ss58Format:0})
            }).then(accs => {
                setAccounts(accs);
                return accs;
            });
        }
    },[permission])

    return (
        <PolkadotExtensionContext.Provider value={
            {
                permission: permission,
                selectedAccount: selectedAccount,
                extensions,
                accounts: accounts,
                setPermission: setPermission,
                setSelectedAccount: setSelectedAccount
            }
         }>
            {children}
        </PolkadotExtensionContext.Provider>
    );
};
