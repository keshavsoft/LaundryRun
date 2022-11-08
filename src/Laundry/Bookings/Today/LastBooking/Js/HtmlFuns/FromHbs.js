let LastBookingtHtmlFunc = async () => {
    let jVarLocalFetchUrl = "/Laundry/Bookings/Today/LastBooking/Html/Hbs/LastBooking.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

export { LastBookingtHtmlFunc }