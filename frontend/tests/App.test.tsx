import { expect, test, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import App from '@/App';

beforeEach(() => {
  window.localStorage.clear();
});

test('renders the main app title and components', async () => {
  const { getByText, getByRole } = await render(<App />);
  
  await expect.element(getByText('Mini Sentiment Widget')).toBeInTheDocument();
  await expect.element(getByText('Rating', { exact: true })).toBeInTheDocument();
  await expect.element(getByText('Comment', { exact: true })).toBeInTheDocument();
  await expect.element(getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

test('validates submission requiring a rating', async () => {
  const { getByRole, getByText } = await render(<App />);
  
  const submitBtn = getByRole('button', { name: /submit/i });
  await submitBtn.click();

  // Expect validation error
  await expect.element(getByText('Choose a rating')).toBeInTheDocument();
});

test('allows user to fill the form and submit sentiment', async () => {
  const screen = await render(<App />);

  // Select a rating of 4. In Radix toggle-group with type single, items are radios.
  const ratingChip = screen.getByRole('radio', { name: '4' });
  await ratingChip.click();

  // Enter a comment
  const commentBox = screen.getByRole('textbox', { name: /comment/i });
  await commentBox.fill('Great experience!');

  // Submit
  const submitBtn = screen.getByRole('button', { name: /submit/i });
  await submitBtn.click();

  // Should show success dialog
  await expect.element(screen.getByText('Success')).toBeInTheDocument();
  
  // Close dialog
  const closeBtn = screen.getByRole('button', { name: 'Close' }).first();
  await closeBtn.click();

  // Wait for UI update/Summary check
  await expect.element(screen.getByText('Total submissions: 1')).toBeInTheDocument();
  await expect.element(screen.getByText('Average rating: 4.0')).toBeInTheDocument();
  await expect.element(screen.getByText('"Great experience!"')).toBeInTheDocument();
});
