// import { ShowWithBookingDataFunc } from "../../../../Dal/Completed/ShowFunc";
import { StartFunc as QrCodesDataFunc } from "../../../Dal/Transactions/QrCodes/PullFuncs/WithBookingData.js";

let CompletedShowFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalDataFromJson = await QrCodesDataFunc();
    let LocalSNo = 1;

    LocalReturnObject.KReason = LocalDataFromJson.KReason;

    Object.entries(LocalDataFromJson.JsonData).forEach(
        ([key, value]) => {
            LocalReturnObject.JsonData[key] = {
                SNo: LocalSNo,
                OrderNo: value.BookingRef,
                CustomerName: value.CustomerName,
                Mobile: value.Mobile,
                GarmentName: value.GarmentName,
                GarmentPcs: value.GarmentPcs,
                QrCode: value.QrCode
            };

            LocalSNo += 1;
        }
    );

    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};
export { CompletedShowFunc };