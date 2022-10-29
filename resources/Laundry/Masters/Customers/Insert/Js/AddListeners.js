import { CustomersSaveFunc } from "./SaveFuncs.js";

let StartFunc = () => {
    let jVarLocalCustomersSaveButtonId = document.getElementById("CustomersSaveButtonId");
    console.log("jVarLocalCustomersSaveButtonId : ", jVarLocalCustomersSaveButtonId);
    jVarLocalCustomersSaveButtonId.addEventListener("click", CustomersSaveFunc);
};

StartFunc();