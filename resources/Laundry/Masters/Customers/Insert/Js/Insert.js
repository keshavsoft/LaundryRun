import { ChangeClassFunc } from "../../../../CommonFuncs/Header";
import { CustomersHtmlFunc } from "../Js/HtmlFuns/FromHbs";
import { CustomersSaveFunc } from "../../Insert/Js/SaveFuncs";

let CustomersInsertFunc = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    let jVarLocalFromHbs = await CustomersHtmlFunc();

    let jVarLocalKCont1 = document.getElementById("KCont1");
    jVarLocalKCont1.innerHTML = jVarLocalFromHbs;

    LocalFuncAddListeners();
    LocalSetFocusFunc();
};

let LocalSetFocusFunc = () => {
    let jVarLocalCustomerName = document.getElementById("CustomerName");
    jVarLocalCustomerName.focus();
};

let LocalFuncAddListeners = () => {
    let jVarLocalCustomersSaveButtonId = document.getElementById("CustomersSaveButtonId");

    jVarLocalCustomersSaveButtonId.addEventListener("click", async (event) => {
        await CustomersSaveFunc();
    });

};


export { CustomersInsertFunc };