import { StartFunc as QrCodesCheckQrCode } from "../../QrCodes/PullFuncs/CheckQrCode.js";

let CommonFileName = "Completed.json";

let InsertFunc = async ({ inQrCode, inQrCodeScanned }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalFromCheck = await LocalCheckBeforeSave({ inQrCode });
        
        if (LocalFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCheck.KReason;
            return await LocalReturnObject;
        };

        let LocalData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/Data/Transactions/${CommonFileName}`);
        let LocalDataAsJson = JSON.parse(LocalData);

        LocalDataAsJson[inQrCode] = {
            QrCodeScanned: inQrCodeScanned,
            DateTime: LocalGetDate()
        };

        let LocalFromWriteFile = await Neutralino.filesystem.writeFile(`./KData/JSON/2017/Data/Transactions/${CommonFileName}`, JSON.stringify(LocalDataAsJson));

        if (LocalFromWriteFile.success) {
            LocalReturnObject.KResult = `${inQrCode} saved successfully...`;
            LocalReturnObject.KTF = true;
        };

        return await LocalReturnObject;
    } catch (error) {
        console.log("error InsertFunc : ", error);
    };

    return await LocalReturnObject;
};

let LocalCheckBeforeSave = async ({ inQrCode }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/Data/Transactions/${CommonFileName}`);
        let LocalDataAsJson = JSON.parse(LocalData);

        if (inQrCode in LocalDataAsJson) {
            LocalReturnObject.KReason = `${inQrCode} is already scanned!`;
            return await LocalReturnObject;
        };

        let LocalFromQrCodesCheckQrCode = await QrCodesCheckQrCode({ inQrCode });

        if (LocalFromQrCodesCheckQrCode.KTF === false) {
            LocalReturnObject.KReason = LocalFromQrCodesCheckQrCode.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.KTF = true;

        return await LocalReturnObject;
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

export { InsertFunc }
