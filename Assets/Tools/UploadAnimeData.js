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
----subtitle
----dubEn
---episodeSummary == Might be able to handle through API request
---episodeImage
---episodeAirDate
----subtitle
----dubEn
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
    constructor(streamService, episode, title, link, airDubEn, airSubtitle){
        this.streamService = streamService
        this.episode = episode;
        this.title = title;
        this.link = link;
        this.airDate = new language(airDubEn, airSubtitle);
    }
}

class language{
    dubEn;        //DubEn version
    subtitle;       //Subtitle version
    constructor(dubEn, subtitle){
        this.dubEn = dubEn;
        this.subtitle = subtitle;
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
    <label for="crunchyRollAirDubEN{#}">Air date(DUB): </label>
        <input type="datetime-local" name="crunchyEpAirDubEN{#}"/>
    <label for="crunchyRollAirSubtitle{#}">Air date(SUB): </label>
        <input type="datetime-local" name="crunchyEpAirSubtitle{#}"/>
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

    let airDubENLabel = document.createElement('label');
    airDubENLabel.htmlFor = stream + "AirDubEN" + index;
    airDubENLabel.textContent = "Air date (DUB):";
    let airDubENInput = document.createElement('input');
    airDubENInput.name = stream + "AirDubEN" + index;
    airDubENInput.type = "datetime-local";
    episodeArea.appendChild(airDubENLabel);
    episodeArea.appendChild(airDubENInput);

    let airSubtitleLabel = document.createElement('label');
    airSubtitleLabel.htmlFor = stream + "AirSubtitle" + index;
    airSubtitleLabel.textContent = "Air date (SUB):";
    let airSubtitleInput = document.createElement('input');
    airSubtitleInput.name = stream + "AirSubtitle" + index;
    airSubtitleInput.type = "datetime-local";
    episodeArea.appendChild(airSubtitleLabel);
    episodeArea.appendChild(airSubtitleInput);

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
        let airDubEN = document.querySelector("[name='" + stream + "AirDubEN" + index + "']").value;
        let airSubtitle = document.querySelector("[name='" + stream + "AirSubtitle" + index + "']").value;
        episodes.push(new episode(stream, num, title, link, airDubEN, airSubtitle))
    }
    return episodes;
}
//Should write information to data, but cannot access data
function postSeries(series){
    console.log(JSON.stringify(series));
    //lack permissions for write to file...
}