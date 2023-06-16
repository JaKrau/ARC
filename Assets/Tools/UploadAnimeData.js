/*
DataStructure
-series
--mid (animelist ID number)
--seriesName
--seriesLink
--seriesSummary == Handled by main code API call to Jikan API
--seriesImage
--season
--broadcastDay
--Episodes[]
---episodeNumber
---episodeTitle
---episodeLink[] == By Streaming Service
----japanese
----english
---episodeSummary == Might be able to handle through API request
---episodeImage
---episodeAirDate
----japanese
----english
*/

class animeSeries{
    mID;            //integer myanimelist ID number 
    title;          //string series title
    link;           //string link to series on myanimelist
    imageLink;      //string link to series thumbnail
    currentSeason;  //string current season
    broadcastDay;   //string broadcasting day
    episodes;       //array of array per streaming service handle episode creation before submit
    constructor(mID, title, link, imageLink, currentSeason, broadcastDay, episodes){
        this.mID = mID;
        this.title = title;
        this.link = link;
        this.imageLink = imageLink;
        this.currentSeason = currentSeason;
        this.broadcastDay = broadcastDay;
        this.episodes = episodes;
    }
}

class episode{
    streamService;  //string streaming service hosting
    episode;        //integer
    title;          //string episode title
    link;           //language class links to different episodes
    imageLink;      //string link to episode thumbnail
    airDate;        //language class air dates by version
    constructor(streamService, episode, title, linkEnglish, linkJapanese, imageLink, airEnglish, airJapanese){
        this.streamService = streamService
        this.episode = episode;
        this.title = title;
        this.link = new language(linkEnglish, linkJapanese);
        this.imageLink = imageLink;
        this.airDate = new language(airEnglish, airJapanese);
    }
}

class language{
    english;        //English version
    japanese;       //Japanese version
    constructor(english, japanese){
        this.english = english;
        this.japanese = japanese;
    }
}


/* sample HTML
Crunchyroll Episodes
                <label for="crunchyEpNum{#}">Episode: </label>
                    <input type="number" name="crunchyEpNum{#}"/>
                <label for="crunchyEpTitle{#}">Title: </label>
                    <input type="text" name="crunchyEpTitle{#}"/>
                <label for="crunchyEpLnkEN{#}">Link(EN): </label>
                    <input type="url" name="crunchyEpLnkEN{#}"/>
                <label for="crunchyEpLnkJP{#}">Link(JP): </label>
                    <input type="url" name="crunchyEpLnkJP{#}"/>
                <label for="crunchyEpLnkImg{#}">Thumbnail Link: </label>
                    <input type="url" name="crunchyEpLnkImg{#}"/>
                <label for="crunchyEpAirEN{#}">Air date(EN): </label>
                    <input type="date" name="crunchyEpAirEN{#}"/>
                <label for="crunchyEpAirJP{#}">Air date(JP): </label>
                    <input type="date" name="crunchyEpAirJP{#}"/>
*/
function buildEpisodeForm(stream, index){
    let episodeArea = document.createElement('div')
    episodeArea.id = stream + "EP" + index;
    episodeArea.className = stream;
    let epLabel = document.createElement('label');
    epLabel.htmlFor = stream + "Num" + index;
    epLabel.textContent = "Episode Number:";
    let epInput = document.createElement('input');
    epInput.name = stream + "Num" + index;
    epInput.type = "number";
    episodeArea.appendChild(epLabel);
    episodeArea.appendChild(epInput);

    let titleLabel = document.createElement('label');
    titleLabel.htmlFor = stream + "Title" + index;
    titleLabel.textContent = "Title:"
    let titleInput = document.createElement('input');
    titleInput.name = stream + "Title" + index;
    titleInput.type = "text";
    episodeArea.appendChild(titleLabel);
    episodeArea.appendChild(titleInput);

    let lnkENLabel = document.createElement('label');
    lnkENLabel.htmlFor = stream + "LnkEN" + index;
    lnkENLabel.textContent = "Stream Link(EN):";
    let lnkENInput = document.createElement('input');
    lnkENInput.name = stream + "LnkEN" + index;
    lnkENInput.type = "url";
    episodeArea.appendChild(lnkENLabel);
    episodeArea.appendChild(lnkENInput);

    let lnkJPLabel = document.createElement('label');
    lnkJPLabel.htmlFor = stream + "LnkJP" + index;
    lnkJPLabel.textContent = "Stream Link(JP):";
    let lnkJPInput = document.createElement('input');
    lnkJPInput.name = stream + "LnkJP" + index;
    lnkJPInput.type = "url";
    episodeArea.appendChild(lnkJPLabel);
    episodeArea.appendChild(lnkJPInput);

    let lnkImgLabel = document.createElement('label');
    lnkImgLabel.htmlFor = stream + "LnkImg" + index;
    lnkImgLabel.textContent = "Thumbnail Link:";
    let lnkImgInput = document.createElement('input');
    lnkImgInput.name = stream + "LnkImg" + index;
    lnkImgInput.type = "url";
    episodeArea.appendChild(lnkImgLabel);
    episodeArea.appendChild(lnkImgInput);

    let airENLabel = document.createElement('label');
    airENLabel.htmlFor = stream + "AirEN" + index;
    airENLabel.textContent = "Air date (EN):";
    let airENInput = document.createElement('input');
    airENInput.name = stream + "AirEN" + index;
    airENInput.type = "date";
    episodeArea.appendChild(airENLabel);
    episodeArea.appendChild(airENInput);

    let airJPLabel = document.createElement('label');
    airJPLabel.htmlFor = stream + "AirJP" + index;
    airJPLabel.textContent = "Air date (JP):";
    let airJPInput = document.createElement('input');
    airJPInput.name = stream + "AirJP" + index;
    airJPInput.type = "date";
    episodeArea.appendChild(airJPLabel);
    episodeArea.appendChild(airJPInput);

    return episodeArea;
}

function buildStreamForm(stream,numberEpisodes){
    let streamEl = document.getElementById(stream + "Stream");
    document.querySelectorAll('.' + stream).forEach(epList => epList.remove());
    for (let i = 0; i < numberEpisodes; i++){
        let episodeEl = buildEpisodeForm(stream, i);
        streamEl.appendChild(episodeEl);
    }
}

function fillOutEpisodes(stream){
    let episodes = new Array();
    let numEpisodes = document.querySelector("[name='" + stream + "Ep']").value;
    for(let index = 0; index < numEpisodes; index++){
        let num = document.querySelector("[name='" + stream + "Num" + index + "']");
        let title = document.querySelector("[name='" + stream + "Title" + index + "']");
        let linkEN = document.querySelector("[name='" + stream + "LnkEN" + index + "']");
        let linkJP = document.querySelector("[name='" + stream + "LnkJP" + index + "']");
        let imageLink;
        let airEN = document.querySelector("[name='" + stream + "AirEN" + index + "']");
        let airJP = document.querySelector("[name='" + stream + "AirJP" + index + "']");
        episodes.push(new episode(stream, num, title, linkEN, linkJP, imageLink, airEN, airJP))
    }
    return episodes;
}
async function postSeries(series){
    try{
        const response = await fetch("../Assets/Data/AnimeSeries.data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(series),
        });

        const result = await response.json();
        console.log("Success: ", result);
    }
    catch(error){
        console.log("Error", error);
    }
}

var crunchyRollCheckEl = document.querySelector("[name='crunchyRoll']");
var hiDiveCheckEl = document.querySelector("[name='hiDive']");
var netflixCheckEl = document.querySelector("[name='netflix']");
var crunchyRollEpEl = document.querySelector("[name='crunchyRollEp']");
var hiDiveEpEl = document.querySelector("[name='hiDiveEp']");
var netflixEpEl = document.querySelector("[name='netflixEp']");

crunchyRollCheckEl.addEventListener('change', function(){
    let numEpisodes = crunchyRollEpEl.value;
    buildStreamForm("crunchyRoll",numEpisodes);
});
hiDiveCheckEl.addEventListener('change', function(){
    let numEpisodes = hiDiveEpEl.value;
    buildStreamForm("hiDive",numEpisodes);
});
netflixCheckEl.addEventListener('change', function(){
    let numEpisodes = netflixEpEl.value;
    buildStreamForm("netflix",numEpisodes);
});
crunchyRollEpEl.addEventListener('change', function(){
    if(crunchyRollCheckEl.checked === true){
        let numEpisodes = crunchyRollEpEl.value;
        buildStreamForm("crunchyRoll",numEpisodes);
    }
});
hiDiveEpEl.addEventListener('change', function(){
    if(hiDiveCheckEl.checked === true){
        let numEpisodes = hiDiveEpEl.value;
        buildStreamForm("hiDive",numEpisodes);
    }
});
netflixEpEl.addEventListener('change', function(){
    if(netflixCheckEl.checked === true){
        let numEpisodes = netflixEpEl.value;
        buildStreamForm("netflix",numEpisodes);
    }
});

document.getElementById("series").addEventListener("submit", function(event){
    event.preventDefault();
    let mID = document.querySelector("[name='mID']").value;
    let title = document.querySelector("[name='seriesTitle']").value;
    let link = document.querySelector("[name='seriesLink']").value;
    let imageLink = document.querySelector("[name='seriesImageLink']").value;
    let currentSeason = document.querySelector("[name='currentSeason']").value;
    let broadcastDay = document.querySelector("[name='broadcastDay']").value;
    let episodes = new Array();
    if(document.querySelector("[name='crunchyRoll']").checked === true){
        episodes.push(fillOutEpisodes("crunchyRoll"))
    }
    if(document.querySelector("[name='hiDive']").checked === true){
        episodes.push(fillOutEpisodes("hiDive"))
    }
    if(document.querySelector("[name='netflix']").checked === true){
        episodes.push(fillOutEpisodes("netflix"))
    }
    let series = new animeSeries(mID, title, link, imageLink, currentSeason, broadcastDay, episodes);
    postSeries(series);
});