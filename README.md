# Huddlers JavaScript SDK

[![npm version](https://badge.fury.io/js/huddlers.svg)](https://badge.fury.io/js/huddlers)

## Description

A simple interface for the Huddlers Caching API for Nostr. This SDK provides easy-to-use functions for simultaneously retrieving both Nostr posts (called 'events') and relevant user profiles through the Huddlers API.

This package supports all the features provided in the [Huddlers API docs](https://docs.huddlers.dev).

## Installation

```bash
npm install huddlers
```

## Usage

Note that all request that return Nostr events will also return the profiles of the authors of those events.

### fetchUserFeed

Fetches the latest events published by the authors that a given user follows on Nostr.

```javascript
import { fetchUserFeed } from 'huddlers';

const pubkey = ''; // Specify the user pubkey
try {
  const { events, profiles } = await fetchUserFeed({ pubkey });

  for (const event of events) {
    // Log the Nostr event.
    console.log(event);

    // Log the author's profile metadata (kind-0 event)
    console.log(profiles[event.pubkey]);
  }
} catch (error) {
  console.error('Could not fetch user feed.');
}
```

Parameters:

- `pubkey` (required): The user's public key as a hexadecimal string.
- `url` (optional): The API URL.
- `limit` (optional): Maximum number of events to fetch. Defaults to 20.
- `kinds` (optional): Array of event kinds to filter by.
- `until` (optional): Fetch events until this timestamp.

### fetchUserProfile

Fetches the latest profile event for a specified user.

```javascript
import { fetchUserProfile } from 'huddlers';

const pubkey = ''; // Specify the user pubkey
try {
  const { profile } = await fetchUserProfile({ pubkey });
  console.log(profile);
} catch (error) {
  console.error('Could not find a profile with the given pubkey.');
}
```

Parameters:

- `pubkey` (required): The user's public key as a hexadecimal string.
- `url` (optional): The API URL. Defaults to the Huddlers API URL.

### fetchEventsByAuthor

Fetches the latest events by a specified author.

```javascript
import { fetchEventsByAuthor } from 'huddlers';

const pubkey = ''; // Specify the pubkey of the author
try {
  const { events, profiles } = await fetchEventsByAuthor({ pubkey });
  console.log(events, profiles);
} catch (error) {
  console.error('Could not fetch events by author.');
}
```

Parameters:

- `pubkey` (required): The author's public key as a hexadecimal string.
- `url` (optional): The API URL.
- `limit` (optional): Maximum number of events to fetch. Defaults to 20.
- `kinds` (optional): Array of event kinds to filter by.
- `until` (optional): Fetch events until this timestamp.

### fetchThread

Fetches a selection of comments under a specified event.

```javascript
import { fetchThread } from 'huddlers';

const id = ''; // Specify the event id
try {
  const { events, profiles } = await fetchThread({ id, depth: 2 });
  console.log(events, profiles);
} catch (error) {
  console.error('Could not fetch thread.');
}
```

Parameters:

- `id` (required): The event ID as a hexadecimal string.
- `url` (optional): The API URL.
- `limit` (optional): Maximum number of events to fetch. Defaults to 20.
- `depth` (optional): Depth of the thread to fetch. Defaults to 2.

### fetchRoot

Returns the chain of events leading to a specified event.

```javascript
import { fetchRoot } from 'huddlers';

const id = ''; // Specify the event id
try {
  const { events, profiles } = await fetchRoot({ id });
  console.log(events, profiles);
} catch (error) {
  console.error('Could not fetch root event.');
}
```

Parameters:

- `id` (required): The event ID as a hexadecimal string.
- `url` (optional): The API URL.

### fetchEvent

Fetches a single event by its ID.

```javascript
import { fetchEvent } from 'huddlers';

const id = ''; // Specify the event id
try {
  const { event, profiles } = await fetchEvent({ id });
  console.log(event, profiles);
} catch (error) {
  console.error('Could not fetch event.');
}
```

Parameters:

- `id` (required): The event ID as a hexadecimal string.
- `url` (optional): The API URL.

## Error Handling

All API functions return valid data if the requested item has been found. If the item is not found, the functions will throw an error. Hence, it's recommended to use try-catch blocks when calling these functions.

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT).
