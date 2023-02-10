var fs = require('fs');
let regex = /([#0-9]\u20E3)|[\xA9\xAE\u203C\u2047-\u2049\u2122\u2139\u3030\u303D\u3297\u3299][\uFE00-\uFEFF]?|[\u2190-\u21FF][\uFE00-\uFEFF]?|[\u2300-\u23FF][\uFE00-\uFEFF]?|[\u2460-\u24FF][\uFE00-\uFEFF]?|[\u25A0-\u25FF][\uFE00-\uFEFF]?|[\u2600-\u27BF][\uFE00-\uFEFF]?|[\u2900-\u297F][\uFE00-\uFEFF]?|[\u2B00-\u2BF0][\uFE00-\uFEFF]?|(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDEFF])[\uFE00-\uFEFF]?/g;
var emojiStrip = require('emoji-strip')
const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate();

let languages = require("../data/languages.json").languages;
let apps = require("../data/games/metadata_template.json").apps;

let meta = async () => {
  for (var j = 0; j < apps.length; j++) {
    let app = apps[j];

    console.log(app.name);
    if(typeof app.name == "string"){
      let name = {};
      for (var i = 0; i < languages.length; i++) {
        let lang = languages[i];
        let [translation] = await translate.translate(app.name, { from: "en", to: lang.code == "en" ? "tr" : lang.code });
        console.log(translation);
        if(lang.code == "en"){
          translation = app.name;
        }
        name[lang.code] = translation;
      }
      apps[j].name = name;
    }

    console.log(app.tagline);
    if(typeof app.tagline == "string"){
      let tagline = {};
      for (var i = 0; i < languages.length; i++) {
        let lang = languages[i];
        let [translation] = await translate.translate(app.tagline, { from: "en", to: lang.code == "en" ? "tr" : lang.code });
        console.log(translation);
        if(lang.code == "en"){
          translation = app.tagline;
        }
        tagline[lang.code] = translation;
      }
      apps[j].tagline = tagline;
    }

    console.log(app.description);
    if(typeof app.description == "string"){
      let description = {};
      for (var i = 0; i < languages.length; i++) {
        let lang = languages[i];
        let [translation] = await translate.translate(app.description, { from: "en", to: lang.code == "en" ? "tr" : lang.code });
        console.log(translation);
        if(lang.code == "en"){
          translation = app.description;
        }
        description[lang.code] = translation;
      }
      apps[j].description = description;
    }
  }
  await fs.writeFileSync("./data/games/metadata.json", JSON.stringify({apps: apps}, null, 2), {encoding: "utf8"});
  console.log("All done");
}

meta();
