import { ChangeClassFunc } from "../../../../CommonFuncs/Header";
import { GarmentsHtmlFunc } from "../Js/HtmlFuns/FromHbs";
import { GarmentsSaveFunc } from "../../Insert/Js/SaveFuncs";

let GarmentsInsertFunc = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    let jVarLocalFromHbs = await GarmentsHtmlFunc();

    let jVarLocalKCont1 = document.getElementById("KCont1");
    jVarLocalKCont1.innerHTML = jVarLocalFromHbs;

    LocalFuncAddListeners();
    LocalSetFocusFunc();
};

let LocalSetFocusFunc = () => {
    let jVarLocalCustomerName = document.getElementById("GarmentName");
    jVarLocalCustomerName.focus();
};

let LocalFuncAddListeners = () => {
    let jVarLocalGarmentsSaveButtonId = document.getElementById("GarmentsSaveButtonId");

    jVarLocalGarmentsSaveButtonId.addEventListener("click", async (event) => {
        await GarmentsSaveFunc();
    });

};


export { GarmentsInsertFunc };