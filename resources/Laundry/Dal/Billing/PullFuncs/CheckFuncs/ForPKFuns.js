import { StartFunc as OriginalStartFunc } from "../Original";

let StartFunc = async ({ inBookingPK }) => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };
    let LocalFromStartFunc = await OriginalStartFunc();
    let LocalinBookingPK = inBookingPK;

    if (LocalFromStartFunc.KTF === false) {
        LocalReturnObject.KReason = LocalFromStartFunc.KReason;
        return await LocalReturnObject;
    };

    if (LocalinBookingPK in LocalFromStartFunc.JsonData) {
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

export { StartFunc }
