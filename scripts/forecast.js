class Forecast {
  constructor(){
    this.key = 'MmTKjfvs1Ezib40kzkD0pDXpbr8vRytf';
    this.cityUI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    this.weatherUI = 'https://dataservice.accuweather.com/currentconditions/v1/';
  }
  
//GET CITY INFO
  async getCity(city){
    const query = `?apikey=${this.key}&q=${city}`;

    const response = await fetch(this.cityUI + query);
    const data = await response.json();
  
    return data[0];
  }

  //GET WEATHER INFO USING CITY KEY(ID)
  async getWeather(id){
    const query = `${id}?apikey=${this.key}`;

    const response = await fetch(this.weatherUI + query);
    const data = await response.json();

    return data[0];
  }

  async updateCity(city){
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);

    return { cityDets, weather };
  }

}
