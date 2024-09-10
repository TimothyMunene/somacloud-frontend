// component
import { useState } from 'react';
import SvgColor from '../../../components/svg-color';



// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Marks Entry',
    path: '/marks',
    icon: icon('ic_wallet'),
  },
  {
    title: 'SMS',
    path: '/sms',
    icon: icon('ic_transfer'),
  },
  {
    title: 'Admin',
    path: '/admin',
    icon: icon('ic_transaction'),
  }
];





export default navConfig;
