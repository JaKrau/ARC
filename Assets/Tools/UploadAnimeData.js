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