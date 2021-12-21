async function retry(fn, maxTries, params) {
  if (maxTries === 0) {
    return Promise.reject(new Error('reach number of max tries'));
  }
  try {
    const result = await fn({
      ...params,
    });
    return result;
  } catch (e) {
    const newParams = { ...params, count: params.count - 1 };
    return retry(fn, maxTries - 1, newParams);
  }
}

export default retry;
