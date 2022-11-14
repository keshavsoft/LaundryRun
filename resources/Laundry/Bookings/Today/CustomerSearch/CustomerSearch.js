import { ShowFunc as CustomersShowFunc } from "../../../Dal/Masters/Customers/Show.js";

let jVarLocalFromCustomersShowFunc = await CustomersShowFunc();


let LocalFillDataList = ({ inData }) => {
    let jVarLocalCustomerDataListId = document.getElementById("CustomerDataListId");
    jVarLocalCustomerDataListId.innerHTML = "";

    if (inData.length) {
        for (var i = 0, len = inData.length; i < len; i++) {
            let LoopInsideOption = document.createElement("option");
            LoopInsideOption.value = inData[i];
            jVarLocalCustomerDataListId.append(LoopInsideOption);
            //jVarLocalCustomerDataListId.append(`<option value="${inData[i]}">`);
        }
    }
};



if (jVarLocalFromCustomersShowFunc.KTF) {
    let jVarLocalCustomersArray = Object.values(jVarLocalFromCustomersShowFunc.JsonData).map(
        LoopItem => {
            return `${LoopItem.Mobile} : ${LoopItem.CustomerName}`;
        }
    );
    LocalFillDataList({ inData: jVarLocalCustomersArray });
};
