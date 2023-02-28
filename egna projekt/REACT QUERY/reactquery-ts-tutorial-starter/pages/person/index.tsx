import CreatePerson from '@src/components/CreatePerson';
import PersonComponent from '@src/components/PersonComponent';
import { IPerson } from '@src/lib/interfaces/IPersone';
import React from 'react';
import { useQuery, UseQueryResult } from 'react-query';

type Props = {};

export const fetchPerson = async (): Promise<IPerson> => {
  const res = await fetch('/api/person');
  if (res.ok) {
    return res.json();
  }
  throw new Error('network response not ok');
};
const PersonPage = (props: Props) => {
  const { data, status, error, isLoading, isError } = useQuery<IPerson, Error>('person', fetchPerson, {
    /*  staleTime: 5000, */
  });

  if (isLoading) {
    return <p>loading.....</p>;
  }

  if (isError) return <p>errorr ... {error?.message}</p>;
  return (
    <div>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>

      <h1>Person component</h1>
      {/*    <PersonComponent /> */}
      <CreatePerson />
    </div>
  );
};

export default PersonPage;
