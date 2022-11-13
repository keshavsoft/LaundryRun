import { InsertFunc as CustomersInsertDalFunc } from "../../../../Dal/Masters/Customers/Insert.js";

let CustomersSaveFunc = async (event) => {
    let jVarLocalCurrentTarget = event.currentTarget;

    //  LocalPreSaveFunc();
    let jVarLocalObject = {};
    let LocalCustomerDetails = jFCustomerDetails();

    if (LocalCustomerDetails.KTF) {
        jVarLocalObject = LocalCustomerDetails.KResult
    };

    let jVarLocalFromInsert = await CustomersInsertDalFunc({ inDataToSave: jVarLocalObject });

    if (jVarLocalFromInsert.KTF === false) {
        let jVarClosestCard = jVarLocalCurrentTarget.closest(".card");

        jVarClosestCard.classList.add("border-danger");
        return await "";
    };

    window.location.href = "../Show/Show.html";
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