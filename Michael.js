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
