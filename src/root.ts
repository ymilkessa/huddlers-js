import { DefaultHuddlersUrl, HuddlersEndpoints } from './constants';
import { Event } from './types';
import { isValidHex } from './utils';

export type RootResponse = {
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
};

export type RootParams = {
  /**
   * Event id (hex) of the root event.
   */
  id: string;
  /**
   * Defaults to the Huddlers api url. If you use a different service that is built on Huddlers, you can pass the URL here.
   */
  url?: string;
};

/**
 * Fetches a selection of comments under a specified event. Events are selected up to a given
 * depth in the comment thread, and up to a given limit.
 */
export const fetchRoot = async (params: RootParams): Promise<RootResponse> => {
  let { id } = params;
  id = id.trim().toLocaleLowerCase();
  if (!isValidHex(id)) {
    throw new Error('Invalid event id');
  }
  const queryParams = `?id=${id}`;
  const url = params.url || DefaultHuddlersUrl;

  const fetchResponse = await fetch(
    `${url}${HuddlersEndpoints.Root}${queryParams}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!fetchResponse.ok) {
    throw new Error(
      `Failed to fetch event's root: ${fetchResponse.statusText}`,
    );
  }
  const response = (await fetchResponse.json()) as RootResponse;
  return response;
};
