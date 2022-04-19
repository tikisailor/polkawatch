# About Polkawatch

## Decentralization Analytics for Sustrate/Polkadot.

Polkawatch provides decentralization analytics about Polkadot. Allows all stake-holders to gain insights about where network activity is taking place (regional, network provider, validator group, nominator segment, etc).

With Decentralization insights the community can act to improve decentralization regardless of their 
role: Adjust Nomination, Start Validation in new Networks / Geographies, etc.

Polkawatch is built on top of Substrate Block Explorer (currently SubQuery) adding an extra analytic layer.

Polkawatch crosses chain data with external datasources and traces weak on-chain relations in a second-pass indexing. 
External data-sources may be "live" datasets that require regular updates. This is the case with location data, where
data changes everyday and license requires for it to be updated.

Initially for Polkadot, Polkawatch could be used for any substrate blockchain.

## Components

Polkawatch is setup as a yarn workspace project with multiple packages (components) that can be managed from the project 
root and also from its project directory, the components are:

- [Archive](./packages/archive): Subquery Project that extracts and archives canonical chain data, in an unique
first pass event archiving.
- [Indexer](./packages/indexer): Crosses archived data with external datasources and resolvers weak relationships 
between on-chain events, builds and inverted index with the resulting dataset. The indexing process runs on start and on
daily schedule.
- [Live Query Server](./packages/lqs): Provides access to the inverted index to the DDPP and the DAPP.
- [Distributed Data Pack Publisher](./packages/ddp): Publishes the dataset on IPFS ready for consumption by the DAPP.
- [DAPP](./packages/dapp): Presents the data to users. Allows browsing the decentralization status of the network and
the user's nomination.

Note that DAPP is technicall not part of the workspace, but an isolated project, due to incompatibilities with webpack.

# Testing Guide

## Unit Testing

Polkawatch is a workspace project with multiple packages, however, testing can be triggered from the root of the project.
Yarn commands are delegated to the child packages.

In order to run the unit tests clone the project and do:

- ```yarn install``` to install all node packages
- ```yarn test``` to run all unit tests
- ```yarn test:e2e``` tp run end-to-end tests in packages that provide them

## Test Run of the System

All modules deliver docker containers, and a docker-compopose, with multiple profiles, allow to run all or certain 
components depending on the desired activity

### Setting up the environment

From the root of the project do:

1. Build the containers for all components with ```yarn docker:build```
2. Download some chain data with ``yarn docker:getdata`` or run the archive for 12-24hours to get a decent data sample
with ```yarn docker:archive```. You can also do both. Getting data will simply download a postgres backup from IPFS with about 1M
blocks of chain data already archived (first pass only).
3. You can run all the components with ``yarn docker:testdeploy`` 

After triggering ```testdeploy```, you will notice that the indexer starts ```processing rewards```, use the
LQS API UI/playground and run queries as the 2nd pass indexing takes place.

### Available playgrounds

You can access the following playgrouds / UIs to monitor de indexing process and/or test your development.

1. [Archive GraphQL](http://localhost:3000) Provided by Subquery, during the 1st pass archive.
2. [Elasticsearch Kibana](http://localhost:5601) Used to compose complex queries that can be used to create LQS templates.
3. [LQS API UI](http://localhost:7000/lqs) Used to test the Live Query Server API methods and test query templates.
4. [DDP API / IPFS DEV](http://localhost:7200/ddp) Used to emulate IPFS during development and during IPFS data pack geenration.
5. [DAPP Storybook](http://localhost:6006) Used to develop UI components states (stories) in isolation.

### Developing locally

In order to develop locally you can use: 

1. Build all components from root with ``yarn build``
2. You can run packages locally, i.e in your IDE, and run all other dependencies with ```yarn docker:dev```. The Indexer and LQS servers
will not be started. If you want to release more resources for development you can optionally stop the Archive and 
Kibana too.
3. Additionally ``yarn docker:clean`` will clean up all containers and data volumes.

### Deployment 

For deployment instructions check the [deployment tutorial](./deploy ). 

## License and Copyright

Polkawatch is Open Source, Apache License Version 2.0. 

©2022 [Valletech AB](https://valletech.eu), Authors and Contributors.


![w3f foundation grants program](https://raw.githubusercontent.com/w3f/Grants-Program/master/src/badge_black.svg)