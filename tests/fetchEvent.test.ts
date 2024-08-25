import { fetchEvent } from '../src';
import { fakeEvId, testUrl, ThreadTestEvs } from './testUtils';

describe('fetchEvent', () => {
  it('should return a valid event and profiles list for a given event id', async () => {
    const response = await fetchEvent({
      id: ThreadTestEvs.rootEventId,
      url: testUrl,
    });
    expect(response.event.id).toEqual(ThreadTestEvs.rootEventId);
    expect(Object.keys(response.profiles).length).toBeGreaterThan(0);
    expect(response.profiles[response.event.pubkey]).toBeDefined();
  });

  it('should raise an error when searching for a fake event id', async () => {
    await expect(fetchEvent({ id: fakeEvId, url: testUrl })).rejects.toThrow();
  });
});
