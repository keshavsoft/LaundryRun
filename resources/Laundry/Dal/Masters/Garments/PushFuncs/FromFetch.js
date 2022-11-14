let FromNode = async ({ inFolderName, inFileName, inItemName }) => {
    try {
        let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

        let inFetchPostData = {
            inJsonConfig: {
                inFolderName: "Masters",
                inJsonFileName: "Garments.json"
            }, inItemConfig: {
                inItemName: "GarmentNames"
            },
            inPostData: {
                CustomerName: "aaaaaaaaaaaaaa",
                Mobile: 9999999999
            }
        };

        let jVarLocalFetchUrl = "/JSONApi/Api/Data/FromFolder/FromFile/Items/FromDataFolder/Insert";
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
    } catch (error) {
        console.log("error:", error);
    }

};

export { FromNode };