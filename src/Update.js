import * as R from 'ramda';
const apiAdress = "f1983c3d2110851c98f30164350fdbc7";

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  weather_INPUT: 'weather_INPUT',
  SAVE_weather: 'SAVE_weather',
  DELETE_weather: 'DELETE_weather',
  LOAD_TIME: "LOAD_TIME",
  UPDATE_TIME: "UPDATE_TIME"
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

export const loadTime = { type: MSGS.LOAD_TIME };
export const updateTimeMSG = (currentTime) => ({ type: MSGS.UPDATE_TIME, currentTime });
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
    case MSGS.LOAD_TIME: {
      return {
        model,
        command: {
          url: "https://api.openweathermap.org/data/2.5/weather?q="+ model.description +"&units=metric&appid=" + apiAdress,
        },
      };
    }
    case MSGS.UPDATE_TIME: {
      const { currentTime } = msg;
      return { ...model, temp:currentTime.temp, low:currentTime.temp_min, high:currentTime.temp_max };
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
        weather => weather.id !== id, 
        model.weathers);
      return { ...model, weathers };
    }
  }
  return model;
}

function add(msg, model) {
    const { nextId, description, temp, low, high } = model;
    const weather = { id: nextId, description, temp, low, high};
    const weathers = [...model.weathers, weather]
    return {...model, weathers, nextId: nextId + 1, description: '', showForm: false};
}

export default update;