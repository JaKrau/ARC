var testEpisode = new Episode();
testEpisode.series = "Mobile Suit Gundam: The Witch from Mercury";
testEpisode.seriesLink = "https://www.crunchyroll.com/series/G79H2307W/mobile-suit-gundam-the-witch-from-mercury";
testEpisode.number = 17;
testEpisode.title = "S1 E17 - Precious Things";
testEpisode.link = "https://www.crunchyroll.com/watch/G50UZ145M/precious-things";
testEpisode.preview = "https://www.crunchyroll.com/imgsrv/display/thumbnail/320x180/catalog/crunchyroll/1b0bc6f503e60741aaacdaba53202285.jpe";
testEpisode.release = "05/07/2023";

var episodeEl = document.getElementById("episodeLink");

var headerEl = document.createElement("h2");
headerEl.textContent = testEpisode.series;
episodeEl.appendChild(headerEl);

var episodeLinkEl = document.createElement("a");
var episodeTitleEl = document.createElement("h3");
episodeTitleEl.textContent = testEpisode.title;
episodeLinkEl.title = testEpisode.title;
episodeLinkEl.href = testEpisode.link;
episodeLinkEl.appendChild(episodeTitleEl);
episodeEl.appendChild(episodeLinkEl);

var episodePreviewImgEl = document.createElement("img");
episodePreviewImgEl.src = testEpisode.preview;
episodePreviewImgEl.alt = testEpisode.title;
episodeEl.appendChild(episodePreviewImgEl);

var episodeReleaseEl = document.createElement("p");
episodeReleaseEl.textContent = testEpisode.release;
episodeEl.appendChild(episodeReleaseEl);