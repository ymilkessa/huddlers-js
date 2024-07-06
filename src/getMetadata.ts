import { EventKinds } from './constants';
import { Event, Metadata } from './types';

export const getMetadata = (event: Event): Metadata => {
  if (event.kind !== EventKinds.Profile) {
    return {};
  }
  try {
    return JSON.parse(event.content) as Metadata;
  } catch (e) {
    return {};
  }
};
