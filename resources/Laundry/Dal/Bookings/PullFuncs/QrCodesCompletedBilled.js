import { StartFunc as QrCodesAsObject } from "./QrCodesAsObject.js";
import { StartFunc as CompletedOriginal } from "../../Completed/PullFuncs/Original.js";
import { StartFunc as BillingOriginal } from "../../Billing/PullFuncs/Original.js";

let StartFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    try {
        let LocalFromOriginal = await QrCodesAsObject();

        if (LocalFromOriginal.KTF === false) {
            LocalReturnObject.KReason = LocalFromOriginal.KReason;
            return await LocalReturnObject;
        };

        let LocalQrCodesAsObject = LocalFromOriginal.JsonData;

        let LocalFromQrCodesOriginal = await CompletedOriginal();

        if (LocalFromQrCodesOriginal.KTF === false) {
            LocalReturnObject.KReason = LocalFromQrCodesOriginal.KReason;
            return await LocalReturnObject;
        };

        let LocalCompletedOriginal = LocalFromQrCodesOriginal.JsonData;

        Object.entries(LocalQrCodesAsObject).forEach(
            ([key, value]) => {
                Object.entries(value.QrCodesObject).forEach(
                    ([QrCodekey, QrCodevalue]) => {
                        if (QrCodekey in LocalCompletedOriginal) {
                            QrCodevalue.Completed = true;
                        };
                    }
                );
            }
        );

        Object.entries(LocalQrCodesAsObject).forEach(
            ([key, value]) => {
                let LoopInsideQrData = Object.values(value.QrCodesObject).filter(p => p.Completed);
                value.QrCodesTotal = Object.values(value.QrCodesObject).length;
                value.QrCodesCompleted = LoopInsideQrData.length;
                value.QrCodesInProcess = value.QrCodesTotal - value.QrCodesCompleted;
            }
        );

        let LocalFromBillingOriginal = await BillingOriginal();

        if (LocalFromBillingOriginal.KTF === false) {
            LocalReturnObject.KReason = LocalFromBillingOriginal.KReason;
            return await LocalReturnObject;
        };
        //console.log("LocalFromBillingOriginal : ", LocalFromBillingOriginal.JsonData);
        Object.entries(LocalQrCodesAsObject).forEach(
            ([key, value]) => {
                if (key in LocalFromBillingOriginal.JsonData) {
                    value.Billed = true;
                };
            }
        );

        LocalReturnObject.JsonData = LocalQrCodesAsObject;
        LocalReturnObject.KTF = true;
    } catch (error) {
        console.log("error : dal booking pullfuncs withqrcodes, ", error);
    };

    return await LocalReturnObject;
};

export { StartFunc }
