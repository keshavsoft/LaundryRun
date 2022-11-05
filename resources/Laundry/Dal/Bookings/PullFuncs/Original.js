let CommonJsonFileName = "Bookings.json";
let CommonDataPath = `./KData/JSON/2017/Data/Transactions/${CommonJsonFileName}`;
let CommonItemName = "Bookings";

let StartFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalCustomersData = await Neutralino.filesystem.readFile(CommonDataPath);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    LocalReturnObject.JsonData = LocalCustomersDataAsJson[CommonItemName];
    LocalReturnObject.KTF = true;
    
    return await LocalReturnObject;
};

export { StartFunc }
