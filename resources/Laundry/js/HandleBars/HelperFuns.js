let IndianFormat = (x) => {
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);

    if (otherNumbers !== '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return res;
};

let ShowInIndianDateFormat = () => {
    Handlebars.registerHelper('ShowInIndianDateFormat', function (value, options) {
        //return this.JsFuncs.GeneralFuncs.addThousand(parseFloat(value).toFixed(2), 2);
        let decimalpoints = 2;
        var input = value;
        var output = value;
        var zerovalue = "0";

        if (parseFloat(input)) {
            input = new String(input); // so you can perform string operations

            if (input.indexOf(".") === -1) {
                //if no decimal is present in input

                output = IndianFormat(input.trim());

                if (decimalpoints > 0) {
                    //if decimalpoints are needed then add that many zeros with . to the output
                    output += "." + zerovalue.repeat(decimalpoints);
                }
            }
            else {
                var parts = input.split("."); // remove the decimal part
                //convert the integer to thousands value
                parts[0] = IndianFormat(parts[0]);
                //now check for the decimal portion length
                if (parts[1].trim().length < decimalpoints) {
                    //if decimal portion length is less then needed of decimalpoints
                    //then insert the last need zeros as below
                    parts[1] = parts[1].trim() + zerovalue.repeat(decimalpoints - parts[1].trim().length);
                }
                else {
                    //if decimal portion needed is less then available
                    //then trim the content needed
                    parts[1] = parts[1].substring(0, decimalpoints);
                }
                //now join then split parts
                output = parts.join(".");
            }

        }
        return output;
    });
};

ShowInIndianDateFormat();