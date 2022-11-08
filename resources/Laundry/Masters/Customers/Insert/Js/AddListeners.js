import { CustomersSaveFunc } from "./SaveFuncs.js";
import {CustomersDatalistFunc } from "./CustomersSearch.js";

let StartFunc = () => {

    CustomersDatalistFunc();
    let jVarLocalCustomersSaveButtonId = document.getElementById("CustomersSaveButtonId");

    jVarLocalCustomersSaveButtonId.addEventListener("click", CustomersSaveFunc);
};
StartFunc();