// import { BillingScanHtmlFunc } from "../../Scan/Js/HtmlFuncs/FromHbs.js";
// import { ChangeClassFunc } from "../../../CommonFuncs/Header";
import { InsertFunc as DalSaveFunc } from "../../../Dal/Transactions/Billing/PushFuncs/SaveFunc.js";

let BillingScanFuncs = async () => {
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

let BillingScanHeaderId = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    // let jVarInsideTemplate = await BillingScanHtmlFunc();
    // let jVarLocalKCont1 = document.getElementById("KCont1");
    // jVarLocalKCont1.innerHTML = jVarInsideTemplate;
    LocalSetFocusFunc();
    LocalAddListeners();
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
    let jVarLocalDangerAlertId = document.getElementById("DangerAlertId");

    let jVarLocalQrCode = LocalPullQrCodeFromScan({ InScanData: jVarLocalScanId.value });

    let jVarLocalFromInsert = await DalSaveFunc({ inQrCode: jVarLocalQrCode });
    // console.log("sssssssssssss : ", jVarLocalFromInsert);
    if (jVarLocalFromInsert.KTF === false) {
        jVarLocalDangerAlertId.classList.remove("d-none");
        jVarLocalDangerAlertId.innerHTML = jVarLocalFromInsert.KReason;
        jVarLocalScanId.focus();
    };
};

let LocalPullQrCodeFromScan = ({ InScanData }) => {
    let LocalScanAsArray = InScanData.split("/");
    let LocalReturnValue;

    if (LocalScanAsArray.length > 0) {
        LocalReturnValue = LocalScanAsArray[LocalScanAsArray.length - 1]
    };

    return LocalReturnValue;
};

export { BillingScanFuncs };

BillingScanHeaderId().then();
