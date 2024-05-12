export default class Counter {
  static increment(value: number, max: number, incrementBy: number): number {
    return value + incrementBy > max ? max : value + incrementBy;
  }

  static decrement(value: number, min: number, decrementBy: number): number {
    return value - decrementBy < min ? min : value - decrementBy;
  }

  static incrementByOne(value: number, max: number): number {
    return Counter.increment(value, max, 1);
  }

  static decrementByOne(value: number, min: number): number {
    return Counter.decrement(value, min, 1);
  }
}
