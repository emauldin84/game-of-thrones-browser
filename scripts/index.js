const charDiv = document.createElement('div');

const leftColumn = document.querySelector('[data-left-output]');
const rightColumn = document.querySelector('[data-right-output]');
const nameDiv = document.querySelector('[data-name]');
const genderDiv = document.querySelector('[data-gender]');
const cultureDiv = document.querySelector('[data-culture]');
const bornDiv = document.querySelector('[data-born]');
const diedDiv = document.querySelector('[data-died]');
const titlesDiv = document.querySelector('[data-titles]');
const aliasesDiv = document.querySelector('[data-aliases]');
const fatherDiv = document.querySelector('[data-father]');
const motherDiv = document.querySelector('[data-mother]');
const spouseDiv = document.querySelector('[data-spouse]');
const povbooksDiv = document.querySelector('[data-povbooks]');
const tvseriesDiv = document.querySelector('[data-tvseries]');
const playedbyDiv = document.querySelector('[data-playedby]');

characters.forEach(function(element) {
    const charDiv = document.createElement('div');
    const nameIdentifier = document.createAttribute("data-target");
    
    leftColumn.append(charDiv);
    charDiv.append(element.name);

    charDiv.setAttributeNode(nameIdentifier);

});

const selectCharName = document.querySelectorAll('[data-target]');


// ******************
// when name is clicked display the character info in right column
function respondToClick() {

    charName = event.target.textContent
    characters.forEach(function(element){
        
        if (element.name === charName) {
        document.getElementsByClassName("char-info").innerHTML = "";
        rightColumn.append(element.born);
        genderDiv.append(element.gender);
        cultureDiv.append(element.culture);
        bornDiv.append(element.born);
        diedDiv.append(element.died);
        titlesDiv.append(element.titles);
        aliasesDiv.append(element.aliases);
        fatherDiv.append(element.father);
        motherDiv.append(element.mother);
        spouseDiv.append(element.spouse);
        povbooksDiv.append(element.povbooks);
        tvseriesDiv.append(element.tvseries);
        playedbyDiv.append(element.playedby);

        // let infoDiv = document.getElementById('char-info');
        // while(infoDiv.firstChild){
        //     infoDiv.removeChild(infoDiv.firstChild);
// }

        };
    })

};

function attachClickEvent(eachChar) {
    eachChar.addEventListener('click', respondToClick);
}

selectCharName.forEach(attachClickEvent);
