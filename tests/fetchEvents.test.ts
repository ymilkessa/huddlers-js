import { fetchEvents, FetchEventsParams } from '../src';
import { EventKinds } from '../src/constants';

describe('fetchEvents', () => {
  it('should fetch events from cache with offset 0 and limit 2', async () => {
    const cacheId =
      '8d62567880805a3f42462a17e0c74cbcd68a492a072bb3680d89344163a020f2';
    const params: FetchEventsParams = {
      cacheId,
      offset: 0,
      limit: 2,
    };

    const response = await fetchEvents(params);
    expect(response.events.length).toBe(2);
    response.events.forEach((event) => {
      expect(event.pubkey).toBeDefined();
      const profile = response.profiles[event.pubkey];
      if (profile) {
        expect(profile.kind).toBe(EventKinds.Profile);
        expect(profile.pubkey).toBe(event.pubkey);
      }
    });
  });
});
