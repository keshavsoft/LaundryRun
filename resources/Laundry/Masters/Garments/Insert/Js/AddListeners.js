import { GarmentsSaveFunc } from "./SaveFuncs.js";

let StartFunc = () => {
    let jVarLocalGarmentsSaveButtonId = document.getElementById("GarmentsSaveButtonId");
    console.log("jVarLocalGarmentsSaveButtonId : ", jVarLocalGarmentsSaveButtonId);
    jVarLocalGarmentsSaveButtonId.addEventListener("click", GarmentsSaveFunc);
};

StartFunc();