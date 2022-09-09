let markerData;
let addresses = [];
let pointsData = [];
/*
fetch('./markerData.json')
    .then((response) => response.json())
    .then((data) => { markerData = data; makeLocations() });

function makeLocations() {
    let count = 0;
    let city = markerData.city;
    console.log(city);
    markerData.bundles.map(bundle => {
        let street = bundle.street;
        bundle.numbers.map(x => {
            addresses.push(street + " " + x + ", " + city + ", Nederland");
            count++
        });
    });
    console.log(addresses);
    console.log(count);

}
*/

function initMap() {
    let tempCount = 200;

    geocoder = new google.maps.Geocoder();

    const map = new google.maps.Map(
        document.getElementById("map"),
        {
            zoom: 17,
            center: { lat: 51.9574606, lng: 5.2394608 },
        }
    );

   
    fetch('./latLonData.json')
        .then((response) => response.json())
        .then((data) => { pointsData = data; makeMarkers() });
    const image = "marker.png";

    function makeMarkers() {
        for (a = 0; a < pointsData.length; a++) {
            const marker = new google.maps.Marker({ position: { lat: pointsData[a].lat, lng: pointsData[a].lng }, map, icon: image });
        }
        const flightPath = new google.maps.Polyline({
            path: pointsData,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
        
          flightPath.setMap(map);
    }

    /*
    searchLocation(addresses[tempCount]);
    function searchLocation(address) {
        if (tempCount < addresses.length) {
            console.log(address);
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == 'OK') {
                    pointsData.push({"address": address, "count": tempCount, "lat": results[0].geometry.location.lat(), "lng": results[0].geometry.location.lng() });
                    tempCount++;
                    setTimeout(function(){searchLocation(addresses[tempCount])},1000);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
        else{
            console.log(pointsData);
        }
    }
    */


}


