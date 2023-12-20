import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../src/views/App';

describe('Landing page', () => {
  beforeEach(() => render(<App />));

  it('renders title', () => {
    expect(
      screen.getByRole('heading', { name: 'Find the sights!' }),
    ).toBeInTheDocument();
  });

  it('renders Start button', async () => {
    expect(
      screen.getByRole('button', { name: `Let's go!` }),
    ).toBeInTheDocument();
  });
});

describe('Game loop', () => {
  beforeEach(() => render(<App />));

  it('shows Canvas after clicking Start button', async () => {
    // Mock scrollTo because vitest throws a TypeError
    window.HTMLElement.prototype.scrollTo = function scrollToMock() {};

    const user = userEvent.setup();

    // Mock result of useUserId (API call)
    localStorage.setItem('userId', 'test');

    const startButton = screen.getByRole('button', { name: `Let's go!` });
    await user.click(startButton);

    expect(await screen.findByRole('button', { name: 'OK!' }));
  });
});
