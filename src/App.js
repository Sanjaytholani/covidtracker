import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import Table from "./Table";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("World Wide");
  const [countryInfo, setCountryInfo] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [name, setName] = useState("World Wide");
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark_mode");
    } else {
      document.body.classList.remove("dark_mode");
    }
  }, [isDark]);
  const handelChange = async (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === "World Wide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        countryCode === "World Wide"
          ? setName("World Wide")
          : setName(data.country);
        setCountryInfo(data);
      });
  };

  useEffect(() => {
    const getCountryInfo = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = data.sort((a, b) => b.cases - a.cases);
          setAllCountries(sortedData);
          setCountries(countries);
        });
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    };
    getCountryInfo();
  }, []);

  const theme = createMuiTheme({
    palette: {
      type: isDark ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>COVID TRACKER</h1>
            <FormControl>
              <Select
                value={country}
                onChange={handelChange}
                variant="outlined"
              >
                <MenuItem id={"World Wide"} value="World Wide">
                  WorldWide
                </MenuItem>
                {countries.map((country, i) => (
                  <MenuItem id={i} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={() => setIsDark(!isDark)}>
              {isDark ? "Light" : "Dark"}
            </Button>
          </div>
          <div className="app__stats">
            <InfoBox
              isDark={isDark}
              title="Coronavirus Cases"
              cases={countryInfo.todayCases}
              total={countryInfo.cases}
            />
            <InfoBox
              isDark={isDark}
              title="Recovered"
              cases={countryInfo.todayRecovered}
              total={countryInfo.recovered}
            />
            <InfoBox
              isDark={isDark}
              title="Death"
              cases={countryInfo.todayDeaths}
              total={countryInfo.deaths}
            />
          </div>
          <Map />
        </div>
        <Card className="app__right">
          <CardContent>
            <h2>Live Cases By Country</h2>
            <Table countries={allCountries} isDark={isDark} />
            <h2 style={{ marginTop: "3rem" }}>{name} Cases</h2>
            <LineGraph countryCode={country} />
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default App;
