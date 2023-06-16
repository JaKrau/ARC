//Data Object to hold information related to an episode
class Episode{
    series = "";                //String name of series
    id = 0;                     //Number ID of anime on myAnimeList
    seriesLink = "";            //String http link to series
    number = 0;                 //Number episode number
    title = "";                 //String title of episode
    link = "";                  //String http link to episode
    preview = "";               //String http link to thumbnail if it exists
    summary = "";               //String text body summary of episode
    release = "";               //String date of release
    constructor(){

    }
    //Generate Summary from fetch
    getSummary(){

    }
}
//Already predetermine anime series to use based on research
//Too many anime pulled to be under fetch limits

/*
Working variables
*/
var now = dayjs().format("M/DD");
var favorites = new Array();
var episodes = [new Array(), new Array(), new Array(), new Array()];
var keyFavorites = "favorites";
var listItem;
var itemName;

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

/* Currently not functionable
function displayDay(day){
  var day0 = document.getElementById('day-0');
  var day1 = document.getElementById('day-1');
  var day2 = document.getElementById('day-2');
  var day3 = document.getElementById('day-3');

  var yesterday = now.subtract(1, 'day');
  var twoDaysAgo = now.subtract(2, 'day');
  var threeDaysAgo = now.subtract(3, 'day');

  day0.textContent = "Today " + "(" + now + ")";
  day1.textContent = "Yesterday " + "(" + yesterday + ")";
  day2.textContent = "Two Days Ago " + "(" + twoDaysAgo + ")";
  day3.textContent = "Three Days Ago " + "(" + threeDaysAgo + ")";

  day0.innerHTML = fiveEpisodeDisplay; 
  day1.innerHTML = fiveEpisodeDisplay;
  day2.innerHTML = fiveEpisodeDisplay;
  day3.innerHTML = fiveEpisodeDisplay;
}
*/

displayDay();
//Creates Dom elements, and adds information from episodes[day][key] returns Dom Element Object for an episode
/*
<article class="episode">
    <a href=episodes[day][key].seriesLink>
        <h3>episodes[day][key].series</h3>
    </a>
    <a href=episodes[day][key].link>
        <h2>"Ep." + episodes[day][key].number + " " + episodes[day][key].title</h2>
        <img src=episodes[day][key].preview />
    </a>
    <button>Favorite</button>
    create
    <button>.addEventListener('click', function(event){
        addFavorite(episodes[day][key].series);
    });
</article>
*/
function displayEpisode(day, key){
  let sectionEl = document.getElementsByClassName("day");

  let articleEl = document.createElement("article");
  articleEl.className = "episode";
  
  let aElement1 = document.createElement("a");
  aElement1.setAttribute("href=episodes[day][key].seriesLink", "class=itemList");
  let h3 = document.createElement("h3");  
  h3.innerHTML = episodes[day][key].series;
  
  let aElement2 = document.createElement("a");
  aElement2.setAttribute("href=episodes[day][key].link");
  let h2 = document.createElement("h2");
  h2.innerHTML = "Ep." + episodes[day][key].number + " " + episodes[day][key].title;
  
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

  sectionEl.appendChild(articleEl);
}
//Needs arguments
//let fiveEpisodeDisplay = [displayEpisode(), displayEpisode(), displayEpisode(), displayEpisode(), displayEpisode()];

/*Functions to add and use episode data
*/
function addEpisode(){

}
function getSummary(id){
    fetchCall("https://api.jikan.moe/v4/anime/" + id + "/full");
}
async function fetchCall(address){
    let response = await fetch(address);
    let data = await response.json();
    return data;
}
