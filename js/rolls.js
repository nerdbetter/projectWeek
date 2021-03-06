'use strict';
console.log('rolls.js loaded');

function abilityScore(baseStat) {
  var stat;
  if (baseStat == 'strength') {
    stat = characters[selectedCharacter].strength;
  } else if (baseStat == 'dexterity') {
    stat = characters[selectedCharacter].dexterity;
  } else if (baseStat == 'constitution') {
    stat = characters[selectedCharacter].constitution;
  } else if (baseStat == 'intelligence') {
    stat = characters[selectedCharacter].intelligence;
  } else if (baseStat == 'wisdom') {
    stat = characters[selectedCharacter].wisdom;
  } else if (baseStat == 'charisma') {
    stat = characters[selectedCharacter].charisma;
  }
  if (stat <= 3) {
    return -4;
  }
  if (stat <= 5) {
    return -3;

  }
  if (stat <= 7) {
    return -2;

  }
  if (stat <= 9) {
    return -1;

  }
  if (stat <= 11) {
    return 0;

  }
  if (stat <= 13) {
    return 1;

  }
  if (stat <= 15) {
    return 2;

  }
  if (stat <= 17) {
    return 3;

  }
  if (stat <= 19) {
    return 4;

  }
  if (stat <= 21) {
    return 5;

  }
}

function diceRoll(diceNumber, diceType) {
  var rolls = [];
  for (var i = 0; i < diceNumber; i++) {
    var randomNumber = Math.floor(Math.random() * (diceType) + 1);
    rolls.push(randomNumber);
  }
  console.log(rolls);
  var total = 0;
  for (var i = 0; i < rolls.length; i++) {
    var index = rolls[i];
    total += index;
  }

  return total;
}
var form = document.getElementById('attack');
form.addEventListener('submit', attackRoll);

function attackRoll(event) {
  event.preventDefault();
  var selectedAttack = document.getElementById('attacks').value;
  selectedAttack = characters[selectedCharacter].attacks[selectedAttack];
  console.log(selectedAttack);

  var diceType = parseInt(selectedAttack.diceType);
  var diceNumber = parseInt(selectedAttack.diceNumber);
  console.log('type of dice ' + diceType);
  console.log('number of dice ' + diceNumber);

  var roll = diceRoll(diceType, diceNumber);
  console.log('total roll ' + roll);

  roll += abilityScore(selectedAttack.baseStat);
  console.log('roll after abilityScore ' + roll);

  document.getElementById('display').innerText = roll;
}
//initiative function
var initiativeButton = document.getElementById('initiativeButton');
initiativeButton.addEventListener('click', initiativeRoll);

function initiativeRoll() {
  var roll = diceRoll(1, 20);
  roll += abilityScore('dexterity');

  console.log(roll);
  document.getElementById('display').innerText = roll;
}
document.getElementById('saveForm');
saveForm.addEventListener('submit', saveRoll);

function saveRoll(event) {
  event.preventDefault();
  var baseStat = document.getElementById('saveStat').value;
  var roll = diceRoll(1, 20);
  roll += abilityScore(baseStat);
  console.log(roll);
  document.getElementById('display').innerText = roll;
}
