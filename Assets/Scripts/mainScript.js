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
var days = new Array();
var favorites = new Array();
var episodes = new Array();
var keyFavorites = "favorites";
var numberDays = 6;
/*
var listItem;
var itemName;
var clearListButton = document.getElementById("clearListButton");
var buttonContainerEl = document.querySelector(".buttonContainer")
buttonContainerEl.addEventListener("click", function() {
  clearFavorite();
// resets the clear list button to be invisible again once list is clear
  clearListButton.style.display = 'none';
});
*/

makeDays();
getFavorites();
parseData();
displayList();

function makeDays(){
  for(let i=0; i < numberDays; i++){
    days.push(dayjs().subtract(i, 'day'));
    episodes.push(new Array());
  }
}
/*
//Add a series to favorites bar
function meLikey() {
  var favList = document.querySelector("#favList");
  var favItem = document.createElement('li');
  favItem.textContent = itemName;

  // creates removeBtn variable and assigns it, adds the button text and appropriate class
  var removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("removeBtn");

  // adds the remove button to the favorite item and adds the item to the favorites list
  favItem.appendChild(removeBtn);
  favList.appendChild(favItem);

// this sets the clear favorites list button to be visible but only after something is in the list
  clearListButton.style.display = 'block'

}
// creates a click event listener on the itemList class, that adds the content to the favorite list

document.querySelector('#episodeList').addEventListener('click', function(event) {
  if (event.target.classList.contains("addButton")) {
      listItem = event.target.parentNode;
      itemName = listItem.firstChild.textContent.trim();
      meLikey();
      addFavorite();
    }
  });


// creates a click event listener on the ul of the favList class that removes the item from the list
document.querySelector('#favoritesBar').addEventListener('click', function(event) {
if (event.target.classList.contains("removeBtn")) {
    listItem = event.target.parentNode;
    listItem.remove();
    removeFavorite();
  }
});
*/
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
  /*var favList = document.getElementById("favList")
  while (favList.firstChild) {
    favList.removeChild(favList.lastChild);
  }
  localStorage.clear();
  favList.textContent = "";*/
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

function displayFavorites(){

  /*
  // sets the favlist to blank so nothing gets displayed twice
  favList.textContent= ""

  for (var i = 0; i < favorites.length; i++) {
    var favorite = favorites[i];

    var list = document.createElement("li");
    list.textContent = favorite;

    var removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("removeBtn");

    list.appendChild(removeBtn);
    favList.appendChild(list);
  }
  */
  let favoriteBarEl = document.getElementById("favoritesBar");
  favoriteBarEl.innerHTML = '';
  if(favorites.length <= 0){
    return;
  }
  let h2El = document.createElement('h2');
  favoriteBarEl.appendChild(h2El);
  h2El.textContent = "Favorites";
  for(let i=0; i<favorites.length; i++){
    favoriteBarEl.appendChild(displayFavoriteSeries(i));
  }
  let clearButtonEl = document.createElement('button');
  clearButtonEl.textContent = "Clear";
  clearButtonEl.addEventListener('click', clearFavorites);
  favoriteBarEl.appendChild(clearButtonEl);
}

function displayFavoriteSeries(index){
  let episodeObj = favorites[index];
  let articleEl = document.createElement('article');
  articleEl.className = "favorite";
  articleEl.id = "fav" + index;

  let aEl1 = document.createElement('a');
  aEl1.href = episodeObj.seriesLink;
  let h4El = document.createElement('h4');
  h4El.textContent = episodeObj.series;
  aEl1.appendChild(h4El);

  let aEl2 = document.createElement('a');
  aEl2.href = episodeObj.link;
  let h5El = document.createElement('h5');
  h5El.textContent = "Ep." + episodeObj.number + " " + episodeObj.title;
  let pEl = document.createElement('p');
  pEl.textContent = episodeObj.stream + " " + episodeObj.lang;
  pEl.className = "stylizedBracketBorder";
  aEl2.appendChild(h5El);
  aEl2.appendChild(pEl);

  let removeButtonEl = document.createElement('button');
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

  let h2El = document.createElement('h2');
  h2El.textContent = "Calendar";
  mainEl.appendChild(h2El);
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
  dayEl.className = "day";
  dayEl.id = "day-" + day;
  //var day1 = document.getElementById('day-1');
  //var day2 = document.getElementById('day-2');
  //var day3 = document.getElementById('day-3');
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
  //var yesterday = now.subtract(1, 'day');
  //var twoDaysAgo = now.subtract(2, 'day');
  //var threeDaysAgo = now.subtract(3, 'day');
  let h2El = document.createElement('h3');
  h2El.textContent = date;
  dayEl.appendChild(h2El);
  //day0.textContent = "Today " + "(" + now + ")";
  //day1.textContent = "Yesterday " + "(" + yesterday + ")";
  //day2.textContent = "Two Days Ago " + "(" + twoDaysAgo + ")";
  //day3.textContent = "Three Days Ago " + "(" + threeDaysAgo + ")";

  for(let key = 0; key < episodes[day].length; key++){
    dayEl.appendChild(displayEpisode(day, key));
  }

  return dayEl
  //day0.innerHTML = fiveEpisodeDisplay; 
  //day1.innerHTML = fiveEpisodeDisplay;
  //day2.innerHTML = fiveEpisodeDisplay;
  //day3.innerHTML = fiveEpisodeDisplay;
}
//Creates Dom elements, and adds information from episodes[day][key] returns Dom Element Object for an episode
/*
<article class="episode" id="episodes[day][key]">
    <a href=episodes[day][key].seriesLink>
        <h4>episodes[day][key].series</h4>
    </a>
    <a href=episodes[day][key].link>
        <h5>"Ep." + episodes[day][key].number + " " + episodes[day][key].title</h5>
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
  //let sectionEl = document.getElementsByClassName("day");

  let articleEl = document.createElement('article');
  articleEl.className = "episode";
  articleEl.id = "episodes[" + day + "][" + key + "]";
  
  let linkEl1 = document.createElement('a');
  linkEl1.href = episodes[day][key].seriesLink;
  let h4El = document.createElement('h4');  
  h4El.textContent = episodes[day][key].series;
  linkEl1.appendChild(h4El);
  
  let linkEl2 = document.createElement('a');
  linkEl2.href = episodes[day][key].link;
  let h5El = document.createElement('h5');
  h5El.textContent = "Ep." + episodes[day][key].number + " " + episodes[day][key].title;
  let pEl = document.createElement('p');
  pEl.textContent = episodes[day][key].stream + " " + episodes[day][key].lang;
  pEl.className = "stylizedBracketBorder";
  linkEl2.appendChild(h5El);
  linkEl2.appendChild(pEl);

  let favoriteButtonEl = document.createElement('button');
  favoriteButtonEl.textContent = "Favorite";
  favoriteButtonEl.addEventListener('click', function(event){
    event.preventDefault();
    addFavorite(episodes[day][key]);
  });

  articleEl.appendChild(linkEl1);
  articleEl.appendChild(linkEl2);
  articleEl.appendChild(favoriteButtonEl);

  return articleEl;  
  /*
  let episodeImage = document.createElement("img");
  episodeImage.setAttribute("class = episodeImage");
  episodeImage.setAttribute("src=episodes[day][key].preview");

  let releaseDate = document.createElement("h4");  
  releaseDate.setAttribute("class = releaseDate");
  releaseDate.innerHTML = episodes[day][key].release;

  let lineBreak = document.createElement("br");
  
  aElement1.appendChild(h3);
  aElement2.appendChild(h2, h4, lineBreak);
  aElement2.appendChild(episodeImage);
  articleEl.appendChild(aElement1);
  articleEl.appendChild(aElement2);
  */
}

/*Functions to add and use episode data
*/
function parseData(){
  for(let day = 0; day < numberDays; day++){
    evaluateDay(day);
  }
}
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

//TODO Create hover window, fetch data
//Generate Summary from fetch jikan
//Generate Cast from fetch imdb
function getSummary(id){
  let fullData = fetchCall("https://api.jikan.moe/v4/anime/" + id + "/full");
  return fullData.data.synopsis;
}
async function fetchCall(address){
  let response = await fetch(address);
  let data = await response.json();
  return data;
}
/* Waifu generator API https://waifu.pics/docs
*/
function getWaifu(){
  let waifu = fetchCall("https://api.waifu.pics/sfw/waifu");
  return waifu.url;
}