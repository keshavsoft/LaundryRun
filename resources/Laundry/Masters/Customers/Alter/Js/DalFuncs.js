import { ShowFunc as CustomersShowDalFunc } from "../../../../Dal/Masters/Customers/Show.js";

let ShowDalFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalDataFromJson = await CustomersShowDalFunc();
    let LocalSNo = 1;

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