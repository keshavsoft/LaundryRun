let StartFunc = () => {
    let jVarLocalQuitId = document.getElementById("QuitId");

    jVarLocalQuitId.addEventListener('click', async () => {
        await Neutralino.app.exit();
    });
};

export { StartFunc }