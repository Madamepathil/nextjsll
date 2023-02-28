import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

const RQSuperHero = () => {
  const { id } = useParams();
  const onSuccess = () => {
    console.log("perfomred side effect after data fetching");
  };

  const onError = () => {
    console.log("perfomred side effect after encounter error");
  };

  const { data, isLoading, isError, error } = useSuperHeroData(
    onSuccess,
    onError,
    id
  );

  console.log(data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!isLoading && isError) {
    return <h1>{error.message}</h1>;
  }
  return <div>{data?.name}</div>;
};

export default RQSuperHero;
