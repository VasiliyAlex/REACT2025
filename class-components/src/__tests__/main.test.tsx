import { render, screen, waitFor } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { App } from '../App';

describe('Main entry render', () => {
  it('renders App inside ErrorBoundary without crashing', async () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });
  });
});
