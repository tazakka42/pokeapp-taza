import {create} from 'zustand';

const useSelectedPokemon = create(set => {
  let firstPoke = {};
  let secPoke = {};

  return {
    firstPoke,
    secPoke,
    setfirst: payload => set(() => ({firstPoke: payload})),
    setsec: payload => set(() => ({secPoke: payload})),
  };
});

export default useSelectedPokemon;
