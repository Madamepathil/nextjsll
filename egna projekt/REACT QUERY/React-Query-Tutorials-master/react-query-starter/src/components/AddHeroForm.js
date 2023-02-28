import React, { useState } from "react";
import { useAddHeroData } from "../hooks/useSuperHeroData";

const AddHeroForm = () => {
  const [name, setName] = useState("");

  const {
    mutate,
    data: addHeroData,
    isLoading: addHeroIsLoading,
  } = useAddHeroData();

  const addHero = () => {
    mutate({ name });
  };

  if (addHeroIsLoading) {
    return <h1>Loading Add...</h1>;
  }
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addHero}>Add</button>
    </div>
  );
};

export default AddHeroForm;
