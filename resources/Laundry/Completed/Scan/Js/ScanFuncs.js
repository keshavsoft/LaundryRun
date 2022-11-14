// import { ScanHtmlFunc } from "../../../Completed/Scan/Js/HtmlFuncs/FromHbs.js";
// import { InsertFunc } from "../../../../Dal/Completed/ScanFuncs";
import { InsertFunc as DalSaveFunc } from "../../../Dal/Transactions/Completed/PushFuncs/SaveFunc.js";
import { AddListeners } from "./ListenersFuncs.js";

let ScanFunc = async () => {
    let jVarLocalFormVertical = document.getElementById("FormVertical");

    jVarLocalFormVertical.classList.remove('was-validated');
    jVarLocalFormVertical.classList.add('novalidate');

    if (jVarLocalFormVertical.checkValidity()) {
        let PromiseDataFromSave = await DalCompletedClass.Booking.InsertFunc({ inObjectToInsert: serializeObject(jVarLocalFormVertical) });

        if (PromiseDataFromSave.KTF) {
            let jVarLocalAlertSuccessId = document.getElementById("AlertSuccessId");
            let jVarLocalAlertSuccessMessageId = document.getElementById("AlertSuccessMessageId");
            jVarLocalAlertSuccessId.style.display = "";
            jVarLocalAlertSuccessMessageId.innerHTML = `<strong>Hurray!</strong> ${PromiseDataFromSave.KResult}`

            setTimeout(function () {
                jVarLocalAlertSuccessId.style.display = "none"

            }, 7000);
        } else {
            let jVarLocalAlertDangerId = document.getElementById("AlertWarningId");
            let jVarLocalAlertDangerMessageId = document.getElementById("AlertWarningMessageId");
            jVarLocalAlertDangerId.style.display = "";
            jVarLocalAlertDangerMessageId.innerHTML = `<strong>Sorry!</strong> ${PromiseDataFromSave.KReason}`

            setTimeout(function () {
                jVarLocalAlertDangerId.style.display = "none"

            }, 7000);
        };
    } else {
        document.forms[1].classList.add('was-validated');
    };
};

let ScanHeaderId = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    // let jVarInsideTemplate = await ScanHtmlFunc();
    // let jVarLocalKCont1 = document.getElementById("KCont1");
    // jVarLocalKCont1.innerHTML = jVarInsideTemplate;
    LocalSetFocusFunc();
    AddListeners();
};

let LocalSetFocusFunc = () => {
    let jVarLocalScanId = document.getElementById("ScanId");
    jVarLocalScanId.focus();
};

let LocalAddListeners = () => {
    let jVarLocalGoButtonid = document.getElementById("GoButtonid");
    let jVarLocalScanId = document.getElementById("ScanId");

    jVarLocalScanId.addEventListener("keypress", (event) => {
        if (event.key === 'Enter') { // key code of the keybord key
            event.preventDefault();
            // your code to Run
            LocalGoClick();
        };
    });

    jVarLocalGoButtonid.addEventListener("click", LocalGoClick);
};

let LocalGoClick = async () => {
    let jVarLocalScanId = document.getElementById("ScanId");
    let jVarLocalScanValue = jVarLocalScanId.value;

    let jVarLocalDangerAlertId = document.getElementById("DangerAlertId");
    let jVarLocalSuccessAlertId = document.getElementById("SuccessAlertId");

    let jVarLocalQrCode = LocalPullQrCodeFromScan({ InScanData: jVarLocalScanValue });

    let jVarLocalFromInsert = await DalSaveFunc({ inQrCode: jVarLocalQrCode });

    if (jVarLocalFromInsert.KTF === false) {
        jVarLocalDangerAlertId.classList.remove("d-none");
        jVarLocalDangerAlertId.innerHTML = jVarLocalFromInsert.KReason;
        jVarLocalScanId.focus();
    };

    if (jVarLocalFromInsert.KTF) {
        jVarLocalScanId.value = "";

        jVarLocalSuccessAlertId.classList.remove("d-none");
        jVarLocalSuccessAlertId.innerHTML = `${jVarLocalScanValue}: successfully saved...`;
        jVarLocalScanId.focus();
    };

};

let LocalPullQrCodeFromScan = ({ InScanData }) => {
    let LocalScanAsArray = InScanData.split("/");
    let LocalReturnValue;

    if (LocalScanAsArray.length > 0) {
        LocalReturnValue = LocalScanAsArray[0]
    };

    return LocalReturnValue;
};

export { ScanFunc, ScanHeaderId };

ScanHeaderId().then();