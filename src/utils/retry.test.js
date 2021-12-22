import retry, { maxTriesError } from './retry';

const testFn = jest.fn();

beforeEach(() => {
  testFn.mockReset();
});

describe('src/utils/retry function test: ', () => {
  test('1. try three times  2. reoslve successfully', async () => {
    testFn
      .mockRejectedValueOnce('error 1')
      .mockRejectedValueOnce('error 2')
      .mockResolvedValueOnce('success 1');

    const result = await retry(testFn, 3, {});
    expect(result).toBe('success 1');
    expect(testFn).toHaveBeenCalledTimes(3);
  });

  test('1. try 5 times 2. reject eventually', async () => {
    testFn
      .mockRejectedValueOnce('error 1')
      .mockRejectedValueOnce('error 2')
      .mockRejectedValueOnce('error 3')
      .mockRejectedValueOnce('error 4')
      .mockRejectedValueOnce('error 5');

    try {
      await retry(testFn, 5, {});
    } catch (e) {
      expect(testFn).toHaveBeenCalledTimes(5);
      expect(e).toBe(maxTriesError);
    }
  });
});
