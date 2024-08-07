export const defaultHuddlersUrl = 'https://api.huddlers.dev';

// EndpointUserProfile         string = "/user-profile"
// EndpointFollowList          string = "/follow-list"
// EndpointEventsByAuthor      string = "/events-by-author"
// EndpointFeed                string = "/feed"

export const HuddlersEndpoints = {
  UserProfile: '/user-profile',
  FollowList: '/follow-list',
  EventsByAuthor: '/events-by-author',
  Feed: '/feed',
};

export const EventKinds = {
  Profile: 0,
  ShortPost: 1,
  DirectMessage: 4,
  LongFormPost: 30023,
};

export const DefaultLimit = 20;
export const DefaultOffset = 0;

export const HuddlersErrorCodes = {
  Success: 'success',
  MiscellaneousError: 'error_miscellaneous',
  InvalidRequest: 'error_invalid_request',
  ProfileNotFound: 'error_profile_not_found',
  FollowListNotFound: 'error_follow_list_not_found',
};
