import { CustomersSaveFunc } from "./SaveFuncs.js";
import {CustomerNameDatalistFunc, CustomerMobileDatalistFunc } from "./CustomersSearch.js";

let StartFunc = () => {

    CustomerNameDatalistFunc();
    CustomerMobileDatalistFunc();
    
    let jVarLocalCustomersSaveButtonId = document.getElementById("CustomersSaveButtonId");

    jVarLocalCustomersSaveButtonId.addEventListener("click", CustomersSaveFunc);
};

export{StartFunc};