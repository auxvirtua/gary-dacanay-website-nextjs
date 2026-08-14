# Music releases

This document records the intended music-release experience for the website.
It is guidance for future implementation, not a description of functionality
that is currently live.

## Decision

Use a progressive hybrid experience:

- Present releases with custom website-native artwork, titles, dates, copy, and
  calls to action.
- Load an official Spotify embed only after a visitor chooses to listen.
- Allow only one release embed to be active at a time.
- Add one official Spotify discography-playlist embed after the catalog is large
  enough for the playlist to feel useful.
- Keep Spotify URLs optional so unreleased music and the not-yet-created
  playlist do not produce empty or disabled interface elements.

This approach keeps the page visually consistent, avoids loading a player for
every release, and delegates playback and availability behavior to Spotify. It
also avoids the authentication, credentials, quotas, and operational overhead
of the Spotify Web API and Web Playback SDK.

## Staged rollout

### Phase 1: one released single

- Treat the single as a featured release instead of showing a sparse grid.
- Show artwork, title, release date, and brief supporting copy in regular HTML.
- Provide a **Listen now** action that creates or reveals the official Spotify
  track or album embed.
- Provide a separate **Open in Spotify** link.
- Do not render a playlist section or an empty discography state.

### Phase 2: an upcoming second single

- Add an upcoming-release card once its announcement is public.
- Show announced artwork and date, or use `Coming soon` when either is not
  public.
- Link to a pre-save or platform-neutral release page when one exists.
- Do not show an inactive play control for music that cannot yet be played.
- Change the release to `released` and add its Spotify URL when it becomes
  available.

### Phase 3: multiple released singles

- Keep the newest or editorially selected release featured.
- Present the remaining releases as website-native cards.
- Reuse one player region: selecting another release replaces the current
  Spotify embed.
- Prefer a small grid for a short catalog; revisit navigation only after the
  collection becomes large enough to require it.

### Phase 4: discography playlist

- Create an artist-owned Spotify playlist with a durable name that is not tied
  to one campaign.
- Keep the newest release first unless the artist chooses a deliberate sequence.
- Add the playlist URL to site content and render one **Listen to all releases**
  embed.
- Maintain the playlist in Spotify. Its stable URL lets new additions appear on
  the website without a deployment.
- Keep custom cards focused on new or notable releases instead of duplicating
  every playlist item.

The playlist section should remain hidden until a playlist URL is configured.
Two tracks can form a playlist, but waiting for roughly three or four releases
will usually make it a more useful destination.

## Proposed content model

Keep release information in the repository while the catalog is small. A CMS
or Spotify API integration is not warranted unless release updates become
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
  preSaveUrl?: string;
  featured?: boolean;
};

type MusicContent = {
  releases: MusicRelease[];
  spotifyPlaylistUrl?: string;
};
```

The exact representation may be adapted to the existing `src/app/data.json`
content structure during implementation. Preserve these behaviors:

- `spotifyUrl` is optional for upcoming releases.
- `preSaveUrl` is optional and must not be presented as playback.
- `spotifyPlaylistUrl` is optional and controls whether the playlist section is
  rendered.
- `featured` is an editorial choice rather than an assumption based only on
  release date.

## Interaction and presentation requirements

- Use **Music** or **Releases** as the section name rather than naming the whole
  section after Spotify. This leaves room for Apple Music, YouTube Music,
  Bandcamp, or a platform-neutral listening page later.
- Use a visitor-initiated **Listen now** action. Do not autoplay music.
- Lazy-load the Spotify embed or create it after interaction.
- Keep release names, dates, descriptions, and actions outside the iframe so
  they remain accessible and discoverable before playback loads.
- Give every iframe a specific, human-readable `title`.
- Make the player responsive and preserve a usable fallback link to Spotify.
- Use artwork supplied or approved by the artist for website-native cards. If
  artwork or metadata is obtained from Spotify, follow Spotify's attribution
  and design requirements.
- Do not imitate Spotify controls or host Spotify audio directly.

## Analytics

Track website-owned actions rather than relying on events inside the Spotify
iframe:

- Opening the embedded player.
- Selecting a release.
- Following an **Open in Spotify** link.
- Following a pre-save or other listening-platform link.

Name analytics events by intent and include the release slug and destination as
properties. Do not block listening if analytics fails or is declined.

## Release maintenance checklist

### Before announcement

- Confirm which title, artwork, date, and supporting copy are public.
- Add an `upcoming` release entry.
- Add a pre-save or platform-neutral link only when it is active.
- Confirm that unreleased controls do not imply playback is available.

### On release day

- Change the status to `released`.
- Add and test the canonical Spotify track or album URL.
- Decide whether the new release should be featured.
- Add the release to the discography playlist when that playlist exists.
- Verify keyboard interaction, responsive layout, the fallback Spotify link,
  and analytics events.

### After release

- Confirm the playlist ordering in Spotify.
- Remove stale pre-save messaging.
- Check that only one embed loads or plays at a time.

## Spotify implementation notes

Prefer Spotify's official iframe embed for playback. The direct embed and the
Spotify iFrame API are documented at:

- [Spotify Embeds](https://developer.spotify.com/documentation/embeds)
- [Using the iFrame API](https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api)
- [Spotify design and branding guidelines](https://developer.spotify.com/documentation/design)

Do not introduce the Spotify Web API merely to render this small, curated
catalog. Reconsider it only if the site later needs automated discovery or
metadata synchronization that cannot be handled through the playlist embed and
repository content. The Web Playback SDK is also out of scope for this
promotional site because it adds user authentication, Premium-account, browser,
and policy constraints without improving the planned experience.
