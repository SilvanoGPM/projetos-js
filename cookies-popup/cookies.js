cookies({
    containerName: "cookies-container",
    saveName: "cookies-save",
    functions: { marketing, analytics },
});

function cookies({ containerName, saveName, functions }) {
    const container = document.querySelector("." + containerName) || document.getElementById(containerName);

    const save = document.querySelector("." + saveName) || document.getElementById(saveName);

    if (!container || !save) return null;

    const localPref = JSON.parse(localStorage.getItem('cookies-pref'));
    if (localPref) activeFunctions(localPref);

    function getFormPref() {
        return [...container.querySelectorAll("[data-function]")]
            .filter((el) => el.checked)
            .map((el) => el.getAttribute("data-function"));
    }

    function activeFunctions(pref) {
        pref.forEach(name => functions[name]());
        container.style.display = 'none';

        localStorage.setItem('cookies-pref', JSON.stringify(pref));
    }

    function handleSave() {
        const pref = getFormPref();
        activeFunctions(pref);
    }

    save.addEventListener("click", handleSave);
}

function marketing() {
    console.log("Função de marking");
}

function analytics() {
    console.log("Função de analytics");
}
