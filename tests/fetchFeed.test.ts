import { fetchUserFeed, FeedParams } from '../src';
import { EventKinds } from '../src/constants';

describe('fetchUserFeed', () => {
  it("should fetch a user feed, given the user's public key", async () => {
    const pubkey =
      '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2';
    const params: FeedParams = {
      pubkey,
      limit: 5,
    };
    const response = await fetchUserFeed(params);
    expect(response.pubkey).toEqual(pubkey);
    expect(response.events.length).toEqual(5);

    for (let i = 0; i < response.events.length - 1; i++) {
      expect(response.events[i].created_at).toBeGreaterThanOrEqual(
        response.events[i + 1].created_at,
      );
    }

    for (const event of response.events) {
      expect(response.profiles[event.pubkey]).toBeDefined();
      expect(response.profiles[event.pubkey].kind).toEqual(EventKinds.Profile);
    }
  });
});
