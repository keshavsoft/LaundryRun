let BillingScanHtmlFunc = async () => {
    let jVarLocalFetchUrl = "/Laundry/Billing/Scan/Html/Templates/Scan.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};
export{BillingScanHtmlFunc};