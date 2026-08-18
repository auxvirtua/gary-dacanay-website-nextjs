# Gary Dacanay

Website for jazz vocalist and guitarist Gary Dacanay. The Living Poster design
presents Gary as a live artist for hire through a responsive, single-screen
shell with route-backed music, video, and photo experiences.

## Local development

This project uses Next.js, TypeScript, CSS Modules, and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Public copy, performance videos, booking-email content, releases, and external
platform links live in `src/app/data.json`. The production hero and
social-sharing artwork live in `public/images`; source candidates remain in
`public/images/artwork-candidates` for future reference.

The persistent shell is shared by `/`, `/music`, `/videos`, and `/photos`.
The poster background is only mounted on `/`; media routes replace the center
canvas while preserving the navigation, booking, newsletter, and platform
controls.

See [Music releases](docs/music-releases.md) for the planned staged rollout of
release cards, Spotify embeds, and an eventual discography playlist.

## Newsletter configuration

Mailchimp signup requires these environment variables:

```text
MAILCHIMP_API_KEY
MAILCHIMP_API_SERVER
MAILCHIMP_AUDIENCE_ID
```

When configuration is missing or Mailchimp rejects a request, the form reports
an inline error and does not show a false success state.

## Verification

```bash
pnpm lint
pnpm build
```
