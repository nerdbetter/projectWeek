'use strict';
console.log('character.js loaded');
//character constuctor
function Character(name, health) {
  this.name = name;
  this.health = health || 0;
  this.strength = this.generateStat();
  this.dexterity = this.generateStat();
  this.constitution = this.generateStat();
  this.intelligence = this.generateStat();
  this.wisdom = this.generateStat();
  this.charisma = this.generateStat();
  this.attacks = [];
}

//method for generating stats | roll 4 D6 then take out the lowest number and add the rest together
Character.prototype.generateStat = function() {
  var rolls = [];
  for (var i = 0; i < 4; i++) {
    //while using math.floor the and math.random * 7 the highest value is 6
    var randomNumber = Math.floor(Math.random() * 7);
    rolls.push(randomNumber);
  }
  console.log(rolls);
  //sorts array lowest to highest
  rolls.sort();
  //pulls up the first index, the lowest number
  rolls.splice(0, 1);
  var stat = 0;
  //loops through and adds up the array
  for (var i = 0; i < rolls.length; i++) {
    var index = rolls[i];
    stat += index;
  }
  //return the final stat value
  return stat;
};
//grab name in form and update charachter name
var form = document.querySelector('form');
form.addEventListener('submit', updateStats);

function updateStats(event) {
  event.preventDefault();
  var name = document.querySelector('input[name = "name"]');
  var character = new Character(name.value);

  characters.push(character);
  console.log(characters);
  selectedCharacter = characters.length - 1;
  localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacter));
  localStorage.setItem('characters', JSON.stringify(characters));
  renderCharacter(character);
  renderCharacterList();
  attackForm();
};

function renderCharacter(character) {
  var charName = document.getElementById('displayName');
  charName.textContent = character.name;

  var charStrength = document.getElementById('str');
  charStrength.textContent = character.strength;

  var charDexterity = document.getElementById('dex');
  charDexterity.textContent = character.dexterity;

  var charConstitution = document.getElementById('con');
  charConstitution.textContent = character.constitution;

  var charIntelligence = document.getElementById('int');
  charIntelligence.textContent = character.intelligence;

  var charWisdom = document.getElementById('wis');
  charWisdom.textContent = character.wisdom;

  var charCharisma = document.getElementById('char');
  charCharisma.textContent = character.charisma;

  var charHealth = document.getElementById('displayHealth');
  charHealth.textContent = character.health;
}
var minus = document.getElementById('minus');
minus.addEventListener('click', subtractHealth);
function subtractHealth(){
  characters[selectedCharacter].health -= 1;
  localStorage.setItem('characters', JSON.stringify(characters));
  renderCharacter(characters[selectedCharacter]);
}
var plus = document.getElementById('plus');
plus.addEventListener('click', addHealth);
function addHealth(){
  characters[selectedCharacter].health += 1;
  localStorage.setItem('characters', JSON.stringify(characters));
  renderCharacter(characters[selectedCharacter]);
}
function renderCharacterList() {
  console.log('rendering character list');
  var characterList = document.getElementById('characters');
  while (characterList.firstChild) {
    characterList.removeChild(characterList.firstChild);
  }
  for (var i = 0; i < characters.length; i++) {
    var characterOption = characters[i];
    var el = document.createElement('option');
    el.textContent = characterOption.name;
    el.value = i;
    characterList.appendChild(el);
  };
}

function updateSelectedCharacter() {
  var characterList = document.getElementById('characters');
  selectedCharacter = characterList.value;
  localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacter));;
  renderCharacter(characters[selectedCharacter]);
  attackForm();
}
