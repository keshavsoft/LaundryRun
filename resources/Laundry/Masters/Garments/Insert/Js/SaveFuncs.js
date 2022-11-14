import { InsertFunc as GarmentsInsertDalFunc } from "../../../../Dal/Masters/Garments/Insert.js";

let GarmentsSaveFunc = async () => {
    let jVarLocalCurrentTarget = event.currentTarget;

    //  LocalPreSaveFunc();
    let jVarLocalObject = {};
    let LocalCustomerDetails = jFGarmentsDetails();

    if (LocalCustomerDetails.KTF) {
        jVarLocalObject = LocalCustomerDetails.KResult
    };

    let jVarLocalFromInsert = await GarmentsInsertDalFunc({ inDataToSave: jVarLocalObject });

    if (jVarLocalFromInsert.KTF === false) {
        let jVarClosestCard = jVarLocalCurrentTarget.closest(".card");

        jVarClosestCard.classList.add("border-danger");
        return await "";
    };

    window.location.href = "../Show/Show.html";
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