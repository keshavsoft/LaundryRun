import { StartFunc as OriginalFuncs } from "./Original.js";

let StartFunc = async ({ inQrCode }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };
    let LocalQrCode = inQrCode;

    try {
        let LocalBookingData = await OriginalFuncs();

        if (LocalBookingData.KTF === false) {
            LocalReturnObject.KReason = LocalBookingData.KReason;
            return await LocalReturnObject;
        };
        
        let LocalJsonData = LocalBookingData.JsonData;

        if ((LocalQrCode in LocalJsonData) === false) {
            LocalReturnObject.KReason = `${LocalQrCode}:QrCode not found in data!`;
            return await LocalReturnObject;
        };

        LocalReturnObject.JsonData = LocalJsonData[LocalQrCode];
        LocalReturnObject.KTF = true;

        return await LocalReturnObject;
    } catch (error) {
        console.log(error);
    };

    return await LocalReturnObject;
};

export { StartFunc };