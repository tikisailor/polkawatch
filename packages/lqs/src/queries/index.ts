// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { GeoRegion } from './controller.distribuition.geo.region';
import { GeoCountry } from './controller.distribuition.geo.country';
import { NetworkProvider } from './controller.distribuition.network';
import { ValidatorGroup } from './controller.distribuition.validator.group';
import { AboutDataset } from './controller.distribuition.about.dataset';
import { GeoRegionEvolution } from './controller.evolution.geo.region';
import { AboutEraEvolution } from './controller.evolution.about.era';
import { DataSetInventory } from './controller.inventory.about.dataset';

export default [
    GeoRegion,
    GeoCountry,
    NetworkProvider,
    ValidatorGroup,
    AboutDataset,

    GeoRegionEvolution,
    AboutEraEvolution,

    DataSetInventory,

];