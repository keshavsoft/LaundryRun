let GarmentsShowHtmlFunc = async () => {
    let jVarLocalFetchUrl = "/Laundry/Masters/Garments/Show/Html/Hbs/GarmentsShow.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

export { GarmentsShowHtmlFunc }