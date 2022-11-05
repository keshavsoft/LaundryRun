let ScanHtmlFunc = async () => {
    let jVarLocalFetchUrl = "/Laundry/Completed/Scan/Html/Templates/Scan.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};
export{ScanHtmlFunc};