const charDiv = document.createElement('div');

const leftColumn = document.querySelector('[data-left-output]');

// function appendNamesToLeft(characters) {
characters.forEach(function(element) {
    console.log(element.name);
    leftColumn.append(charDiv);
    charDiv.append(element.name + ', ')
});

// };


// characters[0][element].name