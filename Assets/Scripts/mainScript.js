

//Object to hold information related to an episode
class Episode{
    series = "";                //String name of series
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

/*
Working variables
*/

var favorites = new Array();
var episodes = [new Array(), new Array(), new Array(), new Array()];

var listItem; // declared variable in global scope
var itemName; // declared variable in global scope



function meLikey() {
  // gives the function the favList element
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


var clearListButton = document.getElementById("clearListButton");
var buttonContainerEl = document.querySelector(".buttonContainer")
buttonContainerEl.addEventListener("click", function() {
  clearFavorite();
// resets the clear list button to be invisible again once list is clear
  clearListButton.style.display = 'none';
});

/*
Local Storage / Favorites Bar functions
*/
function getFavorites(){
  var storedFavorites = JSON.parse(localStorage.getItem('favorites'));

  if (storedFavorites !== null) {
    favorites = storedFavorites;
  }
  displayFavorites();
}
function clearFavorite(){
  /*var favList = document.getElementById("favList")*/
  while (favList.firstChild) {
    favList.removeChild(favList.lastChild);
  }
  localStorage.clear();
  /*favList.textContent = "";*/
}
function addFavorite(name){

}
function removeFavorite(key){
  localStorage.removeItem()
}
function displayFavorites(){
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
}
getFavorites()
/*
Episodes View functions
*/
//Calls a function for each day
function displayList(){

}

//Calls a function to add an episode and add it to the HTML Dom for that day
/*
--Section defined in HTML code
<section class="day" id="day[selectedDay]">
    --Call displayDay(day, key) to get Dom Element.
    <article class="episode"></article>
    <article class="episode"></article>
    <article class="episode"></article>
    <article class="episode"></article>
    <article class="episode"></article>
</section>
*/
function displayDay(day){

}

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
</article>
*/
function displayEpisode(day, key){
  let articleEl = document.createElement("article");
  articleEl.className = "episode";
  let aElement1 = document.createElement("a");
  aElement1.setAttribute("href=episodes[day][key].seriesLink");
  aElement1.innerHTML("<h3>episodes[day][key].series</h3>");
  let aElement2 = document.createElement("a");
  aElement2.setAttribute("href=episodes[day][key].link");
  aElement2.innerHTML("<h2\"Ep.\" + episodes[day][key].number + \" \" + episodes[day][key].title</h2>", "<img src=episodes[day][key].preview />");
  articleEl.appendChild(aElement1);
  articleEl.appendChild(aElement2);
}