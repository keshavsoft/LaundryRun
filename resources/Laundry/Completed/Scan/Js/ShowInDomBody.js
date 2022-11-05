import { ScanHtmlFunc } from "../../../Completed/Scan/Js/HtmlFuncs/FromHbs";
import { CompletedHeaderFunc } from "../../Js/CompletedToDom";
import { AddListeners } from "./ListenersFuncs";

let ShowWithInputValue = async ({ inToShowValue }) => {
    let jVarInsideTemplate = await ScanHtmlFunc();

    await CompletedHeaderFunc();
    let jVarLocalKCont1 = document.getElementById("KCont1");
    jVarLocalKCont1.innerHTML = jVarInsideTemplate;
    LocalSetFocusFunc();
    AddListeners();

    let jVarLocalScanId = document.getElementById("ScanId");
    jVarLocalScanId.value = inToShowValue;
};

let LocalSetFocusFunc = () => {
    let jVarLocalScanId = document.getElementById("ScanId");
    jVarLocalScanId.focus();
};

export { ShowWithInputValue };