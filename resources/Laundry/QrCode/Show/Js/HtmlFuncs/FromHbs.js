let QrcodeShowHtmlFunc = async () => {
    let jVarLocalFetchUrl = "/Laundry/QrCode/Show/Html/Hbs/QrCodeShow.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

 export {QrcodeShowHtmlFunc};