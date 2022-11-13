import { InsertFunc as DalSaveFunc } from "../../../Dal/Transactions/Completed/PushFuncs/SaveFunc.js";

let AddListeners = () => {
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

    let jVarLocalFromInsert = await DalSaveFunc({
        inQrCode: jVarLocalQrCode,
        inQrCodeScanned: jVarLocalScanValue
    });

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

export { AddListeners };