import { QrCodeHtmlFunc } from "../Js/HtmlFuncs/FromHbs.js";
// import { ChangeClassFunc } from "../../../../CommonFuncs/Header";
import { AddListeners } from "./QrCodeToModal.js";
import { ShowAllFunc as DalStartFunc } from "./DalFuncs.js";

let QrcodeShowAll = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    let jVarLocalFromTemplate = await QrCodeHtmlFunc();
    //   console.log("jVarLocalFromTemplate : ", jVarLocalFromTemplate);
    var template = Handlebars.compile(jVarLocalFromTemplate);

    let jVarLocalDataNeeded = await DalStartFunc();

    if (jVarLocalDataNeeded.KTF === false) {

    };

    let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

    document.getElementById("KCont1").innerHTML = jVarLocalHtml;

    AddListeners();

    LocalSetFocusFunc();
};

let LocalSetFocusFunc = () => {
    let jVarLocalCustomerName = document.getElementById("SearchQrCodeTable");
    jVarLocalCustomerName.focus();
};

export { QrcodeShowAll };
