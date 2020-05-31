var home = [22.325302, 114.210241]; //KlnBay as default

function getGPS() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( function(position){
												home[0] = position.coords.latitude;
												home[1] = position.coords.longitude;
												map.setView(home, 15);
											});
  }
}
getGPS();

//=======================================================================

var map = L.map('map').setView(home, 15);
L.tileLayer(
  'https://{s}.tile.osm.org/{z}/{x}/{y}.png', 
  //'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
  {maxZoom:18}).addTo(map);


var listIcons = "?;?;watson-icon.png;?;?;mannings-icon.png".split(';'); //hardcoded for now
var theIcons = new Array(listIcons.length);
for(var i=0; i < theIcons.length; i++) {
	theIcons[i] = L.icon({
		iconUrl: 'img/'+listIcons[i],
		iconSize: [25,25], 
		iconAnchor: [20,45], 
		popupAnchor: [0,-30] 
	});
}

var globPoints; //global var for point list
var url = "https://wisemanhk.github.io/sksgroup/json/points.json";

$.get(url, function(json) {
	if(json.status!=0) return(-1);
	
	globPoints = json.data.points; //for later references

	$.each(json.data.points, function(idx, pt) {
		if(pt.lat && pt.lng) {
			var dpStr = ""; //display string
			dpStr += "\u71DF\u696D\u6642\u9593: "+ pt.opening_hours;
			dpStr += "<br>\u96FB\u8A71: "+ pt.phone;
			dpStr += "<br>\u5730\u5740: "+ pt.address_tc;
			dpStr += "<br>Address: <br>"+ pt.address_en;
			dpStr += "<br><br><a href='JavaScript:showShopDetails("+ pt.id +")'>\u986F\u793A\u5B8C\u6574...</a>"; //show more....

			if(pt.ka_category_id==2 || pt.ka_category_id==5) {
				L.marker([pt.lat, pt.lng], {icon: theIcons[pt.ka_category_id]}).addTo(map).bindPopup("( "+ pt.name +" )<hr><b>"+ dpStr +"</b>"); //.openPopup();
				//Usage: L.marker([lat, lng]).addTo(map);
			}
		}
  });
});

//=======================================================================

function showShopDetails(pointId) {
	var theDiv = document.getElementById('divShopDetails');

	var pts = globPoints;
	for(var i=0; i < pts.length; i++) {
		if(pts[i].id == pointId ) {
			var pt = pts[i];
			
			var html = "<br>";
			html += "<table border=0>";
			html += "<tr><td><b>ID           </b></td><td>"+ pt.id +"</td></tr>";
			html += "<tr><td><b>KA Category  </b></td><td>"+ pt.ka_category_id +"</td></tr>";
			html += "<tr><td><b>Code         </b></td><td>"+ pt.code +"</td></tr>";
			html += "<tr><td><b>Name         </b></td><td>"+ pt.name +"</td></tr>";
			html += "<tr><td><b>Address      </b></td><td>"+ pt.address_en +"</td></tr>";
			html += "<tr><td><b>Address (chi)</b></td><td>"+ pt.address_tc +"</td></tr>";
			html += "<tr><td><b>Phone        </b></td><td>"+ pt.phone +"</td></tr>";
			html += "<tr><td><b>Fax          </b></td><td>"+ pt.fax +"</td></tr>";
			html += "<tr><td><b>Opening Hours</b></td><td>"+ pt.opening_hours +"</td></tr>";
			html += "<tr><td><b>Latitude     </b></td><td>"+ pt.lat +"</td></tr>";
			html += "<tr><td><b>Longtitude   </b></td><td>"+ pt.lng +"</td></tr>";
			html += "<tr><td><b>Remarks      </b></td><td>"+ pt.remarks +"</td></tr>";
			html += "<tr><td><b>Sorting      </b></td><td>"+ pt.sorting +"</td></tr>";
			html += "<tr><td><b>Date Created </b></td><td>"+ pt.date_created +"</td></tr>";
			html += "<tr><td><b>Date Modified</b></td><td>"+ pt.date_modified +"</td></tr>";
			html += "<tr><td><b>Point Color  </b></td><td><span style='background-color:"+ pt.point_color +";color:white;width:20px;height:20px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td></tr>";
			html += "</table>";
			
			theDiv.innerHTML = html;
			break;
		}
	}
}
