let UpdateFunc = async ({ inRowPK }) => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "" };

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    if (inRowPK in LocalCustomersDataAsJson) {
        LocalCustomersDataAsJson[inRowPK].WashingDone = {
            KTF: true,
            DateTime: LocalGetDate()
        };

        let LocalFromWriteFile = await Neutralino.filesystem.writeFile(`./KData/JSON/2017/${LocalJsonFileName}`, JSON.stringify(LocalCustomersDataAsJson));

        if (LocalFromWriteFile.success) {
            LocalReturnObject.KTF = true;
            LocalReturnObject.KResult = `${inRowPK} deleted successfully...`
        };
    };

    return await LocalReturnObject;
};

let LocalGetDate = () => {
    let date = new Date();

    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let HH = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    return `${dd}-${MM}-${yyyy}-${HH}-${mm}-${ss}`;
};

