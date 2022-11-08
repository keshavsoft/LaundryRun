let CustomerDetailstHtmlFunc = async () => {
    let jVarLocalFetchUrl = "Laundry/Booking/Today/FindBooking/Html/Hbs/CustomerDetails.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

let GarmentDetailsHtmlFunc = async () => {
    let jVarLocalFetchUrl = "Laundry/Booking/Today/FindBooking/Html/Hbs/GarmentDetails.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

let QrCodeArrayHtmlFunc = async () => {
    let jVarLocalFetchUrl = "Laundry/Booking/Today/FindBooking/Html/Hbs/QrcodeArray.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

export { CustomerDetailstHtmlFunc, GarmentDetailsHtmlFunc, QrCodeArrayHtmlFunc };