import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import DetailTable from './DetailTable';

import {
  RewardDistributionDetailTable
} from "./RewardDistributionDetailTable";

export default {
  title: 'Detail Table',
  component: DetailTable
} as ComponentMeta<typeof DetailTable>;

export const RegionDistribution = () => <RewardDistributionDetailTable
  title={"Rewards by Region"}
  tableData={testData.regionTestData}
/>;

export const CountryDistribution = () => <RewardDistributionDetailTable
  title={"Rewards by Country"}
  tableData={testData.countryTestData}
/>;

export const NetworkDistribution = () => <RewardDistributionDetailTable
  title={"Rewards by Operator's Network"}
  tableData={testData.networkTestData}
/>;

export const OperatorDistribution = () => <RewardDistributionDetailTable
  title={"Rewards by Operator"}
  tableData={testData.operatorTestData}
  rowsPerPageOptions={[25,50,100]}
/>;


const testData = {
  regionTestData: [
    {
      "DotRewards": 610087.1218987377,
      "Countries": 14,
      "Networks": 18,
      "ValidatorGroups": 76,
      "Validators": 125,
      "Nominators": 18826,
      "Id": "EU",
      "Region": "Europe"
    },
    {
      "DotRewards": 126275.8551465919,
      "Countries": 3,
      "Networks": 13,
      "ValidatorGroups": 29,
      "Validators": 36,
      "Nominators": 5735,
      "Id": "NA",
      "Region": "North America"
    },
    {
      "DotRewards": 60116.421818785304,
      "Countries": 4,
      "Networks": 5,
      "ValidatorGroups": 7,
      "Validators": 10,
      "Nominators": 2381,
      "Id": "AS",
      "Region": "Asia"
    }
  ],
  networkTestData: [
    {
      "DotRewards": 161571.0959092055,
      "Regions": 1,
      "Countries": 2,
      "ValidatorGroups": 32,
      "Validators": 45,
      "Nominators": 8760,
      "Id": "24940",
      "NetworkProvider": "Hetzner Online GmbH"
    },
    {
      "DotRewards": 122728.8569824062,
      "Regions": 3,
      "Countries": 8,
      "ValidatorGroups": 5,
      "Validators": 18,
      "Nominators": 6228,
      "Id": "396982",
      "NetworkProvider": "GOOGLE-CLOUD-PLATFORM"
    },
    {
      "DotRewards": 121095.458756129,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 16,
      "Nominators": 7840,
      "Id": "15830",
      "NetworkProvider": "Telecitygroup International Limited"
    },
    {
      "DotRewards": 106934.0745902736,
      "Regions": 3,
      "Countries": 5,
      "ValidatorGroups": 6,
      "Validators": 14,
      "Nominators": 4623,
      "Id": "15169",
      "NetworkProvider": "GOOGLE"
    },
    {
      "DotRewards": 106404.2531653421,
      "Regions": 2,
      "Countries": 3,
      "ValidatorGroups": 18,
      "Validators": 23,
      "Nominators": 7301,
      "Id": "16276",
      "NetworkProvider": "OVH SAS"
    },
    {
      "DotRewards": 78890.0184056268,
      "Regions": 3,
      "Countries": 9,
      "ValidatorGroups": 12,
      "Validators": 15,
      "Nominators": 4798,
      "Id": "16509",
      "NetworkProvider": "AMAZON-02"
    },
    {
      "DotRewards": 19160.3750553445,
      "Regions": 3,
      "Countries": 3,
      "ValidatorGroups": 9,
      "Validators": 9,
      "Nominators": 1410,
      "Id": "14061",
      "NetworkProvider": "DIGITALOCEAN-ASN"
    },
    {
      "DotRewards": 15996.961480714699,
      "Regions": 2,
      "Countries": 3,
      "ValidatorGroups": 7,
      "Validators": 7,
      "Nominators": 1089,
      "Id": "20473",
      "NetworkProvider": "AS-CHOOPA"
    },
    {
      "DotRewards": 10377.2422716635,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 2,
      "Validators": 2,
      "Nominators": 195,
      "Id": "197540",
      "NetworkProvider": "netcup GmbH"
    },
    {
      "DotRewards": 8349.2550312096,
      "Regions": 2,
      "Countries": 2,
      "ValidatorGroups": 2,
      "Validators": 2,
      "Nominators": 669,
      "Id": "8560",
      "NetworkProvider": "IONOS SE"
    },
    {
      "DotRewards": 7544.1722905294,
      "Regions": 1,
      "Countries": 2,
      "ValidatorGroups": 2,
      "Validators": 2,
      "Nominators": 63,
      "Id": "9009",
      "NetworkProvider": "M247 Ltd"
    },
    {
      "DotRewards": 6965.0766104222,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 4,
      "Id": "6878",
      "NetworkProvider": "T-Systems International GmbH"
    },
    {
      "DotRewards": 6015.0160222791,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 638,
      "Id": "16125",
      "NetworkProvider": "UAB Cherry Servers"
    },
    {
      "DotRewards": 4768.5559757112,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 3,
      "Validators": 3,
      "Nominators": 281,
      "Id": "63949",
      "NetworkProvider": "Linode, LLC"
    },
    {
      "DotRewards": 3406.3417989009,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 23,
      "Id": "20326",
      "NetworkProvider": "TERASWITCH"
    },
    {
      "DotRewards": 3405.0427821907,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 2,
      "Validators": 2,
      "Nominators": 141,
      "Id": "12876",
      "NetworkProvider": "Online S.a.s."
    },
    {
      "DotRewards": 2747.6611953593,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 140,
      "Id": "51167",
      "NetworkProvider": "Contabo GmbH"
    },
    {
      "DotRewards": 2061.4122339172,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 227,
      "Id": "40021",
      "NetworkProvider": "CONTABO"
    },
    {
      "DotRewards": 1432.0358538531,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 105,
      "Id": "213230",
      "NetworkProvider": "Hetzner Online GmbH"
    },
    {
      "DotRewards": 1369.5422094633,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 2,
      "Validators": 2,
      "Nominators": 276,
      "Id": "54825",
      "NetworkProvider": "PACKET"
    },
    {
      "DotRewards": 1197.3867033636002,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 23,
      "Id": "397550",
      "NetworkProvider": "GST-SERVICES"
    },
    {
      "DotRewards": 1025.154001823,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 115,
      "Id": "209605",
      "NetworkProvider": "UAB Host Baltic"
    },
    {
      "DotRewards": 1022.6461526656,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 64,
      "Id": "202675",
      "NetworkProvider": "Keliweb S.R.L"
    },
    {
      "DotRewards": 1022.6067979015,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 85,
      "Id": "44901",
      "NetworkProvider": "Belcloud LTD"
    },
    {
      "DotRewards": 989.1565878193001,
      "Regions": 1,
      "Countries": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 153,
      "Id": "20454",
      "NetworkProvider": "SSASN2"
    }
  ],
  operatorTestData: [
    {
      "DotRewards": 124797.5741202345,
      "Regions": 1,
      "Countries": 2,
      "Networks": 2,
      "Validators": 16,
      "Nominators": 7913,
      "Id": "Zug Capital",
      "ValidationGroup": "Zug Capital",
      "DotMedianNomination": 559.4077766274002
    },
    {
      "DotRewards": 107565.3939865535,
      "Regions": 2,
      "Countries": 8,
      "Networks": 3,
      "Validators": 13,
      "Nominators": 6948,
      "Id": "P2P.ORG",
      "ValidationGroup": "P2P.ORG",
      "DotMedianNomination": 591.9646233967859
    },
    {
      "DotRewards": 74830.2951799977,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 10,
      "Nominators": 4955,
      "Id": "pos.dog",
      "ValidationGroup": "pos.dog",
      "DotMedianNomination": 374.72960444758047
    },
    {
      "DotRewards": 67524.9558572103,
      "Regions": 3,
      "Countries": 3,
      "Networks": 2,
      "Validators": 8,
      "Nominators": 1137,
      "Id": "Blockdaemon",
      "ValidationGroup": "Blockdaemon",
      "DotMedianNomination": 316.3022315403175
    },
    {
      "DotRewards": 50496.919158655,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 6,
      "Nominators": 4419,
      "Id": "Jaco",
      "ValidationGroup": "Jaco",
      "DotMedianNomination": 525.4910124731166
    },
    {
      "DotRewards": 40864.924224293696,
      "Regions": 2,
      "Countries": 4,
      "Networks": 2,
      "Validators": 7,
      "Nominators": 552,
      "Id": "Polychain Labs",
      "ValidationGroup": "Polychain Labs",
      "DotMedianNomination": 342.7661106076889
    },
    {
      "DotRewards": 17118.8431347407,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 2,
      "Nominators": 1340,
      "Id": "Wei",
      "ValidationGroup": "Wei",
      "DotMedianNomination": 680.7872561334545
    },
    {
      "DotRewards": 9945.3827782946,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 2,
      "Nominators": 418,
      "Id": "Staked",
      "ValidationGroup": "Staked",
      "DotMedianNomination": 309.0319271976909
    },
    {
      "DotRewards": 9863.0391494574,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 748,
      "Id": "HYPERSPHERE",
      "ValidationGroup": "HYPERSPHERE",
      "DotMedianNomination": 1112.174427710641
    },
    {
      "DotRewards": 8745.3754514965,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 713,
      "Id": "CP287-CLOUDWALK",
      "ValidationGroup": "CP287-CLOUDWALK",
      "DotMedianNomination": 629.7951604567288
    },
    {
      "DotRewards": 8341.1209685788,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 762,
      "Id": "Ryabina",
      "ValidationGroup": "Ryabina",
      "DotMedianNomination": 499.966049998825
    },
    {
      "DotRewards": 8190.2192358652,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 649,
      "Id": "IOSG Ventures",
      "ValidationGroup": "IOSG Ventures",
      "DotMedianNomination": 323.0339208184566
    },
    {
      "DotRewards": 8061.6052212977,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 69,
      "Id": "Nodeasy",
      "ValidationGroup": "Nodeasy",
      "DotMedianNomination": 271
    },
    {
      "DotRewards": 7934.1554215117,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 590,
      "Id": "PureStake",
      "ValidationGroup": "PureStake",
      "DotMedianNomination": 604.4516099896742
    },
    {
      "DotRewards": 7858.9751361779,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 629,
      "Id": "Current",
      "ValidationGroup": "Current",
      "DotMedianNomination": 296.86311485061003
    },
    {
      "DotRewards": 7799.7254216507,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 781,
      "Id": "Staker Space",
      "ValidationGroup": "Staker Space",
      "DotMedianNomination": 601.9989622165125
    },
    {
      "DotRewards": 7698.9341452832,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 1039,
      "Id": "SNZPool-1",
      "ValidationGroup": "SNZPool-1",
      "DotMedianNomination": 500.1501772357095
    },
    {
      "DotRewards": 7631.4289942195,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 277,
      "Id": "DokiaCapital",
      "ValidationGroup": "DokiaCapital",
      "DotMedianNomination": 299.1793412613333
    },
    {
      "DotRewards": 7333.7912903904,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 4,
      "Id": "T-Systems MMS",
      "ValidationGroup": "T-Systems MMS",
      "DotMedianNomination": 166.2894069027
    },
    {
      "DotRewards": 7190.7341957935005,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 651,
      "Id": "🐠 STAKEFISH",
      "ValidationGroup": "🐠 STAKEFISH",
      "DotMedianNomination": 368.9775022683975
    },
    {
      "DotRewards": 7161.0376876111995,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 249,
      "Id": "CoinFund/Grassfed",
      "ValidationGroup": "CoinFund/Grassfed",
      "DotMedianNomination": 397.33477429102
    },
    {
      "DotRewards": 7056.674787562,
      "Regions": 1,
      "Countries": 2,
      "Networks": 1,
      "Validators": 4,
      "Nominators": 1124,
      "Id": "Able Wanderer",
      "ValidationGroup": "Able Wanderer",
      "DotMedianNomination": 267.09708015776783
    },
    {
      "DotRewards": 7026.0786847985,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 773,
      "Id": "Staking4All 🥩",
      "ValidationGroup": "Staking4All 🥩",
      "DotMedianNomination": 904.7428301917795
    },
    {
      "DotRewards": 6866.6535726557,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 433,
      "Id": "Mile",
      "ValidationGroup": "Mile",
      "DotMedianNomination": 325.4621455402933
    },
    {
      "DotRewards": 6816.0769790414,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 19,
      "Id": "RockX_Polkadot",
      "ValidationGroup": "RockX_Polkadot",
      "DotMedianNomination": 1010.633149798
    },
    {
      "DotRewards": 6766.2627672511,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 14,
      "Id": "ZKValidator",
      "ValidationGroup": "ZKValidator",
      "DotMedianNomination": 5256.9509357363
    },
    {
      "DotRewards": 6757.3010580891,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 655,
      "Id": "🔒stateless_money🔒",
      "ValidationGroup": "🔒stateless_money🔒",
      "DotMedianNomination": 300
    },
    {
      "DotRewards": 6194.8859642217,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 637,
      "Id": "General-Beck",
      "ValidationGroup": "General-Beck",
      "DotMedianNomination": 582.5840142617897
    },
    {
      "DotRewards": 6193.4168045318,
      "Regions": 1,
      "Countries": 2,
      "Networks": 2,
      "Validators": 2,
      "Nominators": 836,
      "Id": "Polkadot.pro - Realgar",
      "ValidationGroup": "Polkadot.pro - Realgar",
      "DotMedianNomination": 1027.5346774334207
    },
    {
      "DotRewards": 6067.511598886,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 124,
      "Id": "StakeDOTs.com - by Bison Trails",
      "ValidationGroup": "StakeDOTs.com - by Bison Trails",
      "DotMedianNomination": 275.0133037878572
    },
    {
      "DotRewards": 4729.5412570252,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 89,
      "Id": "Ernst Kints",
      "ValidationGroup": "Ernst Kints",
      "DotMedianNomination": 348.89042658924996
    },
    {
      "DotRewards": 4589.9321429623,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 37,
      "Id": "ALESSIO",
      "ValidationGroup": "ALESSIO",
      "DotMedianNomination": 588.5676151362
    },
    {
      "DotRewards": 4528.418375129,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 87,
      "Id": "COSMOON",
      "ValidationGroup": "COSMOON",
      "DotMedianNomination": 538.6145965907
    },
    {
      "DotRewards": 4456.5116048478,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 143,
      "Id": "CryptoLab 01",
      "ValidationGroup": "CryptoLab 01",
      "DotMedianNomination": 289.07423883215
    },
    {
      "DotRewards": 4307.1881492235,
      "Regions": 2,
      "Countries": 2,
      "Networks": 2,
      "Validators": 1,
      "Nominators": 53,
      "Id": "Vegas_life",
      "ValidationGroup": "Vegas_life",
      "DotMedianNomination": 255.7481455815
    },
    {
      "DotRewards": 4234.3462053732,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 41,
      "Id": "Khastor",
      "ValidationGroup": "Khastor",
      "DotMedianNomination": 237.2869666703
    },
    {
      "DotRewards": 4150.336536017599,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 173,
      "Id": "Liberty",
      "ValidationGroup": "Liberty",
      "DotMedianNomination": 301.03836718153326
    },
    {
      "DotRewards": 3939.4876772394,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 74,
      "Id": "openbitlab",
      "ValidationGroup": "openbitlab",
      "DotMedianNomination": 230
    },
    {
      "DotRewards": 3862.9215295486997,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 484,
      "Id": "Uno Staking",
      "ValidationGroup": "Uno Staking",
      "DotMedianNomination": 243.87389863040997
    },
    {
      "DotRewards": 3694.2923517676,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 253,
      "Id": "AURORA STAKING",
      "ValidationGroup": "AURORA STAKING",
      "DotMedianNomination": 219.8470543514
    },
    {
      "DotRewards": 3654.2054498639995,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 160,
      "Id": "Zetetic Validator",
      "ValidationGroup": "Zetetic Validator",
      "DotMedianNomination": 337.7251292249
    },
    {
      "DotRewards": 3553.2132390806,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 159,
      "Id": "Cypher Labs",
      "ValidationGroup": "Cypher Labs",
      "DotMedianNomination": 234.0588706814
    },
    {
      "DotRewards": 3483.3043331203003,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 386,
      "Id": "🐟YellowFin Tuna🐟",
      "ValidationGroup": "🐟YellowFin Tuna🐟",
      "DotMedianNomination": 314.65408785023334
    },
    {
      "DotRewards": 3330.710435096,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 394,
      "Id": "AncibanciDOT",
      "ValidationGroup": "AncibanciDOT",
      "DotMedianNomination": 236.29835262519998
    },
    {
      "DotRewards": 2827.9630694398,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 91,
      "Id": "NeNa 🌻",
      "ValidationGroup": "NeNa 🌻",
      "DotMedianNomination": 405.9947031315
    },
    {
      "DotRewards": 2747.6611953593,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 140,
      "Id": "POLKACHU.COM",
      "ValidationGroup": "POLKACHU.COM",
      "DotMedianNomination": 651.4313224356
    },
    {
      "DotRewards": 2661.3755297436,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 201,
      "Id": "StakedTech",
      "ValidationGroup": "StakedTech",
      "DotMedianNomination": 378.3642284420833
    },
    {
      "DotRewards": 2652.9986855044,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 389,
      "Id": "Swiss Bond",
      "ValidationGroup": "Swiss Bond",
      "DotMedianNomination": 340.78244234851
    },
    {
      "DotRewards": 2506.1755244923,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 130,
      "Id": "GoldenEye",
      "ValidationGroup": "GoldenEye",
      "DotMedianNomination": 407.35356413979997
    },
    {
      "DotRewards": 2500.3470618725,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 4,
      "Id": "Mark Crince DOT control",
      "ValidationGroup": "Mark Crince DOT control",
      "DotMedianNomination": 2319672.9684589654
    },
    {
      "DotRewards": 2491.7356133967,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 246,
      "Id": "We Trust",
      "ValidationGroup": "We Trust",
      "DotMedianNomination": 286
    },
    {
      "DotRewards": 2470.6951131458,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 55,
      "Id": "UBIK CAPITAL",
      "ValidationGroup": "UBIK CAPITAL",
      "DotMedianNomination": 285
    },
    {
      "DotRewards": 2407.6503661849,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 251,
      "Id": "VISIONSTAKE 👁‍🗨",
      "ValidationGroup": "VISIONSTAKE 👁‍🗨",
      "DotMedianNomination": 245.68085364217498
    },
    {
      "DotRewards": 2282.2022900016,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 104,
      "Id": "Paramito",
      "ValidationGroup": "Paramito",
      "DotMedianNomination": 256.5004975956
    },
    {
      "DotRewards": 2269.0804898317997,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 215,
      "Id": "PromoTeam Validator",
      "ValidationGroup": "PromoTeam Validator",
      "DotMedianNomination": 420
    },
    {
      "DotRewards": 2114.7674004044,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 153,
      "Id": "turboflakes.io",
      "ValidationGroup": "turboflakes.io",
      "DotMedianNomination": 212.41489002440002
    },
    {
      "DotRewards": 2091.8336196543,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 33,
      "Id": "🍁 High/Stake 🥩",
      "ValidationGroup": "🍁 High/Stake 🥩",
      "DotMedianNomination": 297.34294347775
    },
    {
      "DotRewards": 2004.7373475212,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 118,
      "Id": "Compute Crypto",
      "ValidationGroup": "Compute Crypto",
      "DotMedianNomination": 402
    },
    {
      "DotRewards": 1945.1642933683002,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 46,
      "Id": "LuckyFriday.io",
      "ValidationGroup": "LuckyFriday.io",
      "DotMedianNomination": 208.00488973035
    },
    {
      "DotRewards": 1939.5867741087,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 120,
      "Id": "ANAMIX",
      "ValidationGroup": "ANAMIX",
      "DotMedianNomination": 357.3285911558
    },
    {
      "DotRewards": 1867.5235244987,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 60,
      "Id": "dakkk",
      "ValidationGroup": "dakkk",
      "DotMedianNomination": 523.23476106085
    },
    {
      "DotRewards": 1859.5658744539,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 56,
      "Id": "PDP_Validator",
      "ValidationGroup": "PDP_Validator",
      "DotMedianNomination": 365.12959479215
    },
    {
      "DotRewards": 1856.9468703737,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 106,
      "Id": "hirish",
      "ValidationGroup": "hirish",
      "DotMedianNomination": 360.419613044
    },
    {
      "DotRewards": 1842.1098559509,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 227,
      "Id": "dotberkeley",
      "ValidationGroup": "dotberkeley",
      "DotMedianNomination": 264.78
    },
    {
      "DotRewards": 1649.8853069066001,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 103,
      "Id": "Stampede",
      "ValidationGroup": "Stampede",
      "DotMedianNomination": 338
    },
    {
      "DotRewards": 1627.5416047714,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 55,
      "Id": "GTSTAKING",
      "ValidationGroup": "GTSTAKING",
      "DotMedianNomination": 321.10134796989996
    },
    {
      "DotRewards": 1503.0512320958999,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 136,
      "Id": "Generic-chain",
      "ValidationGroup": "Generic-chain",
      "DotMedianNomination": 260.42443810775
    },
    {
      "DotRewards": 1471.4930033647,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 15,
      "Id": "Tesla",
      "ValidationGroup": "Tesla",
      "DotMedianNomination": 283.0519495997
    },
    {
      "DotRewards": 1441.2337762579,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 163,
      "Id": "finalbits",
      "ValidationGroup": "finalbits",
      "DotMedianNomination": 400
    },
    {
      "DotRewards": 1422.6064028211,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 68,
      "Id": "CHAINFLOW",
      "ValidationGroup": "CHAINFLOW",
      "DotMedianNomination": 269.9165157329
    },
    {
      "DotRewards": 1284.0515221937,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 151,
      "Id": "stk.center",
      "ValidationGroup": "stk.center",
      "DotMedianNomination": 354.2855968868
    },
    {
      "DotRewards": 1203.3249231732,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 12,
      "Id": "🌐 decentraDOT.com 🌐",
      "ValidationGroup": "🌐 decentraDOT.com 🌐",
      "DotMedianNomination": 482.43841121255
    },
    {
      "DotRewards": 1165.5903686119,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 57,
      "Id": "andreita-validator-0",
      "ValidationGroup": "andreita-validator-0",
      "DotMedianNomination": 417.8288587103
    },
    {
      "DotRewards": 1070.3216698643,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 63,
      "Id": "Zeke",
      "ValidationGroup": "Zeke",
      "DotMedianNomination": 243.5
    },
    {
      "DotRewards": 1025.154001823,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 115,
      "Id": "SAXEMBERG",
      "ValidationGroup": "SAXEMBERG",
      "DotMedianNomination": 395.2074888811
    },
    {
      "DotRewards": 1025.1533026664,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 24,
      "Id": "CertHum MaxStake",
      "ValidationGroup": "CertHum MaxStake",
      "DotMedianNomination": 268.26908386745
    },
    {
      "DotRewards": 1022.6461526656,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 64,
      "Id": "ForklessNation",
      "ValidationGroup": "ForklessNation",
      "DotMedianNomination": 212.05160992775
    },
    {
      "DotRewards": 1022.6067979015,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 85,
      "Id": "redpenguin",
      "ValidationGroup": "redpenguin",
      "DotMedianNomination": 393.556937054
    },
    {
      "DotRewards": 1022.1545998603,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 17,
      "Id": "Coinstudio",
      "ValidationGroup": "Coinstudio",
      "DotMedianNomination": 350
    },
    {
      "DotRewards": 1018.7364724267001,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 4,
      "Id": "PlusV",
      "ValidationGroup": "PlusV",
      "DotMedianNomination": 546.8383270721
    },
    {
      "DotRewards": 1018.0283661805,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 26,
      "Id": "🗻Basecamp",
      "ValidationGroup": "🗻Basecamp",
      "DotMedianNomination": 364.99029514865003
    },
    {
      "DotRewards": 1014.0875701336001,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 8,
      "Id": "TheGuild",
      "ValidationGroup": "TheGuild",
      "DotMedianNomination": 95585.400994724
    },
    {
      "DotRewards": 1004.8385609128001,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 52,
      "Id": "ParaNodes.io",
      "ValidationGroup": "ParaNodes.io",
      "DotMedianNomination": 189.7190661112
    },
    {
      "DotRewards": 997.7651610126,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 136,
      "Id": "Dionysus🍇",
      "ValidationGroup": "Dionysus🍇",
      "DotMedianNomination": 339.5383019364
    },
    {
      "DotRewards": 996.1584101294001,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 2,
      "Id": "Legiojuve",
      "ValidationGroup": "Legiojuve",
      "DotMedianNomination": 1096816.1740206678
    },
    {
      "DotRewards": 989.1565878193001,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 153,
      "Id": "SEKOYA LABS",
      "ValidationGroup": "SEKOYA LABS",
      "DotMedianNomination": 268.5114993232
    },
    {
      "DotRewards": 962.3134174437001,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 52,
      "Id": "STAKINGDX_COM",
      "ValidationGroup": "STAKINGDX_COM",
      "DotMedianNomination": 246.20583117205
    },
    {
      "DotRewards": 948.1135990460999,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 18,
      "Id": "l30",
      "ValidationGroup": "l30",
      "DotMedianNomination": 346.32050350960003
    },
    {
      "DotRewards": 843.5883089946999,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 71,
      "Id": "Anubi Digital Main Identity",
      "ValidationGroup": "Anubi Digital Main Identity",
      "DotMedianNomination": 344.7994
    },
    {
      "DotRewards": 835.5287448798,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 4,
      "Id": "CapitalStaking.com",
      "ValidationGroup": "CapitalStaking.com",
      "DotMedianNomination": 1088.67027205165
    },
    {
      "DotRewards": 828.6291284399999,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 6,
      "Id": "✨Zizzle✨",
      "ValidationGroup": "✨Zizzle✨",
      "DotMedianNomination": 464.8233973223
    },
    {
      "DotRewards": 827.2906282654,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 100,
      "Id": "Eat Pray Validate 🍴🙏🖥",
      "ValidationGroup": "Eat Pray Validate 🍴🙏🖥",
      "DotMedianNomination": 303.39833066029996
    },
    {
      "DotRewards": 825.1603434259,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 178,
      "Id": "ALGO | STAKE",
      "ValidationGroup": "ALGO | STAKE",
      "DotMedianNomination": 340.55747618015
    },
    {
      "DotRewards": 814.9303505043,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 112,
      "Id": "Gr33nHatt3R",
      "ValidationGroup": "Gr33nHatt3R",
      "DotMedianNomination": 206.687760497
    },
    {
      "DotRewards": 814.2871386859999,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 65,
      "Id": "ALFASTAKE",
      "ValidationGroup": "ALFASTAKE",
      "DotMedianNomination": 336.0197621639
    },
    {
      "DotRewards": 795.1444844253001,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 101,
      "Id": "HashQuark",
      "ValidationGroup": "HashQuark",
      "DotMedianNomination": 384.6853580325
    },
    {
      "DotRewards": 790.4957462781,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 112,
      "Id": "RADIUMBLOCK.COM",
      "ValidationGroup": "RADIUMBLOCK.COM",
      "DotMedianNomination": 234.94614810685
    },
    {
      "DotRewards": 776.2994756273,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 32,
      "Id": "XUAN",
      "ValidationGroup": "XUAN",
      "DotMedianNomination": 211.47881374825
    },
    {
      "DotRewards": 625.7766968952,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 27,
      "Id": "GATOTECH",
      "ValidationGroup": "GATOTECH",
      "DotMedianNomination": 271.0523419533
    },
    {
      "DotRewards": 619.0694740377,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 88,
      "Id": "AG",
      "ValidationGroup": "AG",
      "DotMedianNomination": 308.9690757052
    },
    {
      "DotRewards": 616.5753530817001,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 60,
      "Id": "Mitch-Wariner",
      "ValidationGroup": "Mitch-Wariner",
      "DotMedianNomination": 537.25726852905
    },
    {
      "DotRewards": 546.0700724116,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 78,
      "Id": "NEWDEAL",
      "ValidationGroup": "NEWDEAL",
      "DotMedianNomination": 288.47178728489996
    },
    {
      "DotRewards": 430.0512659251,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 36,
      "Id": "Sio34",
      "ValidationGroup": "Sio34",
      "DotMedianNomination": 596.96261356145
    },
    {
      "DotRewards": 386.45067339,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 36,
      "Id": "Mario",
      "ValidationGroup": "Mario",
      "DotMedianNomination": 246.5
    },
    {
      "DotRewards": 350.4433252934,
      "Regions": 1,
      "Countries": 1,
      "Networks": 1,
      "Validators": 1,
      "Nominators": 20,
      "Id": "EXNESS.COM",
      "ValidationGroup": "EXNESS.COM",
      "DotMedianNomination": 99900
    }
  ],
  countryTestData: [
    {
      "DotRewards": 192119.1058026858,
      "Networks": 7,
      "ValidatorGroups": 36,
      "Validators": 48,
      "Nominators": 10000,
      "Id": "DE",
      "Country": "Germany"
    },
    {
      "DotRewards": 133565.5598293076,
      "Networks": 3,
      "ValidatorGroups": 3,
      "Validators": 17,
      "Nominators": 8432,
      "Id": "GB",
      "Country": "United Kingdom"
    },
    {
      "DotRewards": 107505.3757052551,
      "Networks": 3,
      "ValidatorGroups": 18,
      "Validators": 23,
      "Nominators": 7335,
      "Id": "FR",
      "Country": "France"
    },
    {
      "DotRewards": 47380.8654219634,
      "Networks": 2,
      "ValidatorGroups": 7,
      "Validators": 10,
      "Nominators": 3386,
      "Id": "FI",
      "Country": "Finland"
    },
    {
      "DotRewards": 44117.215688272,
      "Networks": 3,
      "ValidatorGroups": 5,
      "Validators": 7,
      "Nominators": 2451,
      "Id": "BE",
      "Country": "Belgium"
    },
    {
      "DotRewards": 34863.0919044524,
      "Networks": 2,
      "ValidatorGroups": 2,
      "Validators": 5,
      "Nominators": 3337,
      "Id": "CH",
      "Country": "Switzerland"
    },
    {
      "DotRewards": 17985.0288817097,
      "Networks": 2,
      "ValidatorGroups": 4,
      "Validators": 4,
      "Nominators": 1059,
      "Id": "NL",
      "Country": "Netherlands"
    },
    {
      "DotRewards": 7631.4289942195,
      "Networks": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 277,
      "Id": "RO",
      "Country": "Romania"
    },
    {
      "DotRewards": 7220.0399660447,
      "Networks": 2,
      "ValidatorGroups": 2,
      "Validators": 2,
      "Nominators": 749,
      "Id": "LT",
      "Country": "Lithuania"
    },
    {
      "DotRewards": 6766.2627672511,
      "Networks": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 14,
      "Id": "IE",
      "Country": "Ireland"
    },
    {
      "DotRewards": 3654.2054498639995,
      "Networks": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 160,
      "Id": "ES",
      "Country": "Spain"
    },
    {
      "DotRewards": 2525.6973847615,
      "Networks": 2,
      "ValidatorGroups": 2,
      "Validators": 2,
      "Nominators": 197,
      "Id": "IT",
      "Country": "Italy"
    },
    {
      "DotRewards": 1022.6067979015,
      "Networks": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 85,
      "Id": "CY",
      "Country": "Cyprus"
    },
    {
      "DotRewards": 1018.7364724267001,
      "Networks": 1,
      "ValidatorGroups": 1,
      "Validators": 1,
      "Nominators": 4,
      "Id": "AT",
      "Country": "Austria"
    }
  ]
}
