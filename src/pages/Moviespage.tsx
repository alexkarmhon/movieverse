import { connect } from 'react-redux';

import { Container } from '@mui/material';

import Movies from '../components/Movies/Movies';
import { RootState } from '../redux/store';

function MoviesPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Movies />
    </Container>
  );
}
const mapStateToProps = (state: RootState) => ({
  movies: state.movies,
});

const connector = connect(mapStateToProps);
export default connector(MoviesPage);
