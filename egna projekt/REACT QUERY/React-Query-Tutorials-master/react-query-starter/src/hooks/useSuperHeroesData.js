import { useQuery } from "react-query";
import { getSuperHeroes } from "../api/superHeroesApi";

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", getSuperHeroes, {
    onSuccess,
    onError,
    /* kan transformera datan som kmr tillbaka */
    /*   select: (data) => {
      const newArr = data.map((item) => {
        return { name: item.name, secretMessage: "u are the best" };
      });
      return newArr;
    }, */
  });
};
