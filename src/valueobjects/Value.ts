export abstract class Value<V> {
  private readonly _value: V

  get value(): V {
    return this._value
  }

  constructor(value: V) {
    this._value = value
  }
}