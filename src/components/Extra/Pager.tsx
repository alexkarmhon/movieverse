import React from 'react';

import { Box, Button, Typography } from '@mui/material';

export interface PagerProps {
  current: number;
  onNext: () => void;
  onPrev: () => void;
}

export const Pager: React.FC<PagerProps> = ({ current, onNext, onPrev }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onPrev}
        disabled={current === 1}
        sx={{ mr: 2 }}
      >
        Prev
      </Button>
      <Typography variant="h6">{current}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onNext}
        sx={{ ml: 2 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pager;
