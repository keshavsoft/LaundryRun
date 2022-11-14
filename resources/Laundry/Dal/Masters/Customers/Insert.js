import { StartFunc as OriginalStartFunc } from "./PushFuncs/Original.js";
import { FromNode } from "./PushFuncs/FromFetch.js";

let InsertFunc = async ({ inDataToSave }) => {
    let LocalDataConfig = {
        inFolderName: "Masters", inFileName: "Customers.json", inItemName: "CustomerNames",
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
