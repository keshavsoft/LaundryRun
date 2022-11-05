let FindBookingHtmlFunc = async () => {
    let jVarLocalFetchUrl = "/Laundry/Bookings/Today/FindBooking/Html/Templates/FindBooking.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
    //let jVarLocalKCont1 = document.getElementById("KCont1");
    //jVarLocalKCont1.innerHTML = data;
};

export { FindBookingHtmlFunc };