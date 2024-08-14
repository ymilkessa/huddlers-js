import { fetchUserProfile } from '../src';
import { EventKinds } from '../src/constants';
import { testPubkeyFake, testPubkeyReal, testUrl } from './test_utils';

describe('fetchUserProfile', () => {
  it('should return an object with a profile field for a registered public key', async () => {
    const result = await fetchUserProfile({
      pubkey: testPubkeyReal,
      url: testUrl,
    });
    expect(result).toHaveProperty('profile');
    const profile = result.profile;
    expect(profile.pubkey).toBe(testPubkeyReal);
    expect(profile.kind).toBe(EventKinds.Profile);
  });

  it('should return a 404 for a made-up public key', async () => {
    await expect(
      fetchUserProfile({ pubkey: testPubkeyFake, url: testUrl }),
    ).rejects.toThrow();
  }, 10000);
});
