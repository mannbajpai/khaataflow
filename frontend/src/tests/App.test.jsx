import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';

test('renders landing page', () => {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </AuthProvider>
  );
  expect(screen.getByText('Welcome to KhaataFlow')).toBeInTheDocument();
});
