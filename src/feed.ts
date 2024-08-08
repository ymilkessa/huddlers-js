import {
  DefaultHuddlersUrl,
  DefaultLimit,
  HuddlersEndpoints,
} from './constants';
import { Event } from './types';
import { isValidHex } from './utils';

export type FeedResponse = {
  pubkey: string;
  events: Event[];
  profiles: Record<string, Event>;
  num_events: number;
  status: string;
};

export type FeedParams = {
  /**
   * User's public key as hex.
   */
  pubkey: string;
  /**
   * Defaults to the Huddlers api url. If you use a different service that is built on Huddlers, you can pass the URL here.
   */
  url?: string;
  /**
   * Number of events to fetch. Defaults to 20.
   */
  limit?: number;
  /**
   * Filter events by kind. Defaults to all kinds.
   */
  kinds?: number[];
  /**
   * Fetch events until this timestamp. If not provided, fetches the most recent events.
   * */
  until?: number;
};

/**
 * Fetches events authored by the given user in reverse chronological order.
 */
export const fetchUserFeed = async (
  params: FeedParams,
): Promise<FeedResponse> => {
  let { pubkey, limit, kinds, until } = params;
  pubkey = pubkey.trim().toLocaleLowerCase();
  if (!isValidHex(pubkey)) {
    throw new Error('Invalid pubkey');
  }
  limit = limit ?? DefaultLimit;
  let queryParams = `?pubkey=${pubkey}&limit=${limit}`;
  if (kinds && kinds.length > 0) {
    queryParams += `&kinds=${kinds.join(',')}`;
  }
  if (until) {
    queryParams += `&until=${until}`;
  }
  const url = params.url || DefaultHuddlersUrl;

  const fetchResponse = await fetch(
    `${url}${HuddlersEndpoints.Feed}${queryParams}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const response = (await fetchResponse.json()) as FeedResponse;
  return response;
};
