import { fetchRoot } from '../src/root';
import { testUrl, ThreadTestEvs } from './testUtils';

describe('fetchRoot', () => {
  it('fetchRoot with a nested reply should return all events starting from the root to that event, in the correct order.', async () => {
    const response = await fetchRoot({
      id: ThreadTestEvs.layer3Comment,
      url: testUrl,
    });
    expect(response.id).toEqual(ThreadTestEvs.layer3Comment);
    expect(response.events.length).toBe(4);
    const events = response.events;
    expect(events[0].id).toEqual(ThreadTestEvs.rootEventId);
    expect(events[1].id).toEqual(ThreadTestEvs.layer1Comment);
    expect(events[2].id).toEqual(ThreadTestEvs.layer2Comment);
    expect(events[3].id).toEqual(ThreadTestEvs.layer3Comment);

    const profiles = response.profiles;
    expect(profiles).toHaveProperty(events[0].pubkey);
    expect(profiles).toHaveProperty(events[1].pubkey);
    expect(profiles).toHaveProperty(events[2].pubkey);
    expect(profiles).toHaveProperty(events[3].pubkey);
  });

  it('fetchRoot with a direct reply event should return the root and that direct reply event.', async () => {
    const response = await fetchRoot({
      id: ThreadTestEvs.layer1Comment,
      url: testUrl,
    });
    expect(response.id).toEqual(ThreadTestEvs.layer1Comment);
    expect(response.events.length).toBe(2);
    const events = response.events;
    expect(events[0].id).toEqual(ThreadTestEvs.rootEventId);
    expect(events[1].id).toEqual(ThreadTestEvs.layer1Comment);

    const profiles = response.profiles;
    expect(profiles).toHaveProperty(events[0].pubkey);
    expect(profiles).toHaveProperty(events[1].pubkey);
  }, 10000);
});
