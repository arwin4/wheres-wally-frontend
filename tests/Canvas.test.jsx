import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../src/views/App';

describe('Canvas', () => {
  beforeEach(() => render(<App />));

  it('renders image', () => {
    expect(
      screen.getByAltText('Section of big park in Rollercoaster Tycoon'),
    ).toBeInTheDocument();
  });
});
