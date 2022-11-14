import { StartFunc as OriginalStartFunc } from "./Original.js";
import { StartFunc as BookingsData } from "../../Bookings/PullFuncs/Original.js";

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

    Object.entries(LocalOriginalData).forEach(
        ([key, value]) => {
            if (value.BookingRef in LocalBookingsData) {
                value.QrCode = key;
                value.CustomerName = LocalBookingsData[value.BookingRef].CustomerName;
                value.Mobile = LocalBookingsData[value.BookingRef].Mobile;
                value.Amount = LocalBookingsData[value.BookingRef].Amount;

                if (value.GarmentsRef in LocalBookingsData[value.BookingRef].GarmentDetails) {
                    value.GarmentName = LocalBookingsData[value.BookingRef].GarmentDetails[value.GarmentsRef].Name;
                    value.GarmentPcs = LocalBookingsData[value.BookingRef].GarmentDetails[value.GarmentsRef].Pcs;
                };
            };
        }
    );
    // console.log("LocalOriginalData: ", LocalOriginalData);
    LocalReturnObject.JsonData = LocalOriginalData;
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

export { StartFunc }