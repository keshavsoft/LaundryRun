let StartFunc = async () => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    LocalReturnObject.JsonData = LocalCustomersDataAsJson;
    LocalReturnObject.KTF = true;
    
    return await LocalReturnObject;
};

export { StartFunc }
