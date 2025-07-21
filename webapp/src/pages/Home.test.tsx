/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import HomePage from './Home';
import { render, screen } from '@testing-library/react';

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
  Group: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Heading: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  Text: ({ children, ...props }: any) => <p {...props}>{children}</p>,
}));

test('renders the Home Page', () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/Veed Feed/i);
  expect(linkElement).toBeInTheDocument();
});
