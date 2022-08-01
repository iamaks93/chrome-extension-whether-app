(function () {
    const API_KEY = '39d7eca7fbb8f5e4abbafe3bc1460fc2';
    const API_END_POINT = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat={lat}&lon={lon}&appid=' + API_KEY;
    const ASSETS_END_POINT = 'https://openweathermap.org/img/wn/{ICON}@2x.png';
    let modalContainer = document.getElementsByClassName('container');

    const showWhether = (position) => {
        const {latitude, longitude} = position.coords;
        let apiEndPoint = (API_END_POINT.replace('{lat}', latitude)).replace('{lon}', longitude);
        fetch(apiEndPoint)
            .then((data) => data.json())
            .then(response => {
                const {
                    name,
                    sys: {
                        country
                    },
                    main: {
                        feels_like,
                        temp
                    },
                    weather: {
                        0: {
                            main,
                            icon
                        }
                    }
                } = response;

                const imageEndPoint = ASSETS_END_POINT.replace('{ICON}', icon);
                fetch(imageEndPoint)
                    .then((res) => res.blob())
                    .then((blobResult) => {
                        document.getElementById('location-name').innerText = name;
                        document.getElementById('country-name').innerText = country;
                        document.getElementById('temperature').innerText = temp;
                        document.getElementById('flw-temperature').innerText = feels_like;
                        document.getElementById('temp-icon').src = URL.createObjectURL(blobResult);
                        document.getElementById('icon-desc').innerText = main;
                    }).catch(error => {
                        console.error('Error while fetching an whether icon',error);
                });
            })
            .catch(error => {
                console.error(error);
            });
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showWhether);
        } else {
            modalContainer.innerHTML = 'Geolocation is not supported by this browser.';
        }
    }
    //Get location
    getLocation();
})();