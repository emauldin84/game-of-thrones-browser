// const charDiv = document.createElement('div');
// const leftColumn = document.querySelector('[data-left-output]');
// const rightColumn = document.querySelector('[data-right-output]');
// const detailsColumn = document.querySelectorAll('[right]');
// const nameDiv = document.querySelector('[data-name]');
// const genderDiv = document.querySelector('[data-gender]');
// const cultureDiv = document.querySelector('[data-culture]');
// const bornDiv = document.querySelector('[data-born]');
// const diedDiv = document.querySelector('[data-died]');
// const titlesDiv = document.querySelector('[data-titles]');
// const aliasesDiv = document.querySelector('[data-aliases]');
// const fatherDiv = document.querySelector('[data-father]');
// const motherDiv = document.querySelector('[data-mother]');
// const spouseDiv = document.querySelector('[data-spouse]');
// const povbooksDiv = document.querySelector('[data-povbooks]');
// const tvseriesDiv = document.querySelector('[data-tvseries]');
// const playedbyDiv = document.querySelector('[data-playedby]');

// const selectCharName = document.querySelectorAll('[data-target]');

let allCharactersArray = [];

function urlForPage(pageNumber=0) {
    return `https://my-little-cors-proxy.herokuapp.com/https://anapioficeandfire.com/api/characters/?page=${pageNumber}&pageSize=50`;

}

function accumulateCharacters(theActualData) {
    allCharactersArray = [
        ...allCharactersArray,
        ...theActualData
    ];
    storeCharacters(allCharactersArray);

    //We know that there are no more characters to load if the API is sending us empty arrays.
    if (theActualData.length === 0) {
        // This is a terrible, but useful hack
        // reload the page
        // location.reload();

        // Really, though...when we have
        // loaded all the data from the API,
        // just call the main function again!

        main();
    }
}

const storageKey = 'game-of-thrones';

function storeCharacters(arrayOfCharacters) {
    // convert the array to JSON string
    const jsonCharacters = JSON.stringify(arrayOfCharacters);
    console.log(`saving ${arrayOfCharacters.length} characters`);
    // set that string in localStorage
    localStorage.setItem(storageKey, jsonCharacters);
}

function loadCharacters() {
    // get the JSON string from localStorage
    const jsonCharacters = localStorage.getItem(storageKey);

    // convert it back into an array
    const arrayOfCharacters = JSON.parse(jsonCharacters);
    if (arrayOfCharacters) {
        console.log(`loaded ${arrayOfCharacters.length} characters`);
    } else {
        console.log('no characters in localStorage');
    }
    // return the array
    return arrayOfCharacters;
}

function retrievePageOfCharacters(pageNumber) {
    fetch(urlForPage(pageNumber))
    .then(function(response) {  // #2 and then process teh response so we can get data out of it.
        return response.json();
    })
    .then(accumulateCharacters)
    .then(function () {
        console.log(`Done with page ${pageNumber}`);
    })
}
function drawCharacterToDetail(characterObject) {
    console.log(characterObject);
    console.log('that was what got passed in');
    const detailArea = document.querySelector('[data-detail]');
    detailArea.textContent = '';

    const nameDiv = document.createElement('div');
    const bornDiv = document.createElement('div');
    const diedDiv = document.createElement('div');
    const aliasDiv = document.createElement('div');
    const titlesDiv = document.createElement('div');


    nameDiv.textContent = `Name: ${characterObject.name}`;
    bornDiv.textContent = `DoB: ${characterObject.born}`;
    diedDiv.textContent = `Death: ${characterObject.died}`;
    aliasDiv.textContent = `Aliases: ${characterObject.aliases}`;
    titlesDiv.textContent = `Titles: ${characterObject.titles}`;

    detailArea.appendChild(nameDiv);
    detailArea.appendChild(bornDiv);
    detailArea.appendChild(diedDiv);
    detailArea.appendChild(aliasDiv);
    detailArea.appendChild(titlesDiv);
}

function findCharacterInArray(url) {
    return allCharactersArray.find(function (character) {
        return character.url === url;
    });
}

function drawSingleCharacterToListing(characterObject) {
    const characterName = characterObject.name;
    if (characterName.length === 0) {
        return;
    }

    const anchorElement = document.createElement('a');
    anchorElement.textContent = characterName;

    // When you need to pass an argument to the event handler function you must wrap it in an anonymous function.
    anchorElement.addEventListener('click', function () {
        drawCharacterToDetail(characterObject);
        // const theUrl = characterObject.url;
        // const theCharacter = findCharacterInArray(theURL);
        // drawCharacterToDetail(theCharacter);
    });

    const listItem = document.createElement ('li'); 
    listItem.appendChild(anchorElement);

    const listArea = document.querySelector('[data-listing]');

    listArea.appendChild(listItem);
}

function drawListOfCharacters(characters = allCharactersArray) {
    // uses global varaible allCharactersArray

    const listArea = document.querySelector('[data-listing]');
    listArea.textContent = '';
    //loop through the array of characters
    //for each one, draw the name in the listing area of the page
    characters.forEach(drawSingleCharacterToListing);
}

function sortByName(obj1, obj2) {
    const letter1 = obj1.name[0];
    const letter2 = obj2.name[0];

    if (letter1 < letter2) {
        return -1;
    } else if (letter2 < letter1) {
        return 1;
    }
    return 0;
}

function filterByLetter(letter) {
    console.log(letter);
    if(letter.length === 1) {
        const filtered = allCharactersArray.filter(function (character) {
            return character.name.startsWith(letter.toUpperCase());
        });
        console.log(`drawing for ${letter}`);
        drawListOfCharacters(filtered);
    } else {
        console.log('drawing all');
        drawListOfCharacters();
    }
}

function attachClicktoLetters() {
    const letters = document.querySelectorAll('[data-index] a');
    letters.forEach(function (letter) {
        letter.addEventListener('click', function () {
            filterByLetter(letter.textContent);
        });
    });
}

function main() {
    let charactersInLocalStorage = loadCharacters();
    if (charactersInLocalStorage) {
        allCharactersArray = [
            ...charactersInLocalStorage.sort(sortByName)
        ];
        drawListOfCharacters();
        attachClicktoLetters();
    } else {
        console.log("You got a whole lot of nothing.");
        console.log("Retrieving from the API");
        for (let pageNumber=0; pageNumber < 45; pageNumber++) {
            let delay = pageNumber * 500;

            //we have to wrap retrievePageOfCharacters
            //in an anonymous function so we can
            //pass it an argument.
            setTimeout(function () {
                retrievePageOfCharacters(pageNumber);
            }, delay);
            //If it did not take any arguments we would not need to wrap it.
        }
    }
}

main();





// for (let pageNumber =0; pageNumber < 3; pageNumber++)


// fetch(urlForPage(pageNumber))
// .then(function(response) {
//     return response.json();
// })
// .then(function(characterData) {
    
//     console.log(characterData);
//     allCharactersArray = characterData;
//     characterData.forEach(function(element) {
//         //create div containers for each character name
//         const charDiv = document.createElement('div');
        
//         //append div containers and each corrosponding character name.
//         if(element.name){
//         leftColumn.append(charDiv);
//         charDiv.append(element.name);
//         }
        
//         //attach common data attribute to select each character div
//         charDiv.setAttribute('data-target', '');
//             // const nameIdentifier = document.createAttribute("data-target");
//             // charDiv.setAttributeNode(nameIdentifier);
//         charDiv.addEventListener('click', respondToClick);
        
//     });
//     return allCharactersArray;
// });

// function respondToClick(event) {
//     // console.log(event.target)
//     charName = event.target.textContent
//     allCharactersArray.forEach(function(element){
            
//             if (element.name === charName) {
//                 nameDiv.textContent = ('Name: ' + element.name);
//                 genderDiv.textContent = ('Gender: ' + element.gender);
//                 cultureDiv.textContent = ('Culture: ' + element.culture);
//                 bornDiv.textContent = ('DOB: ' + element.born);
//                 diedDiv.textContent = ('Date of death: ' + element.died);
//                 titlesDiv.textContent = ('Titles: ' + element.titles);
//                 aliasesDiv.textContent = ('Aliases: ' + element.aliases);
//                 // fatherDiv.textContent = ('Father: ' + element.father);
//                 // motherDiv.textContent = ('Mother: ' + element.mother);
//                 // spouseDiv.textContent = ('Spouse: ' + element.spouse);
//                 // povbooksDiv.textContent = ('POV Books: ' + element.povbooks);
//                 tvseriesDiv.textContent = (element.tvseries);
//                 playedbyDiv.textContent = ('Played By: ' + element.playedby);
//                 console.log(element.aliases);
                
//             };
//         })
        
//     };
    
    // function attachClickEvent(eachChar) {
    //     eachChar.addEventListener('click', respondToClick);
    // }
    
    // selectCharName.forEach(attachClickEvent);