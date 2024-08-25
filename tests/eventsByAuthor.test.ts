import { fetchEventsByAuthor, EventsByAuthorParams } from '../src';
import { EventKinds } from '../src/constants';
import { testPubkeyReal, testUrl } from './testUtils';

describe('fetchEventsByAuthor', () => {
  it("should fetch a user's events, given the user's public key", async () => {
    const limit = 1;
    const params: EventsByAuthorParams = {
      url: testUrl,
      pubkey: testPubkeyReal,
      limit,
    };
    const response = await fetchEventsByAuthor(params);
    expect(response.pubkey).toEqual(testPubkeyReal);
    expect(response.events.length).toEqual(limit);

    for (const event of response.events) {
      expect(event.pubkey).toEqual(testPubkeyReal);
    }

    expect(response.profiles[testPubkeyReal]).toBeDefined();
    expect(response.profiles[testPubkeyReal].kind).toEqual(EventKinds.Profile);
    expect(response.profiles[testPubkeyReal].pubkey).toEqual(testPubkeyReal);
  }, 10000);

  it('returned events should be arranged in reverse chronological order; pagination should be possible', async () => {
    const limit = 5;
    const params1: EventsByAuthorParams = {
      url: testUrl,
      pubkey: testPubkeyReal,
      limit,
    };
    let response = await fetchEventsByAuthor(params1);
    expect(response.pubkey).toEqual(testPubkeyReal);
    expect(response.events.length).toEqual(limit);

    for (let i = 0; i < response.events.length - 1; i++) {
      expect(response.events[i].created_at).toBeGreaterThanOrEqual(
        response.events[i + 1].created_at,
      );
    }

    const lastEvent = response.events[response.events.length - 1];
    const until = lastEvent.created_at;
    const params2: EventsByAuthorParams = {
      url: testUrl,
      pubkey: testPubkeyReal,
      limit,
      until,
    };
    response = await fetchEventsByAuthor(params2);
    expect(response.pubkey).toEqual(testPubkeyReal);
    expect(response.events.length).toEqual(limit);

    for (let i = 0; i < response.events.length; i++) {
      expect(response.events[i].created_at).toBeLessThanOrEqual(until);
    }
  }, 10000);
});
