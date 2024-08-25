import { fetchThread } from '../src/thread';
import { testUrl, ThreadTestEvs } from './testUtils';

describe('fetchThread', () => {
  it('fetchThread with depth 0 should only return the event with the given id and no more.', async () => {
    const response = await fetchThread({
      url: testUrl,
      id: ThreadTestEvs.rootEventId,
      depth: 0,
    });
    expect(response.id).toEqual(ThreadTestEvs.rootEventId);
    expect(response.events.length).toEqual(1);
    const ev = response.events[0];
    expect(ev.id).toEqual(ThreadTestEvs.rootEventId);

    const profiles = response.profiles;
    expect(profiles).toHaveProperty(ev.pubkey);
  });

  it('fetchThread with depth 1 should return the event with the given id and its direct children.', async () => {
    const response = await fetchThread({
      id: ThreadTestEvs.rootEventId,
      url: testUrl,
      depth: 1,
    });
    expect(response.id).toEqual(ThreadTestEvs.rootEventId);
    expect(response.events.length).toBeGreaterThan(2);
    const depth1Evs = response.events.map((ev) => ev.id);
    expect(depth1Evs).toContain(ThreadTestEvs.rootEventId);
    expect(depth1Evs).toContain(ThreadTestEvs.layer1Comment);
  });

  it('fetchThread with depth 2 should return the event with the given id and its direct children and grandchildren.', async () => {
    const response = await fetchThread({
      id: ThreadTestEvs.rootEventId,
      depth: 2,
      url: testUrl,
    });
    expect(response.id).toEqual(ThreadTestEvs.rootEventId);
    expect(response.events.length).toBeGreaterThan(3);
    const depth2Evs = response.events.map((ev) => ev.id);
    expect(depth2Evs).toContain(ThreadTestEvs.rootEventId);
    expect(depth2Evs).toContain(ThreadTestEvs.layer1Comment);
    expect(depth2Evs).toContain(ThreadTestEvs.layer2Comment);

    const profiles = response.profiles;
    const events = response.events;
    for (let ev of events) {
      expect(profiles).toHaveProperty(ev.pubkey);
    }
  });

  it('fetchThread with depth 2 on a comment Event should return its direct children and grandchildren.', async () => {
    const response = await fetchThread({
      id: ThreadTestEvs.layer1Comment,
      url: testUrl,
      depth: 2,
    });
    expect(response.id).toEqual(ThreadTestEvs.layer1Comment);
    expect(response.events.length).toBeGreaterThan(2);
    const depth2Evs = response.events.map((ev) => ev.id);
    expect(depth2Evs).toContain(ThreadTestEvs.layer1Comment);
    expect(depth2Evs).toContain(ThreadTestEvs.layer2Comment);
    expect(depth2Evs).toContain(ThreadTestEvs.layer3Comment);
  });
});
