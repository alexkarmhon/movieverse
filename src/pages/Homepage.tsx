import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

import { RootState } from '../redux/store';

function HomePage() {
  const { isAuthenticated, user } = useAuth0();

  const greeting = isAuthenticated
    ? ` Hello, ${user?.name}!  Discover, explore, and enjoy the latest movies!`
    : ' Discover, explore, and enjoy the latest movies!';
  return (
    <Container sx={{ py: 6 }} disableGutters>
      {/* Hero section */}
      <Box
        sx={{
          backgroundImage: 'url(/rectangle@2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          py: 15,
          boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to Movieverse
        </Typography>
        <Typography variant="h6" gutterBottom>
          {greeting}
        </Typography>
        {isAuthenticated && (
          <Button
            component={RouterLink}
            to="/movies"
            variant="contained"
            color="secondary"
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundColor: '#fbc02d',
              color: '#333',
            }}
          >
            Explore Movies
          </Button>
        )}
      </Box>
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies,
});

const connector = connect(mapStateToProps);
export default connector(HomePage);
