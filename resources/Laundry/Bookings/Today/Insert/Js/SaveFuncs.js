import { BookingInsertSuccessFunc } from "./HtmlFuns/FromHbs.js";
import { ToModal } from "../../QrCode/Js/QrCodeToModal.js";
import { StartFunc as PushFuncsStartFunc } from "../../../../Dal/Transactions/Bookings/PushFuncs/SaveFunc.js";
import { GarmentsValidateFunc, FormVerticalValidate } from "./ValidityFuncs.js";

let CommonGarmentDetailsKeyName = "GarmentDetails";

let jFCheckBeforeSave = async () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarmentsTotalPcs = document.getElementById("GarmentsTotalPcs");

    let jVarLocalTotalGarmnetsPcs = TotalGarmentsPcsFunc();
    jVarLocalGarmentsTotalPcs.value = jVarLocalTotalGarmnetsPcs;

    let jvarLocalFromjFFormVerticalValidate = await FormVerticalValidate();

    if (jvarLocalFromjFFormVerticalValidate.KTF === false) {
        jVarLocalReturnObject.KReason = jvarLocalFromjFFormVerticalValidate.KReason;
        return await jVarLocalReturnObject;
    };

    let jvarLocaljFFormForGarmentsValidate = await GarmentsValidateFunc();

    if (jvarLocaljFFormForGarmentsValidate.KTF === false) {
        jVarLocalReturnObject.KReason = jvarLocaljFFormForGarmentsValidate.KReason;
        return await jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;
    return await jVarLocalReturnObject;

};

let BookingSaveFunc = async () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };
    let jVarLocalFromjFCheckBeforeSave = await jFCheckBeforeSave();
    //  LocalPreSaveFunc();

    if (jVarLocalFromjFCheckBeforeSave.KTF === false) {
        jVarLocalReturnObject.KReason = jVarLocalFromjFCheckBeforeSave.KReason;
        return await jVarLocalReturnObject;
    };

    let jVarLocalObject = {};

    let LocalBookingDetails = jFBookingDetails();

    if (LocalBookingDetails.KTF) {
        jVarLocalObject = LocalBookingDetails.KResult
    };

    jVarLocalObject[CommonGarmentDetailsKeyName] = {};

    let LocalGarmentsFirstRow = jFGarmentsFirstRow();
    if (LocalGarmentsFirstRow.KTF) {
        jVarLocalObject[CommonGarmentDetailsKeyName][1] = LocalGarmentsFirstRow.KResult
    };
    let LocalGarmentsSecondRow = jFGarmentsSecondRow();
    if (LocalGarmentsSecondRow.KTF) {
        jVarLocalObject[CommonGarmentDetailsKeyName][2] = LocalGarmentsSecondRow.KResult
    };
    let LocalGarmentsThirdRow = jFGarmentsThirdRow();
    if (LocalGarmentsThirdRow.KTF) {
        jVarLocalObject[CommonGarmentDetailsKeyName][3] = LocalGarmentsThirdRow.KResult
    };
    let LocalGarmentsFourthRow = jFGarmentsFourthRow();
    if (LocalGarmentsFourthRow.KTF) {
        jVarLocalObject[CommonGarmentDetailsKeyName][4] = LocalGarmentsFourthRow.KResult
    };
    let LocalGarmentsFifthRow = jFGarmentsFifthRow();
    if (LocalGarmentsFifthRow.KTF) {
        jVarLocalObject[CommonGarmentDetailsKeyName][5] = LocalGarmentsFifthRow.KResult
    };
    let LocalGarmentsSixthRow = jFGarmentsSixthRow();
    if (LocalGarmentsSixthRow.KTF) {
        jVarLocalObject[CommonGarmentDetailsKeyName][6] = LocalGarmentsSixthRow.KResult
    };
    let LocalGarmentsSeventhRow = jFGarmentsSeventhRow();
    if (LocalGarmentsSeventhRow.KTF) {
        jVarLocalObject[CommonGarmentDetailsKeyName][7] = LocalGarmentsSeventhRow.KResult
    };
    let LocalGarmentsEightRow = jFGarmentsEightRow();
    if (LocalGarmentsEightRow.KTF) {
        jVarLocalObject[CommonGarmentDetailsKeyName][8] = LocalGarmentsEightRow.KResult
    };
    let LocalGarmentsNinethRow = jFGarmentsNinethRow();
    if (LocalGarmentsNinethRow.KTF) {
        jVarLocalObject[CommonGarmentDetailsKeyName][9] = LocalGarmentsNinethRow.KResult
    };
    let LocalGarmentsTenthRow = jFGarmentsTenthRow();
    if (LocalGarmentsTenthRow.KTF) {
        jVarLocalObject[CommonGarmentDetailsKeyName][10] = LocalGarmentsTenthRow.KResult
    };
    // let LocalGarmentsTotal = jFGarmentsTotal();
    // if (LocalGarmentsTotal.KTF) {
    //     jVarLocalObject.QrCodes[11] = LocalGarmentsTotal.KResult
    // };

    let jVarLocalFromInsert = await PushFuncsStartFunc({ inDataToSave: jVarLocalObject });
    await LocalPostSaveFunc({ inFromSave: jVarLocalFromInsert });
};

let LocalPostSaveFunc = async ({ inFromSave }) => {
    if (inFromSave.KTF) {

        let jVarLocalKCont1 = document.getElementById("KCont1");
        let jVarLocalFromBookingInsertSuccessFunc = await BookingInsertSuccessFunc();

        var template = Handlebars.compile(jVarLocalFromBookingInsertSuccessFunc);

        let jVarLocalHtml = template({ key: inFromSave.kPK, KResult: inFromSave.KResult });

        jVarLocalKCont1.insertAdjacentHTML('afterbegin', jVarLocalHtml);

        setTimeout(() => {
            const alert = bootstrap.Alert.getOrCreateInstance('#BookingInsertSuccessId');
            alert.close();
        }, 10000);

        let jVarLocalBookingInsertSuccessIdMsg = document.getElementById("BookingInsertSuccessIdMsg");

        jVarLocalBookingInsertSuccessIdMsg.innerHTML = inFromSave.KResult;

        let jVarLocalPrintQrCodeButtonId = document.getElementById("PrintQrCodeButtonId");

        jVarLocalPrintQrCodeButtonId.addEventListener('click', (event) => {
            let jVarInsideCurrentTarget = event.currentTarget;
            let jVarLocalqrcode = jVarInsideCurrentTarget.dataset.qrcode;

            ToModal({ inRowPK: jVarLocalqrcode });
        });
    } else {

    };
};

let LocalPreSaveFunc = () => {
    let jVarLocalBookingInsertSuccessId = document.getElementById("BookingInsertSuccessId");
    jVarLocalBookingInsertSuccessId.classList.add("d-none");
};

let jFBookingDetails = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalCustomerName = document.getElementById("CustomerName");
    let JVarLocalMobileNumber = document.getElementById("Mobile");
    let jVarLocalGarmentsTotalPcs = document.getElementById("GarmentsTotalPcs");
    let jVarLocalWeight = document.getElementById("Weight");
    let jvarLocalAmount = document.getElementById("Amount");
    // console.log("jVarLocalTotalGarmnetsPcs:", jVarLocalTotalGarmnetsPcs);
    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        CustomerName: jVarLocalCustomerName.value,
        Mobile: JVarLocalMobileNumber.value,
        GarmentsTotalPcs: parseInt(jVarLocalGarmentsTotalPcs.value),
        Weight: jVarLocalWeight.value,
        Amount: jvarLocalAmount.value
    };

    return jVarLocalReturnObject;
};
let TotalGarmentsPcsFunc = () => {
    let jVarLocalPcs1 = document.getElementById("Pcs1");
    let jVarLocalPcs2 = document.getElementById("Pcs2");
    let jVarLocalPcs3 = document.getElementById("Pcs3");
    let jVarLocalPcs4 = document.getElementById("Pcs4");
    let jVarLocalPcs5 = document.getElementById("Pcs5");
    let jVarLocalPcs6 = document.getElementById("Pcs6");
    let jVarLocalPcs7 = document.getElementById("Pcs7");
    let jVarLocalPcs8 = document.getElementById("Pcs8");
    let jVarLocalPcs9 = document.getElementById("Pcs9");
    let jVarLocalPcs10 = document.getElementById("Pcs10");
    let jVarLocalGarmentsTotal = 0;
    // let jVarLocalGarmentsTotal = parseInt(jVarLocalPcs1.value) + parseInt(jVarLocalPcs2.value) + parseInt(jVarLocalPcs3.value) +
    //     parseInt(jVarLocalPcs4.value) + parseInt(jVarLocalPcs5.value) + parseInt(jVarLocalPcs6.value) + parseInt(jVarLocalPcs7.value) + parseInt(jVarLocalPcs8.value) + parseInt(jVarLocalPcs9.value) + parseInt(jVarLocalPcs10.value)
    if (parseInt(jVarLocalPcs1.value) > 0) jVarLocalGarmentsTotal += parseInt(jVarLocalPcs1.value);
    if (parseInt(jVarLocalPcs2.value) > 0) jVarLocalGarmentsTotal += parseInt(jVarLocalPcs2.value);
    if (parseInt(jVarLocalPcs3.value) > 0) jVarLocalGarmentsTotal += parseInt(jVarLocalPcs3.value);
    if (parseInt(jVarLocalPcs4.value) > 0) jVarLocalGarmentsTotal += parseInt(jVarLocalPcs4.value);
    if (parseInt(jVarLocalPcs5.value) > 0) jVarLocalGarmentsTotal += parseInt(jVarLocalPcs5.value);
    if (parseInt(jVarLocalPcs6.value) > 0) jVarLocalGarmentsTotal += parseInt(jVarLocalPcs6.value);
    if (parseInt(jVarLocalPcs7.value) > 0) jVarLocalGarmentsTotal += parseInt(jVarLocalPcs7.value);
    if (parseInt(jVarLocalPcs8.value) > 0) jVarLocalGarmentsTotal += parseInt(jVarLocalPcs8.value);
    if (parseInt(jVarLocalPcs9.value) > 0) jVarLocalGarmentsTotal += parseInt(jVarLocalPcs9.value);
    if (parseInt(jVarLocalPcs10.value) > 0) jVarLocalGarmentsTotal += parseInt(jVarLocalPcs10.value);

    return jVarLocalGarmentsTotal;
};


let jFGarmentsFirstRow = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarments1 = document.getElementById("Garments1");
    let jVarLocalPcs1 = document.getElementById("Pcs1");

    if ((jVarLocalPcs1.value > 0) === false) {
        jVarLocalReturnObject.KReason = "Pcs is not positive";
        return jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        Name: jVarLocalGarments1.value,
        Pcs: parseInt(jVarLocalPcs1.value)
    };

    return jVarLocalReturnObject;
};

let jFGarmentsSecondRow = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarments2 = document.getElementById("Garments2");
    let jVarLocalPcs2 = document.getElementById("Pcs2");

    if ((jVarLocalPcs2.value > 0) === false) {
        jVarLocalReturnObject.KReason = "Pcs is not positive";
        return jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        Name: jVarLocalGarments2.value,
        Pcs: parseInt(jVarLocalPcs2.value)
    };

    return jVarLocalReturnObject;
};

let jFGarmentsThirdRow = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarments3 = document.getElementById("Garments3");
    let jVarLocalPcs3 = document.getElementById("Pcs3");

    if ((jVarLocalPcs3.value > 0) === false) {
        jVarLocalReturnObject.KReason = "Pcs is not positive";
        return jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        Name: jVarLocalGarments3.value,
        Pcs: parseInt(jVarLocalPcs3.value)
    };

    return jVarLocalReturnObject;
};

let jFGarmentsFourthRow = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarments4 = document.getElementById("Garments4");
    let jVarLocalPcs4 = document.getElementById("Pcs4");

    if ((jVarLocalPcs4.value > 0) === false) {
        jVarLocalReturnObject.KReason = "Pcs is not positive";
        return jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        Name: jVarLocalGarments4.value,
        Pcs: parseInt(jVarLocalPcs4.value)
    };

    return jVarLocalReturnObject;
};


let jFGarmentsFifthRow = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarments5 = document.getElementById("Garments5");
    let jVarLocalPcs5 = document.getElementById("Pcs5");

    if ((jVarLocalPcs5.value > 0) === false) {
        jVarLocalReturnObject.KReason = "Pcs is not positive";
        return jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        Name: jVarLocalGarments5.value,
        Pcs: parseInt(jVarLocalPcs5.value)
    };

    return jVarLocalReturnObject;
};


let jFGarmentsSixthRow = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarments6 = document.getElementById("Garments6");
    let jVarLocalPcs6 = document.getElementById("Pcs6");

    if ((jVarLocalPcs6.value > 0) === false) {
        jVarLocalReturnObject.KReason = "Pcs is not positive";
        return jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        Name: jVarLocalGarments6.value,
        Pcs: parseInt(jVarLocalPcs6.value)
    };

    return jVarLocalReturnObject;
};

let jFGarmentsSeventhRow = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarments7 = document.getElementById("Garments7");
    let jVarLocalPcs7 = document.getElementById("Pcs7");

    if ((jVarLocalPcs7.value > 0) === false) {
        jVarLocalReturnObject.KReason = "Pcs is not positive";
        return jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        Name: jVarLocalGarments7.value,
        Pcs: parseInt(jVarLocalPcs7.value)
    };

    return jVarLocalReturnObject;
};


let jFGarmentsEightRow = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarments8 = document.getElementById("Garments8");
    let jVarLocalPcs8 = document.getElementById("Pcs8");

    if ((jVarLocalPcs8.value > 0) === false) {
        jVarLocalReturnObject.KReason = "Pcs is not positive";
        return jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        Name: jVarLocalGarments8.value,
        Pcs: parseInt(jVarLocalPcs8.value)
    };

    return jVarLocalReturnObject;
};



let jFGarmentsNinethRow = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarments9 = document.getElementById("Garments9");
    let jVarLocalPcs9 = document.getElementById("Pcs9");

    if ((jVarLocalPcs9.value > 0) === false) {
        jVarLocalReturnObject.KReason = "Pcs is not positive";
        return jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        Name: jVarLocalGarments9.value,
        Pcs: parseInt(jVarLocalPcs9.value)
    };

    return jVarLocalReturnObject;
};


let jFGarmentsTenthRow = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarments10 = document.getElementById("Garments10");
    let jVarLocalPcs10 = document.getElementById("Pcs10");

    if ((jVarLocalPcs10.value > 0) === false) {
        jVarLocalReturnObject.KReason = "Pcs is not positive";
        return jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        Name: jVarLocalGarments10.value,
        Pcs: parseInt(jVarLocalPcs10.value)
    };

    return jVarLocalReturnObject;
};

export { BookingSaveFunc };