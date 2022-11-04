import { StartFunc as OriginalStartFunc } from "./Original.js";

let StartFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    try {
        let LocalFromOriginal = await OriginalStartFunc();

        if (LocalFromOriginal.KTF === false) {
            LocalReturnObject.KReason = LocalFromOriginal.KReason;
            return await LocalReturnObject;
        };

        let LocalOriginalData = LocalFromOriginal.JsonData;

        Object.entries(LocalOriginalData).forEach(
            ([key, value]) => {
                if ("GarmentDetails" in value) {
                    let LoopInsidePcsArray = Object.values(value.GarmentDetails).map(LoopItem => LoopItem.Pcs);

                    value.GarmentPcsTotal = LoopInsidePcsArray.reduce((a, b) => a + b, 0);
                };
            }
        );

        LocalReturnObject.JsonData = LocalOriginalData;
        LocalReturnObject.KTF = true;
    } catch (error) {
        console.log("error : dal booking pullfuncs withqrcodes, ", error);
    };

    return await LocalReturnObject;
};

export { StartFunc }
