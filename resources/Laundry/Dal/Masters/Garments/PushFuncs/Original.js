let StartFunc = async ({ inFolderName, inFileName, inItemName, inDataToSave = {} }) => {
    let inObjectToInsert = inDataToSave
    let LocalDataPath = `./KData/JSON/2017/Data/${inFolderName}/${inFileName}`;

    let LocalReturnObject = { KTF: false, KResult: "" };

    let LocalCustomersData = await Neutralino.filesystem.readFile(LocalDataPath);

    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    let LocalKeys = Object.keys(LocalCustomersDataAsJson[inItemName]);
    let max = 1;

    if (LocalKeys.length > 0) {
        let LocalKeysAsNumbers = toNumbers(LocalKeys);

        max = Math.max(...LocalKeysAsNumbers) + 1;
    };

    LocalCustomersDataAsJson[inItemName][max] = inObjectToInsert;

    let LocalFromWriteFile = await Neutralino.filesystem.writeFile(LocalDataPath, JSON.stringify(LocalCustomersDataAsJson));

    if (LocalFromWriteFile.success) {

        //  LocalReturnObject.KResult = `${inObjectToInsert[LocalReturnColumnName]} saved successfully...`;
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

const toNumbers = arr => arr.map(Number);

export { StartFunc };