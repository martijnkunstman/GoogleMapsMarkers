let addresses = [];
let pointsData = [];


let markerData = {
    "city": "Culemborg",
    "bundles": [{
        "bundle": 1,
        "street": "Eikeboom",
        "numbers": [2]
    },
    {
        "bundle": 1,
        "street": "Appelboom",
        "numbers": ["44_A", 44, 42, 40, 38, 36, 34, 18, 20, 22, 24, 26, 28, 30, 32]
    },
    {
        "bundle": 1,
        "street": "Eikeboom",
        "numbers": [7, 9, 11, 13, 15, 17, 19, 21, 23, 25]
    },
    {
        "bundle": 2,
        "street": "Appelboom",
        "numbers": [2, 4, 6, 8, 10, 12, 14, 16, 1, 3, 5, 7, 9, 11, 13, 15]
    },
    {
        "bundle": 3,
        "street": "Pereboom",
        "numbers": [20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 3, 5, 7]
    },
    {
        "bundle": 4,
        "street": "Eikeboom",
        "numbers": [29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65]
    },
    {
        "bundle": 5,
        "street": "Beukeboom",
        "numbers": [17, 19, 21, 23, 34, 32, 30, 28, 26, 24, 44, 36, 38, 40, 42, 46]
    },
    {
        "bundle": 6,
        "street": "Pruimeboom",
        "numbers": [11, 9, 7, 5, 3, 1, 2, 4, 6, 8, 10, 12, 14]
    },
    {
        "bundle": 7,
        "street": "Pruimeboom",
        "numbers": [13, 15, 17, 19, 21, 23, 25, 27, 29, 30, 28, 26, 24, 22, 20, 18, 16, 31, 33, 35, 37, 39, 41, 43, 45]
    },
    {
        "bundle": 8,
        "street": "Honddijk",
        "numbers": [39, 37, 35, 33, 31, 29, 27, 25, 23, 21, 19, 17, 15, 6]
    },
    {
        "bundle": 9,
        "street": "Kerseboom",
        "numbers": [17, 19, 21, 23, 38, 36, 34, 32, 30, 28, 26, 24]
    },
    {
        "bundle": 10,
        "street": "Kerseboom",
        "numbers": [22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 1, 3, 5, 7, 9, 11, 13, 15]
    },
    {
        "bundle": 11,
        "street": "Eikeboom",
        "numbers": [75, 77, 79, 81, 18, 16, 14, 12, 10, 8, 6, 67, 69, 71, 73]
    },
    {
        "bundle": 12,
        "street": "Beukeboom",
        "numbers": [20, 18, 16, 14, 3, 5, 7, 9, 11, 12, 10, 8, 6, 4]
    },
    {
        "bundle": 13,
        "street": "Kastanjeboom",
        "numbers": [29, 31, 33, 35, 37, 15, 17, 19, 21, 23, 10, 12, 14, 16, 18, 20, 22, 8, 6, 4, 2, 1, 3, 5, 7, 9, 11]
    },
    {
        "bundle": 14,
        "street": "Moerbeiboom",
        "numbers": [21, 23, 8, 6, 4, 2, 19, "19_A", "19_B", "19_C"]
    },
    {
        "bundle": 14,
        "street": "Amberboom",
        "numbers": [1, 3, 5]
    },
    {
        "bundle": 15,
        "street": "Moerbeiboom",
        "numbers": [11, 9, 7, 1, 3, 5, 17, 15, 13, 49, 47, 45, 43, 41, 39, 37, 35, 33, 31, 29, 27, 25, 10, 12, 14, 16, 18, 20, 22]
    }

    ]
}



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
            zoom: 18,
            center: { lat: 51.9574606, lng: 5.2394608 },
        }
    );


    fetch('./latLonData.json')
        .then((response) => response.json())
        .then((data) => { pointsData = data; makeMarkers() });
    const image = "marker.png";

    function makeMarkers() {
       

        let counter = 0;
        for (let a = 0; a < markerData.bundles.length; a++) {
            let lineData = [];
            for (let b = 0; b < markerData.bundles[a].numbers.length; b++) {
                console.log(markerData.bundles[a].numbers[b]); 
                lineData.push({ lat: pointsData[counter].lat, lng: pointsData[counter].lng });
                const marker = new google.maps.Marker({
                    position: { lat: pointsData[counter].lat, lng: pointsData[counter].lng },
                    map,
                    //icon: image,
                    label: pointsData[counter].address.split(" ")[1].slice(0, -1)
                })
                counter++;
            }
            const flightPath = new google.maps.Polyline({
                path: lineData,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
            flightPath.setMap(map);

        }




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