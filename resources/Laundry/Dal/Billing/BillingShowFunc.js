import { ShowAllFunc } from "../../Dal/Bookings/Show";

let ShowWithBookingDataFunc = async () => {
    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalBookingData = await ShowAllFunc();
    let LocalCompletedData = await BillingShowAllFunc();

    if (LocalCompletedData.KTF === false) {
        LocalReturnObject.KReason = LocalCompletedData.KReason;
        return await LocalReturnObject;
    };

    if (LocalBookingData.KTF === false) {
        LocalReturnObject.KReason = LocalBookingData.KReason;
        return await LocalReturnObject;
    };

    LocalReturnObject.JsonData = _.map(LocalCompletedData.JsonData, (LoopItem) => {
        let LoopInside = _.find(LocalBookingData.JsonData, LoopBooking => {
            return LoopItem.key in LoopBooking.value.QrCodes;
        });
        if ((LoopInside === undefined) === false) {
            LoopItem.value.CustomerName = LoopInside.value.CustomerName;
        } else {
            LocalReturnObject.KReason = `${LoopItem.key} : Qrcode not found in Bookings.json`;
        };

        return LoopItem;
    });

    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

let BillingShowAllFunc = async () => {
    let LocalJsonFileName = "Billing.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalDataAsJson = JSON.parse(LocalData);

    let LocalCollectionData = Object.keys(LocalDataAsJson).map(key => ({ key, value: LocalDataAsJson[key] }));

    LocalReturnObject.JsonData = LocalCollectionData;
    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};


export { ShowWithBookingDataFunc };
