import { StartFunc as WithQrCodes } from "./WithQrCodes";
import { StartFunc as CompletedData } from "../../Completed/PullFuncs/Original";

let StartFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    try {
        let LocalFromOriginal = await WithQrCodes();

        if (LocalFromOriginal.KTF === false) {
            LocalReturnObject.KReason = LocalFromOriginal.KReason;
            return await LocalReturnObject;
        };

        let LocalOriginalData = LocalFromOriginal.JsonData;

        let LocalFromCompletedData = await CompletedData();

        if (LocalFromCompletedData.KTF === false) {
            LocalReturnObject.KReason = LocalFromCompletedData.KReason;
            return await LocalReturnObject;
        };

        let LocalCompletedData = LocalFromCompletedData.JsonData;

        Object.entries(LocalOriginalData).forEach(
            ([key, value]) => {
                let LoopInsideCompleted = Object.values(LocalCompletedData).filter(LoopItem => LoopItem.Pcs);
                // let LoopInsidePcsArray = Object.values(value.GarmentDetails).map(LoopItem => LoopItem.Pcs);
                // value.GarmentPcsTotal = LoopInsidePcsArray.reduce((a, b) => a + b, 0);
            }
        );

        LocalReturnObject.JsonData = LocalOriginalData;
        LocalReturnObject.KTF = true;
    } catch (error) {
        console.log("error : dal booking pullfuncs withcompleted, ", error);
    };

    return await LocalReturnObject;
};

export { StartFunc }
