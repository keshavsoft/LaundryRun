let BillPrintHtmlFunc = async () => {
    let jVarLocalFetchUrl = "/Laundry/Billing/Print/Html/Hbs/BillingPrint.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};
export { BillPrintHtmlFunc };
