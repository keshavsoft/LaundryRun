let BookingClear = () => {

    let jVarLocalBookingDetails = LocalBookingDetailsFunc();
    let jVarLocalGarmentsFirstRow = LocalGarmentsFirstRow();
    let jVarLocalGarmentsSecondRow = LocalGarmentsSecondRow();
    let jVarLocalGarmentsThirdRow = LocalGarmentsThirdRow();
    let jVarLocalGarmentsFourthRow = LocalGarmentsFourthRow();
    let jVarLocalGarmentsFifthRow = LocalGarmentsFifthRow();
    let jVarLocalLocalGarmentsSixthRow = LocalGarmentsSixthRow();
    let jVarLocalLocalGarmentsSeventhRow = LocalGarmentsSeventhRow();
    let jVarLocalGarmentsEightRow = LocalGarmentsEightRow();
    let jVarLocalGarmentsNinethRow = LocalGarmentsNinethRow();
    let jVarLocalGarmentsTenthRow = LocalGarmentsTenthRow();
    
};

let LocalBookingDetailsFunc = () => {
    let jVarLocalCustomerName = document.getElementById("CustomerName");
    jVarLocalCustomerName.value = "";

    let JVarLocalMobileNumber = document.getElementById("Mobile");
    JVarLocalMobileNumber.value = "";

    let jVarLocalGarmentsTotalPcs = document.getElementById("GarmentsTotalPcs");
    jVarLocalGarmentsTotalPcs.value = "";

    let jVarLocalWeight = document.getElementById("Weight");
    jVarLocalWeight.value = "";

    let jvarLocalAmount = document.getElementById("Amount");
    jvarLocalAmount.value = "";
};

let LocalGarmentsFirstRow = () => {
    let jVarLocalGarments1 = document.getElementById("Garments1");
    jVarLocalGarments1.value = "";
    let jVarLocalPcs1 = document.getElementById("Pcs1");
    jVarLocalPcs1.value = "";
};
let LocalGarmentsSecondRow = () => {
    let jVarLocalGarments2 = document.getElementById("Garments2");
    jVarLocalGarments2.value = "";
    let jVarLocalPcs2 = document.getElementById("Pcs2");
    jVarLocalPcs2.value = "";
};

let LocalGarmentsThirdRow = () => {
    let jVarLocalGarments3 = document.getElementById("Garments3");
    jVarLocalGarments3.value = "";
    let jVarLocalPcs3 = document.getElementById("Pcs3");
    jVarLocalPcs3.value = "";
};

let LocalGarmentsFourthRow = () => {
    let jVarLocalGarments4 = document.getElementById("Garments4");
    jVarLocalGarments4.value = "";
    let jVarLocalPcs4 = document.getElementById("Pcs4");
    jVarLocalPcs4.value = "";
};

let LocalGarmentsFifthRow = () => {
    let jVarLocalGarments5 = document.getElementById("Garments5");
    jVarLocalGarments5.value = "";
    let jVarLocalPcs5 = document.getElementById("Pcs5");
    jVarLocalPcs5.value = "";
};

let LocalGarmentsSixthRow = () => {
    let jVarLocalGarments6 = document.getElementById("Garments6");
    jVarLocalGarments6.value = "";
    let jVarLocalPcs6 = document.getElementById("Pcs6");
    jVarLocalPcs6.value = "";
};

let LocalGarmentsSeventhRow = () => {
    let jVarLocalGarments7 = document.getElementById("Garments7");
    jVarLocalGarments7.value = "";
    let jVarLocalPcs7 = document.getElementById("Pcs7");
    jVarLocalPcs7.value = "";
};
let LocalGarmentsEightRow = () => {
    let jVarLocalGarments8 = document.getElementById("Garments8");
    jVarLocalGarments8.value = "";
    let jVarLocalPcs8 = document.getElementById("Pcs8");
    jVarLocalPcs8.value = "";
};

let LocalGarmentsNinethRow = () => {
    let jVarLocalGarments9 = document.getElementById("Garments9");
    jVarLocalGarments9.value = "";
    let jVarLocalPcs9 = document.getElementById("Pcs9");
    jVarLocalPcs9.value = "";
};

let LocalGarmentsTenthRow = () => {
    let jVarLocalGarments10 = document.getElementById("Garments10");
    jVarLocalGarments10.value = "";
    let jVarLocalPcs10 = document.getElementById("Pcs10");
    jVarLocalPcs10.value = "";
};

export { BookingClear };