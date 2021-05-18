import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('checkbox is unchecked by default', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  expect(checkbox).not.toBeChecked();
});

test('checkbox enables button when it is checked', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const button = screen.getByRole('button', { name: 'Confirm order' });
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});
