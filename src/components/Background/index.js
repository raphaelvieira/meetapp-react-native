import React from 'react';

import { BackgroundApp, ImageLogo } from './styles';
import logo from '~/assets/logo.png';

export default function Background({ showLogo, children }) {
  return (
    <BackgroundApp>
      {showLogo && <ImageLogo source={logo} />}
      {children}
    </BackgroundApp>
  );
}
