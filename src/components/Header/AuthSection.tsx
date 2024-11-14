import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { UserSettingsMenu } from './UserSettingsMenu';

export const AuthSection: FC = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  const navigate = useNavigate();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: '/' },
    });
  };
  const onLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (isAuthenticated && user) {
    return (
      // <Button color="inherit" variant="outlined" onClick={onLogout}>
      //   Log out
      // </Button>
      <UserSettingsMenu
        user={user}
        onLogout={onLogout}
        onProtected={() => navigate('/protected')}
        onOpenProfile={() => navigate('/profile')}
      />
    );
  }
  return (
    <Button color="inherit" variant="outlined" onClick={onLogin}>
      Log in
    </Button>
  );
};
