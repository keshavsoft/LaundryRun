import { BookingSaveFunc } from "./SaveFuncs.js";

let AddListenersFunc = () => {
    let jVarLocalBookingSaveButtonId = document.getElementById("BookingSaveButtonId");

    jVarLocalBookingSaveButtonId.addEventListener("click", async (event) => {
        await BookingSaveFunc();
    });
    // jVarLocalBookingSaveButtonId.addEventListener("click", BookingClear );

};

export { AddListenersFunc }
//AddListenersFunc();