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

    var data = {"OkPercent": 99.99173758572255, "KoPercent": 0.008262414277451871};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9999173758572255, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "3a -/ POST logout"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / GET Todos"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/ PUT create subtask"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / landing page end"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / landing page start"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit / dashboard.html"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/GET Completed Todos"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/ Landing Page"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit / GET todos"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/Landing Page post logout"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/ Landing Page"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit / POST logout"], "isController": false}, {"data": [1.0, 500, 1500, "Registration-/register.html"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/ Landing Page"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/dashboard.html"], "isController": false}, {"data": [1.0, 500, 1500, "Login / POST logout"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / Login Action"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit / PUT or edit subtask"], "isController": false}, {"data": [0.9960159362549801, 500, 1500, "3a -/POST todo"], "isController": false}, {"data": [1.0, 500, 1500, "Login / Landing Page"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/ POST Logout"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task /dashboard.html"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/dashboard.html"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / GET todos"], "isController": false}, {"data": [1.0, 500, 1500, "Login / login POST"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / Logout Action"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit / Landing page end"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit / Landing Page"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/ Landing Page end"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/ POST logout"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Edit / POST login"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/ POST Login"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/ GET todos"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/ POST Login"], "isController": false}, {"data": [1.0, 500, 1500, "3a -/GET-todos"], "isController": false}, {"data": [1.0, 500, 1500, "US 5/dashboard.html"], "isController": false}, {"data": [1.0, 500, 1500, "3b Edit Task / PUT or Edit Todo"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/GET Todos"], "isController": false}, {"data": [1.0, 500, 1500, "Login/dashboard.html"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/ Landing Page End "], "isController": false}, {"data": [1.0, 500, 1500, "Registration-/ Landing Page"], "isController": false}, {"data": [1.0, 500, 1500, "Login / GET todos"], "isController": false}, {"data": [1.0, 500, 1500, "Subtask Creation/ POST Login"], "isController": false}, {"data": [1.0, 500, 1500, "Registration-/register"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 12103, 1, 0.008262414277451871, 8.102949681897075, 0, 224, 2.0, 30.0, 36.0, 49.0, 40.3662075175933, 369.37781344324287, 22.356692229763535], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["3a -/ POST logout", 245, 0, 0.0, 0.7673469387755103, 0, 2, 1.0, 1.0, 1.0, 2.0, 0.8485524388089788, 0.1392156344920981, 0.543603906112002], "isController": false}, {"data": ["3b Edit Task / GET Todos", 259, 0, 0.0, 31.471042471042473, 13, 70, 31.0, 43.0, 51.0, 66.99999999999989, 0.8921128953369017, 18.236284302429716, 0.46957895565096686], "isController": false}, {"data": ["Subtask Creation/ PUT create subtask", 120, 0, 0.0, 11.491666666666669, 4, 34, 10.0, 21.0, 27.0, 33.579999999999984, 0.6555657532450505, 0.1984676235878021, 0.5131210461190507], "isController": false}, {"data": ["3b Edit Task / landing page end", 255, 0, 0.0, 1.094117647058824, 0, 3, 1.0, 2.0, 2.0, 2.0, 0.8876233970565712, 4.222278874084529, 0.4438116985282856], "isController": false}, {"data": ["3b Edit Task / landing page start", 269, 0, 0.0, 2.018587360594794, 0, 125, 1.0, 2.0, 3.0, 5.300000000000011, 0.8978578247141207, 4.305158124361654, 0.3928127983124279], "isController": false}, {"data": ["Subtask Edit / dashboard.html", 226, 0, 0.0, 1.2610619469026552, 1, 3, 1.0, 2.0, 2.0, 3.0, 0.7677856179485175, 19.054429598560233, 0.4978609866384919], "isController": false}, {"data": ["US 5/GET Completed Todos", 495, 0, 0.0, 30.874747474747466, 13, 94, 30.0, 41.400000000000034, 47.0, 65.24000000000012, 1.691868095811003, 34.487042869844075, 0.8938482810876489], "isController": false}, {"data": ["3a -/ Landing Page", 258, 0, 0.0, 2.023255813953488, 0, 125, 1.0, 2.0, 3.0, 4.410000000000025, 0.8694362817782332, 4.168879046417113, 0.38037837327797697], "isController": false}, {"data": ["Subtask Edit / GET todos", 445, 0, 0.0, 29.743820224719105, 14, 77, 29.0, 39.400000000000034, 47.0, 67.62000000000006, 1.5047051623221828, 30.37896630876381, 0.8052523720239807], "isController": false}, {"data": ["US 5/Landing Page post logout", 493, 0, 0.0, 1.1014198782961473, 0, 3, 1.0, 2.0, 2.0, 2.0, 1.6903765116526257, 8.040843738535099, 0.845188255826313], "isController": false}, {"data": ["US 5/ Landing Page", 509, 0, 0.0, 1.7662082514734778, 0, 125, 1.0, 2.0, 2.5, 4.0, 1.6987618062276808, 8.145430145095618, 0.7432082902246103], "isController": false}, {"data": ["Subtask Edit / POST logout", 218, 0, 0.0, 0.7568807339449543, 0, 3, 1.0, 1.0, 1.0, 2.0, 0.7561384218905541, 0.12405395984141904, 0.49326217365516617], "isController": false}, {"data": ["Registration-/register.html", 172, 0, 0.0, 3.069767441860466, 1, 5, 3.0, 4.0, 5.0, 5.0, 0.6077845898337426, 2.899441134118977, 0.29736335889326665], "isController": false}, {"data": ["Subtask Creation/ Landing Page", 120, 0, 0.0, 2.766666666666666, 1, 125, 2.0, 3.0, 4.0, 99.79999999999905, 0.6606256124549948, 3.167648200345728, 0.2916042742477126], "isController": false}, {"data": ["Subtask Creation/dashboard.html", 120, 0, 0.0, 1.6166666666666663, 1, 39, 1.0, 2.0, 2.9499999999999886, 31.64999999999972, 0.651310219057337, 16.163815036039164, 0.4218569363181433], "isController": false}, {"data": ["Login / POST logout", 337, 0, 0.0, 0.7685459940652816, 0, 2, 1.0, 1.0, 1.0, 2.0, 1.1578050489919882, 0.18995239085024807, 0.754931246736158], "isController": false}, {"data": ["3b Edit Task / Login Action", 267, 0, 0.0, 1.8726591760299636, 0, 31, 2.0, 2.0, 3.0, 20.559999999999945, 0.8979136119668008, 0.26919870983770294, 0.4436955934132824], "isController": false}, {"data": ["Subtask Edit / PUT or edit subtask", 222, 0, 0.0, 5.689189189189194, 1, 224, 4.0, 7.700000000000017, 13.699999999999989, 41.08000000000004, 0.7609776162890344, 0.2293597943732218, 0.6105917447211462], "isController": false}, {"data": ["3a -/POST todo", 251, 1, 0.398406374501992, 10.20717131474103, 3, 38, 9.0, 16.0, 24.399999999999977, 34.43999999999997, 0.856409766483329, 0.21942368164928824, 0.567036935230173], "isController": false}, {"data": ["Login / Landing Page", 350, 0, 0.0, 1.7600000000000007, 0, 126, 1.0, 2.0, 2.4499999999999886, 4.0, 1.178998996166569, 5.608304795241559, 0.527325722894813], "isController": false}, {"data": ["US 5/ POST Logout", 493, 0, 0.0, 0.766734279918864, 0, 2, 1.0, 1.0, 1.0, 2.0, 1.690370715784565, 0.27732644555840524, 1.0861952451037538], "isController": false}, {"data": ["3b Edit Task /dashboard.html", 267, 0, 0.0, 1.2172284644194762, 0, 4, 1.0, 2.0, 2.0, 3.0, 0.8979226710340908, 22.284090663075535, 0.5743548335227827], "isController": false}, {"data": ["3a -/dashboard.html", 258, 0, 0.0, 1.3992248062015507, 0, 39, 1.0, 2.0, 2.0, 6.6400000000001, 0.8676293541205669, 21.53228982057223, 0.5549777606923547], "isController": false}, {"data": ["3b Edit Task / GET todos", 267, 0, 0.0, 29.737827715355806, 13, 103, 28.0, 42.0, 49.79999999999998, 72.63999999999999, 0.897795860723953, 17.964586240521864, 0.4725702821584089], "isController": false}, {"data": ["Login / login POST", 347, 0, 0.0, 2.37463976945245, 0, 21, 2.0, 4.0, 4.0, 6.0, 1.1705217423570327, 0.3505721315049131, 0.6028387260540599], "isController": false}, {"data": ["3b Edit Task / Logout Action", 255, 0, 0.0, 0.7254901960784311, 0, 3, 1.0, 1.0, 1.0, 2.0, 0.8876264867743654, 0.1456262204864193, 0.5686357180898278], "isController": false}, {"data": ["Subtask Edit / Landing page end", 218, 0, 0.0, 1.1376146788990833, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.7561384218905541, 3.5968264189735244, 0.3832381259386695], "isController": false}, {"data": ["Subtask Edit / Landing Page", 228, 0, 0.0, 2.100877192982455, 1, 125, 1.0, 2.0, 3.0, 4.0, 0.7630777469125473, 3.6588981809966863, 0.33682728672311657], "isController": false}, {"data": ["3a -/ Landing Page end", 245, 0, 0.0, 1.0857142857142856, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.8485553777630002, 4.0364387159019275, 0.4242776888815001], "isController": false}, {"data": ["Subtask Creation/ POST logout", 120, 0, 0.0, 0.725, 0, 3, 1.0, 1.0, 1.0, 2.789999999999992, 0.661754974191556, 0.10856917545330215, 0.4312070376262849], "isController": false}, {"data": ["Subtask Edit / POST login", 226, 0, 0.0, 2.2035398230088474, 0, 27, 2.0, 4.0, 5.0, 8.919999999999959, 0.7677804012162185, 0.23168373435137843, 0.3883889138964855], "isController": false}, {"data": ["3a -/ POST Login", 258, 0, 0.0, 3.0968992248062, 0, 217, 2.0, 4.0, 4.049999999999983, 22.870000000000175, 0.8669966630709829, 0.25992966363553877, 0.4284182729628099], "isController": false}, {"data": ["Subtask Creation/ GET todos", 120, 0, 0.0, 25.608333333333324, 13, 194, 23.0, 29.900000000000006, 50.94999999999999, 166.27999999999895, 0.6513066840348448, 10.129313634698363, 0.34807381136530163], "isController": false}, {"data": ["US 5/ POST Login", 503, 0, 0.0, 2.0516898608349887, 0, 24, 2.0, 4.0, 4.0, 14.679999999999836, 1.6944470645304732, 0.5113126395897619, 0.8406045984194145], "isController": false}, {"data": ["3a -/GET-todos", 506, 0, 0.0, 30.458498023715443, 13, 194, 29.0, 41.0, 46.64999999999998, 66.72000000000003, 1.6971664698937425, 34.2596417859323, 0.8933327414772727], "isController": false}, {"data": ["US 5/dashboard.html", 503, 0, 0.0, 1.228628230616302, 0, 4, 1.0, 2.0, 2.0, 3.0, 1.6944698970516898, 42.05230809938925, 1.0871745335575782], "isController": false}, {"data": ["3b Edit Task / PUT or Edit Todo", 264, 0, 0.0, 4.617424242424241, 1, 36, 4.0, 8.0, 13.0, 26.800000000000182, 0.8976202862184686, 0.2267658670960964, 0.6282405654242786], "isController": false}, {"data": ["Subtask Creation/GET Todos", 120, 0, 0.0, 26.966666666666672, 14, 54, 26.0, 38.80000000000001, 44.89999999999998, 53.78999999999999, 0.662083577016872, 10.841828707599063, 0.35383323976805003], "isController": false}, {"data": ["Login/dashboard.html", 347, 0, 0.0, 1.175792507204613, 0, 3, 1.0, 2.0, 2.0, 3.0, 1.1705375364738821, 29.049678139073016, 0.7666663767730946], "isController": false}, {"data": ["Subtask Creation/ Landing Page End ", 120, 0, 0.0, 0.9916666666666667, 0, 2, 1.0, 1.0, 1.0, 2.0, 0.661758623542063, 3.147877202415419, 0.3354030523616511], "isController": false}, {"data": ["Registration-/ Landing Page", 175, 0, 0.0, 2.0571428571428587, 1, 7, 2.0, 3.0, 3.0, 3.9600000000000364, 0.5904303056067262, 2.8310671880166263, 0.2583132587029427], "isController": false}, {"data": ["Login / GET todos", 340, 0, 0.0, 31.123529411764707, 13, 74, 30.5, 42.0, 49.94999999999999, 67.58999999999997, 1.164906173660101, 23.753054532812662, 0.6196326519774281], "isController": false}, {"data": ["Subtask Creation/ POST Login", 120, 0, 0.0, 2.266666666666667, 0, 18, 2.0, 4.0, 5.0, 15.479999999999905, 0.6512465945230161, 0.19604176050949193, 0.3289622080244435], "isController": false}, {"data": ["Registration-/register", 172, 0, 0.0, 9.430232558139535, 3, 50, 9.0, 15.700000000000017, 23.049999999999983, 40.51000000000013, 0.608481237905551, 0.11587289198396723, 0.30542905887055977], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500", 1, 100.0, 0.008262414277451871], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 12103, 1, "500", 1, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["3a -/POST todo", 251, 1, "500", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
