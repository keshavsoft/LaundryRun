import { LastBookingtHtmlFunc } from "./HtmlFuns/FromHbs.js";
import { LastPkData } from "../../../../Dal/Bookings/PullFuncs/PickFuncs.js";

let LastBookingFunc = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    let jVarLocalFromHbs = await LastBookingtHtmlFunc();

    let jVarLocalKCont1 = document.getElementById("KCont1");

    var template = Handlebars.compile(jVarLocalFromHbs);
    let jVarLocalDataToShow = await LastPkData();

    if (jVarLocalDataToShow.KTF) {

        jVarLocalKCont1.innerHTML = template(jVarLocalDataToShow.KResult);

    };
    
};

LastBookingFunc().then();