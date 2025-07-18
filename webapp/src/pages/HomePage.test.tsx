import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './Home';

test('renders learn react link', () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/veed/i);
  expect(linkElement).toBeInTheDocument();
});
