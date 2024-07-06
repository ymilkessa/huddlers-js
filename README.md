# Huddlers Javascript SDK

## Description

A simple interface for the Huddlers API for Nostr.

## Installation

```bash
npm install huddlers
```

## Usage

### fetchEvents

Takes in a cache ID.

Returns an object containing an array of events, and an object mapping relevant author pubkeys to their latest profile events.

```javascript
const cacheId = ''; // Specify the cache ID.
const { events, profiles } = await fetchEvents({ cacheId });
```

The parameter for the `fetchEvents` function is an object with the following properties:

`cacheId` (required): The cache ID to fetch events from.
`url` (optional): The URL of the API that the SDK should fetch events from. Defaults to `https://api.huddlers.dev`.
`limit` (optional): The maximum number of events to fetch. Defaults to 20.
`offset` (optional): The number of events to skip. Defaults to 0.

### fetchUserProfile

Takes in a user pubkey.

Returns the latest profile event (as a kind-0 Nostr Event) for the specified user.

```javascript
const pubkey = ''; // Specify the user pubkey.
const userProfile = await fetchUserProfile({ pubkey });
```

The parameter for this function includes:

`pubkey` (required): The user pubkey to fetch the profile event for.
`url` (optional): Same as above. A URL which by default points to `https://api.huddlers.dev`.

### fetchCacheInfo

The `fetchCacheInfo` function provides information about the cache status.

```javascript
const cacheId = ''; // Specify the cache ID.
const cacheInfo = fetchCacheInfo({ cacheId });
```

The parameter has these fields:

`cacheId` (required): The ID of the cache whose information you want to fetch.
`url` (optional): Same as above. A URL which by default points to `https://api.huddlers.dev`.

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT).
