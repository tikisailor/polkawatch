import * as React from 'react';

import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'home',
    path: '/dashboard/about',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'geography',
    path: '/dashboard/geography',
    icon: getIcon(peopleFill)
  },
  {
    title: 'network',
    path: '/dashboard/network',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'nominator',
    path: '/dashboard/nominator',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'validator',
    path: '/dashboard/validator',
    icon: getIcon(lockFill)
  },
];

export default sidebarConfig;
