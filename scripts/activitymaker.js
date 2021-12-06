var fs = require('fs');
let regex = /([#0-9]\u20E3)|[\xA9\xAE\u203C\u2047-\u2049\u2122\u2139\u3030\u303D\u3297\u3299][\uFE00-\uFEFF]?|[\u2190-\u21FF][\uFE00-\uFEFF]?|[\u2300-\u23FF][\uFE00-\uFEFF]?|[\u2460-\u24FF][\uFE00-\uFEFF]?|[\u25A0-\u25FF][\uFE00-\uFEFF]?|[\u2600-\u27BF][\uFE00-\uFEFF]?|[\u2900-\u297F][\uFE00-\uFEFF]?|[\u2B00-\u2BF0][\uFE00-\uFEFF]?|(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDEFF])[\uFE00-\uFEFF]?/g;
var emojiStrip = require('emoji-strip')
var fetch = require('node-fetch');

const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate();


let languages = require("../data/languages.json").languages;
let activities = require("../data/activities/template.json").activities;

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

let existCheck = false;
let filename = "metadata";

async function cardTranslation(lang){
  if(lang == "en"){
    return activities;
  }else{
    let translatedActivities = JSON.parse(JSON.stringify(activities));

    for (var i = 0; i < translatedActivities.length; i++) {
      translatedActivities[i].title = (await translate.translate(translatedActivities[i].title, { from: "en", to: lang }))[0];
      translatedActivities[i].search = (await translate.translate(translatedActivities[i].search, { from: "en", to: lang }))[0].replace(/, /g, ",");
    }
    return translatedActivities;
  }

}

function savePack(index){
  let language = languages[index].code;
  let exists = fs.existsSync("../data/activities/"+language+"/"+filename+".json");
  if(exists && existCheck){
    console.log("Already exists", language);
    index++;
    if(index != languages.languages.length){
      savePack(index);
    }else{
      console.log("ALL DONE!")
    }
  }else{
    cardTranslation(language).then(res => {
      let cardData = res;
      fs.mkdirSync("./data/activities/"+language+"/", {recursive: true});
      fs.writeFileSync("./data/activities/"+language+"/"+filename+".json", JSON.stringify(cardData), {encoding: "utf8"});
      console.log("Saved", language+"/"+filename);

      index++;
      if(index != languages.length){
        sleep(5000);
        savePack(index);
      }else{
        console.log("ALL DONE!")
      }
    });
  }
}

savePack(0);
