import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

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
  TextField,
} from '@mui/material';

import { getKeywords, KeywordItem } from '../../API/api';
import { selectGenres } from '../../redux/selectors';

interface MoviesFilterProps {
  onApply: (filters: Filters) => void;
}

export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}

export const MoviesFilter: React.FC<MoviesFilterProps> = ({ onApply }) => {
  const genres = useSelector(selectGenres);

  const [keywordsLoading, setKeywordsLoading] = useState(false);
  const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);

  const { handleSubmit, control } = useForm<Filters>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });

  const fetchKeywordsOptions = async (query: string) => {
    if (!query) {
      setKeywordsOptions([]);
    }

    setKeywordsLoading(true);

    const { results } = await getKeywords(query);
    setKeywordsLoading(false);
    setKeywordsOptions(results);
  };

  const debouncedFetchKeywordsOptions = useMemo(
    () => debounce(fetchKeywordsOptions, 1000),
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
