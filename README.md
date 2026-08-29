# Gary Dacanay

Single-page website for jazz vocalist and guitarist Gary Dacanay. The July 2026
design presents Gary as a live artist for hire through a responsive,
poster-inspired experience.

## Local development

This project uses Next.js, TypeScript, CSS Modules, and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Public copy, performance videos, booking-email content, and external social
links live in `src/app/data.json`. Spotify and Apple Music URLs are retained
there as optional content, but are intentionally not rendered until Gary
approves their inclusion. The production hero and social-sharing artwork live
in `public/images`; the two source candidates remain in
`public/images/artwork-candidates` for future reference.

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
