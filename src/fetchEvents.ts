import {
  defaultHuddlersUrl,
  DefaultLimit,
  DefaultOffset,
  HuddlersEndpoints,
} from './constants';
import { FetchEventsResponse } from './types';

export type FetchEventsParams = {
  cacheId: string;
  /**
   * Defaults to 'https://api.huddlers.dev'. If you use a different service that is built on Huddlers, you can pass the URL here.
   */
  url?: string;
  /**
   * Number of events to fetch.
   */
  limit?: number;
  /**
   * Starting index of the events to fetch, where events in the cache are arranged in reverse
   * chronological order.
   */
  offset?: number;
};

/**
 * Fetches events and the associated author profiles.
 *
 * Returns a FetchEventsResponse object, with contains two fields:
 * - events: An array of events.
 * - profiles: A map of author public keys to their profile events.
 */
export const fetchEvents = async (
  params: FetchEventsParams,
): Promise<FetchEventsResponse> => {
  const cacheId = params.cacheId;
  const url = params.url || defaultHuddlersUrl;
  const limit = params.limit ?? DefaultLimit;
  const offset = params.offset ?? DefaultOffset;
  const fetchResponse = await fetch(
    `${url}${HuddlersEndpoints.Fetch}?cache_id=${cacheId}&limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const response = (await fetchResponse.json()) as FetchEventsResponse;
  return response;
};
