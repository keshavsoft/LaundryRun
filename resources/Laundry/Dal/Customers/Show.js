let ShowFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    if (typeof Neutralino === 'undefined') {
        // console.log("hii");
        return await LocalFromFetch1();
    }
    else {
        return await LocalNeu();
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

let LocalFromFetch1 = async () => {
    try {
        let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

        let inFetchPostData = {
            inFolderName: "Masters", inFileName: "Customers.json", inItemName: "CustomerNames", inScreenName: "Show"
        };

        let jVarLocalFetchUrl = "/JSONApi/API/Data/FromFolder/FromFile/Items/FromDataFolder/NoConfig/Masters/Customers.json/CustomerNames";
        let jVarLocalFetchHeaders = {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inFetchPostData)
        }
        const response = await fetch(jVarLocalFetchUrl);
        const data = await response.json();
        if (data.KTF === false) {
            LocalReturnObject.KReason = data.KReason;
            return await LocalReturnObject;
        };
        LocalReturnObject.JsonData = data.DataFromServer;

        LocalReturnObject.KTF = true;
        return await LocalReturnObject;

    } catch (error) {
        console.log("error:", error);
    }

};
export { ShowFunc };
