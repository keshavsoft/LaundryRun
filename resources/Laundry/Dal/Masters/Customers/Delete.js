let DeleteFunc = async ({ inRowPK }) => {
    let LocalJsonFileName = "Customers.json";

    let LocalReturnObject = { KTF: false, KResult: "" };

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    if (inRowPK in LocalCustomersDataAsJson) {
        delete LocalCustomersDataAsJson[inRowPK];

        let LocalFromWriteFile = await Neutralino.filesystem.writeFile(`./KData/JSON/2017/${LocalJsonFileName}`, JSON.stringify(LocalCustomersDataAsJson));

        if (LocalFromWriteFile.success) {
            LocalReturnObject.KTF = true;
            LocalReturnObject.KResult = `${inRowPK} deleted successfully...`
        };
    };

    return await LocalReturnObject;
};
