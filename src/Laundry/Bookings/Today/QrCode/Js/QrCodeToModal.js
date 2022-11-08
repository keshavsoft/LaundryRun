import { QrCodeModalPopUp } from "../Js/HtmlFuncs/FromHbs.js";
import { FromBookingPk } from "../../../../Dal/QrCodes/PullFuncs/PickFuncs.js";

let ToModal = async ({ inRowPK }) => {
    let jVarLocalDataNeeded = await FromBookingPk({ inBookingPK: inRowPK });
    try {
        if (jVarLocalDataNeeded.KTF) {
            let jVarLocalModalBody = document.getElementById("ModalBody");

            let jVarLocalFromTemplate = await QrCodeModalPopUp();

            var template = Handlebars.compile(jVarLocalFromTemplate);
            let LocalQrCodesData = jVarLocalDataNeeded.KResult;

            jVarLocalModalBody.innerHTML = template(LocalQrCodesData);

            for (let i = 0; i < LocalQrCodesData.length; i++) {
                let jVarLocalHtmlQrId = document.getElementById(LocalQrCodesData[i].CanvasId);
                let LoopInsideQrCode = LocalQrCodesData[i].QrCode;
                let LoopInsideCustomerName = LocalQrCodesData[i].CustomerName;
                let LoopInsideMobile = LocalQrCodesData[i].Mobile;
                let LoopInsideGarmentsName = LocalQrCodesData[i].GarmentsName;
                let LoopInsideAmount = LocalQrCodesData[i].Amount;
                let LoopInsideGarmentsNamesArray = LocalQrCodesData[i].GarmentDetailsAsString;
                let LoopInsideGarmentPcsTotal = LocalQrCodesData[i].GarmentPcsTotal;

                // let jVarLocalQrData = `${jVarLocalDataNeeded.KResult.CanvasId}/${jVarLocalDataNeeded.KResult.CustomerName}/${jVarLocalDataNeeded.KResult.Mobile}/${jVarLocalDataNeeded.KResult.Garments}/${jVarLocalDataNeeded.KResult.Weight}`;
                let jVarLocalQrData = `${LoopInsideQrCode}/${LoopInsideGarmentsName}/${LoopInsideCustomerName}/${LoopInsideMobile}/${LoopInsideAmount}/${LoopInsideGarmentsNamesArray}/${LoopInsideGarmentPcsTotal}/${inRowPK}`;

                GenerateQrCodeOnModal({
                    inQrData: jVarLocalQrData,
                    inCanvasId: jVarLocalHtmlQrId
                });
            };

            let jVarLocalId = "ModalForQrCode";

            var myModal = new bootstrap.Modal(document.getElementById(jVarLocalId), { keyboard: true, focus: true });

            myModal.show();
        };
    } catch (error) {
        console.log("error -------: ", error);
    };
};

let AddListeners = () => {
    let jVarLocalQrCodeButtonClass = document.getElementsByClassName("QrCodeButtonClass");
   
    for (var i = 0; i < jVarLocalQrCodeButtonClass.length; i++) {
        jVarLocalQrCodeButtonClass[i].addEventListener('click', async (inEvent) => {
            let jVarInsideCurrentTarget = inEvent.currentTarget;
            let jVarInsideClosestTr = jVarInsideCurrentTarget.closest("tr");
            let jVarInsideQrCodeValue = jVarInsideClosestTr.dataset.qrcode;
            ToModal({ inRowPK: jVarInsideQrCodeValue });
        });
    };
};

let GenerateQrCodeOnModal = ({ inQrData = "", inCanvasId }) => {
    var canvas = inCanvasId;
    canvas.height = 1;
    canvas.width = 1;
    canvas.style.visibility = 'hidden';

    // Convert the options to an object.
    let opts = {};

    // Finish up the options
    opts.text = inQrData;
    opts.bcid = "qrcode";
    opts.scaleX = 1;
    opts.scaleY = 1;
    opts.rotate = "N";

    // Draw the bar code to the canvas
    try {
        let ts0 = new Date;
        bwipjs.toCanvas(canvas, opts);
        show(ts0, new Date);
    } catch (e) {
        console.log("error : ", e);

        return;
    }

    function show(ts0, ts1) {
        canvas.style.visibility = 'visible';
    }
};

export { AddListeners, ToModal };