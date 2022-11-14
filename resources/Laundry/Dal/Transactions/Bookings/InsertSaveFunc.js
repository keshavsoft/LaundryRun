import _ from "../../../resources/js/lodash";
import { BookingsInsertFunc } from "../../ToJson/Bookings";

import { QrCodeSaveFunc } from "../../Dal/QrCodes/PushFuncs/SaveFunc";

let InsertSaveFunc = async ({ inDataToSave = {} }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalJsonFileName = "Bookings.json";

        let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
        let LocalKeys = Object.keys(LocalCustomersDataAsJson);
        let max = 1;

        if (LocalKeys.length > 0) {
            let LocalKeysAsNumbers = toNumbers(LocalKeys);

            max = Math.max(...LocalKeysAsNumbers) + 1;
        };

        let LocalFromJsonSave = await BookingsInsertFunc({
            inDataToSave: await LocalTemplateDataToSave({ inDataToSave }),
            inPK: max
        });
        // console.log("LocalFromJsonSave : ", LocalFromJsonSave);
        if (LocalFromJsonSave.KTF === false) {
            LocalReturnObject.KReason = LocalReturnObject.KReason;
            return await LocalReturnObject;
        };

        QrCodeSaveFunc({ inDataToSave: max });

        LocalReturnObject.KTF = true;
        LocalReturnObject.KResult = `${max} saved successfully...`;
        LocalReturnObject.kPK = max;
        LocalReturnObject.KTF = true;

        return await LocalReturnObject;
    } catch (error) {
        console.log("error InsertFunc : ", error);
    };

    return await LocalReturnObject;
};

let LocalMaxPkFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalJsonFileName = "Bookings.json";

        let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
        let LocalKeys = Object.keys(LocalCustomersDataAsJson);
        let max = 1;

        if (LocalKeys.length > 0) {
            let LocalKeysAsNumbers = toNumbers(LocalKeys);

            max = Math.max(...LocalKeysAsNumbers) + 1;
        };

        return await max;
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

let toNumbers = arr => arr.map(Number);

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

export { InsertSaveFunc };