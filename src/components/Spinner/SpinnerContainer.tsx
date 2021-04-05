import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { $spinner, clearLoading } from './Spinner.effects';
import Spinner from './Spinner';

export default () => {
  const loadingsCount = useStore($spinner);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      clearLoading();
    }
  }, [loaded]);

  return (loadingsCount > 0 ? <Spinner /> : null);
};
