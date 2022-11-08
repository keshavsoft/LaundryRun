import { GarmentsSaveFunc } from "./SaveFuncs.js";

let StartFunc = () => {
    let jVarLocalGarmentsSaveButtonId = document.getElementById("GarmentsSaveButtonId");
    jVarLocalGarmentsSaveButtonId.addEventListener("click", GarmentsSaveFunc);
};
StartFunc();