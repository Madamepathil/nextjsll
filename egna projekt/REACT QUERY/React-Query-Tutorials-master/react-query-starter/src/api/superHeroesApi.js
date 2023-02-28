import axios from "axios";

const heroesApi = axios.create({
  baseURL: "http://localhost:4003",
});

export const getSuperHeroes = async () => {
  const response = await heroesApi.get("/superheroes");
  return response.data;
};

export const getSuperHero = async (id) => {
  const response = await heroesApi.get(`/superheroes/${id}`);
  return response.data;
};
