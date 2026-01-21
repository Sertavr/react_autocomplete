import React from 'react';

type Props = {
  query: string;
  delay?: number;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    delay?: number,
  ) => void;
  focusChange: (isFocus: boolean) => void;
};

export const Input: React.FC<Props> = ({
  handleChange,
  query,
  delay,
  focusChange,
}) => {
  return (
    <input
      type="text"
      value={query}
      placeholder="Enter a part of the name"
      className="input"
      data-cy="search-input"
      onChange={event => handleChange(event, delay)}
      onFocus={() => focusChange(true)}
      onBlur={() => focusChange(false)}
    />
  );
};
