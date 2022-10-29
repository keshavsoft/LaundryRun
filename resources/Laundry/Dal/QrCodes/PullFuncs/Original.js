let StartFunc = async () => {
    let LocalJsonFileName = "QrCodes.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalDataAsJson = JSON.parse(LocalData);

    LocalReturnObject.JsonData = LocalDataAsJson;
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

export { StartFunc }