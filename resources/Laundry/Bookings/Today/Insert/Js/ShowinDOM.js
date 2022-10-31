import { InsertHtmlFunc } from "./HtmlFuns/FromTemplates";
import { ChangeClassFunc } from "../../../../CommonFuncs/Header";
import { BookingSaveFunc } from "../Js/SaveFuncs";
import { BookingClear } from "../Js/ClearFunc";

let ToKCont1 = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    let jVarLocalFromHbs = await InsertHtmlFunc();

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
    let jVarLocalBookingSaveButtonId = document.getElementById("BookingSaveButtonId");

    jVarLocalBookingSaveButtonId.addEventListener("click", async (event) => {
        await BookingSaveFunc();
    });
    // jVarLocalBookingSaveButtonId.addEventListener("click", BookingClear );

};

export { ToKCont1 };