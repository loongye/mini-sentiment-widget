import { expect, test, beforeEach, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import '@/index.css';
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

test('re-enables the form after 3 seconds following a submission', async () => {
  vi.useFakeTimers();
  
  const screen = await render(<App />);

  // Provide valid data to enable submission
  const ratingChip = screen.getByRole('radio', { name: '5' });
  await ratingChip.click();
  const submitBtn = screen.getByRole('button', { name: /submit/i });
  
  // Submit and check immediate state
  await submitBtn.click();
  
  // Wait for success dialog and close it to prevent it overlaying the form.
  const closeBtn = screen.getByRole('button', { name: 'Close' }).first();
  await closeBtn.click();

  // The submit button itself, or the fieldset containing it, should be disabled.
  // Check element state
  await expect.element(submitBtn).toBeDisabled();

  // Advance time by 3 seconds
  await vi.advanceTimersByTimeAsync(3000);

  // Verify the form is no longer disabled
  await expect.element(submitBtn).not.toBeDisabled();

  vi.useRealTimers();
});

test('manages summary correctly when 5 items are submitted iteratively', async () => {
  vi.useFakeTimers();
  const screen = await render(<App />);
  
  // Input helper mapping
  const submissions = [
    { rating: '1', comment: 'Comment One' },
    { rating: '2', comment: 'Comment Two' },
    { rating: '3', comment: 'Comment Three' },
    { rating: '4', comment: 'Comment Four' },
    { rating: '5', comment: 'Comment Five' },
  ];

  for (const entry of submissions) {
    // Select the specific rating chip
    await screen.getByRole('radio', { name: entry.rating }).click();
    // Enter the corresponding comment
    await screen.getByRole('textbox', { name: /comment/i }).fill(entry.comment);
    // Submit form
    await screen.getByRole('button', { name: /submit/i }).click();
    
    // Close resulting confirmation dialog
    await screen.getByRole('button', { name: 'Close' }).first().click();
    
    // Fast forward past the 3 second cooling period to re-enable inputs for next iteration
    await vi.advanceTimersByTimeAsync(3000);
  }

  // Check total count
  await expect.element(screen.getByText('Total submissions: 5')).toBeInTheDocument();
  
  // Check calculated average: (1+2+3+4+5) / 5 = 3.0
  await expect.element(screen.getByText('Average rating: 3.0')).toBeInTheDocument();

  // Verify only latest 3 comments are visible
  await expect.element(screen.getByText('"Comment Five"')).toBeInTheDocument();
  await expect.element(screen.getByText('"Comment Four"')).toBeInTheDocument();
  await expect.element(screen.getByText('"Comment Three"')).toBeInTheDocument();

  // Verify oldest comments are hidden from current UI view
  await expect.element(screen.getByText('"Comment Two"')).not.toBeInTheDocument();
  await expect.element(screen.getByText('"Comment One"')).not.toBeInTheDocument();

  vi.useRealTimers();
});
