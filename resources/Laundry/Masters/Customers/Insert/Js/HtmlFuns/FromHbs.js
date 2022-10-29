let CustomersHtmlFunc = async () => {
    let jVarLocalFetchUrl = "Laundry/Masters/Customers/Insert/Html/Hbs/CustomersInsert.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

export { CustomersHtmlFunc }