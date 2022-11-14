import { StartFunc as OriginalStartFunc } from "./Original.js";
import { StartFunc as QrCodesOriginal } from "../../QrCodes/PullFuncs/Original.js";

let StartFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    try {
        let LocalFromOriginal = await OriginalStartFunc();

        if (LocalFromOriginal.KTF === false) {
            LocalReturnObject.KReason = LocalFromOriginal.KReason;
            return await LocalReturnObject;
        };

        let LocalOriginalData = LocalFromOriginal.JsonData;

        let LocalFromQrCodesOriginal = await QrCodesOriginal();

        if (LocalFromQrCodesOriginal.KTF === false) {
            LocalReturnObject.KReason = LocalFromQrCodesOriginal.KReason;
            return await LocalReturnObject;
        };

        let LocalQrCodesOriginal = LocalFromQrCodesOriginal.JsonData;

        Object.entries(LocalOriginalData).forEach(
            ([key, value]) => {
                value.QrCodesObject = {};

                Object.entries(LocalQrCodesOriginal).forEach(
                    ([QrCodekey, QrCodevalue]) => {
                        if (QrCodevalue.BookingRef === key) {
                            value.QrCodesObject[QrCodekey] = QrCodevalue;
                        };
                    }
                );
            }
        );

        LocalReturnObject.JsonData = LocalOriginalData;
        LocalReturnObject.KTF = true;
    } catch (error) {
        console.log("error : dal booking pullfuncs withqrcodes, ", error);
    };

    return await LocalReturnObject;
};

export { StartFunc }
