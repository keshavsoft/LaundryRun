import { ToDOMBodyAsParts } from "../../FindBooking/Js/FindBooking.js";
// import { ToModal as BillingToModal } from "../../../../Billing/Print/Js/BillToModal";

let AddlistenersFunc = () => {
    let jVarLocalTableButtons = document.querySelectorAll(".OrderButtonClass");
    jVarLocalTableButtons.forEach(function (element) {
        // element refers to the DOM node
        element.addEventListener('click', LocalTableButtonFunc);
    });

    // let jVarLocalBillButtonClass = document.querySelectorAll(".BillButtonClass");
    // jVarLocalBillButtonClass.forEach(function (element) {
    //     // element refers to the DOM node
    //     element.addEventListener('click', LocalTableBillButtonFunc);
    // });
};

let LocalTableButtonFunc = async (event) => {
    let jVarLocalCurrentTarget = event.currentTarget;

    await ToDOMBodyAsParts({ inBookingPK: jVarLocalCurrentTarget.dataset.orderno });
};

let LocalTableBillButtonFunc = async (event) => {
    let jVarLocalCurrentTarget = event.currentTarget;
    // console.log("lllllllllllllll", jVarLocalCurrentTarget.dataset);
    await BillingToModal({ inBookingPK: jVarLocalCurrentTarget.dataset.billno });
};

export { AddlistenersFunc }
