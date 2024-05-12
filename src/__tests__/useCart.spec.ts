/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect, beforeEach, vi } from "vitest";
import { useCart } from "@/store/useCart";
import { renderHook } from "@testing-library/react";
import { getPokemonCard } from "../__mocks__/getPokemonCard";

let result: any;
let rerender: any;

vi.mock("@/store/usePokemonCard", () => ({
  usePokemonCard: () => ({
    pokemonCards: {
      data: [getPokemonCard()],
    },
  }),
}));

beforeEach(() => {
  const hook = renderHook(() => useCart());
  result = hook.result;
  rerender = hook.rerender;
});

describe("renderHook", () => {
  test("should render", () => {
    expect(result.current.cart).toBeDefined();
    expect(Array.isArray(result.current.cart)).toBe(true);
    expect(result.current.cart.length).toBe(0);
  });

  test("should render openCart", () => {
    expect(result.current.openCart).toBeDefined();
    expect(typeof result.current.openCart).toBe("boolean");
    expect(result.current.openCart).toBe(false);
  });

  test("should render totalPrice", () => {
    expect(result.current.totalPrice).toBeDefined();
    expect(typeof result.current.totalPrice).toBe("number");
    expect(result.current.totalPrice).toBe(0);
  });

  test("should render addToCart", () => {
    expect(result.current.addToCart).toBeDefined();
    expect(typeof result.current.addToCart).toBe("function");
  });

  test("should render removeFromCart", () => {
    expect(result.current.removeFromCart).toBeDefined();
    expect(typeof result.current.removeFromCart).toBe("function");
  });

  test("should render setOpenCart", () => {
    expect(result.current.setOpenCart).toBeDefined();
    expect(typeof result.current.setOpenCart).toBe("function");
  });

  test("should addToCart work", () => {
    result.current.addToCart("base1-1");
    rerender();
    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].quantity).toBe(1);
  });

  test("should removeFromCart work", () => {
    result.current.removeFromCart("base1-1");
    rerender();
    expect(result.current.cart.length).toBe(0);
  });

  test("should removeFromCart work with quantity", () => {
    result.current.addToCart("base1-1");
    rerender();
    result.current.addToCart("base1-1");
    rerender();
    result.current.removeFromCart("base1-1");
    rerender();
    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].quantity).toBe(1);
    result.current.removeFromCart("base1-1");
    rerender();
    expect(result.current.cart.length).toBe(0);
  });

  test("should clearCart work", () => {
    result.current.addToCart("base1-1");
    rerender();
    result.current.clearCart();
    rerender();
    expect(result.current.cart.length).toBe(0);
  });

  test("should totalPrice work", () => {
    result.current.addToCart("base1-1");
    rerender();
    expect(result.current.totalPrice).toBe(2);
    result.current.addToCart("base1-1");
    rerender();
    expect(result.current.totalPrice).toBe(4);
  });
});
