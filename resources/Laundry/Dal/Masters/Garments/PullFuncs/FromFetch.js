let FromNode = async ({ inFolderName, inFileName, inItemName }) => {
    try {
        let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

        let inFetchPostData = {
            inFolderName: "Masters", inFileName: "Garments.json", inItemName: "GarmentNames", inScreenName: "Show"
        };

        let jVarLocalFetchUrl = "/JSONApi/API/Data/FromFolder/FromFile/Items/FromDataFolder/NoConfig/Masters/Garments.json/GarmentNames";
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

export { FromNode };