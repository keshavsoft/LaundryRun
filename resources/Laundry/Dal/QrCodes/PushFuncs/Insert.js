let CommonJsonFileName = "QrCodes.json";
let CommonDataPath = `./KData/JSON/2017/Data/Transactions/${CommonJsonFileName}`;
let CommonItemName = "QrCodes";


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
        let LocalCustomersData = await Neutralino.filesystem.readFile(CommonDataPath);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
        let LocalNewData = { ...(LocalCustomersDataAsJson[CommonItemName]), ...inObjectToInsert };

        let LocalFromWriteFile = await Neutralino.filesystem.writeFile(CommonDataPath, JSON.stringify(LocalNewData));
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
