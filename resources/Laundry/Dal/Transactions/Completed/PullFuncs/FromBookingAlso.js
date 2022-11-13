import { StartFunc as OriginalStartFunc } from "./Original.js";
import { StartFunc as BookingsData } from "../../Bookings/PullFuncs/Original.js";
import { StartFunc as QrCodesData } from "../../QrCodes/PullFuncs/Original.js";

let StartFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalFromOriginal = await OriginalStartFunc();
    let LocalOriginalData = LocalFromOriginal.JsonData;

    //   console.log("LocalFromOriginal : ", LocalFromOriginal);
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

    let LocalFromQrCodesData = await QrCodesData();

    if (LocalFromQrCodesData.KTF === false) {
        LocalReturnObject.KReason = LocalFromQrCodesData.KReason;
        return await LocalReturnObject;
    };

    let LocalQrCodesData = LocalFromQrCodesData.JsonData;

    Object.entries(LocalOriginalData).forEach(
        ([key, value]) => {
            if (key in LocalQrCodesData) {
                value.QrCode = key;
                value.BookingRef = LocalQrCodesData[key].BookingRef;
                value.GarmentsRef = LocalQrCodesData[key].GarmentsRef;
                value.QrCodeDateTime = LocalQrCodesData[key].DateTime;

                if (value.BookingRef in LocalBookingsData) {
                    value.CustomerName = LocalBookingsData[value.BookingRef].CustomerName;
                    value.Mobile = LocalBookingsData[value.BookingRef].Mobile;
                    value.Amount = LocalBookingsData[value.BookingRef].Amount;

                    if (value.GarmentsRef in LocalBookingsData[value.BookingRef].GarmentDetails) {
                        value.GarmentName = LocalBookingsData[value.BookingRef].GarmentDetails[value.GarmentsRef].Name;
                        value.GarmentPcs = LocalBookingsData[value.BookingRef].GarmentDetails[value.GarmentsRef].Pcs;
                    };
                };
            };
        }
    );
    LocalReturnObject.JsonData = LocalOriginalData;
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

export { StartFunc }