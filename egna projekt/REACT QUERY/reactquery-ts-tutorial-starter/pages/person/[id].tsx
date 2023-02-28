import { IPerson } from '@src/lib/interfaces/IPersone';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useQuery, UseQueryResult } from 'react-query';

type Props = {};
const fetchPersonById = async (id: string | string[] | undefined): Promise<IPerson> => {
  const res = await fetch(`/api/person/${id}`);
  return res.json();
};

const PersonPage = (props: Props) => {
  const router = useRouter();
  const id = router.query.id;

  const { data, status, error, isLoading, isError } = useQuery<IPerson, Error>(
    ['person', id],
    () => fetchPersonById(id),
    {
      /*  staleTime: 5000, */
    }
  );

  console.log(data);
  return (
    <div>
      {data?.name} {data?.age}
    </div>
  );
};

export default PersonPage;
