import { AddListenersFunc } from "./Js/AddListeners.js";
import { ShowFunc as CustomersShowFunc } from "../../../Dal/Customers/Show.js";

AddListenersFunc();

let jVarLocalFromCustomersShowFunc = await CustomersShowFunc();

if (jVarLocalFromCustomersShowFunc.KTF) {
    let jVarLocalCustomersArray = Object.values(jVarLocalFromCustomersShowFunc.JsonData).map(
        LoopItem => {
            return `${LoopItem.Mobile} : ${LoopItem.CustomerName}`;
        }
    );

    console.log("jVarLocalCustomersArray : ", jVarLocalCustomersArray);
};

