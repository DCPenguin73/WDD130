// https://www.dnd5eapi.co/docs/
const url = "https://www.dnd5eapi.co/api/";
let results = null;


function convertToJson(response) {
    if (response.ok) {
        console.log("its ok");
      return response.json();
    } else {
        window.alert("The thing you searched for does not exist. Check your spelling and search again.");
      console.log("error:", response);
    }
}


document.getElementById('submit').addEventListener("click", search);


function search() {
    let search = document.getElementById('search').value.toLowerCase();   // posibly .textcontent
    let subCatigory = document.getElementById('sortBy').value;
    let searchURL = url + subCatigory + '/' + search;
    fetch(searchURL).then(convertToJson).then(match);
    
    console.log('end of search');
}

function match(data) {   
    reset();
    console.log(data);
    let article =  document.createElement('article');   
    DnDName = document.createElement('h3');
    DnDName.textContent = data.name;
    article.appendChild(DnDName);
    console.log(data.spells[0].results);
    switch (document.getElementById('sortBy').value) {
        case 'races': 
            raceSpeed = document.createElement('h5');
            raceSpeed.textContent = 'Speed: ' + data.speed + 'ft';
            article.appendChild(raceSpeed);
            raceAbility = document.createElement('h5');
            raceAbility.textContent = 'Racial bonus:'
            
            for(let i=0; i< data.ability_bonuses.length; i++) {
            raceAbility.textContent += " " + data.ability_bonuses[i].ability_score.name + ' ' + data.ability_bonuses[i].bonus
            }
            raceSpeed.appendChild(raceAbility);
            raceAlignment = document.createElement('h5');
            raceAlignment.textContent = 'Alignment: ' + data.alignment;
            article.appendChild(raceAlignment); // raceAbility.appendChild(raceAlignment);
            raceAge = document.createElement('h5');
            raceAge.textContent = 'Age: ' + data.age;
            article.appendChild(raceAge);
            raceSize = document.createElement('h5');
            raceSize.textContent = 'Size: ' + data.size;
            article.appendChild(raceSize);
            break;
        case 'classes':
            classDie = document.createElement('h5');
            classDie.textContent = "Hit die: 1d" + data.hit_die;
            article.appendChild(classDie);
            classSpell = document.createElement('h5');
            classSpell.textContent = 'Spells:';
            for(let i=0; i < data.spells.length; i++) {
            classSpell.textContent += ' ' + data.spells[i].name;
            }
            article.appendChild(classSpell);
            break;
        case 'feats':
        case 'skills':
        case 'spells':
            spellsRange = document.createElement('h5');
            spellsRange.textContent = 'Range: ' + data.range;
            article.appendChild(spellsRange);
            spellsMaterials = document.createElement('h5');
            spellsMaterials.textContent = 'Materials: ' + data.material;
            article.appendChild(spellsMaterials);
            spellsDuration = document.createElement('h5');
            spellsDuration.textContent = 'Duration: ' + data.duration;
            article.appendChild(spellsDuration);
            spellsLevel = document.createElement('h5');
            spellsLevel.textContent = 'Spell Level: ' + data.level;
            article.appendChild(spellsLevel);
            break;
    }
    document.querySelector('#temples').appendChild(article)
}

const reset = () => {
    document.querySelector('#temples').innerHTML = '';
}



// function doStuffList(data) {
//     console.log(data);
//     const DnDListElement = document.querySelector("#outputList");
//     let DnDList = data.results;
//     // sort our list before output it
//     DnDList = sortPokemon(DnDList);
//     DnDList.forEach((currentItem) => {
//       const html = `<li>${currentItem.name}</li>`;
//       //note the += here
//       DnDListElement.innerHTML += html;
//     });
//   }

// fetch(url).then(convertToJson) //.then(doStuffList);