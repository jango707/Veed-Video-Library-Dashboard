import React, { FormEvent, useState } from 'react';

import { Button, Field, IconButton, Input } from '@chakra-ui/react';
import { LuArrowDown, LuArrowUp, LuSearch } from 'react-icons/lu';
import colors from '../colors';

const SearchBar = ({
  submitSearch,
  onSortChange,
}: {
  submitSearch: (query: string) => void;
  onSortChange: () => void;
}) => {
  const [valid, setValid] = useState(true);
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValid(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const searchTerm = (formData.get('searchTerm') as string).trim();

    if (searchTerm) submitSearch(searchTerm);
    else setValid(false);
  };

  const handleReset = () => {
    setValid(true);
    submitSearch('');
    // Clear the input field
    const form = document.querySelector('form');
    if (form) {
      const input = form.querySelector('input[name="searchTerm"]') as HTMLInputElement;
      if (input) input.value = '';
    }
  };

  const handleSortChange = () => {
    setSort((prevSort) => (prevSort === 'asc' ? 'desc' : 'asc'));
    onSortChange();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <Field.Root invalid={!valid}>
          <Input placeholder="Search videos..." name="searchTerm" onChange={() => setValid(true)} />
          <Field.ErrorText>This field is required</Field.ErrorText>
        </Field.Root>
        <IconButton
          aria-label="Search database"
          color={colors.woodsmoke}
          variant={'outline'}
          type="submit"
        >
          <LuSearch />
        </IconButton>
        <Button onClick={handleReset} variant={'outline'} color={colors.woodsmoke} ml={2}>
          Clear
        </Button>
        <Button onClick={handleSortChange} variant={'outline'} color={colors.woodsmoke} ml={2}>
          <span style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
            <>{sort === 'asc' ? 'Most' : ' Least'} Recent</>{' '}
            {sort === 'asc' ? <LuArrowDown /> : <LuArrowUp />}
          </span>
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
