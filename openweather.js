const axios = require("axios");

const APPID = "f1983c3d2110851c98f30164350fdbc7";

async function main() {
  function weatherUrl(city) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=metric&APPID=${APPID}`;
  }

  const url = weatherUrl("Bern");
  try {
    const response = await axios({ url });
    const { main } = response.data;
    const { temp, temp_min, temp_max } = main;
    console.log(temp, temp_min, temp_max);
  } catch (error) {
    console.log(error.message);
  }
}

main();