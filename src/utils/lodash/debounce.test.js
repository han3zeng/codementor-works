import debounce from './debounce';

const testFn = jest.fn((i) => i);
const timeInterval = 500;

beforeAll(() => {
  jest.useFakeTimers();
});

test('debounce function', () => {
  const debouncedTestFn = debounce(testFn, timeInterval);
  for (let i = 0; i < 5; i += 1) {
    debouncedTestFn();
  }
  jest.advanceTimersByTime(timeInterval);
  expect(testFn).toHaveBeenCalledTimes(2);
});
