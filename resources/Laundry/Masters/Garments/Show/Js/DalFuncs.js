import { ShowFunc as GarmentsShowDalFunc } from "../../../../Dal/Masters/Garments/Show.js";

let ShowDalFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalDataFromJson = await GarmentsShowDalFunc();
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