import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import {
  Autocomplete,
  Button,
  debounce,
  FormControl,
  Paper,
  TextField,
} from '@mui/material';

import { getKeywords, KeywordItem } from '../../API/api';

interface MoviesFilterProps {
  onApply: (filters: Filters) => void;
}

interface Filters {
  keywords: KeywordItem[];
}

export const MoviesFilter: React.FC<MoviesFilterProps> = ({ onApply }) => {
  const [keywordsLoading, setKeywordsLoading] = useState(false);
  const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);

  const { handleSubmit, control } = useForm<Filters>({
    defaultValues: {
      keywords: [],
    },
  });

  const fetchKeywords = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query) {
          setKeywordsOptions([]);
        }

        setKeywordsLoading(true);

        const { results } = await getKeywords(query);
        setKeywordsLoading(false);
        setKeywordsOptions(results);
      }, 1000),
    [],
  );

  return (
    <Paper sx={{ m: 2, p: 0.5 }}>
      <form onSubmit={handleSubmit(onApply)}>
        <FormControl
          component={'fieldset'}
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
                onInputChange={(_, value) => fetchKeywords(value)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Keywords" />
                )}
              />
            )}
          />
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
