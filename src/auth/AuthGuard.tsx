import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';

import { LinearProgress } from '@mui/material';

export interface AuthGuardProps {
  component: React.ComponentType;
}

export function AuthGuard({ component }: AuthGuardProps) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <LinearProgress sx={{ mt: 10 }} />,
  });
  return <Component />;
}
