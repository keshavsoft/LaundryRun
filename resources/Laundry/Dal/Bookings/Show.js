let CommonJsonFileName = "Bookings.json";
let CommonDataPath = `./KData/JSON/2017/Data/Transactions/${CommonJsonFileName}`;
let CommonItemName = "Bookings";


let ShowFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let ModalData = await Neutralino.filesystem.readFile(CommonDataPath);
    let ModalDataAsJson = JSON.parse(ModalData);

    let LocalCustomersData = await Neutralino.filesystem.readFile(CommonDataPath);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    let LocalCollectionData = Object.keys(LocalCustomersDataAsJson[CommonItemName]).map(key => ({ key, value: (LocalCustomersDataAsJson[CommonItemName])[key] }));

    LocalReturnObject.JsonData = LocalCollectionData;
    return await LocalReturnObject;
};

let ShowAllFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    try {
        
        let LocalCustomersData = await Neutralino.filesystem.readFile(CommonDataPath);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

        let LocalCollectionData = Object.keys(LocalCustomersDataAsJson[CommonItemName]).map(key => ({ key, value: (LocalCustomersDataAsJson[CommonItemName])[key] }));

        LocalReturnObject.JsonData = LocalCollectionData;
        LocalReturnObject.KTF = true;
    } catch (error) {
        //LocalReturnObject.KError =`${LocalFileName} `;
        LocalReturnObject.KError = error;
    };
    return await LocalReturnObject;
};


let ShowTodayFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    try {

        let stats = await Neutralino.filesystem.getStats(CommonDataPath);

        let LocalCustomersData = await Neutralino.filesystem.readFile(CommonDataPath);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
        let LocalCollectionData = Object.keys(LocalCustomersDataAsJson[CommonItemName]).map(key => ({ key, value: (LocalCustomersDataAsJson[CommonItemName])[key] }));

        let LocalFilteredData = _.filter(LocalCollectionData, (LoopItem) => {
            if ("DateTime" in LoopItem.value) {
                return LoopItem.value.DateTime.substring(0, 10) === LocalGetDateOnly();
            };
        });

        LocalReturnObject.JsonData = LocalFilteredData;

    } catch (error) {
        //LocalReturnObject.KError =`${LocalFileName} `;
        LocalReturnObject.KError = error;
    };
    return await LocalReturnObject;
};

let ToStart = async () => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    let LocalCollectionData = Object.keys(LocalCustomersDataAsJson).map(key => ({ key, value: LocalCustomersDataAsJson[key] }));
    let LocalFilteredData = _.filter(LocalCollectionData, (LoopItem) => {
        if ("WashingDone" in LoopItem.value) {
            return (LoopItem.value.WashingDone.KTF === true) === false;
        } else {
            return true;
        }
    });

    LocalReturnObject.JsonData = LocalFilteredData;
    return await LocalReturnObject;
};

let ShowWashed = async () => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
    let ModalDataAsJson = JSON.parse(ModalData);

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    Object.entries(LocalCustomersDataAsJson).forEach(
        ([LoopKey, LoopValue]) => {
            if ('DateTime' in LoopValue) {
                let LoopRowDataTime = LoopValue.DateTime.substring(0, 10);
                let LocalSysDateTime = LocalGetDateOnly();

                if (LoopRowDateTime === LocalSysDateTime) {
                    let LocalWashed = LoopValue.WashingDone;
                    if (LocalWashed === undefined || (LocalWashed.KTF === true) === false) {
                        let LoopNewObject = JSON.parse(JSON.stringify(ModalDataAsJson));
                        let LocalLoopObject = {};

                        Object.entries(LoopNewObject).forEach(
                            ([key, value]) => {
                                LocalLoopObject[key] = LoopValue[key];
                                value = LoopValue[key];
                            }
                        );

                        LocalReturnObject.JsonData[LoopKey] = LocalLoopObject;
                    };
                };
            };
        }
    );

    return await LocalReturnObject;
};

let LocalGetDateOnly = () => {
    let date = new Date();

    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let yyyy = date.getFullYear();

    return `${dd}-${MM}-${yyyy}`;
};
export { ShowFunc, ShowAllFunc, ShowTodayFunc }
