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

    var data = {"OkPercent": 99.34792734047508, "KoPercent": 0.6520726595249184};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6152771308802981, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Login/index.html"], "isController": false}, {"data": [0.0, 500, 1500, "3b Edit Task / GET Todos"], "isController": false}, {"data": [0.6083333333333333, 500, 1500, "Subtask Creation/ PUT create subtask"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/logout action"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / landing page end"], "isController": false}, {"data": [0.01282051282051282, 500, 1500, "Login/login"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / landing page start"], "isController": false}, {"data": [0.0, 500, 1500, "Login/todo"], "isController": false}, {"data": [0.002976190476190476, 500, 1500, "US 5/GET Completed Todos"], "isController": false}, {"data": [0.036290322580645164, 500, 1500, "Subtask Edit / GET todos"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/Landing Page post logout"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/ Landing Page"], "isController": false}, {"data": [1.0, 500, 1500, "Registration-/register.html"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/Login page 2"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/Login page 1"], "isController": false}, {"data": [0.0, 500, 1500, "3a -/POSTorCREATE-todo"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit / Login page 1"], "isController": false}, {"data": [0.0234375, 500, 1500, "Subtask Edit / EDIT subtask"], "isController": false}, {"data": [0.07333333333333333, 500, 1500, "3b Edit Task / Login Action"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/logout"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit /dashboard.html"], "isController": false}, {"data": [0.6041666666666666, 500, 1500, "Subtask Creation/login-86"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task /dashboard.html"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/dashboard.html"], "isController": false}, {"data": [0.0, 500, 1500, "3b Edit Task / GET todos"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/LoginPage"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / Logout Action"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/logout"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit /logout action"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/ Login Page end"], "isController": false}, {"data": [0.2875, 500, 1500, "Subtask Creation/ GET todos"], "isController": false}, {"data": [0.16666666666666666, 500, 1500, "Subtask Edit /login action"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/dashboard.html"], "isController": false}, {"data": [0.06666666666666667, 500, 1500, "3a -/login"], "isController": false}, {"data": [1.0, 500, 1500, "Login/logout"], "isController": false}, {"data": [0.0, 500, 1500, "3a -/GET-todos"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/dashboard.html-87"], "isController": false}, {"data": [0.0, 500, 1500, "3b Edit Task / PUT or Edit Todo"], "isController": false}, {"data": [0.31666666666666665, 500, 1500, "Subtask Creation/GET Todos"], "isController": false}, {"data": [1.0, 500, 1500, "Login/dashboard.html"], "isController": false}, {"data": [0.042134831460674156, 500, 1500, "US 5/ Login Action"], "isController": false}, {"data": [1.0, 500, 1500, "Registration-/ Landing Page"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit /Login page 2"], "isController": false}, {"data": [0.0, 500, 1500, "Registration-/register"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 4294, 28, 0.6520726595249184, 5369.560316721, 0, 30059, 6.0, 16912.0, 18353.25, 21075.650000000005, 9.0066280728249, 98.76490324993183, 4.981525689025925], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Login/index.html", 118, 0, 0.0, 4.271186440677964, 1, 86, 3.0, 8.0, 9.0, 71.75000000000017, 0.4020278557605822, 1.9123805521580037, 0.17981324017416664], "isController": false}, {"data": ["3b Edit Task / GET Todos", 60, 1, 1.6666666666666667, 17663.766666666666, 12054, 30059, 16988.0, 20879.1, 22083.35, 30059.0, 0.21494590528050442, 6.0833364586318694, 0.11314047162714051], "isController": false}, {"data": ["Subtask Creation/ PUT create subtask", 120, 8, 6.666666666666667, 5433.95, 10, 19021, 56.0, 14702.300000000001, 15609.349999999999, 18852.789999999994, 0.2633739075469793, 0.08101619735814024, 0.20614666689346087], "isController": false}, {"data": ["Subtask Creation/logout action", 120, 0, 0.0, 2.5333333333333354, 0, 10, 2.0, 5.0, 7.0, 9.579999999999984, 0.28100412139378045, 0.046102238666167104, 0.18310546875], "isController": false}, {"data": ["3b Edit Task / landing page end", 60, 0, 0.0, 2.383333333333334, 1, 7, 2.0, 4.0, 6.949999999999996, 7.0, 0.2246450608039298, 1.0685996984140058, 0.11232253040196488], "isController": false}, {"data": ["Login/login", 117, 0, 0.0, 12650.90598290598, 8, 21107, 12996.0, 16078.6, 17380.699999999997, 20631.79999999998, 0.38026521060842433, 0.11389103025058502, 0.19584572445397816], "isController": false}, {"data": ["3b Edit Task / landing page start", 75, 0, 0.0, 5.213333333333333, 1, 86, 3.0, 9.0, 15.0, 86.0, 0.2566357449109132, 1.2305483471802576, 0.11227813839852452], "isController": false}, {"data": ["Login/todo", 108, 0, 0.0, 17272.000000000007, 6149, 23506, 17404.0, 19559.0, 20518.4, 23451.55, 0.3466382508890629, 10.014138096426416, 0.1843772467294039], "isController": false}, {"data": ["US 5/GET Completed Todos", 168, 0, 0.0, 16371.64285714286, 564, 29849, 16976.5, 20457.199999999997, 21450.85, 26978.60000000001, 0.5344888473175341, 15.41811051232983, 0.2823813148425644], "isController": false}, {"data": ["Subtask Edit / GET todos", 124, 0, 0.0, 15253.241935483868, 351, 22089, 16721.5, 19872.0, 20823.5, 21922.0, 0.3923938875158619, 11.286126591726818, 0.20999204136591046], "isController": false}, {"data": ["US 5/Landing Page post logout", 159, 0, 0.0, 2.8553459119496867, 1, 12, 2.0, 5.0, 8.0, 10.800000000000011, 0.5451665329465737, 2.5932677558425397, 0.27258326647328684], "isController": false}, {"data": ["US 5/ Landing Page", 179, 0, 0.0, 4.363128491620112, 1, 86, 3.0, 11.0, 12.0, 30.799999999999216, 0.5995946873900883, 2.8750096827005205, 0.2623226757331636], "isController": false}, {"data": ["Registration-/register.html", 97, 0, 0.0, 5.742268041237113, 1, 21, 4.0, 12.0, 14.199999999999989, 21.0, 0.3432802015797967, 1.6376208835129953, 0.1679525204994904], "isController": false}, {"data": ["Subtask Creation/Login page 2", 120, 0, 0.0, 2.575000000000001, 1, 10, 2.0, 5.900000000000006, 7.0, 9.789999999999992, 0.28100412139378045, 1.3366905032315473, 0.1424229873079805], "isController": false}, {"data": ["Subtask Creation/Login page 1", 120, 0, 0.0, 4.174999999999999, 1, 86, 3.0, 7.0, 10.0, 70.45999999999941, 0.2688376802892693, 1.289055674043274, 0.1186666323151853], "isController": false}, {"data": ["3a -/POSTorCREATE-todo", 60, 7, 11.666666666666666, 14385.883333333331, 10498, 19115, 13867.5, 18518.7, 18874.7, 19115.0, 0.20621249510245326, 0.05534576894920987, 0.1365352262494759], "isController": false}, {"data": ["Subtask Edit / Login page 1", 66, 0, 0.0, 4.712121212121214, 1, 86, 2.0, 8.300000000000004, 10.649999999999999, 86.0, 0.22176152571929697, 1.063329190704832, 0.09788692346203341], "isController": false}, {"data": ["Subtask Edit / EDIT subtask", 64, 3, 4.6875, 12439.578125000004, 360, 25890, 12690.5, 16821.0, 17386.0, 25890.0, 0.20876418128559593, 0.06353138475891, 0.1674961763943164], "isController": false}, {"data": ["3b Edit Task / Login Action", 75, 0, 0.0, 11326.266666666668, 3, 18699, 13054.0, 15671.6, 16983.0, 18699.0, 0.24566402987274602, 0.07365122770598928, 0.12139257726133738], "isController": false}, {"data": ["3a -/logout", 46, 0, 0.0, 2.2391304347826098, 1, 7, 2.0, 5.0, 6.0, 7.0, 0.18568303099291983, 0.03046362227227591, 0.11895319172983926], "isController": false}, {"data": ["Subtask Edit /dashboard.html", 65, 0, 0.0, 2.353846153846154, 1, 7, 2.0, 4.0, 5.699999999999996, 7.0, 0.23098873841058426, 5.732535946511892, 0.14978176006311322], "isController": false}, {"data": ["Subtask Creation/login-86", 120, 0, 0.0, 4699.85, 1, 17890, 9.0, 13291.4, 14858.799999999994, 17777.859999999997, 0.2637878618015392, 0.07940684414094186, 0.13324635890317008], "isController": false}, {"data": ["3b Edit Task /dashboard.html", 71, 0, 0.0, 2.9014084507042255, 1, 11, 2.0, 5.0, 7.3999999999999915, 11.0, 0.23866027550135466, 5.922923419253833, 0.152658672317761], "isController": false}, {"data": ["3a -/dashboard.html", 60, 0, 0.0, 2.833333333333334, 1, 14, 2.0, 6.899999999999999, 8.949999999999996, 14.0, 0.22761328502873618, 5.64876602776882, 0.14559248212287323], "isController": false}, {"data": ["3b Edit Task / GET todos", 71, 0, 0.0, 14931.225352112671, 1703, 22901, 16428.0, 20966.2, 21408.199999999997, 22901.0, 0.22606209384442472, 6.521293168706002, 0.1189916685372509], "isController": false}, {"data": ["3a -/LoginPage", 60, 0, 0.0, 5.166666666666666, 2, 18, 4.5, 9.0, 13.899999999999991, 18.0, 0.23928692496360845, 1.1473621109094898, 0.1046880296715787], "isController": false}, {"data": ["3b Edit Task / Logout Action", 60, 0, 0.0, 2.2499999999999996, 0, 9, 2.0, 4.899999999999999, 5.949999999999996, 9.0, 0.22464590189713465, 0.03685596827999865, 0.1439137809028519], "isController": false}, {"data": ["US 5/logout", 159, 0, 0.0, 2.578616352201257, 0, 16, 2.0, 5.0, 8.0, 14.200000000000017, 0.5451590561548114, 0.08944015765039875, 0.3503072841307284], "isController": false}, {"data": ["Subtask Edit /logout action", 53, 0, 0.0, 2.9622641509433962, 0, 10, 3.0, 5.0, 8.599999999999994, 10.0, 0.18591207411226984, 0.03050119965904427, 0.12127857959667603], "isController": false}, {"data": ["3a -/ Login Page end", 46, 0, 0.0, 2.3478260869565224, 0, 9, 2.0, 4.0, 4.649999999999999, 9.0, 0.1856852795976281, 0.8832744110547328, 0.09284263979881403], "isController": false}, {"data": ["Subtask Creation/ GET todos", 120, 0, 0.0, 7048.4, 431, 23670, 1067.0, 18537.500000000004, 20717.64999999999, 23195.399999999983, 0.2634589080945554, 7.95442004804283, 0.14079871821752485], "isController": false}, {"data": ["Subtask Edit /login action", 66, 0, 0.0, 11054.015151515154, 2, 20365, 12872.0, 15724.7, 18212.25, 20365.0, 0.21397725356952965, 0.06456930796189908, 0.10824239975489877], "isController": false}, {"data": ["US 5/dashboard.html", 168, 0, 0.0, 2.7321428571428568, 1, 17, 2.0, 5.0, 7.0, 15.620000000000005, 0.5659938751377084, 14.046486668822835, 0.3631425546537836], "isController": false}, {"data": ["3a -/login", 60, 0, 0.0, 10004.266666666666, 4, 16211, 11824.0, 14754.0, 15763.25, 16211.0, 0.22761069466784012, 0.06823875318654972, 0.11247169091985068], "isController": false}, {"data": ["Login/logout", 103, 0, 0.0, 2.5048543689320395, 0, 15, 2.0, 5.6000000000000085, 7.0, 14.879999999999981, 0.3689666783685225, 0.06053359566983572, 0.24056716984646687], "isController": false}, {"data": ["3a -/GET-todos", 116, 0, 0.0, 17236.29310344826, 5560, 23473, 17112.0, 20905.9, 21818.1, 23403.13, 0.3856229139794955, 11.159005276759238, 0.20297924866694148], "isController": false}, {"data": ["Subtask Creation/dashboard.html-87", 120, 0, 0.0, 2.824999999999999, 1, 19, 2.0, 4.900000000000006, 9.899999999999977, 18.789999999999992, 0.2637919209327682, 6.546625084633241, 0.17085936675650248], "isController": false}, {"data": ["3b Edit Task / PUT or Edit Todo", 62, 0, 0.0, 12258.306451612905, 2085, 16265, 12576.5, 14958.900000000001, 15300.8, 16265.0, 0.20693153903663355, 0.052273941895626404, 0.14482730603505822], "isController": false}, {"data": ["Subtask Creation/GET Todos", 120, 0, 0.0, 6787.824999999999, 419, 21127, 1026.5, 18254.8, 18879.3, 21042.579999999998, 0.2707110903565942, 8.259135847195997, 0.14467445722426384], "isController": false}, {"data": ["Login/dashboard.html", 113, 0, 0.0, 2.991150442477877, 1, 19, 2.0, 6.0, 9.299999999999997, 18.159999999999997, 0.3823263713843936, 9.488339917960541, 0.2504093672921481], "isController": false}, {"data": ["US 5/ Login Action", 178, 0, 0.0, 12059.662921348317, 2, 23061, 12924.5, 15744.1, 16991.05, 20638.070000000025, 0.5735108854299238, 0.1730613902322719, 0.2845151658187512], "isController": false}, {"data": ["Registration-/ Landing Page", 97, 0, 0.0, 5.20618556701031, 1, 14, 4.0, 11.0, 12.0, 14.0, 0.34863367945109963, 1.6716712559618156, 0.1525272347598561], "isController": false}, {"data": ["Subtask Edit /Login page 2", 53, 0, 0.0, 2.6981132075471694, 1, 11, 2.0, 6.0, 7.299999999999997, 11.0, 0.1859075092602986, 0.8843315211005023, 0.09422460674423336], "isController": false}, {"data": ["Registration-/register", 97, 9, 9.278350515463918, 13613.453608247422, 8869, 18232, 13501.0, 15877.6, 17532.3, 18232.0, 0.32705411902746917, 0.06385141627920307, 0.16416583708996013], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500", 28, 100.0, 0.6520726595249184], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 4294, 28, "500", 28, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["3b Edit Task / GET Todos", 60, 1, "500", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Subtask Creation/ PUT create subtask", 120, 8, "500", 8, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["3a -/POSTorCREATE-todo", 60, 7, "500", 7, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Subtask Edit / EDIT subtask", 64, 3, "500", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Registration-/register", 97, 9, "500", 9, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
