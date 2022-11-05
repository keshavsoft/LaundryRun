import { FromPkForQrCodes } from "../../Bookings/PullFuncs/PickFuncs.js";


let CommonJsonFileName = "QrCodes.json";
let CommonDataPath = `./KData/JSON/2017/Data/Transactions/${CommonJsonFileName}`;
let CommonItemName = "QrCodes";

let FromBookingPk = async ({ inBookingPK }) => {
    let LocalReturnObject = { KTF: false, KResult: "" };
    let LocalBookingPk = inBookingPK;

    try {
        let LocalBookingData = await FromPkForQrCodes({ inRowPK: LocalBookingPk });

        if (LocalBookingData.KTF === false) {
            LocalReturnObject.KReason = LocalBookingData.KReason;
            return await LocalReturnObject;
        };

        let LocalBookingGarmentsData = LocalBookingData.ForQrCode.GarmentDetails;

        let LocalQrCodesData = await Neutralino.filesystem.readFile(CommonDataPath);
        let LocalQrCodesJsonData = JSON.parse(LocalQrCodesData);

        let LocalQrCodesCollection = Object.entries(LocalQrCodesJsonData[CommonItemName]).map(
            ([key, value]) => {
                return { ...value, QrCode: key }
            }
        );

        let LocalFiltered = LocalQrCodesCollection.filter(element => element.BookingRef === LocalBookingPk);

        let LocalDataNeeded = LocalFiltered.map(element => {
            if (element.GarmentsRef in LocalBookingGarmentsData) {
                element.CustomerName = LocalBookingData.ForQrCode.CustomerName;
                element.Mobile = LocalBookingData.ForQrCode.Mobile;
                element.Amount = LocalBookingData.ForQrCode.Amount;
                element.GarmentDetailsAsString = LocalBookingData.ForQrCode.GarmentDetailsAsString;
                element.GarmentPcsTotal = LocalBookingData.ForQrCode.GarmentPcsTotal;
                
                element.GarmentsName = LocalBookingGarmentsData[element.GarmentsRef].Name;
                element.GarmentsPcs = LocalBookingGarmentsData[element.GarmentsRef].Pcs;
            };
            element.CanvasId = `Canvas${element.QrCode}`
            return element;
        });

        LocalReturnObject.KResult = LocalDataNeeded;
        LocalReturnObject.KTF = true;

    } catch (error) {
        console.log(error);
    };

    return await LocalReturnObject;
};

export { FromBookingPk };