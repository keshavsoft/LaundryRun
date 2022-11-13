let PickFunc = async ({ inRowPK }) => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "" };

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    if (inRowPK in LocalCustomersDataAsJson) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.KResult = LocalCustomersDataAsJson[inRowPK];
    };

    return await LocalReturnObject;
};

let PickFuncForQrCode = async ({ inRowPK }) => {
    let LocalJsonFileName = "Bookings.json";
    let LocalReturnData;
    let LocalReturnObject = { KTF: false, KResult: "" };

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    if (inRowPK in LocalCustomersDataAsJson) {
        LocalReturnData = JSON.parse(JSON.stringify(LocalCustomersDataAsJson[inRowPK]));
        LocalReturnData.QrCodesForPrint = [];

        Object.entries(LocalReturnData.QrCodes).forEach(
            ([key, value]) => {
                for (let i = 0; i < value.Pcs; i++) {
                    let LoopInsideObject = JSON.parse(JSON.stringify(value));
                    LoopInsideObject.RowNumber = key;
                    LoopInsideObject.PK = i;

                    LocalReturnData.QrCodesForPrint.push(LoopInsideObject);
                }
            }
        );

        LocalReturnObject.KTF = true;
        LocalReturnObject.KResult = LocalReturnData;
    };

    return await LocalReturnObject;
};

let LastBooking = async () => {
    let LocalJsonFileName = "Bookings.json";

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    let LocalKeys = Object.keys(LocalCustomersDataAsJson);
    let LocalLastKey = LocalKeys[LocalKeys.length - 1];

    return await PickFunc({ inRowPK: LocalLastKey });
};


export { PickFunc, PickFuncForQrCode, LastBooking };