document.getElementById("xhr-btn").addEventListener("click", doXHR);
document.getElementById("fetch-btn").addEventListener("click", doFetch);
document.getElementById("fetch-async-btn").addEventListener("click", doFetchAsyncAwait);

const API_URL = 'https://api.giphy.com/v1/gifs/search';
const API_Key = 'B3uOz9CcphAPhGkThscYjcILNviRvLxn';

function displayResult(responseObject) {
    document.getElementById('pic').innerText = '';
    for (item of responseObject.data) {
        let imgElement = document.createElement('img');
        imgElement.src = item.link;
        imgElement.alt = item.title;
        document.getElementById('pic').appendChild(imgElement);
    }
}

// This will fetch the API using XMLHTTPRequest (XHR)
function doXHR() {
    let search = document.getElementById("searchGifs").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        // When the request is done, successful, and response is ready
        if (this.readyState == 4 && this.status == 200) {
            displayResult(JSON.parse(xhttp.responseText));
        }
    };
    // Send an asynchronous HTTP GET request to the given end point (url)
    xhttp.open("GET", 'https://api.imgur.com/3/album/' + search + '/images');
    let clientID = 'fba66c6f41895dd';
    xhttp.setRequestHeader('Authorization', 'Client-ID ' + clientID);
    xhttp.send();
}


// This will fetch the API using Fetch API with promises
function doFetch() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID fba66c6f41895dd");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };


    let search = document.getElementById("searchGifs").value;
    let url = 'https://api.imgur.com/3/album/' + search + '/images';

    fetch(url, requestOptions)
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            displayResult(JSON.parse(text));
        })
        .catch(function (e) {
            console.log("Error: " + e);
        })

}

// This will fetch the API using Fetch API with async/await
async function doFetchAsyncAwait() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID fba66c6f41895dd");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let search = document.getElementById("searchGifs").value;
    let url = 'https://api.imgur.com/3/album/' + search + '/images';

    let response = await fetch(url,requestOptions); // this is an async call
    let data = await response.json(); // this is an async call
    displayResult(data);
}