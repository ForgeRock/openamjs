/*
 * Copyright © 2016 ForgeRock, AS.
 *
 * This is unsupported code made available by ForgeRock for community development
 * subject to the license detailed below. The code is provided on an "as is" basis,
 * without warranty of any kind, to the fullest extent permitted by law.
 *
 * ForgeRock does not warrant or guarantee the individual success developers may
 * have in implementing the code on their development platforms or in production
 * configurations.
 *
 * ForgeRock does not warrant, guarantee or make any representations regarding the
 * use, results of use, accuracy, timeliness or completeness of any data or
 * information relating to the alpha release of unsupported code. ForgeRock
 * disclaims all warranties, expressed or implied, and in particular, disclaims all
 * warranties of merchantability, and warranties related to the code, or any
 * service or software related thereto.
 *
 * ForgeRock shall not be liable for any direct, indirect or consequential damages
 * or costs of any type arising out of any action taken by you or others related to
 * the code.
 *
 * The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in
 * compliance with the License.
 *
 * You can obtain a copy of the License at https://forgerock.org/cddlv1-0/. See the
 * License for the specific language governing permission and limitations under the
 * License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file
 * and include the License file at https://forgerock.org/cddlv1-0/. If applicable,
 * add the following below the CDDL Header, with the fields enclosed by brackets []
 * replaced by your own identifying information: "Portions copyright [year] [name
 * of copyright owner]".
 */

/* Some useful tools to combine with openam.js
 * To be extended further
 * openamUtils.js (v0.1)
 * Author: Identity Wrestler
 * Notice: This wrapper is not supported/maintained/endorsed by ForgeRock
 */


/**
 * Prints the Welcome message for the "identity" and the logout button in a div
 * @function printWelcomeAndLogout
 * @param {String} element
 * @param {Object} options The object containing the configuration for this function
 * <pre>
 * Example:
 * {
 *     openam: myOpenAM,
 *     message: "Welcome Mr. "
 * }
 * </pre>
 * @param {Object} options.openam - The OpenAM Configuration Object. This is
 *  a mandatory attribute. See openam.js documentation for more information
 * @param {String} options.message - The message to be shown as Welcome to the
 *  user/identity
 * @returns {undefined} Does not return anything. It overrides the element DOM
 */
function printWelcome(element, options) {
    if (typeof(element) === "string") {
        element = document.getElementById(element);
    }
    if (options) {
        var openam = options.openam || undefined;
        var message = options.message || "Welcome ";
    }
    element.innerHTML = message + openam.Id;
}

/*
 * Draws the middle bar in the login box
 * @returns {middleBar.table1|createTable.properties|createTable.myTable}
 */
function middleBar() {
    var table1 = createTable({width: "100%", height: "100%"});
    myInsertRow(table1, "&nbsp;", {colSpan: "2", align: "right"});
    var row1 = table1.insertRow();
    var cell1 = row1.insertCell();
    cell1.style.cssText = "height: 60px; border-right: 2px solid #dcd808;";
    cell1.innerHTML = "&nbsp;";
    myInsertCell(row1, "&nbsp;");
    myInsertRow(table1, "&nbsp;", {colspan: "2", align: "right"});
    myInsertRow(table1, "OR", {colSpan: "2", align: "right"});
    myInsertRow(table1, "&nbsp;", {colSpan: "2", align: "right"});
    var row2 = table1.insertRow();
    var cell2 = row2.insertCell();
    cell2.style.cssText = "height: 60px; border-right: 2px solid #dcd808;";
    cell2.innerHTML = "&nbsp;";
    return table1;
}

/*
 *  Performs the authentication of the user using the form "options.formId" passed
 *  in the object options
 * @function authenticateUser
 * @param {Object} options The options to be used for the authentication process
 * @returns {Boolean} false
 */
function authenticateUser(options) {
    var formId = options.formId || "amLoginForm";
    var gotoURL = options.gotoURL || getMyURL();
    var forma = null;
    // var gotoOnFail = options.gotoOnFail || getMyURL();
    var openamConn = options.openam;
    var response = options.data;
    var jsonResp = null;

    if (response) {
        jsonResp = JSON.parse(response);
        for (var callback in jsonResp.callbacks) {
            if (jsonResp.callbacks[callback].input &&
                jsonResp.callbacks[callback].input[0] &&
                document.forms[formId][jsonResp.callbacks[callback].input[0].name]) {
                  jsonResp.callbacks[callback].input[0].value = document.forms[formId][jsonResp.callbacks[callback].input[0].name].value;
            }
        }
        options.data = JSON.stringify(jsonResp);
    }

    var response2 = openamConn.authenticate(options);
    if (response2) {
        try {
            jsonResp = JSON.parse(response2);
        } catch (ex1) {
            window.location = gotoURL;
            return false;
        }
    } else {
        document.getElementById("errorMessage").innerHTML = 'The authentication failed';
        options.data = null;
        var td1 = document.getElementById("td1");
        var forma = document.getElementsByTagName("form")[0];
        removeListener(forma, options);
        var newForma = createForm(options);
        td1.replaceChild(newForma, forma);
        addListener(newForma, options);
        return false;
    }

    if (jsonResp.authId) {
        options.data = response2;
        var td1 = document.getElementById("td1");
        var forma = document.getElementsByTagName("form")[0];
        removeListener(forma, options);
        var newForma = createForm(options);
        td1.replaceChild(newForma, forma);
        addListener(newForma, options);
    } else {
        var tokenId_ = openamConn.authenticate(options);
        if (tokenId_) {
            window.location = gotoURL;
        } else {
            document.getElementById("errorMessage").innerHTML = 'The authentication failed.';
        }
    }
    return false;
}

/*
 * Shows or hides the loginBox, i.e. it gives the slide down and up effect
 * @function formShow
 * @param {Boolean} show True if the loginbox wants to be shown
 */
function formShow(show) {
    show = show || false;
    if (show) {
        document.getElementById("login1").style.display = "block";
        document.getElementById("flip").style.display = "none";
        document.getElementById("cross").style.display = "block";

    } else {
        document.getElementById("login1").style.display = "none";
        document.getElementById("flip").style.display = "block";
        document.getElementById("cross").style.display = "none";
    }
}

/*
 * Add the social modules buttons represented by the comma separated list
 * @function addSocial
 * @param {Object} options - An object containing the options to use. This could be the OOTB
 *  socialImplementations that come when querying the OpenAM serverinfo URL or a
 *  manually described object that should be called overrideSocialImplementations.
 * @returns {String} Returns a table with the buttons
 */
function addSocial(options) {
    if (options) {
        var openam = options.openam || undefined;
        var gotoURL = options.gotoURL || undefined;
        // var gotoOnFail = options.gotoOnFail || undefined;
        var overrideSocialImplementations = options.overrideSocialImplementations || undefined;
    } else {
        debug("There was no options for the addSocial method");
        return;
    }

    var formId = options.formId || "amLoginForm";
    options.formId = formId;

    var myTable = createTable({ id: "intTable", width: "100%"} );
    myTable.style.height = "auto";
    var tableBody = document.createElement('TBODY');
    myTable.appendChild(tableBody);
    row1 = myInsertRow(myTable,'Use your social media account:', {align: "center"});

    // Clean OAuth2 Cookies
    deleteCookie("ORIG_URL", openam.domainName());
    deleteCookie("PROXY_URL", openam.domainName());

    var services = null;

    if (overrideSocialImplementations) {
        services = overrideSocialImplementations;
        var baseURL = '';
        var imgStyle = '';
    } else {
        services = openam.socialImplementations();
        baseURL = openam.openAMBaseURL() + "/XUI/";
        imgStyle = "min-width: 24px; width: 24px; max-width: 100px" +
                " min-height: 24px; height: 24px; max-height: 45px;";
    }

    for (var instance in services) {
        if (services[instance].valid === undefined || Boolean(services[instance].valid)) {
            var tr = document.createElement('TR');
            var td = myInsertCell(tr, '', {align: "center"});
            td.style.verticalAlign = "middle";
            var intDiv = document.createElement('DIV');
            intDiv.style.cssText = "display: block; width: 80%; vertical-align: middle;";
            var myButton = document.createElement('BUTTON');
            myButton.type = "button";
            myButton.className = "btn3";
            myButton.id = services[instance].authnChain;
            myButton.style.cssText = "width: 100%; float: left;";
            var myImg = document.createElement('IMG');
            myImg.id = services[instance].displayName;
            if (overrideSocialImplementations && services[instance].imgStyle) {
                imgStyle = services[instance].imgStyle;
            }
            myImg.style.cssText = "float: left;" + imgStyle;
            myImg.alt = services[instance].displayName;
            myImg.src = baseURL + services[instance].iconPath;
            if (overrideSocialImplementations && services[instance].imgWidth) {
                myImg.width = services[instance].imgWidth;
            }
            if (!overrideSocialImplementations) {
                myImg.width = "24";
            }
            if (overrideSocialImplementations && services[instance].imgHeight) {
                myImg.height = services[instance].imgHeight;
            }
            if (!overrideSocialImplementations) {
                myImg.height = "24";
            }
            var mySpan = document.createElement('span');
            mySpan.style.cssText = "float: left; padding: 3px 0 0 5px;";
            if (services[instance].buttonText || services[instance].buttonText === '') {
                mySpan.appendChild(document.createTextNode(services[instance].buttonText));
            } else {
                mySpan.appendChild(document.createTextNode('Sign in with ' + services[instance].displayName));
            }
            myButton.appendChild(myImg);
            myButton.appendChild(mySpan);
            myButton.onclick = function () {
                options.service = this.id;
                openam.authNRedirect(options);
            };
            intDiv.appendChild(myButton);
            td.appendChild(intDiv);
            tableBody.appendChild(tr);
        }
    }
    return myTable;
}

/*
 * Creates a table described with the basic properties
 * @param {type} properties
 * @returns {createTable.properties|createTable.myTable}
 */
function createTable(properties) {
    var myTable = document.createElement("TABLE");
    for (var prop in properties) {
        myTable[prop] = properties[prop];
    }
    return myTable;
}

/*
 * Inserts a row to the table myTable with rowProps and cellProps
 * @param {type} myTable
 * @param {type} data
 * @param {type} cellProps
 * @param {type} rowProps
 * @returns {@var;rowProps|myInsertRow.rowProps}
 */
function myInsertRow(myTable, data, cellProps, rowProps) {
    cellProps =cellProps || null;
    rowProps = rowProps || null;
    var row1 = myTable.insertRow();
    if (rowProps) {
        for (var prop in rowProps) {
            row1[prop] = rowProps[prop];
        }
    }
    myInsertCell(row1, data, cellProps);
    return row1;
}

/*
 * Inserts a cell to the row with data
 * @param {type} row
 * @param {type} data
 * @param {type} cellProps
 * @returns {myInsertCell.cellProps|@var;cellProps|myInsertCell.cell1}
 */
function myInsertCell(row, data, cellProps) {
    cellProps = cellProps || null;
    var cell1 = row.insertCell();
    cell1.align = "center";
    cell1.style.verticalAlign = "middle";
    if (cellProps) {
        for (var prop2 in cellProps) {
            cell1[prop2] = cellProps[prop2];
        }
    }
    cell1.innerHTML = data;
    return cell1;
}

/*
 * Deals with the ForgeRock Authenticator Callbacks
 * @param {type} jsonResp
 * @param {type} callback
 * @param {type} myTable
 * @returns {unresolved}
 */
function FROATH(jsonResp, callback, myTable) {
    var newRow,newCell,inputElem;
    if (jsonResp.callbacks[callback].type === "ConfirmationCallback" &&
            (jsonResp.stage === "AuthenticatorOATH4" ||
             jsonResp.stage === "AuthenticatorOATH7")) {
        newRow = myTable.insertRow();
        newCell = newRow.insertCell();
        inputElem = document.createElement('INPUT');
        inputElem.style.width = "100%";
        inputElem.type = "submit";
        inputElem.className = "btn4";
        inputElem.name = "Login";
        inputElem.value = "Login";
        newCell.appendChild(inputElem);
    }
    if (jsonResp.callbacks[callback].type === "ConfirmationCallback" && (
            jsonResp.stage === "AuthenticatorOATH2" || 
        jsonResp.stage === "AuthenticatorOATH5")) {
        var index = 0;
        for (var label in jsonResp.callbacks[callback].output[2].value) {
            newRow = myTable.insertRow();
            newCell = newRow.insertCell();
            inputElem = document.createElement('INPUT');
            inputElem.style.width = "100%";
            inputElem.name = jsonResp.callbacks[callback].input[0].name + "_" + index;
            inputElem.className = "btn4";
            inputElem.type = "submit";
            inputElem.value = jsonResp.callbacks[callback].output[2].value[index];
            newCell.appendChild(inputElem);
            inputElem.onclick = function() {
                var name1 = this.name;
                var name2 = name1.substring(name1.indexOf('_')+1);
                var inputHidden = document.createElement('INPUT');
                inputHidden.name = jsonResp.callbacks[callback].input[0].name;
                inputHidden.value = name2;
                this.appendChild(inputHidden);
            };
            index += 1;
        }
    }
    if (jsonResp.stage === "AuthenticatorOATH5" &&
            jsonResp.callbacks[callback].type === "TextOutputCallback") {
        if (jsonResp.callbacks[callback].output[1].value === '0') {
            myInsertRow(myTable, jsonResp.callbacks[callback].output[0].value);
        }
        if (jsonResp.callbacks[callback].output[1].value === '4') {
            var theScript = jsonResp.callbacks[callback].output[0].value;
            var endPos = theScript.indexOf('version:') - 9;
            var texto = theScript.substring(theScript.indexOf('text:') + 7, endPos).trim();
            texto = texto.slice(0,-2);
            newRow = myTable.insertRow();
            newCell = myInsertCell(newRow, '');
            var div1 = document.createElement('DIV');
            div1.id = "qrcode";
            newCell.appendChild(div1);
            var qrcode = new QRCode(div1, {
                text: texto,
                width: 128,
                height: 128,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }
    return myTable;
}

/*
 * Creates the form to appear on the left side of the login box
 * @param {type} options
 * @returns {Boolean|createForm.form}
 */
function createForm(options) {
    var formId = options.formId || "amLogin";
    var openamC = options.openam;
    options.formId = formId;
    var response = null;
    var form = document.createElement('FORM');
    var myTable = createTable({width: "96%"});
    myTable.style.height= "100%";
    myTable.style.verticalAlign = "middle";  // or top?
    var jsonResp = null;

    if (options.data) {
        jsonResp = JSON.parse(options.data);
        response = options.data;
        var tRow =document.getElementById("bigRow");
        var td3 = document.getElementById("td3");
        var td2 = document.getElementById("td2");
        var td1 = document.getElementById("td1");
        document.getElementById("errorMessage").innerHTML = '';
        if (td3 && td2) {
            tRow.removeChild(td3);
            tRow.removeChild(td2);
            td1.width = "100%";
        }
    } else {
        response = openamC.authenticate(options);
        jsonResp = JSON.parse(response);
        options.data = response;
    }

    if (jsonResp.authId) {
        if (jsonResp.callbacks) {
            form.id = formId;
            form.method="post";
            form.action = "";
            var stage = jsonResp.stage;
            var tbody = document.createElement('TBODY');
            myTable.appendChild(tbody);
            myInsertRow(myTable, jsonResp.header);
            myInsertRow(myTable, '&nbsp;');
            var type = "";
            var submitButton = 0;
            for (var callback in jsonResp.callbacks) {
                switch (jsonResp.callbacks[callback].type) {
                    case "NameCallback":
                        type = "text";
                        break;
                    case "PasswordCallback":
                        type = "password";
                        break;
                    case "ConfirmationCallback":
                        submitButton += 1;
                        type = "submit";
                        if (stage.startsWith('AuthenticatorOATH')) {
                            myTable = FROATH(jsonResp, callback, myTable);
                        }
                        break;
                    case "RedirectCallback":
                        type = "hidden";
                        window.location = jsonResp.callbacks[callback].output[0].value;
                        return false;
                        break;
                    case "HiddenValueCallback":
                        type = "hidden";
                        break;
                    case "TextOutputCallback":
                        if (stage.startsWith('AuthenticatorOATH')) {
                            myTable = FROATH(jsonResp, callback, myTable);
                            break;
                        }

                        break;
                    default:
                        type = "text";
                        break;
                }

                if (jsonResp.callbacks[callback].input && jsonResp.callbacks[callback].input[0] &&
                        jsonResp.callbacks[callback].type !== "ConfirmationCallback") {
                    var newRow = myTable.insertRow();
                    var newCell = newRow.insertCell();
                    var inputElem = document.createElement('INPUT');
                    inputElem.type = type;
                    inputElem.name = jsonResp.callbacks[callback].input[0].name;
                    inputElem.placeholder = jsonResp.callbacks[callback].output[0].value;
                    inputElem.style.width = "100%";
                    if (jsonResp.callbacks[callback].input[0].value !== '') {
                      inputElem.value = jsonResp.callbacks[callback].input[0].value;
                    }
                    inputElem.focus();
                    inputElem.required = true;
                    newCell.appendChild(inputElem);
                }
            }

            if (submitButton === 0) {
                var newRow2 = myTable.insertRow();
                var newCell2 = newRow2.insertCell();
                var inputElem2 = document.createElement('INPUT');
                inputElem2.type = "submit";
                inputElem2.className = "btn4";
                inputElem2.name="Login";
                inputElem2.value="Login";
                inputElem2.style.width = "100%";
                newCell2.appendChild(inputElem2);
            }
        }
    }
    form.appendChild(myTable);
    return form;
}

/*
 * Adds the listener on submit event for the form cereated by CreateForm
 * @param {type} forma
 * @param {type} options
 * @returns {undefined}
 */
function addListener(forma, options) {
    forma.onsubmit = function () { authenticateUser(options); return false;};
}

/*
 * Removes the listener created bu the addListener method
 * @param {type} forma
 * @param {type} options
 * @returns {undefined}
 */
function removeListener(forma, options) {
    forma.onsubmit = undefined;
}

/*
 * Cretes a box that will be inserted in the login box
 * @param {type} options
 * @returns {createLoginDiv.login1}
 */
function createLoginDiv(options) {
    if (options) {
        var module = options.module || undefined;
        var service = options.service || undefined;
        var openam = options.openam || undefined;
        if (options.social !== undefined) {
            var social = Boolean(options.social);
        } else {
            social = true;
        }
    }
    if (options.width) {
        var divWidth = "width: " + options.width + ";";
    }
    if (options.height) {
        var divHeight = "height: " + options.height + ";";
    }
    var formId = options.formId || "amLoginForm";
    options.formId = formId;
    openam = openam || undefined;

    if (!module || module === '') {
        module = '';
    }
    if (!service || service === '') {
        service = '';
    }
    var login1 = document.createElement("div");
    login1.id = "login1";
    if (openam && social) {
        login1.style.cssText = "display: none;" + divWidth + divHeight;
    }
    else {
        login1.style.cssText = "display: none; width: 300px; height: 220px;float: right;";
    }

    var crossButton = document.createElement("a");
    crossButton.id ="cross";
    crossButton.className = "btn2";
    crossButton.style.display = "none";
    crossButton.style.cssFloat = "right";
    crossButton.innerHTML = " &times; ";
    login1.appendChild(crossButton);

    var table1 = createTable({width: "95%"});
    table1.style.height = "60%";
    table1.style.verticalAlign = "top";
    var tbody = document.createElement("tbody");
    table1.appendChild(tbody);
    var row1 = myInsertRow(table1, "&nbsp;", {width: "3%"});
    row1.id = "bigRow";
    var td1 = myInsertCell(row1,"",{id: "td1"});
    td1.style.verticalAlign = "middle";  // or top?
    login1.appendChild(table1);
    var divError = document.createElement("div");
    divError.id="errorMessage";
    login1.appendChild(divError);

    if (openam && social) {
        var td2 = myInsertCell(row1,"&nbsp;",{id: "td2", width: "3%"});
        var td3 = myInsertCell(row1,"&nbsp;",{id: "td3", width: "47%"});
        td2.appendChild(middleBar());
        td3.appendChild(addSocial(options));
    }

    document.body.appendChild(login1);
    crossButton.onclick = function () { formShow(false);};
    return login1;
}

/**
 * Renders a login button that can be clicked to create a login box. The login box
 * may contain the interactive login credentials area plus a social login buttons area
 * depending on the configuration of the "options" object and the configuration
 * of the OpenAM being used.
 * @function printLoginBox
 * @param {HTMLElement|String} element - the DOM element object where the button will be rendered
 * @param {Object|String} options - The configuration object to use.
 * <pre>
 *  The options object is a JSON object, here an example.
 *  {
 *     openam: myOpenAMConfigObject,
 *     module: "DataStore",                                         // optional
 *     service: "ldapService",                                      // optional
 *     width: "600px",                                              // optional
 *     height: "300px",                                             // optional
 *     formId: "amLoginForm",                                       // optional
 *     gotoURL: "http://ap.example.com:8880/exampleNRO02.html",     // optional
 *     social: true,                                                // optional
 *     overrideSocialImplementations: mySocialImplementationsObject  // optional
 *  }
 *  </pre>
 * @param {Object|String} options.openam The OpenAM Configuration Object. This is
 *  a mandatory attribute. See openam.js documentation for more information
 * @param {String} [options.module=OpenAM realm default] The Authentication module
 *  to use in the left side of the login box.
 * @param {String} [options.service=OpenAM realm default] The Authentication service
 *  chain to use in the left side of the login box. Notice that service takes
 *  precedence over module.
 * @param {String} [options.width=270px or as defined in openamUtils.css] The
 *  Login Box width in px.
 * @param {String} [options.height=620px or as defined in openamUtils.css] The
 *  Login Box height in px.
 * @param {String} [options.formId=amLoginForm] The id of the form to be used to
 *  capture the credentials. It is recommended not to change it, unless there is
 *  a form Id colision in your HTML code.
 * @param {String} [options.gotoURL=Current page] The URL to go to after a
 *  successful authentication.
 * @param {String} [options.social=true] Boolean attribute to turn off the display
 *  of the social authentication buttons, if the OpenAM has been configured to
 *  show the social implementations in the login page.
 * @param {Object[]} [options.overrideSocialImplementations] This array of objects
 *  will override the socialImplementations array that is returned from the
 *  OpenAM serverinfo URL.
 *  <pre>
 *  Here an example of the overrideSocialImplementations object:
 *  [
 *      {
 *          "authnChain": "GoogleSocialAuthenticationService",
 *          "displayName": "Google",
 *          "iconPath": "images/google.png",
 *          "imgStyle": "display: block; max-width: 80% !important;",
 *          "valid": true,
 *          "buttonText": ''
 *      },
 *      {
 *              "authnChain": "MicrosoftSocialAuthenticationService",
 *              "displayName": "Microsoft",
 *              "iconPath": "images/msn.png",
 *              "imgStyle": "display: block; max-width: 80% !important;",
 *              "valid": true,
 *              "buttonText": ''
 *      }
 *  ]
 *  </pre>
 *  @param {String} options.overrideSocialImplementations[].authnChain The name
 *   of the authentication chain that implements the specified social authentication
 *  @param {String} options.overrideSocialImplementations[].displayName The name
 *   to be displayed for the specified social authentication
 *  @param {String} options.overrideSocialImplementations[].iconPath The location
 *   of the icon to be displayed within the button for the specified social authentication
 *  @param {String} [options.overrideSocialImplementations[].imgStyle="float: left;"] The CSS style
 *   to be applied to the image referred in the iconPath attribute
 *  @param {Boolean} [options.overrideSocialImplementations[].valid=true] Flag to
 *   specify if the socialImplementation object should be used or not
 *  @param {String} [options.overrideSocialImplementations[].buttonText=Sign in with <displayName>] The text
 *   to be written within the button for the specified social authentication
 */
function printLoginBox(element, options) {

    if (typeof(element) === "string") {
        element = document.getElementById(element);
    }
    var formId = options.formId || "amLoginForm";
    options.formId = formId;
    var loginButton = document.createElement("a");
    loginButton.id = "flip";
    loginButton.className = "btn3";
    loginButton.innerHTML = "Login &#9660;";

    element.appendChild(loginButton);

    loginButton.onclick = function () {
        if (!document.getElementById("login1")) {
            element.appendChild(createLoginDiv(options));
        }
        if (!document.getElementById(formId)) {
            var forma = createForm(options);
            addListener(forma, options);
            var td1 = document.getElementById("td1");
            td1.appendChild(forma);
        }
        formShow(true);
    };
}


/**
 * Renders a logout button that will invoke the logout service when clicked
 * @function printLogoutButton
 * @param {HTMLElement|String} element - the DOM element object where the button
 *  will be rendered
 * @param {Object} options - The configuration object to use
 * <pre>
 *  The options object is a JSON object, here an example.
 *  {
 *     openam: myOpenAMConfigObject
 *  }
 *  </pre>
 * @param {Object|String} options.openam The OpenAM Configuration Object. This is
 *  a mandatory attribute. See openam.js documentation for more information
 */
function printLogoutButton(element, options) {
    if (typeof(element) === "string") {
        element = document.getElementById(element);
    }
    if (options) {
        var openam = options.openam || undefined;
    }
    logoutButton = document.createElement("a");
    logoutButton.id = "_logoutBtn";
    logoutButton.className= "btn3";
    logoutButton.alt="Logout";
    logoutButton.onclick = function() {
        openam.logout();
    };
    logoutButton.innerHTML = "&#9447; Logout";
    element.appendChild(logoutButton);
}

/**
  * Renders a login button that redirects to the module specified as a parameter
 * @function printLoginButton
 * @param {HTMLElement|String} element - the DOM element object where the button will be rendered
 * @param {Object} options - The configuration object to use
 * <pre>
 *  The options object is a JSON object, here an example.
 *  {
 *     openam: myOpenAMConfigObject,
 *     module: "DataStore",                                         // optional
 *     service: "ldapService",                                      // optional
 *     gotoURL: "http://ap.example.com:8880/exampleNRO02.html",     // optional
 *     gotoOnFail: "http://ap.example.com:8880/exampleNRO02.html",  // optional
 *     classic: false                                               // optional
 *     windowed: true,                                              // optional
 *  }
 * </pre>
 * @param {Object|String} options.openam The OpenAM Configuration Object. This is
 *  a mandatory attribute. See openam.js documentation for more information
 * @param {String} [options.module=OpenAM realm default] The Authentication module
 *  to use in the left side of the login box.
 * @param {String} [options.service=OpenAM realm default] The Authentication service
 *  chain to use in the left side of the login box. Notice that service takes
 *  precedence over module.
 * @param {String} [options.gotoURL=Current page] The URL to go to after a
 *  successful authentication.
 * @param {String} [options.gotoOnFail=Current page] The URL to go to after an
  * authentication event has failed.
 * @param {String} [options.classic=false] Boolean attribute to specify if we are
 *  using the classic UI or the XUI. Default is to use the XUI.
 * @param {String} [options.windowed=true] Boolean attribute to specify if the
 *  redirect will happen in a pop-up window or not.
 */
function printLoginButton(element, options) {
    if (typeof(element) === "string") {
        element = document.getElementById(element);
    }
    if (options) {
        var openam = options.openam || undefined;
    }

    loginButton = document.createElement("a");
    loginButton.id = "_flip";
    loginButton.className= "btn3";
    loginButton.alt="Login";
    loginButton.onclick = function() {
        openam.authNRedirect(options);
        return false;
    };
    loginButton.innerHTML = "Login &nbsp; &gt;";
    element.appendChild(loginButton);

}
