// hard coded :'(

var line_ice, line_bremen_dwd, line_tram_66, animated_ice, animated_tram

var markers

      var db_city_of_bremen = [53.0758196, 8.8071646]; 
      var db_deutscher_wetterdienst = [50.1032, 8.7477];
      var db_offendaten_de = [52.5723080455042, 13.4233915618654];
      var db_govdata_de = [53.6445747288072, 9.90912525428144];
      var db_mcloud_de = [50.7474312524639, 7.16845540439406];
      var db_opengov_munich_de = [48.1276181343997, 11.6818857833191];
 
      var db_eu_portal = [50.8469, 4.2661];
      var db_us_portal = [38.8938, -77.0746];
      var db_cn_portal = [39.9064, 116.3913];
      var db_jp_portal = [35.6830, 139.7595];

function init_station()
{


      db_marker_city_of_bremen = L.marker(db_city_of_bremen, {icon:dbIcon}).addTo(map)
    .bindPopup("City of Bremen");

	
      db_marker_offene_daten_de = L.marker(db_offendaten_de, {icon:dbIcon}).addTo(map)
    .bindPopup("offenedaten.de");


      db_marker_govdata_de = L.marker(db_govdata_de, {icon:dbIcon}).addTo(map)
       .bindPopup("govdata.de");


      db_marker_opengov_munich_de = L.marker(db_opengov_munich_de, {icon:dbIcon}).addTo(map)
       .bindPopup("City of Munich - https://www.opengov-muenchen.de/");

      db_marker_eu_portal = L.marker(db_eu_portal, {icon:dbIcon}).addTo(map)
       .bindPopup("EU Open Data Portal - https://data.europa.eu/euodp/en/home");

      db_marker_us_portal = L.marker(db_us_portal, {icon:dbIcon}).addTo(map)
       .bindPopup("US Open Data Portal - https://www.data.gov/");

     db_marker_cn_portal = L.marker(db_cn_portal, {icon:dbIcon}).addTo(map)
       .bindPopup("Chinese Datasets Archive 2.0 - https://datascience.shanghai.nyu.edu");

     db_marker_jp_portal = L.marker(db_jp_portal, {icon:dbIcon}).addTo(map)
       .bindPopup("Japan Open Data Portal - https://www.data.go.jp");


     db_marker_mcloud_de = L.marker(db_mcloud_de, {icon:dbIcon_found}).addTo(map)
       .bindPopup(`<img src="img/mcloud_logo.png" alt="mcloud logo" width="150"/> 
                
		    <h1><a href="https://www.mcloud.de">mcloud.de</a> </h1>
	   	   <h2>1043 Datasets</h2>
			 <ul> 
			  <li><b>.csv</b> - 515</li>
			  <li><b>.xml</b> - 335</li>
			  <li><b>.kml</b> - 150 </li>
			  <li><b>.rdf</b> - 29</li>
			  <li><b>.pdf</b> - 14</li>
			</ul> 
		 	<h1>Beschreibung</h1>
				<p>Geo-, Mobilitäts- und Verkehrsdaten, kombiniert mit Wetter-, Hydrographie- oder Klimadaten.</p<
			</br>
			</br>
                    <button type="button" onclick="show_links();">Zeige Links</button> 
                  `);



 
      db_marker_deutscher_wetterdienst = L.marker(db_deutscher_wetterdienst, {icon:dbIcon}).addTo(map)
    .bindPopup(`<h1>Deutscher  Wetterdienst (DWD)</h1> 
                Homepage: <a href="https://www.dwd.de">dwd.de</a> <br>
                Open Data Portal: <a href="https://opendata.dwd.de"/>opendata.dwd.de</a> <br>
                ...
                <br> 
                  `);







      // ICE 42
      var mannheim_hbf = [49.4794029, 8.4696395] ;
      var frankfurt_airport = [50.0528897, 8.5695944] ;
      var cologne_hbf = [50.9427684, 6.9590464] ;
      var dusseldorf_hbf = [51.2195845, 6.7949628] ; 
      var siegburg = [50.671195, 7.429848] ;
      var before_siegburg = [50.692731, 7.390022] ;
      var bonn_hbf = [50.7320436, 7.0967647] ;

      // Tram 66 
      var siegburg = [50.7929167, 7.2029256]; 
      var hangelar_ost = [50.7637489, 7.1717841] ; 
      var sankt_augustin = [50.7768318, 7.1880754] ;

  line_ice = L.polyline([before_siegburg, before_siegburg, siegburg]);
  line_tram_66_to_siegburg = L.polyline([hangelar_ost, hangelar_ost, sankt_augustin, siegburg]);
  line_tram_66_from_siegburg = L.polyline([siegburg, siegburg, sankt_augustin, hangelar_ost]);
  


  // Animation 
  animated_ice = L.animatedMarker(line_ice.getLatLngs(), {
    icon: icon_ice,
    distance: 1000,  // meters
    interval: 500, // milliseconds

  });

  animated_tram = L.animatedMarker(line_tram_66_to_siegburg.getLatLngs(), {
    icon: icon_tram,
    distance: 500,  // meters
    interval: 1000, // milliseconds

  });


  animated_tram_from_siegburg = L.animatedMarker(line_tram_66_from_siegburg.getLatLngs(), {
    icon: icon_tram,
    distance: 500,  // meters
    interval: 1000, // milliseconds
    onEnd: function() {
       atom_bomb_marker = L.marker(hangelar_ost, {icon:atom_bomb}).addTo(map)
  }});


  // routes
    var route_ice = L.featureGroup([
      mannheim_marker,
      L.polyline([mannheim_hbf, frankfurt_airport]),
      frankfurt_marker,
      L.polyline([frankfurt_airport, siegburg]),
      siegburg_marker,
      L.polyline([siegburg, cologne_hbf]),
      cologne_marker,
      L.polyline([cologne_hbf, dusseldorf_hbf]),

    ]);

  var route_tram = L.featureGroup([
      hangelar_ost_marker,
      L.polyline([hangelar_ost, sankt_augustin]),
      sankt_augustin_marker,
      L.polyline([sankt_augustin, siegburg]),
      siegburg_marker,
    ]);




    map.addLayer(route_ice);
    map.addLayer(route_tram);
   // map.addLayer(route_bonn);
}


function show_links()
{ 
  line_mcloud_dwd = L.polyline([db_mcloud_de, db_deutscher_wetterdienst]);
  map.addLayer(line_mcloud_dwd);

  line_mcloud_govdata = L.polyline([db_mcloud_de, db_govdata_de]);
  map.addLayer(line_mcloud_govdata);
}


function start_ice()
{ 
   map.addLayer(animated_ice);
   animated_ice.start();
}

function start_tram_bonn()
{ 
   map.addLayer(animated_tram_from_bonn);
   animated_tram_from_bonn.start();
}


function start_tram_to_siegburg()
{ 
   map.addLayer(animated_tram);
   animated_tram.start();
}



function start_tram_from_siegburg()
{ 
   map.addLayer(animated_tram_from_siegburg);
   animated_tram_from_siegburg.start()
}


    //snake()

/*
  for (var i = 0, latlngs = [], len = route.length; i < len; i++) {
        latlngs.push(new L.LatLng(route[i][0], route[i][1]));
      }
      var path = L.polyline(latlngs);
      map.fitBounds(L.latLngBounds(latlngs));
      map.addLayer(L.marker(latlngs[0]));
      map.addLayer(L.marker(latlngs[len - 1]));
      map.addLayer(path);
      path.bindPopup("Hello world");
      function snake() {
        path.snakeIn();
      }
      path.on('snakestart snake snakeend', function(ev){
        console.log(ev.type);
      });
    */


function httpGetAsync(requestUrl, processData)
{
    console.log("http get async")
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            console.log("http get asyne - on ready exchange")
            processData(xhr.responseText);
        }
    }

    xhr.open("GET", requestUrl, true); // true for asynchronous 
    xhr.send(null);
}


function httpGetAsync(requestUrl, processData)
{
    console.log("http get async")
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            console.log("http get asyne - on ready exchange")
            processData(xhr.responseText);
        }
    }

    xhr.open("GET", requestUrl, true); // true for asynchronous 
    xhr.send(null);
}




function processData(results)
{
  console.log("process Data")

   console.log(results)



   // parse eto JSON 
    var jsonResult = JSON.parse(results, null, 2);
    
    // get results array  
    instanceList = jsonResult.results.bindings

    console.log(instanceList)

    // draw each result item to the map 
    for (let instance of instanceList)
    {
      //console.log(instance.name.value)

      drawToMap(instance.name.value, instance.geo.value)
    }

}


// Linked Geo Data Query Execution 
function executeLgdQuery() 
{
  // read query from HTML Text area
  lgd_query = lgd_default_query

  // construct http get request 
  full_query = lgd_graph_uri + encodeURIComponent(lgd_query) + lgd_result_format 
  
  // execute request 
  httpGetAsync(full_query, processData)
}



// Linked Geo Data Query Execution
function executeDbPediaQuery() 
{
  // read query from HTML Text area
  dbpedia_query = dbpedia_editor.getValue()

  // construct http get request 
  full_query = dbpedia_graph_uri + encodeURIComponent(dbpedia_query) + dbpedia_result_format 
  
  // execute request 
  httpGetAsync(full_query, processData)
}


function processData(results)
{
  console.log("process Data")

   console.log(results)



   // parse eto JSON 
    var jsonResult = JSON.parse(results, null, 2);
    
    // get results array  
    instanceList = jsonResult.results.bindings

    console.log(instanceList)

    // draw each result item to the map 
    for (let instance of instanceList)
    {
      //console.log(instance.name.value)

      drawToMap(instance.name.value, instance.geo.value)
    }

}



function drawToMap(instanceName, instanceGeo) {

  // console.log(instanceGeo)

  // "POINT(7.1830067 50.8969143)"
  var regex_result = instanceGeo.match("\\s.*");

  delimiter = regex_result.index

  lat = instanceGeo.substring(6, delimiter)
  long = instanceGeo.substring(delimiter+1)
  long = long.slice(0, long.length-1)


  console.log(lat)
  console.log(long)
  console.log(instanceName)

  new_marker = L.marker([long, lat], {icon:beerIcon}).addTo(map)
    .bindPopup(instanceName)
    .openPopup();

  // add marker
   markers.addLayer(new_marker);
}



// Definition of Markers on the map  2019

var dbIcon = L.icon({
    iconUrl: 'img/database.png',
    iconSize: [20, 20], 
});


var dbIcon_found = L.icon({
    iconUrl: 'img/database_mini_color.png',
    iconSize: [20, 20], 
});





// Definition of Markers on the map  2018

var markerIcon = L.icon({
    iconUrl: 'img/marker-icon.png',
    iconSize: [20, 20], 
});



var markerIcon = L.icon({
    iconUrl: 'img/marker-icon.png',
    iconSize: [20, 20], 
});

var beerIcon = L.icon({
    iconUrl: 'img/beer.png',
    iconSize: [20, 20], 
});

var icon_train_station = L.icon({
    iconUrl: 'img/train_station.png',
    iconSize: [20, 20], 
});



var atom_bomb = L.icon({
    iconUrl: 'https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif',
    iconSize: [200, 200], 
});


var icon_tram_station = L.icon({
    iconUrl: 'img/tram_stop.png',
    iconSize: [20, 20], 
});

var icon_tram = L.icon({
    iconUrl: 'img/tram.png',
    iconSize: [20, 20], 
});

var icon_ice = L.icon({
    iconUrl: 'img/007-ice-train.svg',
    iconSize: [20, 20], 
});


var markerIconRed = L.icon({
    iconUrl: 'img/marker-icon-red.png',
    iconSize: [20, 20], 
});

var markerIconViolet = L.icon({
    iconUrl: 'img/marker-icon-violet.png',
    iconSize: [20, 20], 
});

var busIcon = L.icon({
    iconUrl: 'img/bus.png',
    iconSize: [20, 20], 
});



// DO NOT CHANGE ------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
var popup = L.popup();

function onMapClick(e) {
    popup
  .setLatLng(e.latlng)
  .setContent("You clicked the map at " + e.latlng.toString())
  .openOn(map);
}

map = L.map('map').setView([51.1006,10.4559], 6);

var markers = L.featureGroup();
map.addLayer(markers)

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'klang.ng9i3eh6',
    accessToken: 'pk.eyJ1Ijoia2xhbmciLCJhIjoiY2llc2d1ZzBjMDAwMDlqa3N5amM0emxmeCJ9.-IYjn89ohocerNpQDPbpMw'
}).addTo(map);










// LinkedGeoData global variables ------------------
lgd_graph_uri = "http://linkedgeodata.org/sparql?default-graph-uri=http%3A%2F%2Flinkedgeodata.org&query="
lgd_default_query = 
`PREFIX lgd: <http://linkedgeodata.org/ontology/>
PREFIX geom: <http://geovocab.org/geometry#>
PREFIX ogc: <http://www.opengis.net/ont/geosparql#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>

SELECT ?name, ?geo 
{
    ?bonn owl:sameAs <http://dbpedia.org/resource/Siegburg> .
    ?bonn geom:geometry [ ogc:asWKT ?bonnGeo] .

    ?bar a lgd:Bar .
    ?bar rdfs:label ?name .    
    ?bar geom:geometry [ ogc:asWKT ?geo] .

    FILTER(bif:st_intersects (?bonnGeo, ?geo, 1)) .

} LIMIT 10`
lgd_result_format = "&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on"

// DBPedia global variables ----------------------
dbpedia_graph_uri = "http://dbpedia.org/sparql?default-graph-uri=http://dbpedia.org&query="
dbpedia_default_query = `PREFIX geom: <http://geovocab.org/geometry#>
PREFIX ogc:  <http://www.opengis.net/ont/geosparql#>
PREFIX owl:  <http://www.w3.org/2002/07/owl#>
PREFIX dbo:  <http://dbpedia.org/ontology/>
PREFIX dbr:  <http://dbpedia.org/resource/> 

SELECT *
{
    ?location dbo:location dbr:London .
    ?location rdfs:label ?name .
    OPTIONAL {?location geo:geometry ?geo . }

} LIMIT 10`
dbpedia_result_format = "&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=30000&debug=on&run=+Run+Query+"

var lgd_editor
var dbpedia_editor 
var map

map.on('click', onMapClick);



function init() {

  init_station()
    

    lgd_query = lgd_default_query


    dbpedia_query = lgd_default_query
}

function clearMap() {
    markers.clearLayers();
}


/*
mannheim_marker = L.marker(mannheim_hbf, {icon:icon_train_station}).addTo(map)
    .bindPopup("Mannheim Hbf");

    frankfurt_marker = L.marker(frankfurt_airport, {icon:icon_train_station}).addTo(map)
    .bindPopup(`<h1>Frankfurt Flughafen Bahnhof</h1> 
                Homepage: <a href="https://www.bahnhof.de/bahnhof-de/Frankfurt_am_Main_Flughafen_Fernbahnhof-1039350">Frankfurt am Main Flughafen Fernbahnhof</a> <br>
                Mobiler Service: <b>06:00 - 22:30</b> <br> 
                ...
                  `);

    cologne_marker = L.marker(cologne_hbf, {icon:icon_train_station}).addTo(map)
    .bindPopup("<h1>Köln Hbf</h1>");

    dusseldorf_marker = L.marker(dusseldorf_hbf, {icon:icon_train_station}).addTo(map)
    .bindPopup("<h1>Düsseldorf Hbf<h1>");

    siegburg_marker = L.marker(siegburg, {icon:icon_train_station}).addTo(map)
    .bindPopup(`<h1>Siegburg Bahnhof</h1> 
                Homepage: <a href="https://www.bahnhof.de/bahnhof-de/Siegburg-Bonn-1038514">Siegburg Hbf</a> <br>
                Mobiler Service: <b>08:00 - 20:00</b> <br> 
                ...
                <br> 
                    <button type="button" onclick="executeLgdQuery();">Suche Kneipen!</button> 
                  `);
    hangelar_ost_marker = L.marker(hangelar_ost, {icon:icon_tram_station}).addTo(map)
    .bindPopup("<h1>Hangelar Ost</h1>");

    bonn_marker = L.marker(bonn_hbf, {icon:icon_tram_station}).addTo(map)
    .bindPopup("<h1>Bonn Hbf</h1>");
  
    sankt_augustin_marker = L.marker(sankt_augustin, {icon:icon_tram_station}).addTo(map)
    .bindPopup("<h1>Sankt Augustin</h1>");
     
*/
