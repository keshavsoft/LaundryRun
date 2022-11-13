import { StartFunc as FuncsForPkStartFunc } from "../FuncsForPk/Start.js";
//import { StartFunc as QrCodesStartFunc } from "../../QrCodes/PullFuncs/Original";
import { StartFunc as QrCodesStartFunc } from "../../QrCodes/PullFuncs/WithBookingData.js";
import { StartFunc as CompletedStartFunc } from "../../Completed/PullFuncs/Original.js";
import { StartFunc as OriginalStartFunc } from "./Original.js";

// let CommonJsonFileName = "Bookings.json";
// let CommonDataPath = `./KData/JSON/2017/Data/Transactions/${CommonJsonFileName}`;
// let CommonItemName = "Bookings";

let FromPk = async ({ inRowPK }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    // let LocalCustomersData = await Neutralino.filesystem.readFile(CommonDataPath);
    // let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    let LocalOriginalData = await OriginalStartFunc();
    if (LocalOriginalData.KTF === false) {
        LocalReturnObject.KReason = LocalOriginalData.KReason;
        return await LocalReturnObject;
    };

    if (inRowPK in LocalOriginalData.JsonData) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.KResult = LocalOriginalData.JsonData[inRowPK];
        LocalReturnObject.KResult = { ...LocalReturnObject.KResult, OrderNo: inRowPK };
    };

    return await LocalReturnObject;
};

let FromPkForQrCodes = async ({ inRowPK }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };
    let LocalFromOriginalData = await FromPk({ inRowPK });

    if (LocalFromOriginalData.KTF === false) {
        LocalReturnObject.KReason = LocalFromOriginalData.KReason;
        return await LocalReturnObject;
    };
    LocalReturnObject.KTF = true;
    LocalReturnObject.ForQrCode = LocalFromOriginalData.KResult;

    let LocalGarmentsArray = Object.values(LocalReturnObject.ForQrCode.GarmentDetails).map(
        (LoopItem) => {
            return `${LoopItem.Name}:${LoopItem.Pcs}`
        }
    );

    let LocalGarmentsPcsArray = Object.values(LocalReturnObject.ForQrCode.GarmentDetails).map(LoopItem => LoopItem.Pcs);

    LocalReturnObject.ForQrCode.GarmentDetailsAsString = LocalGarmentsArray.toString();
    LocalReturnObject.ForQrCode.GarmentPcsTotal = LocalGarmentsPcsArray.reduce((a, b) => a + b, 0);

    // console.log("LocalGarmentsPcsArray.ForQrCode : ", LocalGarmentsPcsArray);
    return await LocalReturnObject;
};

let FromPkWithQrCodeObject = async ({ inRowPK }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };
    let LocalFromOriginalData = await FromPk({ inRowPK });

    if (LocalFromOriginalData.KTF === false) {
        LocalReturnObject.KReason = LocalFromOriginalData.KReason;
        return await LocalReturnObject;
    };

    LocalReturnObject.KTF = true;
    LocalReturnObject.ForQrCode = LocalFromOriginalData.KResult;

    let LocalFromQrCodesStartFunc = await QrCodesStartFunc();

    if (LocalFromQrCodesStartFunc.KTF === false) {
        LocalReturnObject.KReason = LocalFromQrCodesStartFunc.KReason;
        return await LocalReturnObject;
    };

    let LocalQrCodesNeeded = _.filter(LocalFromQrCodesStartFunc.JsonData, { BookingRef: inRowPK });
    let LocalKeyNeeded = ["GarmentsRef", "GarmentName", "QrCode"];

    let LocalQrCodesNeededWithKeys = _.map(LocalQrCodesNeeded, LoopItem => _.pick(LoopItem, LocalKeyNeeded));
    LocalReturnObject.ForQrCode.QrCodesArray = LocalQrCodesNeededWithKeys;

    return await LocalReturnObject;
};

let LastPkData = async () => {
    let LocalReturnObject = { KTF: false, KResult: "" };
    let LocalFromFromPk;

    let LocalFromFuncsForPkStartFunc = await FuncsForPkStartFunc();

    if (LocalFromFuncsForPkStartFunc.KTF === false) {
        LocalReturnObject.KReason = LocalFromFuncsForPkStartFunc.KReason;
        return await LocalReturnObject;
    };

    LocalFromFromPk = await FromPk({ inRowPK: LocalFromFuncsForPkStartFunc.LastPk });

    if (LocalFromFromPk.KTF === false) {
        LocalReturnObject.KReason = LocalFromFromPk.KReason;
        return await LocalReturnObject;
    };

    LocalReturnObject.KResult = LocalFromFromPk.KResult;
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;

};

let FromPkWithCompleted = async ({ inRowPK }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };
    let LocalFromOriginalData = await FromPk({ inRowPK });

    if (LocalFromOriginalData.KTF === false) {
        LocalReturnObject.KReason = LocalFromOriginalData.KReason;
        return await LocalReturnObject;
    };

    LocalReturnObject.KTF = true;
    LocalReturnObject.ForQrCode = LocalFromOriginalData.KResult;

    let LocalFromQrCodesStartFunc = await QrCodesStartFunc();

    if (LocalFromQrCodesStartFunc.KTF === false) {
        LocalReturnObject.KReason = LocalFromQrCodesStartFunc.KReason;
        return await LocalReturnObject;
    };

    let LocalQrCodesNeeded = _.filter(LocalFromQrCodesStartFunc.JsonData, { BookingRef: inRowPK });
    let LocalKeyNeeded = ["GarmentsRef", "GarmentName", "QrCode"];

    let LocalQrCodesNeededWithKeys = _.map(LocalQrCodesNeeded, LoopItem => _.pick(LoopItem, LocalKeyNeeded));
    LocalReturnObject.ForQrCode.QrCodesArray = LocalQrCodesNeededWithKeys;

    let LocalFromCompletedStartFunc = await CompletedStartFunc();

    if (LocalFromCompletedStartFunc.KTF === false) {
        LocalReturnObject.KReason = LocalFromCompletedStartFunc.KReason;
        return await LocalReturnObject;
    };

    LocalReturnObject.ForQrCode.QrCodesArray = _.map(LocalReturnObject.ForQrCode.QrCodesArray, LoopItem => {
        LoopItem.Completed = LoopItem.QrCode in LocalFromCompletedStartFunc.JsonData;
        return LoopItem;
    });

    return await LocalReturnObject;
};

export { FromPk, LastPkData, FromPkForQrCodes, FromPkWithQrCodeObject, FromPkWithCompleted };