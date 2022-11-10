import { StartFunc as OriginalStartFunc } from "./PullFuncs/Original.js";
import { FromNode } from "./PullFuncs/FromFetch.js";

let ShowFunc = async () => {
    let LocalDataConfig = { inFolderName: "Masters", inFileName: "Customers.json", inItemName: "CustomerNames" }
    if (typeof Neutralino === 'undefined') {
        // console.log("hii");
        return await FromNode({...LocalDataConfig});
    }
    else {
        return await OriginalStartFunc({...LocalDataConfig});
    }
}


let LocalNeu = async () => {
    let LocalJsonFileName = "Customers.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
    let ModalDataAsJson = JSON.parse(ModalData);

    let LocalCustomersData = await Neutralino.filesystem.readFile('./KData/JSON/2017/Data/Masters/Customers.json');
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    Object.entries(LocalCustomersDataAsJson.CustomerNames).forEach(
        ([LoopKey, LoopValue]) => {

            let LoopNewObject = JSON.parse(JSON.stringify(ModalDataAsJson));
            let LocalLoopObject = {};

            Object.entries(LoopNewObject).forEach(
                ([key, value]) => {
                    LocalLoopObject[key] = LoopValue[key];
                    value = LoopValue[key];

                }
            );

            LocalReturnObject.JsonData[LoopKey] = LocalLoopObject;
        }
    );

    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

let LocalFromFetch = async () => {
    let inFetchPostData = {
        inFolderName: "Masters", inFileName: "Customers.json", inItemName: "CustomerNames", inScreenName: "Show"
    };

    let jVarLocalFetchUrl = "/JSONApi/API/Data/FromFolder/FromFile/ScreensFromDisplayJson/PullData/WithConfig";
    let jVarLocalFetchHeaders = {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inFetchPostData)
    }
    const response = await fetch(jVarLocalFetchUrl, jVarLocalFetchHeaders);
    const data = await response.json();
    console.log("data", data);

};


export { ShowFunc };
