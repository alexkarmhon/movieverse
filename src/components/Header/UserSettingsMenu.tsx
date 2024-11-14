import { User } from '@auth0/auth0-react';
import { FC, useState } from 'react';

import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

interface UserSettingsMenuProps {
  user: User | undefined;
  onLogout: () => void;
  onProtected: () => void;
  onOpenProfile: () => void;
}

export const UserSettingsMenu: FC<UserSettingsMenuProps> = ({
  user,
  onLogout,
  onProtected,
  onOpenProfile,
}) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={'Open settings'}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.name} src={user?.picture} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            onOpenProfile();
          }}
        >
          <Typography textAlign={'center'}>Profile</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            onProtected();
          }}
        >
          <Typography textAlign={'center'}>Protected</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            onLogout();
          }}
        >
          <Typography textAlign={'center'}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserSettingsMenu;
