import { GarmentsShowHtmlFunc } from "./HtmlFuns/FromHbs.js";
// import { ChangeClassFunc } from "../../../../CommonFuncs/Header";
import { ShowDalFunc as GarmentShowDalFunc} from "./DalFuncs.js";

let GarmentsShowFunc = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    let jVarLocalFromTemplate = await GarmentsShowHtmlFunc();

    var template = Handlebars.compile(jVarLocalFromTemplate);

    let jVarLocalDataNeeded = await GarmentShowDalFunc();

    if (jVarLocalDataNeeded.KTF === false) {

    };

    let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

    document.getElementById("KCont1").innerHTML = jVarLocalHtml;
    
    LocalSetFocusFunc();
};


let LocalSetFocusFunc = () => {
    let jVarLocalCustomerName = document.getElementById("SearchQrCodeTable");
    jVarLocalCustomerName.focus();
};

GarmentsShowFunc().then();