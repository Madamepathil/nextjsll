import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { getSuperHeroes } from "../api/superHeroesApi";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAddHeroData } from "../hooks/useSuperHeroData";
import AddHeroForm from "./AddHeroForm";

export const RQSuperHeroesPage = () => {
  const onSuccess = () => {
    console.log("perfomred side effect after data fetching");
  };

  const onError = () => {
    console.log("perfomred side effect after encounter error");
  };
  const { data, isLoading, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isLoading && isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <AddHeroForm />
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>Fetch heroes</button>
      {data?.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  );
};
