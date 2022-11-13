import { ShowFunc as CustomersShowFunc } from "../../../../Dal/Masters/Customers/Show.js";

let CustomerNamesToDatalistFunc = async () => {
    let jVarLocalFromCustomersShowFunc = await CustomersShowFunc();

    let LocalFillDataList = ({ inData }) => {
        let jVarLocalCustomerNameDataListId = document.getElementById("CustomerNameDataListId");
        jVarLocalCustomerNameDataListId.innerHTML = "";

        if (inData.length) {
            for (var i = 0, len = inData.length; i < len; i++) {
                let LoopInsideOption = document.createElement("option");
                LoopInsideOption.value = inData[i];
                jVarLocalCustomerNameDataListId.append(LoopInsideOption);
                //jVarLocalCustomerDataListId.append(`<option value="${inData[i]}">`);
            }
        }
    };

    if (jVarLocalFromCustomersShowFunc.KTF) {
        let jVarLocalCustomersArray = Object.values(jVarLocalFromCustomersShowFunc.JsonData).map(
            LoopItem => {
                return ` ${LoopItem.CustomerName} : ${LoopItem.Mobile}`;

            }
        );
        LocalFillDataList({ inData: jVarLocalCustomersArray });
    };

};

let CustomerMobileDatalistFunc = async () => {
    let jVarLocalFromCustomersShowFunc = await CustomersShowFunc();

    let LocalFillDataList = ({ inData }) => {
        let jVarLocalCustomerMobileDataListId = document.getElementById("CustomerMobileDataListId");
        jVarLocalCustomerMobileDataListId.innerHTML = "";

        if (inData.length) {
            for (var i = 0, len = inData.length; i < len; i++) {
                let LoopInsideOption = document.createElement("option");
                LoopInsideOption.value = inData[i];
                jVarLocalCustomerMobileDataListId.append(LoopInsideOption);
                //jVarLocalCustomerDataListId.append(`<option value="${inData[i]}">`);
            }
        }
    };

    if (jVarLocalFromCustomersShowFunc.KTF) {
        let jVarLocalCustomersArray = Object.values(jVarLocalFromCustomersShowFunc.JsonData).map(
            LoopItem => {
                return `${LoopItem.Mobile} : ${LoopItem.CustomerName} `;

            }
        );
        LocalFillDataList({ inData: jVarLocalCustomersArray });
    };

};

export { CustomerNamesToDatalistFunc, CustomerMobileDatalistFunc };
