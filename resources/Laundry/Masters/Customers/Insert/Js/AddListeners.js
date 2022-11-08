import { CustomersSaveFunc } from "./SaveFuncs.js";

let StartFunc = () => {
    let jVarLocalCustomersSaveButtonId = document.getElementById("CustomersSaveButtonId");
    let jVarLocalCustomerName = document.getElementById("CustomerName");
    let jVarLocalCustomerMobileDataListId = document.getElementById("CustomerMobileDataListId");

    jVarLocalCustomersSaveButtonId.addEventListener("click", CustomersSaveFunc);

    jVarLocalCustomerName.addEventListener("keypress", (event) => {
        if (event.key === 'Enter') { // key code of the keybord key
            event.preventDefault();
            let jVarLocalCurrentTarget = event.currentTarget;
            let jVarLocalArray = jVarLocalCurrentTarget.value.split(":");
            jVarLocalCurrentTarget.value = jVarLocalArray[0].trim();
        };
    });

};

export { StartFunc };