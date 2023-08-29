const state = {
  wizardList: [],
  character: null,
};

async function getWizardList() {
  const info = await fetch("https://hp-api.onrender.com/api/characters");
  const wizardData = await info.json();
  console.log(wizardData);
  state.wizardList = wizardData;
  console.log(state);
}

async function render() {
    await getWizardList();
}

render();
