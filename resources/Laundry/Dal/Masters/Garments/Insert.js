import { StartFunc as OriginalStartFunc } from "./PushFuncs/Original.js";
import { FromNode } from "./PushFuncs/FromFetch.js";

let InsertFunc = async ({ inDataToSave }) => {
    let LocalDataConfig = {
        inFolderName: "Masters", inFileName: "Garments.json", inItemName: "GarmentNames",
        inDataToSave
    }
    if (typeof Neutralino === 'undefined') {
        // console.log("hii");
        return await FromNode({ ...LocalDataConfig });
    }
    else {
        return await OriginalStartFunc({ ...LocalDataConfig });
    }
};
export { InsertFunc };