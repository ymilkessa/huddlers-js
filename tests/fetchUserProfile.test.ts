import { fetchUserProfile } from '../src';
import { EventKinds } from '../src/constants';

describe('fetchUserProfile', () => {
  const pubkey =
    '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2';

  it('should return an object with a profile field', async () => {
    const result = await fetchUserProfile({ pubkey });
    expect(result).toHaveProperty('profile');
    const profile = result.profile;
    expect(profile.pubkey).toBe(pubkey);
    expect(profile.kind).toBe(EventKinds.Profile);
  });
});
