/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 95.1086956521739, "KoPercent": 4.891304347826087};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6273177749360613, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "3b Edit Task / GET Todos"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / landing page end"], "isController": false}, {"data": [0.0, 500, 1500, "Subtask Edit / GET todos"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/ Landing Page"], "isController": false}, {"data": [1.0, 500, 1500, "Registration-/register.html"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/dashboard.html-87-0"], "isController": false}, {"data": [1.0, 500, 1500, "Login/dashboard.html-0"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/Login page 2"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/Login page 1"], "isController": false}, {"data": [1.0, 500, 1500, "Login/dashboard.html-1"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/dashboard.html-87-1"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit / Login page 1"], "isController": false}, {"data": [0.005263157894736842, 500, 1500, "3b Edit Task / Login Action"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/logout"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit /dashboard.html"], "isController": false}, {"data": [0.6854166666666667, 500, 1500, "Subtask Creation/login-86"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task /dashboard.html"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/LoginPage"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / Logout Action"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/logout"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/ Login Page end"], "isController": false}, {"data": [0.17916666666666667, 500, 1500, "Subtask Creation/ GET todos"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/dashboard.html"], "isController": false}, {"data": [1.0, 500, 1500, "Login/logout"], "isController": false}, {"data": [0.2, 500, 1500, "Subtask Creation/GET Todos"], "isController": false}, {"data": [0.01327433628318584, 500, 1500, "US 5/ Login Action"], "isController": false}, {"data": [1.0, 500, 1500, "Registration-/ Landing Page"], "isController": false}, {"data": [1.0, 500, 1500, "Login/index.html"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/dashboard.html-0"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/dashboard.html-1"], "isController": false}, {"data": [0.75, 500, 1500, "Subtask Creation/ PUT create subtask"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/logout action"], "isController": false}, {"data": [0.006535947712418301, 500, 1500, "Login/login"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / landing page start"], "isController": false}, {"data": [0.0, 500, 1500, "Login/todo"], "isController": false}, {"data": [0.0, 500, 1500, "US 5/GET Completed Todos"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task /dashboard.html-1"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/Landing Page post logout"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task /dashboard.html-0"], "isController": false}, {"data": [0.0, 500, 1500, "3a -/POSTorCREATE-todo"], "isController": false}, {"data": [0.0, 500, 1500, "Subtask Edit / EDIT subtask"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/dashboard.html-0"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/dashboard.html-1"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/dashboard.html"], "isController": false}, {"data": [0.0, 500, 1500, "3b Edit Task / GET todos"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit /logout action"], "isController": false}, {"data": [0.16265060240963855, 500, 1500, "Subtask Edit /login action"], "isController": false}, {"data": [0.010752688172043012, 500, 1500, "3a -/login"], "isController": false}, {"data": [0.0, 500, 1500, "3a -/GET-todos"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/dashboard.html-87"], "isController": false}, {"data": [0.0, 500, 1500, "3b Edit Task / PUT or Edit Todo"], "isController": false}, {"data": [1.0, 500, 1500, "Login/dashboard.html"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit /dashboard.html-1"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit /Login page 2"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit /dashboard.html-0"], "isController": false}, {"data": [0.0, 500, 1500, "Registration-/register"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 6256, 306, 4.891304347826087, 8572.32992327368, 0, 36367, 5.0, 30039.0, 32309.15, 34071.29, 11.15857628267442, 120.74658951687343, 6.1675388252592995], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["3b Edit Task / GET Todos", 68, 16, 23.529411764705884, 29363.51470588235, 0, 35603, 31089.5, 34000.9, 34813.4, 35603.0, 0.23807356473150204, 6.167316345281943, 0.12269855838579122], "isController": false}, {"data": ["3b Edit Task / landing page end", 65, 0, 0.0, 2.5692307692307694, 1, 14, 2.0, 6.399999999999999, 7.699999999999996, 14.0, 0.3245213310367209, 1.543694729960808, 0.16226066551836044], "isController": false}, {"data": ["Subtask Edit / GET todos", 152, 39, 25.657894736842106, 25355.250000000007, 0, 35001, 30062.5, 33886.200000000004, 34359.35, 34886.52, 0.45888039222197735, 11.282499939621001, 0.2419169501963827], "isController": false}, {"data": ["US 5/ Landing Page", 228, 0, 0.0, 4.657894736842108, 1, 94, 3.0, 9.0, 10.549999999999983, 70.0200000000005, 0.7626999578507918, 3.6570867119603396, 0.3336812315597214], "isController": false}, {"data": ["Registration-/register.html", 137, 0, 0.0, 5.182481751824817, 0, 16, 4.0, 10.0, 12.0, 16.0, 0.482596580961741, 2.3022307597637743, 0.23611414752132057], "isController": false}, {"data": ["Subtask Creation/dashboard.html-87-0", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 161.1328125, 497.0703125], "isController": false}, {"data": ["Login/dashboard.html-0", 6, 0, 0.0, 2.5, 1, 7, 2.0, 7.0, 7.0, 7.0, 0.02952523423352492, 0.004757484031769152, 0.01493561653609952], "isController": false}, {"data": ["Subtask Creation/Login page 2", 240, 0, 0.0, 2.5291666666666655, 0, 19, 2.0, 6.0, 7.0, 10.0, 0.5139428409903678, 2.4447417758438297, 0.2604847016347665], "isController": false}, {"data": ["Subtask Creation/Login page 1", 240, 0, 0.0, 4.095833333333334, 1, 93, 2.0, 7.0, 9.949999999999989, 63.30000000000024, 0.4490917120124548, 2.1533596738097196, 0.1982318885054976], "isController": false}, {"data": ["Login/dashboard.html-1", 6, 0, 0.0, 1.5, 1, 4, 1.0, 4.0, 4.0, 4.0, 0.029526251297924796, 0.1404515332736247, 0.014820794108528658], "isController": false}, {"data": ["Subtask Creation/dashboard.html-87-1", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 4756.8359375, 493.1640625], "isController": false}, {"data": ["Subtask Edit / Login page 1", 83, 0, 0.0, 5.253012048192771, 1, 94, 3.0, 8.0, 11.599999999999994, 94.0, 0.27812590055826236, 1.333591964590887, 0.1227665107932955], "isController": false}, {"data": ["3b Edit Task / Login Action", 95, 5, 5.2631578947368425, 20991.063157894736, 537, 30105, 27398.0, 29741.8, 30043.4, 30105.0, 0.31510897795232234, 0.09346699793189002, 0.1557081473084718], "isController": false}, {"data": ["3a -/logout", 66, 0, 0.0, 1.5909090909090913, 0, 10, 1.0, 4.0, 6.0, 10.0, 0.33716991831292437, 0.055316939723214144, 0.21141966735122375], "isController": false}, {"data": ["Subtask Edit /dashboard.html", 81, 0, 0.0, 2.6049382716049383, 1, 14, 2.0, 5.0, 5.8999999999999915, 14.0, 0.28537204058624577, 6.801755748176791, 0.18986268672491546], "isController": false}, {"data": ["Subtask Creation/login-86", 240, 1, 0.4166666666666667, 7105.695833333337, 2, 30064, 10.0, 27255.100000000002, 29018.0, 29637.82, 0.4465041515583925, 0.13429280951574765, 0.22554128163435402], "isController": false}, {"data": ["3b Edit Task /dashboard.html", 94, 0, 0.0, 2.574468085106384, 1, 10, 2.0, 5.5, 8.25, 10.0, 0.3181070599462602, 7.5578748893816545, 0.20917746799470724], "isController": false}, {"data": ["3a -/LoginPage", 93, 0, 0.0, 4.720430107526878, 1, 17, 4.0, 9.0, 11.0, 17.0, 0.3135144975171675, 1.5032775222746995, 0.13716259266376077], "isController": false}, {"data": ["3b Edit Task / Logout Action", 65, 0, 0.0, 2.076923076923078, 0, 11, 1.0, 5.399999999999999, 7.0, 11.0, 0.32452619176003034, 0.05324257833562998, 0.20416968569638327], "isController": false}, {"data": ["US 5/logout", 191, 0, 0.0, 2.497382198952879, 0, 12, 2.0, 7.0, 8.0, 12.0, 0.6551641340513841, 0.10748786574280521, 0.4106098107398896], "isController": false}, {"data": ["3a -/ Login Page end", 66, 0, 0.0, 2.4696969696969697, 1, 9, 2.0, 6.300000000000004, 8.0, 9.0, 0.33716819584363567, 1.6038537909710444, 0.16858409792181786], "isController": false}, {"data": ["Subtask Creation/ GET todos", 240, 7, 2.9166666666666665, 9438.375000000005, 0, 35456, 2552.0, 31150.8, 32188.8, 34492.67, 0.44903289540152896, 15.0779512774752, 0.23969067538757152], "isController": false}, {"data": ["US 5/dashboard.html", 215, 0, 0.0, 2.8093023255813954, 1, 21, 2.0, 6.0, 9.0, 11.840000000000003, 0.7316483868003825, 16.803237708945165, 0.4922242951078245], "isController": false}, {"data": ["Login/logout", 125, 0, 0.0, 2.6480000000000006, 0, 12, 2.0, 7.0, 8.0, 11.47999999999999, 0.4320610001002381, 0.07088500782894533, 0.2786287129162044], "isController": false}, {"data": ["Subtask Creation/GET Todos", 240, 3, 1.25, 8089.958333333329, 0, 35241, 2020.0, 32784.7, 33782.45, 35138.55, 0.4793815977389168, 16.506770718897624, 0.2558906042455233], "isController": false}, {"data": ["US 5/ Login Action", 226, 20, 8.849557522123893, 23990.991150442485, 8, 30170, 27168.5, 29902.5, 30060.65, 30142.64, 0.6934472305067687, 0.20541768114007633, 0.3440148370092173], "isController": false}, {"data": ["Registration-/ Landing Page", 141, 0, 0.0, 4.567375886524823, 1, 13, 4.0, 9.799999999999997, 11.0, 13.0, 0.4833633864233166, 2.317689675135239, 0.211471481560201], "isController": false}, {"data": ["Login/index.html", 154, 0, 0.0, 4.5714285714285685, 0, 94, 2.0, 8.0, 10.0, 93.44999999999999, 0.5206871718233856, 2.4768234511247185, 0.23288547333506898], "isController": false}, {"data": ["US 5/dashboard.html-0", 20, 0, 0.0, 1.3500000000000003, 1, 3, 1.0, 2.900000000000002, 3.0, 3.0, 0.08418819428951478, 0.013565480525165957, 0.04127194680989885], "isController": false}, {"data": ["US 5/dashboard.html-1", 20, 0, 0.0, 1.5999999999999996, 0, 7, 1.0, 2.0, 6.7499999999999964, 7.0, 0.08418890306068758, 0.40047279961778237, 0.04094343137131095], "isController": false}, {"data": ["Subtask Creation/ PUT create subtask", 240, 15, 6.25, 6016.89583333334, 2, 30044, 88.0, 28889.4, 29672.2, 30039.18, 0.45413690335399026, 0.13623183156724536, 0.3551732727423246], "isController": false}, {"data": ["Subtask Creation/logout action", 240, 0, 0.0, 2.595833333333333, 0, 11, 2.0, 5.0, 7.0, 10.590000000000003, 0.5139428409903678, 0.08431874734998222, 0.3345668351881673], "isController": false}, {"data": ["Login/login", 153, 8, 5.228758169934641, 24957.274509803916, 9, 30093, 26536.0, 29768.4, 30039.6, 30078.96, 0.46798293238717176, 0.13869645820270085, 0.2410169452643492], "isController": false}, {"data": ["3b Edit Task / landing page start", 95, 0, 0.0, 5.515789473684211, 1, 92, 3.0, 9.0, 9.199999999999989, 92.0, 0.34101637237552, 1.6351468636365267, 0.14919466291429], "isController": false}, {"data": ["Login/todo", 133, 26, 19.548872180451127, 30045.68421052632, 0, 35592, 32072.0, 34481.6, 35039.7, 35562.08, 0.40735068912710565, 10.957623468606432, 0.21393448506891272], "isController": false}, {"data": ["US 5/GET Completed Todos", 215, 46, 21.3953488372093, 26238.697674418607, 0, 34946, 30082.0, 33593.0, 33915.8, 34668.44, 0.6596953741546695, 17.335560500394283, 0.3392415142847061], "isController": false}, {"data": ["3b Edit Task /dashboard.html-1", 5, 0, 0.0, 2.0, 0, 5, 2.0, 5.0, 5.0, 5.0, 0.035479361655325094, 0.1687695025616099, 0.017254611430031153], "isController": false}, {"data": ["US 5/Landing Page post logout", 191, 0, 0.0, 2.30890052356021, 0, 11, 2.0, 4.0, 5.0, 8.239999999999952, 0.6551484031186436, 3.1164334683505013, 0.3275742015593218], "isController": false}, {"data": ["3b Edit Task /dashboard.html-0", 5, 0, 0.0, 1.6, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.03547910990009083, 0.005716848763198229, 0.01739307926742734], "isController": false}, {"data": ["3a -/POSTorCREATE-todo", 66, 21, 31.818181818181817, 25193.833333333343, 0, 30080, 27567.0, 30031.5, 30052.65, 30080.0, 0.2546541911835632, 0.06439453313398283, 0.16514993488955337], "isController": false}, {"data": ["Subtask Edit / EDIT subtask", 81, 7, 8.641975308641975, 23661.567901234564, 0, 30046, 25560.0, 29156.4, 29691.399999999998, 30046.0, 0.27230552006992537, 0.07896938874134338, 0.21644519956464736], "isController": false}, {"data": ["3a -/dashboard.html-0", 6, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 0.041916418661189586, 0.006754110428804963, 0.020548869304606615], "isController": false}, {"data": ["3a -/dashboard.html-1", 6, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 0.041916418661189586, 0.19938952665884227, 0.020385133294211343], "isController": false}, {"data": ["3a -/dashboard.html", 89, 0, 0.0, 3.0000000000000018, 1, 20, 2.0, 6.0, 9.0, 20.0, 0.305196920597363, 7.164756908723831, 0.20215076492121462], "isController": false}, {"data": ["3b Edit Task / GET todos", 94, 14, 14.893617021276595, 25535.393617021266, 0, 36367, 30011.0, 32902.0, 33356.25, 36367.0, 0.28588373047855115, 8.040313597725095, 0.14820773805903195], "isController": false}, {"data": ["Subtask Edit /logout action", 57, 0, 0.0, 2.3157894736842106, 0, 9, 2.0, 5.0, 6.099999999999994, 9.0, 0.22282423858612155, 0.03655710164303557, 0.14299110266724524], "isController": false}, {"data": ["Subtask Edit /login action", 83, 4, 4.819277108433735, 19693.180722891568, 6, 30062, 27360.0, 29775.600000000002, 30033.2, 30062.0, 0.25306035336981875, 0.07560070868332393, 0.12801295219293565], "isController": false}, {"data": ["3a -/login", 93, 6, 6.451612903225806, 20265.33333333334, 74, 30109, 27354.0, 29791.4, 30064.8, 30109.0, 0.2855765421900957, 0.08450165262070215, 0.14111497104315276], "isController": false}, {"data": ["3a -/GET-todos", 153, 22, 14.379084967320262, 28401.065359477117, 0, 35496, 31152.0, 33855.0, 34171.8, 35159.58, 0.4738265051733802, 13.60361908704007, 0.24385407053356578], "isController": false}, {"data": ["Subtask Creation/dashboard.html-87", 240, 0, 0.0, 2.208333333333335, 0, 9, 2.0, 4.0, 6.0, 8.0, 0.4495080696063246, 11.118343227388339, 0.29178882789834376], "isController": false}, {"data": ["3b Edit Task / PUT or Edit Todo", 77, 16, 20.77922077922078, 25212.779220779223, 0, 30079, 27362.0, 30028.8, 30056.1, 30079.0, 0.24593017499369207, 0.05846331168934867, 0.16972887495728162], "isController": false}, {"data": ["Login/dashboard.html", 133, 0, 0.0, 2.714285714285715, 1, 26, 2.0, 4.0, 10.299999999999997, 21.239999999999952, 0.45264422504245666, 10.82709817508653, 0.30366833260161524], "isController": false}, {"data": ["Subtask Edit /dashboard.html-1", 4, 0, 0.0, 0.75, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.04843963815590297, 0.2304194115794955, 0.02388868873899512], "isController": false}, {"data": ["Subtask Edit /Login page 2", 57, 0, 0.0, 2.5263157894736836, 1, 23, 2.0, 4.0, 6.0, 23.0, 0.22282336752564422, 1.059934202360755, 0.11293489037676695], "isController": false}, {"data": ["Subtask Edit /dashboard.html-0", 4, 0, 0.0, 1.0, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.04843963815590297, 0.00780521513254296, 0.024077906075541618], "isController": false}, {"data": ["Registration-/register", 137, 30, 21.8978102189781, 27392.37226277372, 19373, 30149, 28361.0, 30039.2, 30058.0, 30118.6, 0.4419725525366644, 0.08917393575751514, 0.22184950391000535], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500", 232, 75.81699346405229, 3.70843989769821], "isController": false}, {"data": ["401", 74, 24.18300653594771, 1.1828644501278773], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 6256, 306, "500", 232, "401", 74, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["3b Edit Task / GET Todos", 68, 16, "500", 11, "401", 5, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Subtask Edit / GET todos", 152, 39, "500", 31, "401", 8, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["3b Edit Task / Login Action", 95, 5, "500", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Subtask Creation/login-86", 240, 1, "500", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Subtask Creation/ GET todos", 240, 7, "500", 6, "401", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Subtask Creation/GET Todos", 240, 3, "500", 2, "401", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["US 5/ Login Action", 226, 20, "500", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Subtask Creation/ PUT create subtask", 240, 15, "500", 14, "401", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Login/login", 153, 8, "500", 8, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Login/todo", 133, 26, "500", 20, "401", 6, "", "", "", "", "", ""], "isController": false}, {"data": ["US 5/GET Completed Todos", 215, 46, "500", 26, "401", 20, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["3a -/POSTorCREATE-todo", 66, 21, "500", 15, "401", 6, "", "", "", "", "", ""], "isController": false}, {"data": ["Subtask Edit / EDIT subtask", 81, 7, "401", 4, "500", 3, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["3b Edit Task / GET todos", 94, 14, "500", 9, "401", 5, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Subtask Edit /login action", 83, 4, "500", 4, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["3a -/login", 93, 6, "500", 6, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["3a -/GET-todos", 153, 22, "401", 12, "500", 10, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["3b Edit Task / PUT or Edit Todo", 77, 16, "500", 11, "401", 5, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Registration-/register", 137, 30, "500", 30, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
