import React from 'react';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { Character } from '../../services/rickandmorty';

export interface ExtraCardProps {
  name: string;
  airDate: string;
  episode: string;
  characters: Character[];
}

export const ExtraCard: React.FC<ExtraCardProps> = ({
  name,
  airDate,
  episode,
  characters,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: '0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 12px 20px rgba(255, 193, 7, 0.6)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Air Date: {airDate}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Episode: {episode}
        </Typography>
      </CardContent>
      <Box
        sx={{
          overflowY: 'auto',
          maxHeight: 300,
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Typography variant="h6" sx={{ padding: '8px' }}>
          Characters:
        </Typography>
        <List dense>
          {characters.map((character) => (
            <div key={character.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={character.name} src={character.image} />
                </ListItemAvatar>
                <ListItemText primary={character.name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Box>
    </Card>
  );
};

export default ExtraCard;
