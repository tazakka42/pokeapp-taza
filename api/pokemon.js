import axios from './axios';
import paramBuilder from './parambuilder';

export const getPokemon = (param = {}) => {
  return axios
    .get(`/pokemon${paramBuilder(param)}`)
    .then(res => {
      return res;
    })
    .catch(err => {
      // toast.error(MSG_SERVER_ERROR, {toastId: "err1"})
      console.log(err);
      return null;
    });
};

export const getPokemonDetail = param => {
  return axios
    .get(`/pokemon/${param}`)
    .then(res => {
      return res;
    })
    .catch(err => {
      // toast.error(MSG_SERVER_ERROR, {toastId: "err1"})
      console.log(err);
      return null;
    });
};

export const getAbility = param => {
  return axios
    .get(`/ability/${param}`)
    .then(res => {
      return res;
    })
    .catch(err => {
      // toast.error(MSG_SERVER_ERROR, {toastId: "err1"})
      console.log(err);
      return null;
    });
};
