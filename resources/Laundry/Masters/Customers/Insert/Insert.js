import { StartFunc as AddListenersFunc } from "./Js/AddListeners.js";
import { CustomerNamesToDatalistFunc, CustomerMobileDatalistFunc } from "./Js/CustomersSearch.js";

AddListenersFunc();

CustomerNamesToDatalistFunc().then();
CustomerMobileDatalistFunc().then();