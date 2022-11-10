import { StartFunc as OriginalStartFunc } from "./PullFuncs/Original.js";
import { FromNode } from "./PullFuncs/FromFetch.js";

let ShowFunc = async () => {
    let LocalDataConfig = { inFolderName: "Masters", inFileName: "Garments.json", inItemName: "GarmentNames" }
    if (typeof Neutralino === 'undefined') {
        // console.log("hii");
        return await FromNode({...LocalDataConfig});
    }
    else {
        return await OriginalStartFunc({...LocalDataConfig});
    }
}
export { ShowFunc };
