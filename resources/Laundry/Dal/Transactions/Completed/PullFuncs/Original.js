
let StartFunc = async () => {
    let LocalJsonFileName = "Completed.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/Data/Transactions/${LocalJsonFileName}`);
    let LocalDataAsJson = JSON.parse(LocalData);
    //let LocalCollectionData = Object.keys(LocalDataAsJson).map(key => ({ key, value: LocalDataAsJson[key] }));

    LocalReturnObject.JsonData = LocalDataAsJson;
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

export { StartFunc }