import { ShowFunc as CustomersShowFunc } from "../../../../Dal/Customers/Show.js";

let jVarLocalFromCustomersShowFunc = await CustomersShowFunc();

let CustomersDatalistFunc = () => {

    let LocalFillDataList = ({ inData }) => {
        let jVarLocalCustomersDataListId = document.getElementById("CustomersDataListId");
        jVarLocalCustomersDataListId.innerHTML = "";
    
        if (inData.length) {
            for (var i = 0, len = inData.length; i < len; i++) {
                let LoopInsideOption = document.createElement("option");
                LoopInsideOption.value = inData[i];
                jVarLocalCustomersDataListId.append(LoopInsideOption);
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
    
        console.log("jVarLocalCustomersArray : ", jVarLocalCustomersArray);
    };
    
};

export{CustomersDatalistFunc};
