let CustomersShowHtmlFunc = async () => {
    let jVarLocalFetchUrl = "/Laundry/Masters/Customers/Show/Html/Hbs/CustomersShow.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

export { CustomersShowHtmlFunc }