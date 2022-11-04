let RowHtmlFunc = async () => {
    let response = await fetch("/Laundry/Bookings/Today/Show/Html/Hbs/Row.html");
    let data = await response.text();

    return await data;

};
export{RowHtmlFunc};