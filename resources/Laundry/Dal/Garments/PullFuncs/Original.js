let StartFunc = async ({ inFolderName, inFileName, inItemName }) => {
    let LocalDataPath = `./KData/JSON/2017/Data/${inFolderName}/${inFileName}`;

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalCustomersData = await Neutralino.filesystem.readFile(LocalDataPath);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    LocalReturnObject.JsonData = LocalCustomersDataAsJson[inItemName];
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

export { StartFunc }
