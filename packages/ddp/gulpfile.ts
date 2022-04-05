
/**
 * This gulp file is responsible for "dumping" the ipfs data package form the DDP service.
 *
 * This is viable because all DDP endpoints are GET, all parameters are PATH parameters and
 * all the values are a finite set that we can predict.
 *
 * Therefore, we can "dump" all possible queries to the filesystem and then use the filesystem
 * as source for the API.
 *
 * Please note that this file will not run DDP for you.
 *
 */

import * as fs from 'fs';
import * as Mustache from 'mustache';

const axios = require('axios').default;
const path = require('path');

const { series } = require('gulp');
const log = require('fancy-log');
const del = require('del');
const customTags = [ '{', '}' ];

/**
 * Parameters that can be controlled via environment variables and their defaults
 */
const DDP_PROTO = process.env['DDP_PROTO'] || 'http';
const DDP_HOST = process.env['DDP_HOST'] || 'localhost';
const DDP_PORT = process.env['DDP_PORT'] || '7200';
const DDP_IPFS_HOME = process.env['DDP_IPFS_HOME'] || '.';

/**
 * returns the available IDs for a given record type
 */

async function getInventory(recordType):Promise<Array<string>>{
    return axios({
        method: 'get',
        url: `${DDP_PROTO}://${DDP_HOST}:${DDP_PORT}/ddp/about/inventory/${recordType}.json`
    }).then(
        result =>
            result.data.map(record => record.Id) as Array<string>);
}

/**
 * Request Inventories only once for the whole session
 */
let InventoryCache;

async function PopulateInventoryCache(){
    let cache={}
    for (const recordType of ['region', 'country', 'network', 'validator_group', 'validator', 'nominator']) {
        log(`Populating inventory for ${recordType}`);
        cache[recordType] = await getInventory(recordType);
    }
    return cache;
}

/**
 * Reads generated API specification and stract the endpoints and parameters
 */
function getApiEndpoints(){
    const apiSpec=JSON.parse(fs.readFileSync('ddp-api-spec.json').toString());
    return Object.keys(apiSpec.paths).map(endpoint =>{
        return{
            endpoint: endpoint,
            params: apiSpec.paths[endpoint].get.parameters.map(param => {
                return {
                    name: param.name,
                    values: param.schema.enum ? param.schema.enum : InventoryCache[param.name]
                }
            })
        }
    });
}

/**
 * Calculates recursively the cartesian product of all parameter values.
 * A "call" is defined as a single endpoint call form all possible calls made of different parameter combinations.
 */

function getAllPossibleCalls(params:Array<any>){
    // Recursion base case:
    if (params.length == 1){
        const param=params[0];
        let ret=[];
        param.values.forEach(value =>{
            let call={}
            call[param.name] = value;
            ret.push(call);
        });
        return ret;
    }
    else {
        // Remove the first param from the list
        const param = params.shift();
        // get the calls for the rest of the params excluding
        const  restOfCalls = getAllPossibleCalls(params);
        // now add my params to each of them
        let ret=[];
        param.values.forEach(value =>{
            restOfCalls.forEach(call => {
                let newCall = {...call};
                newCall[param.name]=value;
                ret.push(newCall);
            })
        });
        return ret;
    }
}

/**
 * For a given endpoint will apply all possible parameter calls to the endpoint as specified.
 * This results in an array of all possible IPFS files.
 *
 * @param endpoint
 */
function getEndpointFileSet(endpoint){
    // Get All possible parameters for that endpoint
    const calls=getAllPossibleCalls(endpoint.params);
    // Now substitute them in the endpoint
    const url=endpoint.endpoint;
    // Render the call parameters using mustache
    return calls.map(call=>Mustache.render(url,call,{},customTags));
}

/**
 * Requests the data and stores it in the filesystem
 * @param file
 */
async function dumpFile(file){
    // GET request for remote image in node.js
    return axios({
        method: 'get',
        url: `${DDP_PROTO}://${DDP_HOST}:${DDP_PORT}${file}`,
        responseType: 'stream'
    })
        .then(function (response) {
            const dest=`${DDP_IPFS_HOME}/ipfs_dist${file}`;
            log("Creating "+dest);
            fs.mkdirSync(path.dirname(dest),{
                recursive: true
            })
            response.data.pipe(fs.createWriteStream(dest));
        });
}

/**
 * Clean the output directory
 */
async function clean(){
    return del('${DDP_IPFS_HOME}/ipfs_dist/**', {force:true});
}

/**
 * Build All Required files.
 *
 * The requests are processed in series
 */
async function build(){

    // Cache the Inventory
    InventoryCache= await PopulateInventoryCache();

    // Return all generation promises. Note that each endpoint normally involve multiple calls
    let promise=Promise.resolve();
    getApiEndpoints().forEach(endpoint => {
        getEndpointFileSet(endpoint).forEach(async file =>{
            promise=promise.then(r=>dumpFile(file));
        });
    });

    return promise;
}

exports.build = build;
exports.clean = clean;
export default series(clean,build);