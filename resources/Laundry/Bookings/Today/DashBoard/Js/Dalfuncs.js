import { StartFunc as DalQrCodesCompletedBilled } from "../../../../Dal/Transactions/Bookings/PullFuncs/QrCodesCompletedBilled.js";

let ShowAll = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalDataFromJson = await DalQrCodesCompletedBilled();
    let LocalSNo = 1;

    LocalReturnObject.KReason = LocalDataFromJson.KReason;

    Object.entries(LocalDataFromJson.JsonData).forEach(
        ([key, value]) => {
            // console.log("value : ", value);
            LocalReturnObject.JsonData[key] = {
                SNo: LocalSNo,
                OrderNo: key,
                CustomerName: value.CustomerName,
                Mobile: value.Mobile,
                QrCodesTotal: value.QrCodesTotal,
                QrCodesCompleted: value.QrCodesCompleted,
                QrCodesInProcess: value.QrCodesInProcess,
                Billed: value.Billed
            };

            LocalSNo += 1;
        }
    );

    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

export { ShowAll };