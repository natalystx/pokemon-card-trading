import { map, Observable } from "rxjs";
import { PagablePokemonCard, PokemonCardQuery } from "../types";
import PokemonCardService from "./pokemon.service";

export default class PokemonCardRepository {
  private readonly _service: PokemonCardService;
  constructor(service: PokemonCardService) {
    this._service = service;
  }

  getCards(query: PokemonCardQuery): Observable<PagablePokemonCard> {
    return this._service.getCards(query);
  }

  getSets() {
    return this._service.getSets().pipe(map((res) => res.data));
  }

  getTypes() {
    return this._service.getTypes().pipe(map((res) => res.data));
  }

  getRarities() {
    return this._service.getRarities().pipe(map((res) => res.data));
  }
}
