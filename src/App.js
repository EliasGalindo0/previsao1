import { useState } from "react";

function App() {
  const [city, setCity] = useState("");

  const [weatherForecast, setWeatherForecast] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const searchForecastWeather = () => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_BASE_URL}current.json?key=${process.env.REACT_APP_KEY}&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status !== 200) {
          alert("Erro! Verique os dados digitados e tente novamente.");
        }
      })

      .then((data) => {
        setWeatherForecast(data);
        setIsLoading(false);
        setCity(" ");
      });
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand" href="#search">
          EBAC Weather
        </a>
      </nav>
      <main className="container" id="search">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo na sua cidade!</h1>
          <p className="lead">
            Digite a sua cidade no campo abaixo e em seguida clique em
            pesquisar.
          </p>
          <div className="mb-4">
            <div>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={handleCityChange}
              />
            </div>
          </div>
          <button
            className="btn btn-lg btn-primary"
            onClick={searchForecastWeather}
          >
            {isLoading ? "Pesquisando..." : "Pesquisar"}
          </button>
          {weatherForecast ? (
            <div className="mt-4 d-flex align-items-self">
              <div>
                <img
                  src={weatherForecast.current.condition.icon}
                  alt="Weather Icon"
                />
              </div>
              <div>
                <h3>
                  {weatherForecast.current.condition.text}:{" "}
                  {weatherForecast.current.temp_c}º C
                </h3>
                <p className="lead">
                  <strong>Cidade: {weatherForecast.location.name}</strong>
                </p>
                <p className="lead">
                  <strong>Estado: {weatherForecast.location.region}</strong>
                </p>
                <p className="lead">
                  <strong>
                    Sensação Térmica de: {weatherForecast.current.feelslike_c}º
                    C{" "}
                  </strong>
                </p>
                <p className="lead">
                  <strong>
                    Velocidade do Vento: {weatherForecast.current.gust_kph} km/h
                  </strong>
                </p>
                <p className="lead">
                  <strong>
                    Humidade Relativa: {weatherForecast.current.humidity}%
                  </strong>
                </p>
                <p className="lead">
                  <strong>Incidência UV: {weatherForecast.current.uv}</strong>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
