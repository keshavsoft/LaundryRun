let CommonJsonFileName = "QrCodes.json";
let CommonDataPath = `./KData/JSON/2017/Data/Transactions/${CommonJsonFileName}`;
let CommonItemName = "QrCodes";

let StartFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalCustomersData = await Neutralino.filesystem.readFile(CommonDataPath);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

        let LocalKeys = Object.keys(LocalCustomersDataAsJson[CommonItemName]);

        LocalReturnObject.KTF = true;
        LocalReturnObject.MaxPk = 0;

        if (LocalKeys.length > 0) {
            let LocalKeysAsNumbers = toNumbers(LocalKeys);

            LocalReturnObject.MaxPk = Math.max(...LocalKeysAsNumbers);
        };

    } catch (error) {
        console.log("error InsertFunc : ", error);
    };

    return await LocalReturnObject;
};

const toNumbers = arr => arr.map(Number);

export { StartFunc };