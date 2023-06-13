/*
Working variables
*/

var favorites = new Array();
var episodes = [new Array(), new Array(), new Array(), new Array()];

/*
Local Storage / Favorites Bar functions
*/
function getFavorites(){

}
function clearFavorite(){

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

}