import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ArticlesProvider } from '../contexts/articles';
import Search from './Search';
import { setting } from '../config';

const { debounceTime } = setting;

const mockResult = {
  hits: [
    {
      title: 'title 1',
      categories: ['category 1', 'category 2'],
      id: 1,
      author_name: 'author 1',
    },
    {
      title: 'title 2',
      categories: ['category 2', 'category 3'],
      id: 2,
      author_name: 'author 2',
    },
  ],
};

beforeAll(() => {
  jest.useFakeTimers();
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockResult),
  }));
});

const customRender = (ui, { providerProps, ...renderOptions }) => render(
  <ArticlesProvider {...providerProps}>{ui}</ArticlesProvider>,
  renderOptions,
);

test('Search.js: content with mock state', async () => {
  const utils = customRender(<Search />, { providerProps: null, wrapper: MemoryRouter });
  const input = utils.getByLabelText('search-input');
  await act(async () => {
    await fireEvent.change(input, { target: { value: 'test' } });
    jest.advanceTimersByTime(debounceTime);
  });
  expect(input.value).toBe('test');
  expect(screen.getByText(/author 1/)).toBeInTheDocument();
  expect(screen.getByText(/title 1/)).toBeInTheDocument();
  expect(screen.getByText(/title 2/)).toBeInTheDocument();
  expect(screen.getByText(/author 2/)).toBeInTheDocument();
});

afterAll(() => {
  delete global.fetch;
})
