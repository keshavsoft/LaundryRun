let ShowFunc = async () => {
    let LocalJsonFileName = "Garments.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    try {
        let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
        let ModalDataAsJson = JSON.parse(ModalData);

        let LocalCustomersData = await Neutralino.filesystem.readFile('./KData/JSON/2017/Garments.json');
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

        Object.entries(LocalCustomersDataAsJson).forEach(
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
    } catch (error) {
        console.log('error : ', error);
        LocalReturnObject.KReason = error;
    };

    return await LocalReturnObject;
};

export { ShowFunc };
