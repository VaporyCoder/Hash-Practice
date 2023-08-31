window.addEventListener('hashchange',() => {
  selectChar();
})

const state = {
  charList: [],
  singleChar: null
};

async function getSingleChar() {
  const charData = await fetch (`https://api.potterdb.com/v1/characters/${state.singleChar.id}`);
  const singleCharData = await charData.json();
  state.singleChar = singleCharData;
  console.log(state);
};

getSingleChar();

const allCharDiv = document.querySelector('.listDiv');

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
}

render();