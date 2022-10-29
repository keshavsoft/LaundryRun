import { StartFunc as OriginalStartFunc } from "../Original";

let StartFunc = async ({ inQrCode }) => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };
    let LocalFromStartFunc = await OriginalStartFunc();
    let LocalinQrCode = inQrCode;

    if (LocalFromStartFunc.KTF === false) {
        LocalReturnObject.KReason = LocalFromStartFunc.KReason;
        return await LocalReturnObject;
    };

    if (LocalinQrCode in LocalFromStartFunc.JsonData) {
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

export { StartFunc }
