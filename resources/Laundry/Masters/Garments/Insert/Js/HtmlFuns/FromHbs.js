let GarmentsHtmlFunc = async () => {
    let jVarLocalFetchUrl = "Laundry/Masters/Garments/Insert/Html/Hbs/GarmentsInsert.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

export { GarmentsHtmlFunc }