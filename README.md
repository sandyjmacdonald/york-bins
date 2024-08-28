This simple Cloudflare Workers app provides an API endpoint that can be given a UPRN (Unique Property Reference Number, find yours [here](https://www.findmyaddress.co.uk/search)) for the City of York Council area and it will return a JSON response as below, with which collection (rubbish/recyling) is next and the date on which it is due to be collected:

```
curl https://york-bins.sandyjmacdonald.workers.dev/next-bin/your-uprn-here

{
  "collection": "recycling",
  "date": "2024-08-30T00:00:00.000Z"
}
```

This is really useful when used as part of an iOS shortcut to either simply query the API and return the collection/date, or as an automated shortcut that runs every Monday and then sets an iOS Reminder for the night before reminding you to put the appropriate bins out for collection.

## How to deploy locally, or to Cloudflare Workers

1. Set up a Cloudflare account: [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Install node.js/npm
3. `git clone https://github.com/sandyjmacdonald/york-bins`
4. `cd york-bins`
5. `npm install`

To test locally:

`bun run dev`

To deploy your own version to Cloudflare Workers:

`bun run deploy`