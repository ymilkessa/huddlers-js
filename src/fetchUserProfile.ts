import { defaultHuddlersUrl, HuddlersEndpoints } from './constants';
import { FetchProfileResponse } from './types';

export type FetchProfileParams = {
  pubkey: string;
  /**
   * Defaults to 'https://api.huddlers.dev'. If you use a different service that is built on Huddlers, you can pass the URL here.
   */
  url?: string;
};

/**
 * Returns the latest profile metadata for a given public key.
 */
export const fetchUserProfile = async (
  params: FetchProfileParams,
): Promise<FetchProfileResponse> => {
  const url = params.url ?? defaultHuddlersUrl;
  const pubkey = params.pubkey;
  const fetchResponse = await fetch(
    `${url}${HuddlersEndpoints.UserProfile}?pubkey=${pubkey}`,
    {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const response = (await fetchResponse.json()) as FetchProfileResponse;
  return response;
};