import { StartFunc as OriginalStartFunc } from "./Original.js";
import { StartFunc as BookingsData } from "../../Bookings/PullFuncs/Original.js";

let StartFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalFromOriginal = await OriginalStartFunc();
    let LocalOriginalData = LocalFromOriginal.JsonData;

    if (LocalFromOriginal.KTF === false) {
        LocalReturnObject.KReason = LocalFromOriginal.KReason;
        return await LocalReturnObject;
    };

    let LocalFromBookingsData = await BookingsData();

    if (LocalFromBookingsData.KTF === false) {
        LocalReturnObject.KReason = LocalFromBookingsData.KReason;
        return await LocalReturnObject;
    };

    let LocalBookingsData = LocalFromBookingsData.JsonData;

    Object.entries(LocalOriginalData).forEach(
        ([key, value]) => {
            if (key in LocalBookingsData) {
                value. OrderNo= key;
                value.CustomerName = LocalBookingsData[key].CustomerName;
                value.Mobile = LocalBookingsData[key].Mobile;
                value.Amount = LocalBookingsData[key].Amount;
            };
        }
    );

    LocalReturnObject.JsonData = LocalOriginalData;
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

export { StartFunc }