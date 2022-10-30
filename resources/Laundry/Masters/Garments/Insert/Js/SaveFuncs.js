import { InsertFunc as GarmentsInsertDalFunc } from "../../../../Dal/Garments/Insert.js";

let GarmentsSaveFunc = async () => {
    //  LocalPreSaveFunc();
    let jVarLocalObject = {};
    let LocalCustomerDetails = jFGarmentsDetails();

    if (LocalCustomerDetails.KTF) {
        jVarLocalObject = LocalCustomerDetails.KResult
    };

    let jVarLocalFromInsert = await GarmentsInsertDalFunc({ inDataToSave: jVarLocalObject });

    console.log("jVarLocalFromInsert : ", jVarLocalFromInsert);

    // await LocalPostSaveFunc({ inFromSave: jVarLocalFromInsert });
};


let jFGarmentsDetails = () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalGarmentName = document.getElementById("GarmentName");
    let JVarLocalGarmentDescription = document.getElementById("GarmentDescription");
    let JVarLocalPrice = document.getElementById("Price");

    jVarLocalReturnObject.KTF = true;

    jVarLocalReturnObject.KResult = {
        GarmentName: jVarLocalGarmentName.value,
        GarmentDescription: JVarLocalGarmentDescription.value,
        Price: JVarLocalPrice.value
    };

    return jVarLocalReturnObject;
};


export { GarmentsSaveFunc };