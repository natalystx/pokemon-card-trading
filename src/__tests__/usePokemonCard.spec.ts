/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePokemonCard } from "@/store/usePokemonCard";
import { getPagablePokemon } from "../__mocks__/getPagablePokemon";
import { getSets } from "../__mocks__/getSets";
import { getTypes } from "../__mocks__/getTypes";
import { getRarities } from "../__mocks__/getRarities";

let result: any;
let rerender: any;

vi.mock("@/repositories/pokemon.repository.ts", () => {
  const PokemonCardRepository = vi.fn();
  PokemonCardRepository.prototype.getCards = vi.fn(() => {
    return {
      subscribe: vi.fn(({ next }: any) => ({
        next: next(getPagablePokemon()),
      })),
    };
  });
  PokemonCardRepository.prototype.getSets = vi.fn(() => {
    return {
      pipe: vi.fn(() => ({
        subscribe: vi.fn(({ next }: any) => ({
          next: next(getSets()),
        })),
      })),
    };
  });

  PokemonCardRepository.prototype.getTypes = vi.fn(() => {
    return {
      pipe: vi.fn(() => ({
        subscribe: vi.fn(({ next }: any) => ({
          next: next(getTypes()),
        })),
      })),
    };
  });

  PokemonCardRepository.prototype.getRarities = vi.fn(() => {
    return {
      pipe: vi.fn(() => ({
        subscribe: vi.fn(({ next }: any) => ({
          next: next(getRarities()),
        })),
      })),
    };
  });

  return { default: PokemonCardRepository };
});

beforeEach(() => {
  const hook = renderHook(() => usePokemonCard());
  result = hook.result;
  rerender = hook.rerender;
});

describe("usePokemonCard", () => {
  test("should render", () => {
    expect(result.current.pokemonCards).toBeDefined();
    expect(typeof result.current.pokemonCards === "object").toBe(true);
    expect(result.current.pokemonCards.page).toBe(1);
    expect(result.current.pokemonCards.pageSize).toBe(1);
    expect(result.current.pokemonCards.totalCount).toBe(1);
    expect(result.current.sets).toBeDefined();
    expect(result.current.types).toBeDefined();
    expect(result.current.rarities).toBeDefined();
    expect(result.current.loading).toBeDefined();
    expect(result.current.totalPages).toBeDefined();
    expect(result.current.currentQuery.page).toBe(1);
    expect(result.current.currentQuery.q).toBe(undefined);
    expect(Array.isArray(result.current.sets)).toBe(true);
    expect(Array.isArray(result.current.types)).toBe(true);
    expect(Array.isArray(result.current.rarities)).toBe(true);
    expect(typeof result.current.loading).toBe("boolean");
    expect(typeof result.current.totalPages).toBe("number");
  });

  test("should getTypes work", () => {
    expect(result.current.types.length > 1).toBe(true);
  });

  test("should getRarities work", () => {
    expect(result.current.rarities.length > 1).toBe(true);
  });

  test("should getSets work", () => {
    expect(result.current.sets.length > 1).toBe(true);
  });

  test("should goToPage work", () => {
    result.current.goToPage(2);
    rerender();
    expect(result.current.currentQuery.page).toBe(2);
  });

  test("should search work", () => {
    result.current.onSearch("test");
    rerender();
    expect(result.current.currentQuery.q.includes("name:test")).toBe(true);
  });

  test("should filterBySet work", () => {
    result.current.filterBySet("test");
    rerender();
    expect(result.current.currentQuery.q.includes("set.id:test")).toBe(true);
  });

  test("should filterByRarity work", () => {
    result.current.filterByRarity("test");
    rerender();
    expect(result.current.currentQuery.q.includes("rarity:test")).toBe(true);
  });

  test("should filterByType work", () => {
    result.current.filterByType("test");
    rerender();
    expect(result.current.currentQuery.q.includes("types:test")).toBe(true);
  });

  test("should nextPage work", () => {
    result.current.nextPage();
    rerender();
    expect(result.current.currentQuery.page).toBe(2);
  });

  test("should prevPage work", () => {
    result.current.prevPage();
    rerender();
    expect(result.current.currentQuery.page).toBe(1);
  });

  test("should clearFilters work", () => {
    result.current.clearFilters();
    rerender();
    expect(result.current.currentQuery.q).toBe("");
  });
});
