import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSuperHero } from "../api/superHeroesApi";

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4003/superheroes", hero);
};

export const useSuperHeroData = (onSuccess, onError, id) => {
  /* den har tillgång till den cachade queryn, så vi kan komma åt det
    som tidigare har hämtats.. ex när den listade alla heros så
    fanns redan den med de specifika id:t vi har skickar in här,
    vi kan använda den direkt å displaya på browsern, har något ändrats 
    så uppdaterar bara det... detta gör att ingen loading spinner visas
    och användaren tror att datan redan är hämtad innan sidan laddas */
  const queryClient = useQueryClient();
  /*  [] måste ha en array med då denna query är beroende av id,
  annars så om första gången vi trycker på en hero och kmr in med 
  id =1 så cashas det. dvs, om vi trycker på hero id=2 så kmr vi få
  den gamla id=1 */
  return useQuery(["super-hero", id], () => getSuperHero(id), {
    /*   onSuccess,
    onError, */
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(id));
      console.log(hero);
      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};

export const useAddHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("super-heroes");
      /*    queryClient.setQueryData("super-heroes", (oldData) => {
        console.log(oldData);
        return {
          ...oldData,
          data: [...oldData, data.data],
        };
      }); */
    },
  });
};
