import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders Header', () => {
  render(<Header />);
  expect(screen.getByText(/CURRENCY CONVERTER/i)).toBeInTheDocument();
})

