import { useQuery } from '@tanstack/react-query';
import axiosClient from '@services/api';
import { BaseAll } from '@t/api';
import { CharactersStarwarsDTO, UseCharacterOptions } from '../types';
import { ExtractFnReturnType } from '@libs/react-query';


const getCharacters = async ({ params, signal }: BaseAll): Promise<CharactersStarwarsDTO> => {
  return await axiosClient.get(`/character`, {
    params,
    signal,
  })
  .then((res) => res.data)
};

// React Query hook
const useGetCharacters = ({ config, params }: UseCharacterOptions = {}) => {
  return useQuery<ExtractFnReturnType<typeof getCharacters>>({
    ...config,
    queryKey: ['star-wars-characters', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getCharacters({ params, signal }),
  });
};

export { getCharacters, useGetCharacters };