window.addEventListener("hashchange", () => {
  selectWizard();
});

const state = {
  wizardList: [],
  character: null
};

function selectWizard() {
  getEventHash();
  renderWizardDetails();
}

function getEventHash() {
  const name = window.location.hash.slice(1);
  const singleWizard = state.wizardList.find((character) => {
    return character.name === name;
  });

  state.character = singleWizard;
  console.log(state);
}

console.log(getEventHash());

function renderWizardDetails() {
  if (state.character) {
    getSingleWizard();
  }
}

const allWizardsDiv = document.querySelector(".listDiv");
const characterDiv = document.querySelector(".charDiv");

async function getSingleWizard() {
  const wizardData = await fetch(
    `https://hp-api.onrender.com/api/characters/${state.character.name}`
  );
  const singleWizardData = await wizardData.json();
  state.character = singleWizardData;
  console.log(state);
}

function renderWizardList() {
  const allWizards = state.wizardList.map((wizard) => {
    return `<div> <a href=#${wizard.name}>${wizard.name}</a> </div>`;
  });
  allWizardsDiv.innerHTML = allWizards.join("");
}

async function getWizardList() {
  const info = await fetch("https://hp-api.onrender.com/api/characters");
  const wizardData = await info.json();
  console.log(wizardData);
  state.wizardList = wizardData;
  console.log(state);
}

async function render() {
  await getWizardList();
  renderWizardList();
  selectWizard();
}

render();
