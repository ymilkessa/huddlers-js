import { fetchUserFeed, FeedParams } from '../src';
import { EventKinds } from '../src/constants';
import { testPubkeyReal, testUrl } from './testUtils';

describe('fetchUserFeed', () => {
  it("should fetch a user feed, given the user's public key", async () => {
    const params: FeedParams = {
      pubkey: testPubkeyReal,
      url: testUrl,
      limit: 5,
    };
    const response = await fetchUserFeed(params);
    expect(response.pubkey).toEqual(testPubkeyReal);
    expect(response.events.length).toEqual(5);

    for (const event of response.events) {
      expect(response.profiles[event.pubkey]).toBeDefined();
      expect(response.profiles[event.pubkey].kind).toEqual(EventKinds.Profile);
    }
  }, 10000);

  it('returned events should be arranged in reverse chronological order; pagination should be possible', async () => {
    const limit = 5;
    const params1: FeedParams = {
      pubkey: testPubkeyReal,
      url: testUrl,
      limit,
    };
    let response = await fetchUserFeed(params1);
    expect(response.pubkey).toEqual(testPubkeyReal);
    expect(response.events.length).toEqual(limit);

    for (let i = 0; i < response.events.length - 1; i++) {
      expect(response.events[i].created_at).toBeGreaterThanOrEqual(
        response.events[i + 1].created_at,
      );
    }

    const lastEvent = response.events[response.events.length - 1];
    const until = lastEvent.created_at;
    const params2: FeedParams = {
      pubkey: testPubkeyReal,
      url: testUrl,
      limit,
      until,
    };
    response = await fetchUserFeed(params2);
    expect(response.pubkey).toEqual(testPubkeyReal);
    expect(response.events.length).toEqual(limit);

    for (let i = 0; i < response.events.length; i++) {
      expect(response.events[i].created_at).toBeLessThanOrEqual(until);
    }
  }, 10000);
});
