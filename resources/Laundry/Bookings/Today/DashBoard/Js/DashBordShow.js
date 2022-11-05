import { DashBoardHtmlFunc } from "./HtmlFuncs/FromHbs.js";
import { ShowAll as DalShowAll } from "./Dalfuncs.js";
// import { ChangeClassFunc } from "../../../../CommonFuncs/Header";
import { AddlistenersFunc } from "./ListenerFuncs.js";
import { ToDOMBodyFromPK as FindBookingToDOMBodyFromPK } from "../../FindBooking/Js/FindBooking.js";

let DashBoardShow = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    let jVarLocalFromTemplate = await DashBoardHtmlFunc();

    var template = Handlebars.compile(jVarLocalFromTemplate);

    let jVarLocalDataNeeded = await DalShowAll();

    if (jVarLocalDataNeeded.KTF === false) {

    };

    LocalApplyRowColours({ inJsonData: jVarLocalDataNeeded.JsonData });

    let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

    document.getElementById("KCont1").innerHTML = jVarLocalHtml;

    AddlistenersFunc();
    LocalSetFocusFunc();
};

let LocalAddlistener = () => {
    console.log("LocalAddlistener:", LocalAddlistener);
    let jVarLocalTableButtons = document.querySelectorAll(".OrderButtonClass");
    jVarLocalTableButtons.forEach(function (element) {
        // element refers to the DOM node
        element.addEventListener('click', LocalTableButtonFunc);
    });
}

let LocalTableButtonFunc = async (event) => {
    let jVarLocalCurrentTarget = event.currentTarget;

    console.log("jVarLocalCurrentTarget:", jVarLocalCurrentTarget.dataset.orderno);
    await FindBookingToDOMBodyFromPK({ inBookingPK: jVarLocalCurrentTarget.dataset.orderno });

}

let LocalApplyRowColours = ({ inJsonData }) => {
    Object.entries(inJsonData).forEach(
        ([key, value]) => {
            if (value.QrCodesCompleted === value.QrCodesTotal) {
                value.TableRowColour = "table-success";
            };

            if (value.QrCodesCompleted < value.QrCodesTotal) {
                value.TableRowColour = "table-danger";

                //LocalSetFocusFunc();
            };
        }
    );
};

let LocalSetFocusFunc = () => {
    let jVarLocalCustomerName = document.getElementById("SearchQrCodeTable");
    jVarLocalCustomerName.focus();
};

DashBoardShow().then();
