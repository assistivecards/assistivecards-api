# assistivecards rest api

This is a documentation for the live assistivecards.com's rest API and asset endpoints. (Stored in aws s3, in a static way, served by cloudflare cdn)

## Status

Get the current API status of the endpoint.

```
GET https://api.assistivecards.com/status.json
Cross-origin: All
```
Expected output;
```JS
{
  "status": true,
  "hotlink": "none",
  "version": "1.4.0",
  "versionCode": 140
}
```

## Packs
Get a list of all the available packs and their attributions.

```
GET https://api.assistivecards.com/packs/[lang_code]/metadata.json
Cross-origin: All
```
Example pack object;
```JS
{
  "id": 5,
  "slug": "animals",
  "color": "#FFE7F4",
  "premium": 0,
  "locale": "Animals",
  "count": 53
}
```
The `premium` property decides if this pack is a premium one or not.

## Cards
Get all the cards in a pack.

```
GET https://api.assistivecards.com/packs/[lang_code]/[pack_slug].json
Cross-origin: All
```

Example card object;
```JS
{
  "slug":"park",
  "title":"Park",
  "phrases": [
    {
      "type":"🙋",
      "phrase":"I want to go to park."
    },
    {
      "type":"☝️",
      "phrase":"Can you take me to park?"
    },
    {
      "type":"💡",
      "phrase":"I can play in the park."
    }
  ]
}
```
The type property for the phrase object signifies that phrase's context.

## Activities
Get all the activities with language.

```
GET https://api.assistivecards.com/activities/[lang_code]/metadata.json
Cross-origin: All
```

Example activity object;
```JS
{
  "slug": "walking",
  "title": "Walking",
  "search": "walking,running"
}
```
The search property defines activities' context.


## Languages
Get a list of all the languages that assistivecards json data is available and their details.

```
GET https://api.assistivecards.com/languages.json
Cross-origin: All
```

Example langauge object;
```JS
{
  "code": "en",
  "locale": ["en-US", "en-GB", "en-AU", "en-CA", "en-CB", "en-IN", "en-NZ"],
  "support": ["ios", "android"],
  "title": "English",
  "native": "English",
  "rightToLeft": false,
  "readproof": true
}
```
The `support` property indicates which platforms this language is safe to use, in terms of TTS and Voice recognition capabilities.

## Pack Images

1) Serve a spesific pack's image (256x256).

```
GET https://api.assistivecards.com/cards/icon/[pack_slug].png
Hotlink protection: none
```

Example;
https://api.assistivecards.com/cards/icon/animals.png

2) Serve a spesific pack's image (512x512).

```
GET https://api.assistivecards.com/cards/icon/[pack_slug]@2x.png
Hotlink protection: none
```

Example;
https://api.assistivecards.com/cards/icon/animals@2x.png

3) Serve a spesific pack's image (in SVG format).

```
GET https://api.assistivecards.com/cards/icon/[pack_slug].svg
Hotlink protection: none
```

Example;
https://api.assistivecards.com/cards/icon/animals.svg

## Card Images

1) Serve a spesific card's image (256x256).

```
GET https://api.assistivecards.com/cards/[pack_slug]/[card_slug].png
Hotlink protection: none
```

Example;
https://api.assistivecards.com/cards/animals/bee.png

2) Serve a spesific card's image (512x512).

```
GET https://api.assistivecards.com/cards/[pack_slug]/[card_slug]@2x.png
Hotlink protection: none
```

Example;
https://api.assistivecards.com/cards/animals/bee@2x.png

3) Serve a spesific card's image (in SVG format).

```
GET https://api.assistivecards.com/cards/[pack_slug]/[card_slug].svg
Hotlink protection: none
```

Example;
https://api.assistivecards.com/cards/animals/bee.svg

## Avatar Images

1) Serve an avatar's image (256x256).

```
GET https://api.assistivecards.com/avatar/[boy|girl|misc][0..33].png
Hotlink protection: none
```

Example;
https://api.assistivecards.com/cards/avatar/boy01.png

2) Serve an avatar's image (512x512).

```
GET https://api.assistivecards.com/cards/avatarHD/[boy|girl|misc][0..33].png
Hotlink protection: none
```

Example;
https://api.assistivecards.com/cards/avatarHD/girl12.png

> Note that avatar types has boy 33, girl 27 and misc 29 assets at max.

## Activity Images

1) Serve a spesific activiy's image (1200x800).

```
GET https://api.assistivecards.com/activities/assets/[activity_slug].png
Hotlink protection: none
```

Example;
https://api.assistivecards.com/activities/assets/brushing-teeth.png

## Force Downloading the Assets

There might be applications where you need to force download an asset from the cdn;

1) Serve a spesific pack's image (256x256).

```
GET https://download.assistivecards.com/cards/icon/[pack_slug].[png|svg|json]
Hotlink protection: none
```

Using the same tailing url and "download" subdomain, the file will be served with a disposition header.

## Apps

Return all the apps published by AssistiveCards and metadata about them.

```
GET https://api.assistivecards.com/apps/metadata.json
Hotlink protection: none
```

Will return an array of objects that contain metadata about all apps.

## App Icons

Serve icon of an app by using it's slug.

```
GET https://api.assistivecards.com/apps/icon/[app_slug]@3x.png
Hotlink protection: none
```

Scales of @2x and @3x available. (don't use @1x for original size)

## Games

Return all the games published by AssistiveCards and metadata about them.

```
GET https://api.assistivecards.com/games/metadata.json
Hotlink protection: none
```

Will return an array of objects that contain metadata about all games.

## Games Icons

Serve icon of a game by using it's slug.

```
GET https://api.assistivecards.com/games/icon/[game_slug]@2x.png
Hotlink protection: none
```

Scales of @0.5x and @2x available. (don't use @1x for original size)
