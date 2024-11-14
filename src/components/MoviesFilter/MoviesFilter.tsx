import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import {
  Autocomplete,
  Button,
  Checkbox,
  debounce,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Skeleton,
  TextField,
} from '@mui/material';

import {
  KeywordItem,
  useGetGenresQuery,
  useGetKeywordsQuery,
} from '../../services/moviesAPI';

export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}

interface MoviesFilterProps {
  onApply: (filters: Filters) => void;
}

export const MoviesFilter: React.FC<MoviesFilterProps> = ({ onApply }) => {
  const [keywordsQuery, setKeywordsQuery] = useState<string>('');
  const { data: genres = [], isLoading: genresLoading } = useGetGenresQuery();
  const { data: keywordsOptions = [], isLoading: keywordsLoading } =
    useGetKeywordsQuery(keywordsQuery, { skip: !keywordsQuery });

  const { handleSubmit, control } = useForm<Filters>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });

  const debouncedFetchKeywordsOptions = useMemo(
    () =>
      debounce((query: string) => {
        setKeywordsQuery(query);
      }, 1000),
    [],
  );

  return (
    <Paper
      sx={{
        m: 2,
        p: 0.5,
        mt: 3.5,
      }}
    >
      <form onSubmit={handleSubmit(onApply)}>
        <FormControl
          component="fieldset"
          variant="standard"
          sx={{ m: 2, display: 'block' }}
        >
          <Controller
            name="keywords"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                disablePortal
                loading={keywordsLoading}
                options={keywordsOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => onChange(value)}
                value={value}
                onInputChange={(_, value) =>
                  debouncedFetchKeywordsOptions(value)
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Keywords"
                    sx={{ maxWidth: '500px' }}
                  />
                )}
              />
            )}
          />
        </FormControl>
        <FormControl
          sx={{ m: 2, display: 'block' }}
          component="fieldset"
          variant="standard"
        >
          {genresLoading ? (
            <Skeleton width={300} height={480} />
          ) : (
            <>
              <FormLabel component={'legend'}>Genres</FormLabel>
              <FormGroup sx={{ maxHeight: 500 }}>
                <Controller
                  name="genres"
                  control={control}
                  render={({ field }) => (
                    <>
                      {genres.map((genre) => (
                        <FormControlLabel
                          key={genre.id}
                          control={
                            <Checkbox
                              value={genre.id}
                              checked={field.value.includes(genre.id)}
                              onChange={(event, checked) => {
                                const valueNumber = Number(event.target.value);
                                if (checked) {
                                  field.onChange([...field.value, valueNumber]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (value) => value !== valueNumber,
                                    ),
                                  );
                                }
                              }}
                            />
                          }
                          label={genre.name}
                        />
                      ))}
                    </>
                  )}
                />
              </FormGroup>
            </>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          startIcon={<FilterAltOutlined />}
          sx={{ m: 2 }}
        >
          Apply filter
        </Button>
      </form>
    </Paper>
  );
};
