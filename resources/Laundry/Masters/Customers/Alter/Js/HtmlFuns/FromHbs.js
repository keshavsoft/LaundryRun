let CustomersShowHtmlFunc = async () => {
    let jVarLocalFetchUrl = "/Laundry/Masters/Customers/Alter/Html/Hbs/CustomersAlter.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

export { CustomersShowHtmlFunc }