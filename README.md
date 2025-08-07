# Ko-fi to Discord Webhook

A Cloudflare Worker that forwards Ko-fi donations to a Discord channel via a webhook.
[![wakatime](https://wakatime.com/badge/user/33a2bb04-aa22-4536-80a6-3014c35843e1/project/2fe572a7-55f4-405b-a573-65b6225f5428.svg)](https://wakatime.com/badge/user/33a2bb04-aa22-4536-80a6-3014c35843e1/project/2fe572a7-55f4-405b-a573-65b6225f5428)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/quacksire/kofi-to-discord)


## Features

- Verifies incoming requests from Ko-fi using a verification token.
- Sends donation details to a Discord channel using a webhook.
- Includes a button in the Discord message to view the donation on Ko-fi.

## Requirements

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- A Discord webhook URL.
- A Ko-fi verification token (found in the [Advanced Drop Down](https://ko-fi.com/manage/webhooks) of your Ko-fi page).

## Installation

You can deploy this worker directly to Cloudflare Workers using the button below:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/quacksire/kofi-to-discord)

### Manual Setup

1. Clone the repository:
```bash
git clone https://github.com/quacksire/kofi-to-discord
cd kofi-to-discord
```
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:
Copy `.dev.vars.example` to `.dev.vars`:
```bash
cp .dev.vars.example .dev.vars
````
Replace the placeholder values in `.dev.vars` with your actual `WEBHOOK` and `KOFISECRET`.
4Deploy the worker:
```dash
wrangler publish
```
