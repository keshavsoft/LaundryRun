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

let InsertFunc = async ({ inObjectToInsert }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {

        let LocalJsonFileName = "QrCodes.json";

        let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
        let LocalNewData = { ...LocalCustomersDataAsJson, ...inObjectToInsert };

        let LocalFromWriteFile = await Neutralino.filesystem.writeFile(`./KData/JSON/2017/${LocalJsonFileName}`, JSON.stringify(LocalNewData));
        if (LocalFromWriteFile.success) {
            //   LocalReturnObject.KResult = `${max} saved successfully...`;
            LocalReturnObject.KTF = true;
        };

    } catch (error) {
        console.log("error InsertFunc : ", error);
    };
    return await LocalReturnObject;
};

const toNumbers = arr => arr.map(Number);

export { InsertFunc }
