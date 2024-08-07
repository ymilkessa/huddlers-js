# Huddlers Javascript SDK

## Description

A simple interface for the Huddlers Caching API for Nostr.

## Installation

```bash
npm install huddlers
```

## Usage

### `fetchUserProfile`

Takes in a user pubkey.

Returns the latest profile event (as a kind-0 Nostr Event) for the specified user.

```javascript
const pubkey = ''; // Specify the user pubkey.
const { profile, status } = await fetchUserProfile({ pubkey });
```

The parameter for this function includes:

- `pubkey` (required): The user pubkey to fetch the profile event for.
- `url` (optional): Same as above. A URL which by default points to `https://api.huddlers.dev`.

### `fetchUserFeed`

Collects and returns the latest events from authors followed by the specified user.

The returned object contains:

1. `events`: An array of events in the user's feed, in reverse chronological order.
2. `profiles`: An object mapping relevant author pubkeys to their latest profile events.

Recent events by actively followed authors are cached, resulting in a faster response time.

```javascript
const pubkey = ''; // Specify the pubkey of the user requesting the feed.
const { events, profiles } = await fetchUserFeed({ pubkey });
```

Other optional parameters include:

- `url`: The URL of the API that the SDK should fetch events from. Defaults to `https://api.huddlers.dev`.
- `limit`: The maximum number of events to fetch. Defaults to 20.
- `until`: The timestamp to use as the latest timestamp of the events to fetch. This acts as an offset.

The parameter for the `fetchEvents` function is an object with the following properties:

### `fetchEventsByAuthor`

Collects and returns the latest events by the specified author.

The returned object contains:

1. `events`: An array of events by the specified author, in reverse chronological order.
2. `profile`: The latest profile event of the specified author.

Recent events by the author are cached, resulting in a faster response time in subsequent requests.

```javascript
const pubkey = ''; // Specify the pubkey of the author.
const { events, profile } = await fetchEventsByAuthor({ pubkey });
```

This also takes in the optional parameters `url`, `limit`, and `until` as described above.

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT).
