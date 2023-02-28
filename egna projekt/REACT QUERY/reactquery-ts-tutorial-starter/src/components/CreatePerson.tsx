import { IPerson } from '@src/lib/interfaces/IPersone';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface CreatePerson {
  name: string;
  age: number;
  id: string;
}

const addPerson = async ({ name, age, id }: CreatePerson) /* : Promise<IPerson> */ => {
  const response: Response = await fetch('../api/person/create', {
    method: 'POST',
    body: JSON.stringify({
      id,
      name,
      age,
    }),
  });

  if (response.ok) {
    return response.json();
  }

  // return {};
};

const CreatePerson = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);

  const { mutate, data, isLoading } = useMutation(addPerson, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries('person');
    },
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Math.random().toString();
    mutate({ name: name, age: age, id: id });
  };
  return (
    <div>
      <form onSubmit={submit}>
        <input type="text" placeholder="enter name" onChange={(e) => setName(e.target.value)} />
        <input type="number" onChange={(e) => setAge(+e.target.value)} />
        <button>add</button>
      </form>
    </div>
  );
};

export default CreatePerson;
