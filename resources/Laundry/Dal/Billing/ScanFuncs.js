let InsertFunc = async ({ inQrCode = 0 }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalJsonFileName = "Billing.json";

        let LocalData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
        let LocalDataAsJson = JSON.parse(LocalData);

        if (inQrCode in LocalDataAsJson) {
        };

        LocalDataAsJson[inQrCode] = {
            DateTime: LocalGetDate()
        };

        let LocalFromWriteFile = await Neutralino.filesystem.writeFile(`./KData/JSON/2017/${LocalJsonFileName}`, JSON.stringify(LocalDataAsJson));

        if (LocalFromWriteFile.success) {
            LocalReturnObject.KResult = `${inQrCode} saved successfully...`;
            LocalReturnObject.KTF = true;
        };

    } catch (error) {
        console.log("error InsertFunc : ", error);
    };

    return await LocalReturnObject;
};
let LocalGetDate = () => {
    let date = new Date();

    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let HH = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    return `${dd}-${MM}-${yyyy}-${HH}-${mm}-${ss}`;
};

export { InsertFunc };
