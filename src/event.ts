import { DefaultHuddlersUrl, HuddlersEndpoints } from './constants';
import { Event } from './types';
import { isValidHex } from './utils';

export type FetchEventResponse = {
  event: Event;
  profiles: Record<string, Event>;
};

export type FetchEventParams = {
  /**
   * Event id (hex) of the event to fetch.
   */
  id: string;
  /**
   * Defaults to the Huddlers api url. If you use a different service that is built on Huddlers, you can pass the URL here.
   */
  url?: string;
};

export const fetchEvent = async (
  params: FetchEventParams,
): Promise<FetchEventResponse> => {
  let { id } = params;
  id = id.trim().toLocaleLowerCase();
  if (!isValidHex(id)) {
    throw new Error('Invalid event id');
  }
  const queryParams = `?id=${id}`;
  const url = params.url || DefaultHuddlersUrl;

  const fetchResponse = await fetch(
    `${url}${HuddlersEndpoints.Event}${queryParams}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!fetchResponse.ok) {
    throw new Error(`Failed to fetch event: ${fetchResponse.statusText}`);
  }
  const response = (await fetchResponse.json()) as FetchEventResponse;
  return response;
};
