import { useEffect, useState } from "react";

import {
  Configuration,
  PolkawatchApi,
} from '@ddp/client';

// TODO: dev/prod
// TODO: IPFS DDP updates

export default function usePolkawatchApi(): UpdatedPolkawatchApi {

  const basePath = "http://localhost:7200";
  //const basePath: "https://ipfs.io/ipfs/QmRXzWTRDJUB2EQe7hfUmDZ3ezdfK9CziaJuC2vaWWueDe"

  const checkSeconds = 60;

  const conf = new Configuration({
    basePath: basePath
  });

  const api = new PolkawatchApi(conf);

  const [lastUpdated,setLastUpdated] = useState(0);

  /**
   * We will check if the dataset has changed every N seconds
   */
  useEffect(()=>{
    const interval = setInterval(function(){
      console.log("Checking for DDP update...");
      api.ddpIpfsAboutDataset({
        lastEras: 60,
        validationType: 'public'
      }).then(response => setLastUpdated(response.data.LastUpdated));
    }, checkSeconds*1000);
    return () => clearInterval(interval)
  },[basePath]);

  /**
   * We return the API and the last updated timestamp
   */
  return {
    lastUpdated: lastUpdated,
    api: api
  };

}

type UpdatedPolkawatchApi = {
  lastUpdated: number
  api: PolkawatchApi
}