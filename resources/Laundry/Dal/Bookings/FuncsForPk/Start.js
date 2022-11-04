let StartFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalJsonFileName = "Bookings.json";

        let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/Data/Transactions/${LocalJsonFileName}`);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
        let LocalKeys = Object.keys(LocalCustomersDataAsJson);
        let LocalLastKey = LocalKeys[LocalKeys.length - 1];

        LocalReturnObject.KTF = true;
        LocalReturnObject.LastPk = parseInt(LocalLastKey);
    } catch (error) {
        console.log("error InsertFunc : ", error);
    };

    return await LocalReturnObject;
};

export { StartFunc };