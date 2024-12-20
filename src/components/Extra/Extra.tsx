import React, { useState } from 'react';

import { Container, Grid, LinearProgress } from '@mui/material';

import {
  EpisodesQuery,
  useGetEpisodesQuery,
} from '../../services/rickandmorty';
import ExtraCard from './ExtraCard';
import Pager from './Pager';

const defaultQuery = { page: 1 };

export const Extra: React.FC = () => {
  const [query, setQuery] = useState<EpisodesQuery>(defaultQuery);
  const { data, isFetching } = useGetEpisodesQuery(query);

  return (
    <Container sx={{ py: 3 }} maxWidth="xl">
      <Pager
        current={query.page}
        onNext={() => setQuery((q) => ({ ...q, page: q.page + 1 }))}
        onPrev={() => setQuery((q) => ({ ...q, page: q.page - 1 }))}
      />
      {isFetching && <LinearProgress sx={{ mb: 2 }} />}
      <Grid container spacing={4}>
        {data?.results.map((e) => (
          <Grid item key={e.episode} xs={12} sm={6} md={4}>
            <ExtraCard
              name={e.name}
              episode={e.episode}
              airDate={e.air_date}
              characters={e.characters}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Extra;
