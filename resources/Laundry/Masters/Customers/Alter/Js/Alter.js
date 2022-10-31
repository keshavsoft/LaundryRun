import { CustomersShowHtmlFunc } from "./HtmlFuns/FromHbs.js";
// import { ChangeClassFunc } from "../../../../CommonFuncs/Header.js";
import { ShowDalFunc as CustomerShowDalFunc } from "./DalFuncs.js";


let CustomersShowFunc = async (inEvent) => {
    let jVarLocalShowOfflineSpinnerId = document.getElementById("ShowOfflineSpinnerId");
    jVarLocalShowOfflineSpinnerId.classList.remove("d-none");

    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    let jVarLocalFromTemplate = await CustomersShowHtmlFunc();

    var template = Handlebars.compile(jVarLocalFromTemplate);

    let jVarLocalDataNeeded = await CustomerShowDalFunc();

    if (jVarLocalDataNeeded.KTF === false) {

    };

    let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

    document.getElementById("KCont1").innerHTML = jVarLocalHtml;

    LocalSetFocusFunc();

    jVarLocalShowOfflineSpinnerId.classList.add("d-none");
};

let LocalSetFocusFunc = () => {
    let jVarLocalCustomerName = document.getElementById("SearchQrCodeTable");
    jVarLocalCustomerName.focus();
};

CustomersShowFunc().then();