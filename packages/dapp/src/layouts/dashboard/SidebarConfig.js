import * as React from 'react';

import { Icon } from '@iconify/react';
import homeSolid from '@iconify/icons-clarity/home-solid';
import location from '@iconify/icons-akar-icons/location';
import network4 from '@iconify/icons-carbon/network-4';
import lock from '@iconify/icons-bxs/lock';
import dots from '@iconify/icons-simple-icons/polkadot';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'home',
    path: '/dashboard/home',
    icon: getIcon(homeSolid)
  },
  {
    title: 'geography',
    path: '/dashboard/geography',
    icon: getIcon(location)
  },
  {
    title: 'network',
    path: '/dashboard/network',
    icon: getIcon(network4)
  },
  {
    title: 'validator',
    path: '/dashboard/validator',
    icon: getIcon(lock)
  },
  {
    title: 'nominator',
    path: '/dashboard/nominator',
    icon: getIcon(dots)
  },
];

export default sidebarConfig;
