// import { ChangeClassFunc } from "../../../../CommonFuncs/Header";
import { TodayHtmlFunc } from "../Js/HtmlFuncs/FromTemplates.js";
import { RowHtmlFunc } from "../Js/HtmlFuncs/FromHbs.js";
import { TodayShowDalFunc } from "./DalFuncs.js";

let TodayShowFunc = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    await TodayHtmlFunc();
    let jVarLocalDataNeeded = await TodayShowDalFunc();
    let jVarLocalFromHbs = await RowHtmlFunc();

    if (jVarLocalDataNeeded.KTF === false) {

    };

    var template = Handlebars.compile(jVarLocalFromHbs);
    let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

    document.getElementById("KTableBody").innerHTML = jVarLocalHtml;

    LocalSetFocusFunc();
};


let LocalSetFocusFunc = () => {
    let jVarLocalCustomerName = document.getElementById("SearchQrCodeTable");
    jVarLocalCustomerName.focus();
};
TodayShowFunc().then();