/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Preloader from '@components/Preloader/Preloader';

interface Props {
  component: any;
  props?: any;
}

function Lazy({ component, props }: Props): React.ReactElement | null {
  const Component = React.lazy(component);
  return (
    <React.Suspense fallback={<Preloader position="absolute" size={60} />}>
      <Component {...props} />
    </React.Suspense>
  );
}

export default Lazy;
