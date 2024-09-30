import { useContext } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

import { anonymousUser, AuthContext } from '../AuthContext';
// import Movies from '../components/Movies/Movies';
// import { fetchUpcoming, Movie } from '../reducers/movies';
import { RootState } from '../store';

// interface HomepageProps {
//   movies: Movie[];
//   loading: boolean;
// }

// function Homepage({ movies, loading }: HomepageProps) {
function Homepage() {
  const { user } = useContext(AuthContext);
  const isLoggedIn = user !== anonymousUser;

  const greeting = isLoggedIn
    ? ` Hello, ${user.name}!  Discover, explore, and enjoy the latest movies!`
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
          // mb: 4,
          // borderRadius: 3,
          boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to Movieverse
        </Typography>
        <Typography variant="h6" gutterBottom>
          {greeting}
        </Typography>
        {isLoggedIn && (
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

      {/* Latest Movies Section */}
      {/* <Movies
        movies={movies}
        loading={loading}
        moviesTitle={'Latest Releases'}
        fetchCallback={fetchUpcoming}
      /> */}
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.upcoming,
  loading: state.movies.loading,
});

const connector = connect(mapStateToProps);
export default connector(Homepage);
