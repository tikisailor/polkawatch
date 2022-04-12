import * as React from 'react';

import { Icon } from '@iconify/react';

import homeOutlined from '@iconify/icons-ant-design/home-outlined';
import globalOutlined from '@iconify/icons-ant-design/global-outlined';
import cloudServerOutlined from '@iconify/icons-ant-design/cloud-server-outlined';
import safetyCertificateOutlined from '@iconify/icons-ant-design/safety-certificate-outlined';
import userOutlined from '@iconify/icons-ant-design/user-outlined';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'home',
    path: '/',
    icon: getIcon(homeOutlined)
  },
  {
    title: 'geography',
    path: '/geography',
    icon: getIcon(globalOutlined)
  },
  {
    title: 'network',
    path: '/network',
    icon: getIcon(cloudServerOutlined)
  },
  {
    title: 'validation',
    path: '/validation',
    icon: getIcon(safetyCertificateOutlined)
  },
  {
    title: 'nomination',
    path: '/nomination',
    icon: getIcon(userOutlined)
  },
];

export default sidebarConfig;
