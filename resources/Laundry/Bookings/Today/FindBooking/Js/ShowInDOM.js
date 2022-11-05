import { FindBookingHtmlFunc } from "./HtmlFuns/FromTemplate.js";

let StartFunc = async ({inData}) => {
    let jVarLocalFromHbs = await FindBookingHtmlFunc();

    let jVarLocalKCont1 = document.getElementById("KCont1");
    jVarLocalKCont1.innerHTML = jVarLocalFromHbs;

    LocalFuncCustomerDetails({
        inOrderNo: inData.OrderNo,
        inCustomerName: inData.CustomerName,
        inMobile: inData.Mobile,
        inGarmentsTotalPcs: inData.GarmentsTotalPcs,
        inWeight: inData.Weight,
        inAmount: inData.Amount,

    });
};

let LocalFuncCustomerDetails = ({ inOrderNo, inCustomerName, inMobile, inGarmentsTotalPcs, inWeight, inAmount }) => {
    let jVarLocalOrderNo = document.getElementById("OrderNo");
    jVarLocalOrderNo.value = inOrderNo;

    let jVarLocalCustomerName = document.getElementById("CustomerName");
    if (jVarLocalOrderNo !== null) jVarLocalCustomerName.value = inCustomerName;

    let jVarLocalMobile = document.getElementById("Mobile");
    jVarLocalMobile.value = inMobile;

    let jVarLocalGarmentsTotalPcs = document.getElementById("GarmentsTotalPcs");
    jVarLocalGarmentsTotalPcs.value = inGarmentsTotalPcs;

    let jVarLocalWeight = document.getElementById("Weight");
    jVarLocalWeight.value = inWeight;

    let jVarLocalAmount = document.getElementById("Amount");
    jVarLocalAmount.value = inAmount;

};

export { StartFunc };