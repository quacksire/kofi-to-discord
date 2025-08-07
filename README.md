# Ko-fi to Discord Webhook

A Cloudflare Worker that forwards Ko-fi donations to a Discord channel via a webhook.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/kofi-to-discord)

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

1. Clone the repository:
```bash
git clone https://github.com/your-username/kofi-to-discord.git
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
