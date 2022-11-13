import { StartFunc } from "../FuncsForPk/Start.js";
import { FromPk as BookingsFromPk } from "../../Bookings/PullFuncs/PickFuncs.js";
import { InsertFunc } from "../../QrCodes/PushFuncs/Insert.js";
import { StartFunc as MaxPk } from "../FuncsForPk/MaxPk.js";

let FromBooking = async ({ inBookingPk }) => {
    let LocalBookingPk = inBookingPk;
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalFromBookingsFromPk = await BookingsFromPk({ inRowPK: LocalBookingPk });

        if (LocalFromBookingsFromPk.KTF === false) {
            LocalReturnObject.KReason = LocalFromBookingsFromPk.KReason;
            return await LocalReturnObject;
        };

        let LocalFromPrepareObjectToInsert = await PrepareObjectToInsert({
            inGarmentDetails: LocalFromBookingsFromPk.KResult.GarmentDetails,
            inBookingPk: LocalBookingPk
        });

        if (LocalFromPrepareObjectToInsert.KTF === false) {
            LocalReturnObject.KReason = LocalFromPrepareObjectToInsert.KReason;
            return await LocalReturnObject;
        };

        let LocalNewData = LocalFromPrepareObjectToInsert.NewData;

        await InsertFunc({ inObjectToInsert: LocalNewData });

    } catch (error) {
        console.log("errorFromBooking : ", error);
    };

    return await LocalReturnObject;
};


let FromBooking_old1 = async ({ inBookingPk }) => {
    let promises = [];

    let LocalBookingPk = inBookingPk;
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalFromBookingsFromPk = await BookingsFromPk({ inRowPK: LocalBookingPk });

        if (LocalFromBookingsFromPk.KTF === false) {
            LocalReturnObject.KReason = LocalFromBookingsFromPk.KReason;
            return await LocalReturnObject;
        };

        let LocalMaxPk = await MaxPk();
        console.log("LocalMaxPk : ", LocalMaxPk);

        let LocalNewData = {};

        Object.entries(LocalFromBookingsFromPk.KResult.GarmentDetails).forEach(
            ([key, value]) => {
                for (let i = 0; i < value.Pcs; i++) {
                    LocalNewData[LocalMaxPk.MaxPk + 1] = {
                        BookingRef: inBookingPk,
                        GarmentsRef: key
                    };

                    LocalMaxPk.MaxPk += 1;
                };
            }
        );

        await InsertFunc({ inObjectToInsert: LocalNewData });

        console.log(LocalNewData);

    } catch (error) {
        console.log("errorFromBooking : ", error);
    };

    return await LocalReturnObject;
};

let PrepareObjectToInsert = async ({ inGarmentDetails, inBookingPk }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    let LocalFromMaxPk = await MaxPk();

    if (LocalFromMaxPk.KTF === false) {
        LocalReturnObject.KReason = LocalFromMaxPk.KReason;
        return await LocalReturnObject;
    };

    let LocalMaxPk = LocalFromMaxPk.MaxPk;

    let LocalNewData = {};
    
    Object.entries(inGarmentDetails).forEach(
        ([key, value]) => {
            for (let i = 0; i < value.Pcs; i++) {
                LocalNewData[LocalMaxPk + 1] = {
                    BookingRef: inBookingPk,
                    GarmentsRef: key,
                    DateTime: LocalGetDate()
                };

                LocalMaxPk += 1;
            };
        }
    );

    LocalReturnObject.NewData = LocalNewData;
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

let FromBooking_old = async ({ inBookingPk }) => {
    let promises = [];

    let LocalBookingPk = inBookingPk;
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalFromBookingsFromPk = await BookingsFromPk({ inRowPK: LocalBookingPk });
        console.log(LocalFromBookingsFromPk);
        if (LocalFromBookingsFromPk.KTF === false) {
            LocalReturnObject.KReason = LocalFromBookingsFromPk.KReason;
            return await LocalReturnObject;
        };

        Object.entries(LocalFromBookingsFromPk.KResult.GarmentDetails).forEach(
            ([key, value]) => {
                for (let i = 0; i < value.Pcs; i++) {
                    promises.push(LocalStartFunc({
                        inDataToSave: {
                            BookingRef: key,
                            GarmentsRef: i
                        }
                    }));
                };
            }
        );

        const results = await Promise.all(promises);
        console.log(results);

    } catch (error) {
        console.log("errorFromBooking : ", error);
    };

    return await LocalReturnObject;
};

let LocalStartFunc = async ({ inDataToSave }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalFromFuncsForPkStartFunc = await StartFunc();

        if (LocalFromFuncsForPkStartFunc.KTF === false) {
            LocalReturnObject.KReason = LocalFromFuncsForPkStartFunc.KReason;
            return await LocalReturnObject;
        };

        let LocalMax = LocalFromFuncsForPkStartFunc.LastPk + 1;

        let LocalFromJsonSave = await InsertFunc({
            inObjectToInsert: await LocalTemplateDataToSave({ inDataToSave })
        });

        console.log("LocalMax-------- : ", LocalFromJsonSave);

        if (LocalFromJsonSave.KTF === false) {
            LocalReturnObject.KReason = LocalReturnObject.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.KTF = true;
        LocalReturnObject.KResult = `${LocalMax} saved successfully...`;
        LocalReturnObject.kPK = LocalMax;

        return await LocalReturnObject;
    } catch (error) {
        console.log("error InsertFunc : ", error);
    };

    return await LocalReturnObject;
};

let LocalToJson = async ({ inDataToSave, inPK }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };

    try {
        let LocalJsonFileName = "QrCodes.json";

        let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

        if ((inPK in LocalCustomersDataAsJson) === false) {
            LocalCustomersDataAsJson[inPK] = inDataToSave;

            let LocalFromWriteFile = await Neutralino.filesystem.writeFile(`./KData/JSON/2017/${LocalJsonFileName}`, JSON.stringify(LocalCustomersDataAsJson));

            if (LocalFromWriteFile.success) {
                LocalReturnObject.KTF = true;
            };

        };

    } catch (error) {
        console.log("error InsertFunc : ", error);
    };

    return await LocalReturnObject;
};

let LocalTemplateDataToSave = async ({ inDataToSave }) => {
    try {
        let LocalJsonFileName = "QrCodes.json";

        let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
        let ModalDataAsJson = JSON.parse(ModalData);

        let LocalNewData = _.pick(inDataToSave, Object.keys(ModalDataAsJson));
        LocalNewData.DateTime = LocalGetDate();
        // console.log("LocalNewData : ", inDataToSave, LocalNewData);
        return await LocalNewData;
    } catch (error) {
        console.log("error InsertFunc : ", error);
    };
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

export { FromBooking };