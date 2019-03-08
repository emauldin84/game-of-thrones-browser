const charDiv = document.createElement('div');

const leftColumn = document.querySelector('[data-left-output]');

// function appendNamesToLeft(characters) {
characters.forEach(function(element) {
    const charDiv = document.createElement('div');
    const nameIden = document.createAttribute("data-target");
    
    
    leftColumn.append(charDiv);
    charDiv.append(element.name);

    charDiv.setAttributeNode(nameIden);

    // console.log(element.name);
    console.log(charDiv);
});

// };


// characters[0][element].name