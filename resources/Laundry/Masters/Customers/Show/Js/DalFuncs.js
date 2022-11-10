import { ShowFunc as CustomersShowDalFunc } from "../../../../Dal/Customers/Show.js";

let ShowDalFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalDataFromJson = await CustomersShowDalFunc();
    // console.log("LocalDataFromJson:",LocalDataFromJson);
    let LocalSNo = 1;

    if (LocalDataFromJson.KTF === false) {
        LocalReturnObject.KReason = LocalDataFromJson.KReason;
        return await LocalReturnObject;
    };

    Object.entries(LocalDataFromJson.JsonData).forEach(
        ([key, value]) => {
            LocalReturnObject.JsonData[key] = value;
            LocalReturnObject.JsonData[key].SNo = LocalSNo;
            LocalSNo += 1;
        }
    );

    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

export { ShowDalFunc }