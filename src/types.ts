export type TypeGuard<T> = {
  (value: unknown): value is T;
  assert: (value: unknown, before?: string) => asserts value is T;
};
