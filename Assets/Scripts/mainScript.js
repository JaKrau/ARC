//Data Object to hold information related to an episode
class Episode{
    series = "";                //String name of series
    mID = 0;                    //Number ID of anime on myAnimeList
    seriesLink = "";            //String http link to series
    seriesImage = "";           //String http link to thumbnail if it exists
    stream = "";                //String name of Streaming Service
    number = 0;                 //Number episode number
    title = "";                 //String title of episode
    link = "";                  //String http link to episode
    lang = "";                  //String for Dub/Sub selection
    constructor(series, mID, seriesLink, seriesImage, stream, number, title, link, lang){
      this.series = series;
      this.mID = mID;
      this.seriesLink = seriesLink;
      this.seriesImage = seriesImage;
      this.stream = stream;
      this.number = number;
      this.title = title;
      this.link = link;
      this.lang = lang;
    }
}
//Already predetermine anime series to use based on research
//Too many anime pulled to be under fetch limits

/*
Working variables
*/
var days = new Array();           //Holds dayjs() objects
var favorites = new Array();      //Holds episode data of favorite selections
var episodes = new Array();       //Holds episode data for what was already released
var keyFavorites = "favorites";   //Key value for local storage
var numberDays = 6;               //Number of days to include in the calendar
var jikanReady = true;            //Determines if jikan API is ready to use
var jikanVal;                     //Holds the most recent value to query jikan API

//Initialize code
makeDays();       //Create the dayjs() objects
getFavorites();   //Check local storage for favorites
parseData();      //Go through the AnimeInfo.js data object and get information needed
displayList();    //Display a list of episodes aired each day
displayWaifu();   //Get a Waifu image to use as a background

function makeDays(){
  for(let i=0; i < numberDays; i++){
    days.push(dayjs().subtract(i, 'day'));
    episodes.push(new Array());
  }
}

/*
Local Storage / Favorites Bar functions
*/
function getFavorites(){
  var storedFavorites = JSON.parse(localStorage.getItem(keyFavorites));

  if (storedFavorites !== null) {
    favorites = storedFavorites;
  }
  else{
    favorites = new Array();
  }
  displayFavorites();
}
function clearFavorites(){
  localStorage.removeItem(keyFavorites);
  getFavorites();
}
function addFavorite(name){
  if(checkAlreadyFavorite(name)){
    return;
  }
  if(favorites.length > 10){
    favorites.splice(0, 1);
  }
  favorites.push(name);
  localStorage.setItem(keyFavorites, JSON.stringify(favorites));
  displayFavorites();
}
function checkAlreadyFavorite(name){
  for(fav of favorites){
    if(fav.mID == name.mID){
      return true;
    }
  }
  return false;
}
function removeFavorite(key){
  if(favorites.length > 1){
    favorites.splice(key, 1);
    localStorage.setItem(keyFavorites, JSON.stringify(favorites));
  }
  else{
    clearFavorites();
  }
  displayFavorites();
}

/*
Add favorites to favorites bar
<h2>Favorites</h2>
<article class="favorite" id="fav0"></article>
<article class="favorite" id="fav1"></article>
<article class="favorite" id="fav2"></article>
<article class="favorite" id="fav3"></article>
<button>Clear favorites</button>
...
*/
function displayFavorites(){
  let favoriteBarEl = document.getElementById("favoritesBar");
  favoriteBarEl.innerHTML = '';
  if(favorites.length <= 0){
    return;
  }
  let h2El = document.createElement('h2');
  h2El.className = "title is-4";
  h2El.textContent = "Favorites";
  favoriteBarEl.appendChild(h2El);

  for(let i=0; i<favorites.length; i++){
    favoriteBarEl.appendChild(displayFavoriteSeries(i));
  }
  let clearButtonEl = document.createElement('button');
  clearButtonEl.className = "button is-small is-responsive";
  clearButtonEl.textContent = "Clear";
  clearButtonEl.addEventListener('click', clearFavorites);
  favoriteBarEl.appendChild(clearButtonEl);
}

function displayFavoriteSeries(index){
  let episodeObj = favorites[index];
  let articleEl = document.createElement('article');
  articleEl.className = "favorite box content is-small";
  articleEl.id = "fav" + index;

  let aEl1 = document.createElement('a');
  aEl1.href = episodeObj.seriesLink;
  let h3El = document.createElement('h3');
  h3El.textContent = episodeObj.series;
  aEl1.appendChild(h3El);

  let aEl2 = document.createElement('a');
  aEl2.href = episodeObj.link;
  let h4El = document.createElement('h4');
  h4El.textContent = "Ep." + episodeObj.number + " " + episodeObj.title;
  let pEl = document.createElement('p');
  let stream = ""
  switch(episodeObj.stream){
    case "crunchyRoll":
      stream = "crunchyroll ";
      break;
    case "hiDive":
      stream = "HiDive ";
      break;
    case "netflix":
      stream = "Netflix ";
  }
  pEl.textContent = stream + episodeObj.lang;
  aEl2.appendChild(h4El);
  aEl2.appendChild(pEl);

  let removeButtonEl = document.createElement('button');
  removeButtonEl.className = "button is-small is-responsive";
  removeButtonEl.textContent = "Remove";
  removeButtonEl.addEventListener('click', function(event){
    event.preventDefault();
    removeFavorite(index);
  });

  articleEl.appendChild(aEl1);
  articleEl.appendChild(aEl2);
  articleEl.appendChild(removeButtonEl);
  return articleEl;
}

/*
Episodes View functions
*/
//Calls a function for each day
function displayList(){
  let mainEl = document.getElementById('episodeList');
  mainEl.innerHTML = '';
  for(let day=0; day<numberDays; day++){
    mainEl.appendChild(displayDay(day));
  }
}

//Calls a function to add an episode and add it to the HTML Dom for that day
/*
--Section defined in HTML code
<section class="day" id="day-{day}">
    --Call displayDay(day, key) to get Dom Element.
    <article class="episode"></article>
    <article class="episode"></article>
    <article class="episode"></article>
    <article class="episode"></article>
    <article class="episode"></article>
</section>
*/
function displayDay(day){
  let dayEl = document.createElement('section')
  dayEl.className = "day column";
  dayEl.id = "day-" + day;

  let date = "";
  switch(day){
    case 0:
      date += "Today,\n"
      break;
    case 1:
      date += "Yesterday,\n"
      break;
    default:
      date += day + " days ago,\n"
      break
  }
  date += days[day].format('MMM D, YYYY');

  let h2El = document.createElement('h2');
  h2El.className = "title is-4";
  h2El.textContent = date;
  dayEl.appendChild(h2El);

  for(let key = 0; key < episodes[day].length; key++){
    dayEl.appendChild(displayEpisode(day, key));
  }
  return dayEl
}
//Creates Dom elements, and adds information from episodes[day][key] returns Dom Element Object for an episode
/*
<article class="episode" id="episodes[day][key]">
    <a href=episodes[day][key].seriesLink>
        <h3>episodes[day][key].series</h3>
    </a>
    <a href=episodes[day][key].link>
        <h4>"Ep." + episodes[day][key].number + " " + episodes[day][key].title</h4>
        <p class='stylizedBracketBorder'>[DUB]</p>
        *Removed add to hover window <img src=episodes[day][key].preview />
    </a>
    <p class='stylizedBracketBorder'>Favorite</p>
    pEl2.addEventListener('click', function(event){
        addFavorite(episodes[day][key].series);
    });
</article>
*/
function displayEpisode(day, key){
  let articleEl = document.createElement('article');
  articleEl.className = "episode box content is-small";
  articleEl.id = "episodes[" + day + "][" + key + "]";
  
  let linkEl1 = document.createElement('a');
  linkEl1.href = episodes[day][key].seriesLink;
  let h3El = document.createElement('h3');  
  h3El.textContent = episodes[day][key].series;
  linkEl1.appendChild(h3El);
  
  let linkEl2 = document.createElement('a');
  linkEl2.href = episodes[day][key].link;
  let h4El = document.createElement('h4');
  h4El.textContent = "Ep." + episodes[day][key].number + " " + episodes[day][key].title;
  let pEl = document.createElement('p');
  let stream = ""
  switch(episodes[day][key].stream){
    case "crunchyRoll":
      stream = "crunchyroll ";
      break;
    case "hiDive":
      stream = "HiDive ";
      break;
    case "netflix":
      stream = "Netflix ";
  }
  pEl.textContent = stream + episodes[day][key].lang;
  linkEl2.appendChild(h4El);
  linkEl2.appendChild(pEl);

  let favoriteButtonEl = document.createElement('button');
  favoriteButtonEl.className = "button is-small is-responsive";
  favoriteButtonEl.textContent = "Favorite";
  favoriteButtonEl.addEventListener('click', function(event){
    event.preventDefault();
    addFavorite(episodes[day][key]);
  });

  articleEl.appendChild(linkEl1);
  articleEl.appendChild(linkEl2);
  articleEl.appendChild(favoriteButtonEl);

  articleEl.addEventListener('mouseenter', function(event){
    event.preventDefault();
    let posX = articleEl.posX + 100;
    let posY = articleEl.posY - 100;
    let hoverInfoEl = document.getElementById("hoverInfo");
    let hoverImageEl = document.getElementById("hoverImage");
    let hoverTitleEl = document.getElementById("hoverTitle");
    
    hoverImageEl.src = episodes[day][key].seriesImage;
    hoverTitleEl.textContent = episodes[day][key].series;
    getSummary(episodes[day][key].mID);
    hoverInfoEl.style.display = "block";
    hoverInfoEl.style.left = posX + "px";
    hoverInfoEl.style.top = posY + "px";
  });
  articleEl.addEventListener('mouseleave', function(event){
    event.preventDefault();
    let hoverInfoEl = document.getElementById("hoverInfo");
    hoverInfoEl.style.display = "none";
  });

  return articleEl;  
}

//Reads the data set for each day
function parseData(){
  for(let day = 0; day < numberDays; day++){
    evaluateDay(day);
  }
}
//See if an episode was aired on a day, then adds it to the episodes[day] array
function evaluateDay(day){
  let dayEval = days[day].format('YYYY-MM-DD');
  for(let i = 0; i < animeData.length; i++){
    for(let j = 0; j < animeData[i].length; j++){
      for(let k = 0; k < animeData[i][j].episodes.length; k++){
        for(let l = 0; l < animeData[i][j].episodes[k].length; l++){
          if(animeData[i][j].episodes[k][l].airDate.dubEn.split('T')[0] == dayEval){
            addEpisode(day, animeData[i][j], k, l, "DUB");
          }
          if(animeData[i][j].episodes[k][l].airDate.subtitle.split('T')[0] == dayEval){
            addEpisode(day, animeData[i][j], k, l, "SUB");
          }
        }
      }
    }
  }
}
//Creates and episode object
function addEpisode(day, episodeData, serviceIndex, episodeIndex, episodeLang){
  let series = episodeData.title;
  let mID = episodeData.mID;
  let seriesLink = episodeData.link;
  let seriesImage = episodeData.imageLink;
  let stream = episodeData.episodes[serviceIndex][episodeIndex].streamService;
  let number = episodeData.episodes[serviceIndex][episodeIndex].episode;
  let title = episodeData.episodes[serviceIndex][episodeIndex].title;
  let link = episodeData.episodes[serviceIndex][episodeIndex].link;
  let lang = episodeLang;
  episodes[day].push(new Episode(series, mID, seriesLink, seriesImage, stream, number, title, link, lang));
}

//Generate Summary from fetch jikan
async function getSummary(id){
  jikanVal = id;
  if(jikanReady){
    jikanReady = false;
    let fullData = await fetchCall("https://api.jikan.moe/v4/anime/" + id + "/full");
    let hoverSummaryEl = document.getElementById("hoverSummary");
    hoverSummaryEl.textContent = fullData.data.synopsis;
    jikanVal = '';
    setTimeout(recallSummary, 1000);
  }
}
//Timeout function in case too many requests made to jikan
function recallSummary(){
  jikanReady = true;
  if(jikanVal != ''){
    getSummary(jikanVal);
  }
}

// Waifu generator API https://waifu.pics/docs
async function getWaifu(){
  let waifu = await fetchCall("https://api.waifu.pics/sfw/waifu");
  return waifu.url;
}
async function displayWaifu(){
  let waifuURL = await getWaifu();
  let backdropImg = document.getElementById("backdrop")
  backdropImg.src = waifuURL;
}

//Helper Function to run fetch request
async function fetchCall(address){
  let response = await fetch(address);
  let data = await response.json();
  return data;
}