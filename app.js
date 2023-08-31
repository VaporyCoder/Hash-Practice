window.addEventListener('hashchange', () => {
selectChar();
});

const state = {
  charList: [],
  singleChar: null
};

function getEventFromHash() {
  const id = window.location.hash.slice(1);
  const singleChar = state.charList.find((char) => {
    return char.id === id;
  });
  state.singleChar = singleChar;
  console.log(singleChar);
}

function selectChar(){
  getEventFromHash();
  renderCharDetails();
};

const allCharDiv = document.querySelector('.listDiv');
const charDiv = document.querySelector('.charDiv');

async function getSingleChar() {
  const singleChar = await fetch (`https://api.potterdb.com/v1/characters/${state.singleChar.id}`);
  const singleCharData = await singleChar.json();
  state.singleChar = singleCharData;
  console.log(state);
  const names = state.singleChar.attributes.map((name) => {
    return `<p>${name.name}</p>`;
  });
  charDiv.innerHTML = `<h1>${state.singleChar.attributes.name}</h1>` + names.join(' ');
}

function renderCharDetails() {
  if (state.singleChar) {
    getSingleChar();
  }
}

function renderCharList() {
  const allChars = state.charList.map((char) => {
    return `<div> <a href=#${char.id}> ${char.attributes.name} </a> </div>`;
  });
  allCharDiv.innerHTML = allChars.join('');
}

async function getCharList() {
  const charList = await fetch (`https://api.potterdb.com/v1/characters`);
  const charData = await charList.json();
  console.log(charData.data);
  state.charList = charData.data;
  console.log(state);
};

async function render() {
  await getCharList();
  renderCharList();
  selectChar();
}

render();