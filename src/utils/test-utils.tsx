import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../app/store';

const AllTheProviders = ({ children }: any) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

export const renderWithRouter = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  { route = '/' }: { route?: string } = {}
) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: AllTheProviders });
};

export const mockLocalStorage = () => {
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();
  const removeItemMock = jest.fn();

  beforeEach(() => {
    global.Storage.prototype.setItem = setItemMock;
    global.Storage.prototype.getItem = getItemMock;
    global.Storage.prototype.removeItem = removeItemMock;
  });

  afterEach(() => {
    setItemMock.mockRestore();
    getItemMock.mockRestore();
    removeItemMock.mockRestore();
  });

  return { setItemMock, getItemMock, removeItemMock };
};
