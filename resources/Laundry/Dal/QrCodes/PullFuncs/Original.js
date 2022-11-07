let CommonJsonFileName = "QrCodes.json";
let CommonDataPath = `./KData/JSON/2017/Data/Transactions/${CommonJsonFileName}`;
let CommonItemName = "QrCodes";

let StartFunc = async () => {

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalData = await Neutralino.filesystem.readFile(CommonDataPath);
    let LocalDataAsJson = JSON.parse(LocalData);

    if ((CommonItemName in LocalDataAsJson) === false) {
        LocalReturnObject.KReason = `${CommonItemName} not found in ${CommonJsonFileName}`;
        return await LocalReturnObject;
    };

    LocalReturnObject.JsonData = LocalDataAsJson[CommonItemName];
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

let FullJsonData = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalData = await Neutralino.filesystem.readFile(CommonDataPath);
    LocalReturnObject.JsonData =JSON.parse(LocalData);
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

export { StartFunc, FullJsonData }