import { useEffect, useMemo, useState } from "react";

import {
    web3Accounts,
    web3Enable,
    web3FromAddress,
    web3ListRpcProviders,
    web3UseRpcProvider
} from '@polkadot/extension-dapp';


export default function usePolkadotExtension():ExtensionInfo {

    // wether we have asked user for wallet permission
    const [permission,setPermission] = useState(false);
    // the active address
    const [address, setAddress] = useState<string>(undefined);
    // the detected extension/s
    const [extensions, setExtensions] = useState([]);
    // the available accounts
    const [accounts,setAccounts] = useState([]);

    useEffect(()=>{
        if(permission){
            web3Enable('Polkawatch').then(exts => {
                setExtensions(exts);
                return web3Accounts()
            }).then(accs => {
                setAccounts(accs);
                return accs;
            });
        }
    },[permission,address,accounts])

    return {
        setPermission,
        setAddress,
        permission,
        extensions,
        accounts,
        address
    }

}

export type ExtensionInfo = {
    extensions: any[];
    address: string;
    setAddress: (value: unknown) => void;
    permission: boolean;
    setPermission: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    accounts: any[]
}

