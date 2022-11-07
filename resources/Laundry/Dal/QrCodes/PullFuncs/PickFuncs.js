import { FromPkForQrCodes } from "../../Bookings/PullFuncs/PickFuncs.js";
import { StartFunc as OriginalStartFunc } from "./Original.js";

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

        let LocalOriginalData = await OriginalStartFunc();
        // console.log("LocalOriginalData:", LocalOriginalData);
        if (LocalOriginalData.KTF === false) {
            LocalReturnObject.KReason = LocalOriginalData.KReason;
            return await LocalReturnObject;
        };

        let LocalQrCodesCollection = Object.entries(LocalOriginalData.JsonData).map(
            ([key, value]) => {
                return { ...value, QrCode: key }
            }
        );
        // console.log("LocalQrCodesCollection:", LocalQrCodesCollection, LocalBookingPk);
        let LocalFiltered = LocalQrCodesCollection.filter(element => element.BookingRef === LocalBookingPk);
        // console.log("LocalFiltered:", LocalFiltered);
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
        // console.log("LocalDataNeeded:", LocalDataNeeded);
        LocalReturnObject.KResult = LocalDataNeeded;
        LocalReturnObject.KTF = true;

    } catch (error) {
        console.log(error);
    };
    // console.log("LocalReturnObject:", LocalReturnObject);
    return await LocalReturnObject;
};

export { FromBookingPk };