const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const body = document.querySelector('.container');
const bg = document.querySelector('.weather');
const forecast = new Forecast();

const updateUI = (data) => {
    // DESTRUCTURE PROPERTIES
    const {cityDets, weather} = data;
    console.log(data)

    // ADDING TIME AND CONTINENT
    const date = new Date(weather.LocalObservationDateTime    );
    console.log(date);

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.Region.LocalizedName} {${cityDets.EnglishName}}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <p>${dateFns.format(date, 'p')}</p>
        <p>${dateFns.format(date, 'PPPP')}</p>
        <div class="display-6 my-4">
            <span>${weather.Temperature.Metric.Value}&deg;C - </span>
            <span>${weather.Temperature.Imperial.Value}&deg;F</span>
        </div>
    `
    // //UPDATING BACKGROUND UMAGES

    // let bgImg = weather.IsDayTime ? 'img/dayweather.avif' : 'img/nightweather.avif';
    // bg.innerHTML = `
    //     <style>
    //         body {
    //         background-image: url(${bgImg});
    //         background-repeat: no-repeat;
    //         background-attachment: fixed;
    //         background-size: 100% 100%;
    //         }
    //     </style>
    // `
    //UPDATE THE NIGHT/DAY & ICON IMAGES

    const iconSrc = `img/icon/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc)
    body.setAttribute('src', timeSrc)


    //REMOVE THE d-none CLASS IF PRESENT
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
}

cityForm.addEventListener('submit', e => {
    // PREVENT DEFAULT ACTION
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset()

    //UPDATE THE ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //SET LOCCAL STORAGE
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}

