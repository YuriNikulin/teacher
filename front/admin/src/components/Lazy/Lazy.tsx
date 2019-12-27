/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Preloader from '@components/Preloader/Preloader';

interface Props {
  component: any;
}

function Lazy({ component }: Props): React.ReactElement | null {
  const Component = React.lazy(component);
  return (
    <React.Suspense fallback={<Preloader position="absolute" size={60} />}>
      <Component />
    </React.Suspense>
  );
}

export default Lazy;
