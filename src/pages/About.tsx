import { Container } from '@mui/material';

import {
  CountdownText,
  CountdownVideo,
} from '../components/CountdownText/CountdownText';
import MapWidget from '../components/MapWidget/MapWidget';

export default function About() {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <CountdownText />
      <CountdownVideo />
      <MapWidget />
    </Container>
  );
}
