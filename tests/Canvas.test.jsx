import { render, screen } from '@testing-library/react';
import React from 'react';

import { describe, expect, it } from 'vitest';
import Canvas from '../src/components/Canvas';

describe('Canvas', () => {
  it('renders image', () => {
    render(<Canvas />);
    expect(
      screen.getByAltText('Section of big park in Rollercoaster Tycoon'),
    ).toBeInTheDocument();
  });
});
