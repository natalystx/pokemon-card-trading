import Rxios from "@/core/rxios";
import { PagablePokemonCard, PokemonCardQuery } from "../types";
import { Set } from "../types";

type BaseResponse<T> = {
  data: T;
};

export default class PokemonCardService extends Rxios {
  constructor() {
    super({ baseURL: import.meta.env.VITE_URL_ENDPOINT });
  }

  public getCards(query: PokemonCardQuery) {
    return this.get<PagablePokemonCard>("/cards", query);
  }

  public getSets() {
    return this.get<BaseResponse<Set[]>>("/sets");
  }

  getTypes() {
    return this.get<BaseResponse<string[]>>("/types");
  }

  getRarities() {
    return this.get<BaseResponse<string[]>>("/rarities");
  }
}
