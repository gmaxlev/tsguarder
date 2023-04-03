import type { Guarder } from "../src/types";
import { EXCLUDE_TYPES, NOT_FUNCTION_TYPES } from "./utils";
import { createTypeGuard } from "../src/lib";

describe("lib.ts", () => {
  describe("createTypeGuard()", () => {
    test('Should throw an error if "guard" is not a function', () => {
      for (const notFunction of NOT_FUNCTION_TYPES) {
        // @ts-expect-error
        const act = () => createTypeGuard(notFunction);
        expect(act).toThrowError("Guard should be a function");
      }
    });

    test('Should throw an error if "guard" is not a function with using with description', () => {
      for (const notFunction of NOT_FUNCTION_TYPES) {
        // @ts-expect-error
        const act = () => createTypeGuard("description", notFunction);
        expect(act).toThrowError("Guard should be a function");
      }
    });

    test('Should throw an error if "description" is not a string or undefined', () => {
      for (const notString of EXCLUDE_TYPES(["string", "undefined"])) {
        // @ts-expect-error
        const act = () => createTypeGuard(notString, () => true);
        expect(act).toThrowError("Description should be a string");
      }
    });

    test("Should use a guarder if use just a guarder", () => {
      const isString = import.meta.jest.fn().mockReturnValue(false);
      const guarder = createTypeGuard(isString as unknown as Guarder<string>);
      const value = {};
      const result = guarder(value);

      expect(result).toBe(false);
      expect(isString).toBeCalledTimes(1);
      expect(isString).toBeCalledWith(value);
    });

    test("Should use a guarder if use asserting", () => {
      const isString = import.meta.jest.fn().mockReturnValue(true);
      const guarder = createTypeGuard(isString as unknown as Guarder<string>);
      const value = {};

      // @ts-expect-error
      guarder.assert(value);

      expect(isString).toBeCalledTimes(1);
      expect(isString).toBeCalledWith(value);
    });

    test("Should display the default value name and a passed description if asserting with a description but without a value name", () => {
      const isString = import.meta.jest.fn().mockReturnValue(false);
      const guarder = createTypeGuard(
        "_some_description_",
        isString as unknown as Guarder<string>
      );
      const value = {};

      const act = () => {
        // @ts-expect-error
        guarder.assert(value);
      };

      expect(act).toThrowError("value: _some_description_");
      expect(isString).toBeCalledTimes(1);
      expect(isString).toBeCalledWith(value);
    });

    test("Should display the default value and description if asserting without a description and a value name", () => {
      const isString = import.meta.jest.fn().mockReturnValue(false);
      const guarder = createTypeGuard(isString as unknown as Guarder<string>);
      const value = {};

      const act = () => {
        // @ts-expect-error
        guarder.assert(value);
      };
      expect(act).toThrowError("value: mockConstructor");
      expect(isString).toBeCalledTimes(1);
      expect(isString).toBeCalledWith(value);
    });

    test("Should display a value name and the description if asserting with a description and with a value name", () => {
      const isString = import.meta.jest.fn().mockReturnValue(false);
      const guarder = createTypeGuard(
        "_some_description_",
        isString as unknown as Guarder<string>
      );
      const value = {};

      const act = () => {
        // @ts-expect-error
        guarder.assert(value, "_value_name_");
      };

      expect(act).toThrowError("_value_name_: _some_description_");
      expect(isString).toBeCalledTimes(1);
      expect(isString).toBeCalledWith(value);
    });

    test("Should display a value name and the default description if asserting without a description but with a value name", () => {
      const isString = import.meta.jest.fn().mockReturnValue(false);
      const guarder = createTypeGuard(isString as unknown as Guarder<string>);
      const value = {};

      const act = () => {
        // @ts-expect-error
        guarder.assert(value, "_value_name_");
      };
      expect(act).toThrowError("_value_name_: mockConstructor");
      expect(isString).toBeCalledTimes(1);
      expect(isString).toBeCalledWith(value);
    });
  });
});
