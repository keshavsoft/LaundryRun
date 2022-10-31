import { BookingSaveFunc } from "./SaveFuncs.js";

let AddListenersFunc = () => {
    console.log("fffffffffff");
    let jVarLocalBookingSaveButtonId = document.getElementById("BookingSaveButtonId");

    jVarLocalBookingSaveButtonId.addEventListener("click", async (event) => {
        console.log("jjjjjjjjjjjjjjj");
        await BookingSaveFunc();
    });
    // jVarLocalBookingSaveButtonId.addEventListener("click", BookingClear );

};

export {AddListenersFunc};