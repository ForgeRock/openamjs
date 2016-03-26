/* 
* The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in compliance with the
 * License.
 *
 * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
 * specific language governing permission and limitations under the License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file and include
 * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
 * Header, with the fields enclosed by brackets [] replaced by your own identifying
 * information: "Portions copyright [year] [name of copyright owner]".
 *
 * Copyright 2014 ForgeRock AS.
 */

/* 
 * Some utilities to be used for displaying purposes
 * To be used in conjunction with openam.js (v0.1)
 */


function cellize(cell, assignedClass) {
        var output1 ="<td class=\"" + assignedClass + "\"> " + cell + "</td>";
        return output1;
}

  
function rowize(row, assignedClass) {
        var output1 = "";
        if (assignedClass.trim().length == 0 ) {
           output1 = "<tr>" + row + "</tr>";
        }
        else {
           output1 = "<tr class=\"" + assignedClass + "\"> " + row + "</tr>";
        }
        return output1;
}
  
function tableize(table, assignedClass) {
        var output1 = "<table class=\"" + assignedClass + "\"> " + table + "</table>";
        return output1;
}

function printAllStuff(jsonData) {
        var outputV = "";
        var attributes = JSON.parse(jsonData)
        for (var key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                outputV = rowize(
                    cellize(key + ":", "left") + cellize(attributes[key], "right"),
                    "") + outputV;
            }
        }
        
        outputV = "<br>" + tableize(outputV, "Info");
        return outputV;

}

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

function addSocial(params, displayClass) {
    displayClass = displayClass || "socialButton";
    
    var outputV = "<table><tr><td align=\"center\" valign=\"middle\">" +
            "Use your social media account:</td></tr><tr><td></td></tr>";
    cons1 = "<tr><td align=\"center\" valign=\"middle\"><img id=\"";
    cons2 = "\" class=\"" + displayClass + "\" src=\"images/";
    cons3 = "\"" + "alt=\"";
    cons4 = "\" onclick=\"" + "openam.authNRedirectModuleWdw(\'";
    cons5 = "\');\"></td></tr>";

    var modules = params.split(',');
    for (var i = 0; i < modules.length; i++) {
        outputV += cons1 + modules[i] + cons2 + modules[i] + ".png" +
                cons3 + modules[i] + cons4 + modules[i] + cons5;

    }
    
    outputV += "</tr></table>";
    return outputV;
}
            
            
function loginForm(id) {
    id = id || "loginForm";
    var outputV = "<form id=\"" + id +
            "\" method=\"post\" action=\"\" name=\"loginForm\" " +
            "onsubmit=\"return authenticateUser();\"><table>";
    cons1 = "<tr><td>Login with your existing account:</td></tr>" +
            "<tr><td height=\"10\"></td></tr>" +
            "<tr><td>User name</td></tr>" +
            "<tr><td><input type=\"text\" name=\"username\" size=\"20\" /></td></tr>" +
            "<tr><td>Password</td></tr>" +
            "<tr><td><input type=\"password\" name=\"password\" size=\"20\" /></td></tr>" +
            "<tr><td><input type=\"submit\" value=\"Login\" /></td></tr>" +
            "<tr><td>&nbsp;</td></tr>" +
            "<tr><td><div id=\"errorMessage\"></div></td></tr>" +
            "</table></form>";
    return outputV + cons1;
}
            
function middleBar() {
    outputV = "<table>";
    cons1 = "<tr><td align=\"center\" valign=\"middle\">";
    cons2 = "</td></tr>";
    cons3 = "<img src=\"images/linea.png\" height=\"100\" />";

    outputV = outputV + cons1 + cons3 + cons1 + "OR" + cons2 +
            cons1 + cons3 + cons2 + "</table>";
    return outputV;
}
            
function loginBox(withSocial, socialModules) {

    withSocial = withSocial || false;
    socialModules = socialModules || null;

    outputV = "";
    loginButton = "<img id=\"flip\" class=\"loginButton image-float-right\" " +
            "src=\"images/arrowdown2.png\" alt=\"Login\" onclick=\"formShow(true);\">";

    if (withSocial) {
        div2 = "<div id=\"login1\" style=\"display: none;\">";
    }
    else {
        div2 = "<div id=\"login1\" style=\"display: none; " +
                "width: 300px; height: 190px;float: right;\">";
    }

    crossButton = "<img id=\"cross\" class=\"loginButton image-float-right\" " +
            "src=\"images/cross.gif\" style=\"display: none;\" onclick=\"formShow(false);\">";

    table1 = "<table><tr><td width=\"5%\">&nbsp;</td>" +
            "<td id=\"td1\" width=\"45%\" align=\"center\" valign=\"middle\"></td>";
    td2 = "<td id=\"td2\" width=\"5%\" valign=\"middle\"></td>";
    td3 = "<td id=\"td3\" align=\"center\" valign=\"middle\" width=\"45%\"></td>";
    endTr = "</tr></table>";
    divend = "</div>";

    if (withSocial) {
        outputV = loginButton + div2 + crossButton + table1 + td2 +
                td3 + endTr + divend;
    } else {
        outputV = loginButton + div2 + crossButton + table1 +
                endTr + divend;
    }

    document.getElementById("loginBox").innerHTML = outputV;
    document.getElementById("td1").innerHTML = loginForm("loginForm");

    if (withSocial) {
        document.getElementById("td2").innerHTML = middleBar();
        document.getElementById("td3").innerHTML = addSocial(socialModules, "socialButton");
    }

    // display login button and supresss logout button
    document.getElementById("welcomeAndLogout").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}
            
            
function welcomeAndLogout() {

    div1 = "<div id=\"welcome1\" class=\"image-float-left\">Welcome</div>";
    div2 = "<div><img id=\"logoutBtn\" class=\"image-float-right\" src=\"images/logout.png\" alt=\"Logout\"" +
            "onclick=\"openam.logout();\"></div>";
    document.getElementById("welcomeAndLogout").innerHTML = div1 + div2;
    document.getElementById("welcome1").innerHTML = "Welcome <b>" + uid + "</b>";
    // display logout button and supresss login button
    document.getElementById("welcomeAndLogout").style.display = "block";
    document.getElementById("loginBox").style.display = "none";
}

function authenticateUser() {
    var username = document.forms["loginForm"]["username"].value;
    var password = document.forms["loginForm"]["password"].value;
    var tokenId_ = openam.authenticate(username, password);
    if (tokenId_) {
        window.location = thisURL;
    } else {
        document.getElementById("errorMessage").innerHTML = 'The authentication failed';
    }
    return false;
}