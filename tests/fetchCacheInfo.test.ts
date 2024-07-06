import { fetchCacheInfo } from '../src/fetchCacheInfo';

describe('fetchCacheInfo', () => {
  it('should fetch cache info with multiple events', async () => {
    const cacheId =
      '8d62567880805a3f42462a17e0c74cbcd68a492a072bb3680d89344163a020f2';

    const cacheInfo = await fetchCacheInfo({ cacheId });
    expect(cacheInfo.cache_id).toBe(cacheId);
    expect(cacheInfo.number_of_events).toBeGreaterThan(0);
  });
});
