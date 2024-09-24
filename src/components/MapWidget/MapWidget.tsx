import { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { Map } from 'leaflet';

import { addPopupToMapWidget, createMapWidget } from './widget';

const Greeting: FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '200px',
        padding: 2,
        background:
          'linear-gradient(to bottom, #0057B8 0% 50%, #FFD700 50% 100%)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: theme.palette.text.primary,
          marginBottom: 1,
        }}
      >
        Greetings from Ukraine
      </Typography>
      <FavoriteIcon
        sx={{
          fontSize: 24,
          color: theme.palette.error.main,
          '&:hover': {
            color: '#fbc12d', // A subtle hover effect
          },
          transition: 'color 0.3s ease',
        }}
      />
    </Box>
  );
};

export const MapWidget: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [popupContainer, setPopupContainer] = useState<HTMLDivElement | null>(
    null,
  );

  useEffect(() => {
    if (mapRef.current === null) {
      const map = createMapWidget(containerRef.current!);
      mapRef.current = map;
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, []);
  return (
    <Container ref={containerRef} sx={{ width: 800, height: 500, my: 3 }}>
      {popupContainer !== null && createPortal(<Greeting />, popupContainer)}
    </Container>
  );
};

export default MapWidget;
