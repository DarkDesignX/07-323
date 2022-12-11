import * as R from 'ramda';
import axios from 'axios';
const apiAdress = "f1983c3d2110851c98f30164350fdbc7";

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  weather_INPUT: 'weather_INPUT',
  DATA_GET: 'DATA_GET',
  SAVE_weather: 'SAVE_weather',
  DELETE_weather: 'DELETE_weather',
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}

export function weatherInputMsg(description) {
  return {
    type: MSGS.weather_INPUT,
    description,
  };
}

export const getDataMsg = { type: MSGS.DATA_GET };
export const saveweatherMsg = { type: MSGS.SAVE_weather };

export function deleteweatherMsg(id) {
  return {
    type: MSGS.DELETE_weather,
    id,
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
    }
    case MSGS.weather_INPUT: {
      const { description } = msg;
      return { ...model, description };
    }
    case MSGS.DATA_GET: {
    }
    case MSGS.SAVE_weather: {
        const updatedModel = add(msg, model);
        return updatedModel;
    }
    case MSGS.DELETE_weather: {
      const { id } = msg;
      const weathers = R.filter(
        weather => weather.id !== id
      , model.weathers);
      return { ...model, weathers };
    }
  }
  return model;
}

function add(msg, model) {
    const { nextId, description, temp, low, high } = model;
    const url = getUrl(description);
    const weather = { id: nextId, description, temp: getData(url), low, high};
    const weathers = [...model.weathers, weather]
    return {...model, weathers, nextId: nextId + 1, description: '', showForm: false};
}

function getUrl (townName) {
    return "https://api.openweathermap.org/data/2.5/weather?q=" + townName + "&units=metric&appid=" + apiAdress;
}
async function getData (url) {
    const response = await axios.get(url)
        .then((resp) => {
            return resp.data
        });
    console.log(response.main);
    return response.main;
}

export default update;