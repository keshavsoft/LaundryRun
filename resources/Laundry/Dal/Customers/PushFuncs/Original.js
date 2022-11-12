let StartFunc = async ({ inFolderName, inFileName, inItemName, inDataToSave = {} }) => {
    let inObjectToInsert = inDataToSave
    let LocalJsonFileName = "Customers.json";

    let LocalReturnObject = { KTF: false, KResult: "" };

    let LocalCustomersData = await Neutralino.filesystem.readFile('./KData/JSON/2017/Data/Masters/Customers.json');

    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    let LocalKeys = Object.keys(LocalCustomersDataAsJson.CustomerNames);
    let max = 1;

    if (LocalKeys.length > 0) {
        let LocalKeysAsNumbers = toNumbers(LocalKeys);

        max = Math.max(...LocalKeysAsNumbers) + 1;
    };

    LocalCustomersDataAsJson.CustomerNames[max] = inObjectToInsert;

    let LocalFromWriteFile = await Neutralino.filesystem.writeFile('./KData/JSON/2017/Data/Masters/Customers.json', JSON.stringify(LocalCustomersDataAsJson));

    if (LocalFromWriteFile.success) {

        //  LocalReturnObject.KResult = `${inObjectToInsert[LocalReturnColumnName]} saved successfully...`;
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

const toNumbers = arr => arr.map(Number);

export { StartFunc };