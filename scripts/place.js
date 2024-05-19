/* const TEMPERATURE_FAHRENHEIT = 50;
const WIND_SPEED_MPH = 5;

  // Formula: 35.74 + 0.6215T – 35.75(V^0.16) + 0.4275T(V^0.16)
  // * temp -> Fahrenheit
  // * wind_speed -> Miles per hour

const calculateWindChillFahrenheit = (temp, wind_speed) => {
  return 35.74 + (0.6215 * temp) - (35.75 * (wind_speed ** 0.16)) + (0.4275 * temp * (wind_speed ** 0.16));
}
document.querySelector("#windchill").textContent = calculateWindChillFahrenheit(
  TEMPERATURE_FAHRENHEIT,
  WIND_SPEED_MPH
).toFixed(1); */


const TEMPERATURE_CELSIUS = 32;
const WIND_SPEED_KMH = 14;
/*
  Formula: 13.12 + 0.6215*T - 11.37*V^0.16 + 0.3965*T*V^0.16
  * temp -> Celsius
  * wind_speed -> Kilometers per hour
*/
const calculateWindChillCelsius = (temp, wind_speed) => {
  return 13.12 + (0.6215 * temp) - (11.37 * (wind_speed ** 0.16)) + (0.3965 * temp * (wind_speed**0.16));
}
document.querySelector("#windchill").textContent = calculateWindChillCelsius(
  TEMPERATURE_CELSIUS,
  WIND_SPEED_KMH
).toFixed(1);