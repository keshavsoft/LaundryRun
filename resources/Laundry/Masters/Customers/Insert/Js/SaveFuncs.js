import { InsertFunc as CustomersInsertDalFunc } from "../../../../Dal/Customers/Insert.js";

let CustomersSaveFunc = async () => {
    //  LocalPreSaveFunc();
    let jVarLocalObject = {};
    let LocalCustomerDetails = jFCustomerDetails();

    if (LocalCustomerDetails.KTF) {
        jVarLocalObject = LocalCustomerDetails.KResult
    };

    let jVarLocalFromInsert = await CustomersInsertDalFunc({ inDataToSave: jVarLocalObject });
    // await LocalPostSaveFunc({ inFromSave: jVarLocalFromInsert });
};

let jFCustomerDetails = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalCustomerName = document.getElementById("CustomerName");
    let JVarLocalMobileNumber = document.getElementById("Mobile");
    let JVarLocalCityName = document.getElementById("City");

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        CustomerName: jVarLocalCustomerName.value,
        Mobile: JVarLocalMobileNumber.value,
        City: JVarLocalCityName.value
    };

    return jVarLocalReturnObject;
};

export { CustomersSaveFunc };