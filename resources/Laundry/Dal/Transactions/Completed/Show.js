let ShowTodayFunc = async () => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    let LocalCollectionData = Object.keys(LocalCustomersDataAsJson).map(key => ({ key, value: LocalCustomersDataAsJson[key] }));
    
    let LocalFilteredData = _.filter(LocalCollectionData, (LoopItem) => {
        if ("WashingDone" in LoopItem.value) {
            return (LoopItem.value.WashingDone.KTF === true) === false;
        }else{
            return true;
        }
    });

    LocalReturnObject.JsonData = LocalFilteredData;
    console.log("LocalReturnObject : ", LocalReturnObject);
    return await LocalReturnObject;
};

let LocalGetDateOnly = () => {
    let date = new Date();

    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let yyyy = date.getFullYear();

    return `${dd}-${MM}-${yyyy}`;
};
