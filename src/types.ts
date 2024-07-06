export interface Event {
  kind: number;
  tags: string[][];
  content: string;
  created_at: number;
  pubkey: string;
  id: string;
  sig: string;
}

export type Metadata = {
  name?: string;
  pubkey?: string;
  picture?: string;
  nip05?: string;
  banner?: string;
  website?: string;
  about?: string;
  display_name?: string;
};

export type CacheRecordResponse = {
  cache_id: string;
  number_of_events: number;
};

export type FetchProfileResponse = {
  profile: Event;
  status: string;
};

export type FetchEventsResponse = {
  events: Event[];
  profiles: Record<string, Event>;
};

export enum FetchErrorCodeString {
  NonExistentCacheRecordError = 'NonExistentCacheRecordError',
  MiscellaneousInternalError = 'InternalError',
}
export interface FetchErrorResponse {
  error_code: FetchErrorCodeString;
  message: string;
}
