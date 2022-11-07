import { ShowWithBookingDataFunc } from "../../../../Dal/Billing/BillingShowFunc";
import { StartFunc as FromBookingAlso } from "../../../../Dal/Billing/PullFuncs/FromBookingAlso";

let BillingShowFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalDataFromJson = await FromBookingAlso();
    let LocalSNo = 1;

    LocalReturnObject.KReason = LocalDataFromJson.KReason;

    Object.entries(LocalDataFromJson.JsonData).forEach(
        ([key, value]) => {
            LocalReturnObject.JsonData[key] = value;
            LocalReturnObject.JsonData[key].SNo = LocalSNo;
            LocalReturnObject.JsonData[key].OrderNo = value.OrderNo;
            LocalReturnObject.JsonData[key].CustomerName = value.CustomerName;
            LocalReturnObject.JsonData[key].Mobile = value.Mobile;
            LocalReturnObject.JsonData[key].Amount = value.Amount;

            LocalSNo += 1;
        }
    );

    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};
export { BillingShowFunc };