import { FC, useEffect, useRef, useState } from 'react';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';

export const CountdownVideo: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlaying = () => {
    const nextPlaying = !isPlaying;

    if (nextPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  return (
    <Card>
      <CardMedia>
        <video
          ref={videoRef}
          src="https://www.pexels.com/download/video/3843433"
          height="500"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </CardMedia>
      <CardActions>
        <IconButton onClick={togglePlaying}>
          {isPlaying ? (
            <PauseIcon sx={{ height: 38, width: 38, color: 'white' }} />
          ) : (
            <PlayArrowIcon sx={{ height: 38, width: 38, color: 'white' }} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export const CountdownText: FC = () => {
  const [countdown, setCountdown] = useState(9);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((val) => val - 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalRef.current);
    }
  }, [countdown]);

  return (
    <Typography variant="h5" align="center">
      Coming soon: {countdown}
    </Typography>
  );
};
