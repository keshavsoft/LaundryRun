let CommonJsonFileName = "Customers.json";
let CommonDataPath = `./KData/JSON/2017/Data/Masters/${CommonJsonFileName}`;

let UniqueFunc = async ({ inObjectToInsert = {} }) => {
    let LocalJsonFileName = "Customers.json";

    let LocalReturnObject = { KTF: false, KResult: "" };

    let UniqueColumnsData = await Neutralino.filesystem.readFile(`./KData/JSON/UniqueColumns/${LocalJsonFileName}`);
    let UniqueColumnsDataAsJson = JSON.parse(UniqueColumnsData);

    let LocalCustomersData = await Neutralino.filesystem.readFile(CommonDataPath);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    let LocalValueToCheck = _.get(inObjectToInsert, UniqueColumnsDataAsJson.ColumnName);

    let LocalDataNeeded = _.map(Object.values(LocalCustomersDataAsJson.CustomerNames), UniqueColumnsDataAsJson.ColumnName);

    if (LocalDataNeeded.includes(LocalValueToCheck)) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.KReason = `${LocalValueToCheck} : ${UniqueColumnsDataAsJson.ColumnName} already found in Customers.json.`;
        return await LocalReturnObject;
    };

    return await LocalReturnObject;
};

let UniqueColumnReturn = async () => {
    let UniqueColumnsData = await Neutralino.filesystem.readFile('./KData/JSON/UniqueColumns/Customers.json');
    let UniqueColumnsDataAsJson = JSON.parse(UniqueColumnsData);

    return await UniqueColumnsDataAsJson.ColumnName;
};

let InsertFunc = async ({ inDataToSave = {} }) => {
    let inObjectToInsert = inDataToSave
    let LocalJsonFileName = "Customers.json";

    let LocalReturnObject = { KTF: false, KResult: "" };

    let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
    let ModalDataAsJson = JSON.parse(ModalData);

    let LocalCustomersData = await Neutralino.filesystem.readFile('./KData/JSON/2017/Data/Masters/Customers.json');

    //  let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    let LocalKeys = Object.keys(LocalCustomersDataAsJson.CustomerNames);
    let max = 1;
    let LocalFromUnique = await UniqueFunc({ inObjectToInsert });

    if (LocalFromUnique.KTF) {
        LocalReturnObject.KReason = LocalFromUnique.KReason;

        return await LocalReturnObject;
    };

    if (LocalKeys.length > 0) {
        let LocalKeysAsNumbers = toNumbers(LocalKeys);

        max = Math.max(...LocalKeysAsNumbers) + 1;
    };

    let LocalNewData = _.pick(inObjectToInsert, Object.keys(ModalDataAsJson));
    LocalCustomersDataAsJson.CustomerNames[max] = LocalNewData;


    let LocalFromWriteFile = await Neutralino.filesystem.writeFile('./KData/JSON/2017/Data/Masters/Customers.json', JSON.stringify(LocalCustomersDataAsJson));

    if (LocalFromWriteFile.success) {
        let LocalReturnColumnName = await UniqueColumnReturn();

        LocalReturnObject.KResult = `${inObjectToInsert[LocalReturnColumnName]} saved successfully...`;
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

const toNumbers = arr => arr.map(Number);

export { InsertFunc };