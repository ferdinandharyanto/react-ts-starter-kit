/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryConfig } from "@libs/react-query"
import { getCharacters } from "./services/getData"
import { BaseApis } from "@t/api";

export interface IStarWarsCharacter {
    name: string;
    gender: string;
    species: string;
    status: string;
  }

export type CharactersStarwarsDTO = BaseApis<IStarWarsCharacter[]>

export type UseCharacterOptions = {
    config?: QueryConfig<typeof getCharacters>;
    params?: any;
}

