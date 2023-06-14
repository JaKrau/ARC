

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

var listItem; // declared variable in global scope
var itemName; // declared variable in global scope


function meLikey() {
  // gives the function the favList element
  var favList = document.querySelector("#favList");
  var favItem = document.createElement('li');
  favItem.textContent = itemName;

  var removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("removeBtn");

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
    }
  });


// creates a click event listener on the ul of the favList class that removes the item from the list
document.querySelector('#favoritesBar').addEventListener('click', function(event) {
if (event.target.classList.contains("removeBtn")) {
    listItem = event.target.parentNode;
    listItem.remove();
  }
});


var clearListButton = document.getElementById("clearListButton");
var buttonContainerEl = document.querySelector(".buttonContainer")
buttonContainerEl.addEventListener("click", function() {
  //var favList = document.getElementById("favList");
  clearFavorite();
/*
  for (var i = favList.children.length - 1; i >= 0; i--) {
    var listItem = favList.children[i];
    listItem.remove();
  }
*/
  clearListButton.style.display = 'none';
});

//---------------------------------------------------------------------------------//



/*
Local Storage / Favorites Bar functions
*/
function getFavorites(){

}
function clearFavorite(){
  var favList = document.getElementById("favList")
  /*while (favList.firstChild) {
    favList.removeChild(favList.lastChild);
  }*/
  favList.textContent = "";
}
function addFavorite(name){

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