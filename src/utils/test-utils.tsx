import { render, RenderOptions } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '../redux/store';

export function renderWithProviders(
  ui: React.ReactElement,
  renderOptions: RenderOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }): React.JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
