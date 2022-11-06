let GarmentsValidateFunc = async () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalFormForGarments = document.getElementById("FormForGarments");

    jVarLocalFormForGarments.classList.add('was-validated');

    if (jVarLocalFormForGarments.checkValidity() === false) {
        LocalSetFocus({ inHtmControlToSearch: jVarLocalFormForGarments });

        jVarLocalReturnObject.KReason = "Form not validated!";
        return await jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;
    return await jVarLocalReturnObject;

};

let LocalSetFocus = ({ inHtmControlToSearch }) => {
    let jVarLocalRequired = inHtmControlToSearch.querySelectorAll("input");

    for (let i = 0; i < jVarLocalRequired.length; i++) {
        if (jVarLocalRequired[i].validity.valid === false) {
            jVarLocalRequired[i].focus();
            i = jVarLocalRequired.length + 1;
        };
    };
};


let FormVerticalValidate = async () => {
    let jVarLocalReturnObject = { KTF: false, KResult: {} };

    let jVarLocalFormVertical = document.getElementById("FormVertical");

    jVarLocalFormVertical.classList.add('was-validated');

    if (jVarLocalFormVertical.checkValidity() === false) {
        LocalSetFocus({ inHtmControlToSearch: jVarLocalFormVertical });


        // let jVarLocalRequired = jVarLocalFormVertical.querySelectorAll("input");

        // for (let i = 0; i < jVarLocalRequired.length; i++) {
        //     if (jVarLocalRequired[i].validity.valid === false) {
        //         jVarLocalRequired[i].focus();
        //         i = jVarLocalRequired.length + 1;
        //     };
        // };

        jVarLocalReturnObject.KReason = "Form not validated!";
        return await jVarLocalReturnObject;
    };

    jVarLocalReturnObject.KTF = true;
    return await jVarLocalReturnObject;

};


export { GarmentsValidateFunc, FormVerticalValidate }