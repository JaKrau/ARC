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
    constructor(streamService, episode, title, link, airEnglish, airJapanese){
        this.streamService = streamService
        this.episode = episode;
        this.title = title;
        this.link = link;
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
//Repeated document queries
var crunchyRollCheckEl = document.querySelector("[name='crunchyRoll']");
var hiDiveCheckEl = document.querySelector("[name='hiDive']");
var netflixCheckEl = document.querySelector("[name='netflix']");
var crunchyRollEpEl = document.querySelector("[name='crunchyRollEp']");
var hiDiveEpEl = document.querySelector("[name='hiDiveEp']");
var netflixEpEl = document.querySelector("[name='netflixEp']");

/* sample HTML
<div id="crunchyRollDiv0" class="crunchyRoll">...</div>
<div id="crunchyRollDiv2" class="crunchyRoll">...</div>
...
<div id="crunchyRollDiv{numberEpisodes}" class="crunchyRoll">...</div>
*/
function buildStreamForm(stream,numberEpisodes){
    let streamEl = document.getElementById(stream + "Stream");
    document.querySelectorAll('.' + stream).forEach(epList => epList.remove());
    for (let i = 0; i < numberEpisodes; i++){
        let episodeEl = buildEpisodeForm(stream, i);
        streamEl.appendChild(episodeEl);
    }
}
/* sample HTML
Crunchyroll Episodes
<div id="crunchyRollDiv{#}" class="crunchyRoll">
    <label for="crunchyRollNum{#}">Episode: </label>
        <input type="number" name="crunchyEpNum{#}"/>
    <label for="crunchyRollTitle{#}">Title: </label>
        <input type="text" name="crunchyEpTitle{#}"/>
    <label for="crunchyRollLink{#}">Stream Link: </label>
        <input type="url" name="crunchyEpLnkEN{#}"/>
    <label for="crunchyRollAirEN{#}">Air date(EN): </label>
        <input type="datetime-local" name="crunchyEpAirEN{#}"/>
    <label for="crunchyRollAirJP{#}">Air date(JP): </label>
        <input type="datetime-local" name="crunchyEpAirJP{#}"/>
</div>
*/
function buildEpisodeForm(stream, index){
    let episodeArea = document.createElement('div')
    episodeArea.id = stream + "Div" + index;
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

    let linkLabel = document.createElement('label');
    linkLabel.htmlFor = stream + "Link" + index;
    linkLabel.textContent = "Stream Link:";
    let linkInput = document.createElement('input');
    linkInput.name = stream + "Link" + index;
    linkInput.type = "url";
    episodeArea.appendChild(linkLabel);
    episodeArea.appendChild(linkInput);

    let airENLabel = document.createElement('label');
    airENLabel.htmlFor = stream + "AirEN" + index;
    airENLabel.textContent = "Air date (EN):";
    let airENInput = document.createElement('input');
    airENInput.name = stream + "AirEN" + index;
    airENInput.type = "datetime-local";
    episodeArea.appendChild(airENLabel);
    episodeArea.appendChild(airENInput);

    let airJPLabel = document.createElement('label');
    airJPLabel.htmlFor = stream + "AirJP" + index;
    airJPLabel.textContent = "Air date (JP):";
    let airJPInput = document.createElement('input');
    airJPInput.name = stream + "AirJP" + index;
    airJPInput.type = "datetime-local";
    episodeArea.appendChild(airJPLabel);
    episodeArea.appendChild(airJPInput);

    return episodeArea;
}

//Event listeners to change how many episodes there are
crunchyRollCheckEl.addEventListener('change', crunchyRollBuildEpisodesEvent);
crunchyRollEpEl.addEventListener('change', crunchyRollBuildEpisodesEvent);
function crunchyRollBuildEpisodesEvent(){
    if(crunchyRollCheckEl.checked === true){
        let numEpisodes = crunchyRollEpEl.value;
        buildStreamForm("crunchyRoll",numEpisodes);
    }
    else{
        buildStreamForm("crunchyRoll", 0);
    }
}
hiDiveCheckEl.addEventListener('change', hiDiveBuildEpisodesEvent);
hiDiveEpEl.addEventListener('change', hiDiveBuildEpisodesEvent);
function hiDiveBuildEpisodesEvent(){
    if(hiDiveCheckEl.checked === true){
        let numEpisodes = hiDiveEpEl.value;
        buildStreamForm("hiDive",numEpisodes);
    }
    else{
        buildStreamForm("hiDive", 0);
    }
}
netflixCheckEl.addEventListener('change', netflixBuildEpisodesEvent);
netflixEpEl.addEventListener('change', netflixBuildEpisodesEvent);
function netflixBuildEpisodesEvent(){
    if(netflixCheckEl.checked === true){
        let numEpisodes = netflixEpEl.value;
        buildStreamForm("netflix",numEpisodes);
    }
    else{
        buildStreamForm("netflix", 0);
    }
}

//Form Event submit sequence
document.getElementById("series").addEventListener("submit", function(event){
    event.preventDefault();
    let mID = document.querySelector("[name='mID']").value;
    let title = document.querySelector("[name='seriesTitle']").value;
    let link = document.querySelector("[name='seriesLink']").value;
    let imageLink = document.querySelector("[name='seriesImageLink']").value;
    let currentSeason = document.querySelector("[name='currentSeason']").value;
    let broadcastDay = document.querySelector("[name='broadcastDay']").value;
    let episodes = new Array();
    if(crunchyRollCheckEl.checked === true){
        episodes.push(fillOutEpisodes("crunchyRoll"))
    }
    if(hiDiveCheckEl.checked === true){
        episodes.push(fillOutEpisodes("hiDive"))
    }
    if(netflixCheckEl.checked === true){
        episodes.push(fillOutEpisodes("netflix"))
    }
    let series = new animeSeries(mID, title, link, imageLink, currentSeason, broadcastDay, episodes);
    postSeries(series);
});
//Fill in episodes array data
function fillOutEpisodes(stream){
    let episodes = new Array();
    let numEpisodes = document.querySelector("[name='" + stream + "Ep']").value;
    for(let index = 0; index < numEpisodes; index++){
        let num = document.querySelector("[name='" + stream + "Num" + index + "']").value;
        let title = document.querySelector("[name='" + stream + "Title" + index + "']").value;
        let link = document.querySelector("[name='" + stream + "Link" + index + "']").value;
        let airEN = document.querySelector("[name='" + stream + "AirEN" + index + "']").value;
        let airJP = document.querySelector("[name='" + stream + "AirJP" + index + "']").value;
        episodes.push(new episode(stream, num, title, link, airEN, airJP))
    }
    return episodes;
}
//Should write information to data, but cannot access data
function postSeries(series){
    console.log(JSON.stringify(series));
    //lack permissions for write to file...
}