# Music releases

This document records the music-release experience for the website. Phase 1 is
live; later phases are guidance for future implementation.

## Decision

Use a progressive, platform-neutral experience:

- Present releases with custom website-native artwork, titles, dates, copy, and
  calls to action.
- Link to each available listening platform from each release.
- Keep platform URLs optional so unreleased music and unavailable platforms do
  not produce empty or disabled interface elements.
- Consider embeds or playlist destinations later only when there is a clear
  promotional need.

This approach keeps the page visually consistent, treats supported platforms
equally, avoids loading third-party players, and delegates playback and
availability behavior to the listening services.

## Staged rollout

### Phase 1: one released single

- Treat the single as a featured release instead of showing a sparse grid.
- Show artwork, title, release date, and brief supporting copy in regular HTML.
- Provide equal **Listen on Spotify** and **Listen on Apple Music** links when
  those services are available.
- Do not render an embedded player, playlist section, or empty discography
  state.

### Phase 2: an upcoming second single

- Add an upcoming-release card once its announcement is public.
- Show announced artwork and date, or use `Coming soon` when either is not
  public.
- Link to a pre-save or platform-neutral release page when one exists.
- Do not show an inactive play control for music that cannot yet be played.
- Change the release to `released` and add the available platform URLs when it
  becomes available.

### Phase 3: multiple released singles

- Keep the newest or editorially selected release featured.
- Present the remaining releases as website-native cards.
- Prefer a small grid for a short catalog; revisit navigation only after the
  collection becomes large enough to require it.

### Phase 4: discography playlist

- Create artist-owned playlists in the selected services with durable names
  that are not tied to one campaign.
- Keep the newest release first unless the artist chooses a deliberate sequence.
- Add the playlist URLs to site content and render matching **Listen to all
  releases** links.
- Maintain the playlists in their respective services. Their stable URLs let
  new additions appear on the website without a deployment.
- Keep custom cards focused on new or notable releases instead of duplicating
  each playlist item.

The playlist links should remain hidden until at least one playlist URL is
configured. Two tracks can form a playlist, but waiting for roughly three or
four releases will usually make it a more useful destination.

## Proposed content model

Keep release information in the repository while the catalog is small. A CMS
or platform API integration is not warranted unless release updates become
frequent or need to be managed by a non-developer.

The eventual content shape should support released and announced music without
requiring placeholder links:

```ts
type MusicRelease = {
  slug: string;
  title: string;
  artwork: string;
  releaseDate?: string;
  status: "upcoming" | "released";
  description?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  preSaveUrl?: string;
  featured?: boolean;
};

type MusicContent = {
  releases: MusicRelease[];
  spotifyPlaylistUrl?: string;
  appleMusicPlaylistUrl?: string;
};
```

The exact representation may be adapted to the existing `src/app/data.json`
content structure during implementation. Preserve these behaviors:

- `spotifyUrl` and `appleMusicUrl` are optional for upcoming releases.
- `preSaveUrl` is optional and must not be presented as playback.
- `spotifyPlaylistUrl` and `appleMusicPlaylistUrl` are optional and control
  whether the corresponding playlist links are rendered.
- `featured` is an editorial choice rather than an assumption based only on
  release date.

## Interaction and presentation requirements

- Use **Music** or **Releases** as the section name rather than naming the whole
  section after one service. This leaves room for future platforms.
- Keep release names, dates, descriptions, and actions in regular HTML.
- Give each available platform equal visual weight.
- Use artwork supplied or approved by the artist for website-native cards.
- Do not imitate platform controls or host platform audio directly.

## Analytics

Track website-owned actions:

- Selecting a release.
- Following each listening-platform link.
- Following a pre-save link.

Name analytics events by intent and include the release slug and destination as
properties. Do not block listening if analytics fails or is declined.

## Release maintenance checklist

### Before announcement

- Confirm which title, artwork, date, and supporting copy are public.
- Add an `upcoming` release entry.
- Add a pre-save or platform link only when it is active.
- Confirm that unreleased controls do not imply playback is available.

### On release day

- Change the status to `released`.
- Add and test the canonical Spotify and Apple Music track or album URLs.
- Decide whether the new release should be featured.
- Add the release to each discography playlist when it exists.
- Verify keyboard interaction, responsive layout, platform links, and analytics
  events.

### After release

- Confirm the playlist ordering in each service.
- Remove stale pre-save messaging.
- Check that each available platform link remains current.

## Platform integration notes

Use canonical, direct links for the curated catalog. If an embedded player is
reconsidered later, use the service's official player rather than recreating
its controls or hosting audio directly.

- [Spotify Embeds](https://developer.spotify.com/documentation/embeds)
- [Spotify design and branding guidelines](https://developer.spotify.com/documentation/design)
- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)

Do not introduce a platform API merely to render this small, curated catalog.
Reconsider one only if the site later needs automated discovery or metadata
synchronization that cannot be handled through repository content and curated
playlist links.
