let StartFunc = async () => {
    let LocalJsonFileName = "Billing.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    try {
        let LocalData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/Data/Transactions/${LocalJsonFileName}`);
        let LocalDataAsJson = JSON.parse(LocalData);

        LocalReturnObject.JsonData = LocalDataAsJson;
        LocalReturnObject.KTF = true;
    } catch (error) {
        console.log("error dal:Billing:PullFuncs:Original : ", error);
        LocalReturnObject.KError = error;
    };

    return await LocalReturnObject;
};

export { StartFunc }