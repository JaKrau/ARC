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
var listItem;
var itemName;

makeDays();
parseData();
displayList();

function makeDays(){
  for(let i=0; i < numberDays; i++){
    days.push(dayjs().subtract(i, 'day'));
    episodes.push(new Array());
  }
}

// when i click a button
// it adds an item to a separate 'favorites' list
// when the item gets added to the favorites list it has a button to remove it from the list


// function to make it so when a button is clicked in the item list, it gets the item name and creates a new li and sets its text content to the itemName
/* document.getElementById('itemList').addEventListener('click', function(event) {
    if (event.target.classList.contains('addButton')) {
      var listItem = event.target.parentNode;
      // itemName variable set to only include the text content of the list item
      var itemName = listItem.firstChild.textContent.trim();
      // logged to console here to make sure the correct item is being targeted in the event
      console.log(itemName)
      console.log(listItem)
  
      // Create a new favorite item element
      var favoriteItem = document.createElement('li');
      favoriteItem.textContent = itemName;
  
      // Append the favorite item to the favorites list
      document.querySelector('.favList ul').appendChild(favoriteItem);
    }
  }); */

//---------------------------------------------------------------------------------//

// the same code as above but with a function to make calling it easier if needed
// this code also has a remove button with it


function meLikey() {
  // gives the function the favList element
  var favList = document.querySelector(".favList ul")
  var favItem = document.createElement('li');
  favItem.textContent = itemName;

  var removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("removeBtn");

  favItem.appendChild(removeBtn);
  favList.appendChild(favItem);
}
/*
// creates a click event listener on the itemList class, that adds the content to the favorite list

document.querySelector('.itemList').addEventListener('click', function(event) {
  if (event.target.classList.contains("addButton")) {
      listItem = event.target.parentNode;
      itemName = listItem.firstChild.textContent.trim();
      meLikey();
    }
  });


// creates a click event listener on the ul of the favList class that removes the item from the list
document.querySelector('.favList ul').addEventListener('click', function(event) {
if (event.target.classList.contains("removeBtn")) {
    listItem = event.target.parentNode;
    listItem.remove();
  }
});
*/
//---------------------------------------------------------------------------------//



/*
Local Storage / Favorites Bar functions
*/
function getFavorites(){

}
function clearFavorite(){

}
function addFavorite(name){
    favorites.push(name);
    localStorage.setItem(keyFavorites, JSON.stringify(favorites));
}
function removeFavorite(key){

}
function displayFavorites(){

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
  let pEl1 = document.createElement('p');
  pEl1.textContent = episodes[day][key].stream + " " + episodes[day][key].lang;
  pEl1.className = "stylizedBracketBorder"
  linkEl2.appendChild(h5El);
  linkEl2.appendChild(pEl1);

  let pEl2 = document.createElement('p');
  pEl2.className = "stylizedBracketBorder"
  pEl2.textContent = "Favorite";

  articleEl.appendChild(linkEl1);
  articleEl.appendChild(linkEl2);
  articleEl.appendChild(pEl2);

  pEl2.addEventListener('click', function(event){
    event.preventDefault();
    addFavorite(episodes[day][key].series);
  });
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
  fetchCall("https://api.jikan.moe/v4/anime/" + id + "/full");
}
async function fetchCall(address){
  let response = await fetch(address);
  let data = await response.json();
  return data;
}