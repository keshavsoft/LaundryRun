import { BookingSaveFunc } from "./SaveFuncs.js";

let AddListenersFunc = () => {
    let jVarLocalBookingSaveButtonId = document.getElementById("BookingSaveButtonId");
    let jVarLocalFormVertical = document.getElementById("FormVertical");
    let jVarLocalFormForGarments = document.getElementById("FormForGarments");

    let jVarLocalFormElements = jVarLocalFormVertical.querySelectorAll("input");

    for (let i = 0; i < jVarLocalFormElements.length; i++) {
        jVarLocalFormElements[i].addEventListener("keypress", async (event) => {
            if (event.keyCode === 13) { // key code of the keybord key
                await BookingSaveFunc();
                // your code to Run
            }
        });
    };

    let jVarLocalGarmentElements = jVarLocalFormForGarments.querySelectorAll("input");

    for (let i = 0; i < jVarLocalGarmentElements.length; i++) {
        jVarLocalGarmentElements[i].addEventListener("keypress", async (event) => {
            if (event.keyCode === 13) { // key code of the keybord key
                await BookingSaveFunc();
                // your code to Run
            }
        });
    };

    jVarLocalBookingSaveButtonId.addEventListener("click", BookingSaveFunc);
};


export { AddListenersFunc }
//AddListenersFunc();