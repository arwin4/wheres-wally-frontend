import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import Canvas from '../src/components/Canvas';

describe('Canvas', () => {
  beforeEach(() => render(<Canvas />));

  it('renders image', () => {
    expect(
      screen.getByAltText('Section of big park in Rollercoaster Tycoon'),
    ).toBeInTheDocument();
  });
});
