import * as fs from 'fs';
import * as Mustache from 'mustache';

const axios = require('axios').default;
const path = require('path');

const { series } = require('gulp');
const del = require('del');
const customTags = [ '{', '}' ];

/**
 * This gulp file is responsible for "dumping" the ipfs data package form the DDP service.
 *
 * This is viable because all DDP endpoints are GET, all parameters are PATH parameters and
 * all the values are a finite set that we can predict.
 *
 * Therefore we can "dump" all possible queries to the filesystem and then use the filesystem
 * as source for the API.
 *
 */

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
                    values: param.schema.enum
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

function getEndpointFileSet(endpoint){
    // Get All possible parameters for that endpoint
    const calls=getAllPossibleCalls(endpoint.params);
    // Now substitute them in the endpoint
    const url=endpoint.endpoint;
    // Render the call parameters using mustache
    return calls.map(call=>Mustache.render(url,call,{},customTags));
}

async function dumpFile(file){
    // GET request for remote image in node.js
    await axios({
        method: 'get',
        url: `http://localhost:7200${file}`,
        responseType: 'stream'
    })
        .then(function (response) {
            const dest=`./ipfs_dist${file}`;
            console.log("Creating IPFS file: "+dest);
            fs.mkdirSync(path.dirname(dest),{
                recursive: true
            })
            response.data.pipe(fs.createWriteStream(dest));
        });
}

async function clean(){
    return del('ipfs_dist/**', {force:true});
}

async function build(){
    getApiEndpoints().forEach(async endpoint => {
        getEndpointFileSet(endpoint).forEach(async file =>{
            await dumpFile(file);
        })
    });
}

exports.build = build;
exports.clean = clean;
export default series(clean,build);