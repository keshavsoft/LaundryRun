import { BillModalPopUpHtmlFunc } from "./HtmlFuncs/FromHbs.js";
import { FromPk as DalFromPk } from "../../../Dal/Transactions/Bookings/PullFuncs/PickFuncs.js";

let ToModal = async ({ inBookingPK }) => {
    //  let jVarLocalDataNeeded = await PickFuncForQrCode({ inRowPK });
    let jVarLocalDataNeeded = await DalFromPk({ inRowPK: inBookingPK });

    try {
        if (jVarLocalDataNeeded.KTF) {
            let jVarLocalId = "ModalForBilling";
            let jVarLocalModalForBilling = document.getElementById(jVarLocalId);

            //let jVarLocalModalBody = document.getElementById("ModalBody");
            let jVarLocalModalBody = jVarLocalModalForBilling.querySelector(".modal-body");

            let jVarLocalFromTemplate = await BillModalPopUpHtmlFunc();

            var template = Handlebars.compile(jVarLocalFromTemplate);
            let LocalQrCodesData = jVarLocalDataNeeded.KResult;

            jVarLocalModalBody.innerHTML = template(LocalQrCodesData);

            var myModal = new bootstrap.Modal(jVarLocalModalForBilling, { keyboard: true, focus: true });

            myModal.show();
        };
    } catch (error) {
        console.log("error -------: ", error);
    };
};

let AddListeners = () => {
    let jVarLocalBillButtonClass = document.getElementsByClassName("BillButtonClass");

    for (var i = 0; i < jVarLocalBillButtonClass.length; i++) {
        jVarLocalBillButtonClass[i].addEventListener('click', async (inEvent) => {
            let jVarInsideCurrentTarget = inEvent.currentTarget;
            let jVarInsideClosestTr = jVarInsideCurrentTarget.closest("tr");
            let jVarInsideBookingCode = jVarInsideCurrentTarget.dataset.qrcode;
            // console.log("aaaaaa : ", jVarInsideBookingCode);
            ToModal({ inBookingPK: jVarInsideBookingCode });
        });
    };
};

export { AddListeners, ToModal };