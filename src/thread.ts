import {
  DefaultDepth,
  DefaultHuddlersUrl,
  DefaultLimit,
  HuddlersEndpoints,
} from './constants';
import { Event } from './types';
import { isValidHex } from './utils';

export type ThreadResponse = {
  /**
   * Event id of the root event.
   */
  id: string;
  /**
   * Array of events in the thread.
   */
  events: Event[];
  /**
   * Map from profile pubkeys to profile events.
   */
  profiles: Record<string, Event>;
  /**
   * Depth to the bottom level event included in the response.
   */
  depth: number;
};

export type ThreadParams = {
  /**
   * Event id (hex) of the root event.
   */
  id: string;
  /**
   * Defaults to the Huddlers api url. If you use a different service that is built on Huddlers, you can pass the URL here.
   */
  url?: string;
  /**
   * Number of events to fetch. Defaults to 20.
   */
  limit?: number;
  /**
   * Depth of the thread. Defaults to 2.
   */
  depth?: number;
};

/**
 * Fetches a selection of comments under a specified event. Events are selected up to a given
 * depth in the comment thread, and up to a given limit.
 */
export const fetchThread = async (
  params: ThreadParams,
): Promise<ThreadResponse> => {
  let { id, limit, depth } = params;
  id = id.trim().toLocaleLowerCase();
  if (!isValidHex(id)) {
    throw new Error('Invalid event id');
  }
  limit = limit ?? DefaultLimit;
  depth = depth ?? DefaultDepth;
  const queryParams = `?id=${id}&limit=${limit}&depth=${depth}`;
  const url = params.url || DefaultHuddlersUrl;

  const fetchResponse = await fetch(
    `${url}${HuddlersEndpoints.Thread}${queryParams}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!fetchResponse.ok) {
    throw new Error(`Failed to fetch thread: ${fetchResponse.statusText}`);
  }
  const response = (await fetchResponse.json()) as ThreadResponse;
  return response;
};
