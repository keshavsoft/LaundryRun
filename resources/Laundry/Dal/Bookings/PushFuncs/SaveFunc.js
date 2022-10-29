import { StartFunc as MaxPkFunc } from "../FuncsForPk/MaxPk";
import { FromBooking as QrCodesStartFunc } from "../../QrCodes/PushFuncs/SaveFunc";
import _ from "../../../js/lodash";

let StartFunc = async ({ inDataToSave = {} }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalFromFuncsForPkStartFunc = await MaxPkFunc();

        if (LocalFromFuncsForPkStartFunc.KTF === false) {
            LocalReturnObject.KReason = LocalFromFuncsForPkStartFunc.KReason;
            return await LocalReturnObject;
        };

        let LocalMax = LocalFromFuncsForPkStartFunc.MaxPk + 1;

        let LocalFromJsonSave = await LocalToJson({
            inDataToSave: await LocalTemplateDataToSave({ inDataToSave }),
            inPK: LocalMax
        });
        
        if (LocalFromJsonSave.KTF === false) {
            LocalReturnObject.KReason = LocalReturnObject.KReason;
            return await LocalReturnObject;
        };

        let LocalFromQrCodesStartFunc = await QrCodesStartFunc({ inBookingPk: LocalMax.toString() });

        LocalReturnObject.KTF = true;
        LocalReturnObject.KResult = `${LocalMax} saved successfully...`;
        LocalReturnObject.kPK = LocalMax;

        return await LocalReturnObject;
    } catch (error) {
        console.log("error InsertFunc : ", error);
    };

    return await LocalReturnObject;
};

let LocalTemplateDataToSave = async ({ inDataToSave }) => {
    try {
        let LocalJsonFileName = "Bookings.json";

        let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
        let ModalDataAsJson = JSON.parse(ModalData);

        let LocalNewData = _.pick(inDataToSave, Object.keys(ModalDataAsJson));
        LocalNewData.DateTime = LocalGetDate();
        // console.log("LocalNewData : ", inDataToSave, LocalNewData);
        return await LocalNewData;
    } catch (error) {
        console.log("error InsertFunc : ", error);
    };
};

let LocalToJson = async ({ inDataToSave, inPK }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalJsonFileName = "Bookings.json";

        let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

        if ((inPK in LocalCustomersDataAsJson) === false) {
            LocalCustomersDataAsJson[inPK] = inDataToSave;

            let LocalFromWriteFile = await Neutralino.filesystem.writeFile(`./KData/JSON/2017/${LocalJsonFileName}`, JSON.stringify(LocalCustomersDataAsJson));

            if (LocalFromWriteFile.success) {
                LocalReturnObject.KTF = true;
            };

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
export { StartFunc };