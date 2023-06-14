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
buildEpisodeForm(stream, index){
    let episodeArea = document.createElement('div')
    episodeArea.id = stream + "EP" + index;
    let epLabel = document.createElement('label');
    epLabel.for = stream + "Num" + index;
    let epInput = document.createElement('input');
    epInput.name = stream + "Num" + index;
    epInput.type = "number";
    episodeArea.appendChild();
    episodeArea.appendChild();

    let titleLabel = document.createElement('label');
    titleLabel.for = stream + "Title" + index;
    let titleInput = document.createElement('input');
    titleInput.name = stream + "Title" + index;
    titleInput.type = "text";
    episodeArea.appendChild();
    episodeArea.appendChild();

    let lnkENLabel = document.createElement('label');
    lnkENLabel.for = stream + "LnkEN" + index;
    let lnkENInput = document.createElement('input');
    lnkENInput.name = stream + "LnkEN" + index;
    lnkENInput.type = "url";
    episodeArea.appendChild();
    episodeArea.appendChild();

    let lnkJPLabel = document.createElement('label');
    lnkJPLabel.for = stream + "LnkJP" + index;
    let lnkJPInput = document.createElement('input');
    lnkJPInput.name = stream + "LnkJP" + index;
    lnkJPInput.type = "url";
    episodeArea.appendChild();
    episodeArea.appendChild();

    let lnkImgLabel = document.createElement('label');
    lnkImgLabel.for = stream + "LnkImg" + index;
    let lnkImgInput = document.createElement('input');
    lnkImgInput.name = stream + "LnkImg" + index;
    lnkImgInput.type = "url";

    let airENLabel = document.createElement('label');
    airENLabel.for = stream + "AirEN" + index;
    let airENInput = document.createElement('input');
    airENInput.name = stream + "AirEN" + index;
    airENInput.type = "date";

    let airJPLabel = document.createElement('label');
    airJPLabel.for = stream + "AirJP" + index;
    let airJPInput = document.createElement('input');
    airJPInput.name = stream + "AirJP" + index;
    airJPInput.type = "date";
    return episodeArea;
}