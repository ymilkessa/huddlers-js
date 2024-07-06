import { getMetadata } from '../src';

describe('fetchUserProfile', () => {
  const event = {
    id: 'f7b1a3ca3fa77bffded2024568da939e8cd3ed2403004e1ecb56d556f299ad2a',
    pubkey: '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2',
    created_at: 1715441226,
    kind: 0,
    tags: [],
    content:
      '{"banner":"https:\\/\\/m.primal.net\\/IBZO.jpg","website":"","picture":"https:\\/\\/image.nostr.build\\/26867ce34e4b11f0a1d083114919a9f4eca699f3b007454c396ef48c43628315.jpg","lud06":"","display_name":"","lud16":"jack@primal.net","nip05":"","name":"jack","about":"bitcoin & chill"}',
    sig: '9792ceb1e9c73a6c2140540ddbac4279361cae4cc41888019d9dd47d09c1e7cee55948f6e1af824fa0f856d892686352bc757ad157f766f0da656d5e80b38bc7',
  };

  const nonMetadataEv = {
    id: '299125ebbecce96d88f3640939166ad81cb2900042f9a0d9e3054246aac0642b',
    pubkey: 'a4cb51f4618cfcd16b2d3171c466179bed8e197c43b8598823b04de266cef110',
    created_at: 1720224478,
    kind: 1,
    tags: [],
    content: "A special economic zone, except it's the whole country.",
    sig: '454f6c64111ef8a2e50bc6092cd274c57d75d5e6dc5cbf52376ebbf592438831369cfc7d6acbb2aca6374752c434e7b5ba9132f5f383d890f41dcb152b41ea26',
  };

  it('returns the metadata object for a profile event.', async () => {
    const metadata = getMetadata(event);
    expect(metadata.name).toBe('jack');
    expect(metadata.display_name).toBe('');
    expect(metadata.about).toBe('bitcoin & chill');
  });

  it('returns an empty object for a non-metadata event.', async () => {
    const metadata = getMetadata(nonMetadataEv);
    expect(metadata).toEqual({});
  });
});
