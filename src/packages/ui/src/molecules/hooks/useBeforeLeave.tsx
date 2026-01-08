import React, { useEffect } from 'react';
import { useBeforeUnload } from 'react-use';
import Router, { RouterEvent } from 'next/router';

export const useBeforeLeaveTab = (isConfirm = true, callback: any, dirty: boolean = false) => {
  useBeforeUnload(isConfirm);

  const handler = (event: RouterEvent) => {
    if (isConfirm && dirty) {
      callback(event);
      throw 'Route canceled';
    }
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', handler);
    return () => Router.events.off('routeChangeStart', handler);
  }, [isConfirm, dirty, callback]);
};
