/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {

        // create a new div element, which will become the game card
        const newDiv = document.createElement("div");
        // add the class game-card to the list
        newDiv.classList.add("game-card");
        
        // set the inner HTML using a template literal to display some info 
        // about each game
        const displayGameInfo = `
                                <div>
                                    <h2> ${games[i].name} </h2>
                                    <img class="game-img" src="${games[i].img}" />
                                    <p> ${games[i].description} </p>
                                </div>
                                `

        newDiv.innerHTML = displayGameInfo;

        // append the game to the games-container
        gamesContainer.appendChild(newDiv);

    }

}
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce( (acc, games) => {
    return acc + games.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalBackers.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce( (acc, games) => {
    return acc + games.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;

gamesCard.innerHTML = totalGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames = GAMES_JSON.filter( (games) => {
        return games.pledged < games.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames);
    console.log(listOfUnfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedGames = GAMES_JSON.filter( (games) => {
        return games.goal <= games.pledged;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFundedGames);
    console.log(listOfFundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    let listOfAllGames = GAMES_JSON;
    addGamesToPage(listOfAllGames);
    console.log(listOfAllGames);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let totalUnfundedGames = GAMES_JSON.filter( (games) => {
    return games.pledged < games.goal;
});

totalUnfundedGames = totalUnfundedGames.length;
console.log(totalUnfundedGames);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString('en-US')} has been raised 
                    for ${totalGames} games. Currently, ${totalUnfundedGames} remains unfunded. 
                    We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const descriptionStr = `<p> ${displayStr} </p>`

descriptionContainer.insertAdjacentHTML("beforeend", descriptionStr);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
console.log(sortedGames[0]);
let {name: name1, description: desc1, pledged: pl1, goal: goal1, backers: bcker1, img: img1} = sortedGames[0];
console.log(name1);
const firstGame = [name1, desc1, pl1, goal1, bcker1, img1]

console.log(sortedGames[1]);
let {name: name2, description: desc2, pledge: pl2, goal: goal2, backers: bcker2, img: img2} = sortedGames[1];
const secondGame = [name2, desc2, pl2, goal2, bcker2, img2]

const topTwoGames = [...firstGame, ...secondGame];

console.log(topTwoGames);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameName = `<p> ${name1} </p>`;
firstGameContainer.insertAdjacentHTML("beforeend", firstGameName);
// do the same for the runner up item
const secondGameName = `<p> ${name2} </p>`;
secondGameContainer.insertAdjacentHTML("beforeend", secondGameName);

/**********************************************************
 * Customizations
 * 1. Search for game
 * 2. Nav Bar
 * 3. Make it more visually appealing
 * 4. Make the cards flip on click for more info
 */

// search for game
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");

const filterResult = () => {
    const searchInput = searchBar.value.toLowerCase();
    const resultGame = GAMES_JSON.filter( (games) => 
        games.name.toLowerCase() == searchInput
    );

    deleteChildElements(gamesContainer);

    if (resultGame.length !== 0) {
        addGamesToPage(resultGame);
    } else {
        console.log(searchInput);
        // the filter gets rid of extra white spaces
        const words = searchInput.split(" ").filter(word => word !== "");

        const suggestResults = GAMES_JSON.filter( (games) => 
            // .some() is an arr method that checks if at least one element in arr satisfies 
            words.some(word => games.name.toLowerCase().includes(word))
        );

        if (suggestResults.length !== 0) {
            addGamesToPage(suggestResults);
            console.log(words);
        } else {
            const noGameFound = `<p> Matching results not found </p>`;
            gamesContainer.innerHTML = noGameFound;
        }
    }
}

searchBtn.addEventListener("click", filterResult);
