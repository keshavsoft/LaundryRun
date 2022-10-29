let ShowFunc = async () => {
    let LocalJsonFileName = "Customers.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
    let ModalDataAsJson = JSON.parse(ModalData);

    let LocalCustomersData = await Neutralino.filesystem.readFile('./KData/JSON/2017/Data/Masters/Customers.json');
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    Object.entries(LocalCustomersDataAsJson.CustomerNames).forEach(
        ([LoopKey, LoopValue]) => {

            let LoopNewObject = JSON.parse(JSON.stringify(ModalDataAsJson));
            let LocalLoopObject = {};

            Object.entries(LoopNewObject).forEach(
                ([key, value]) => {
                    LocalLoopObject[key] = LoopValue[key];
                    value = LoopValue[key];

                }
            );

            LocalReturnObject.JsonData[LoopKey] = LocalLoopObject;
        }
    );

    return await LocalReturnObject;
};

export { ShowFunc };
