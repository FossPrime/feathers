// DO NOT MODIFY - generated from packages/commons/src/debug.ts

export type DebugFunction = (...args: any[]) => void;
export type DebugInitializer = (name: string) => DebugFunction;

const debuggers: { [key: string]: DebugFunction } = {};

export function noopDebug (): DebugFunction {
  return () => {}
}

let defaultInitializer: DebugInitializer = noopDebug;

export function setDebug (debug: DebugInitializer) {
  defaultInitializer = debug;

  Object.keys(debuggers).forEach(name => {
    debuggers[name] = debug(name);
  });
}

export function createDebug (name: string) {
  if (!debuggers[name]) {
    debuggers[name] = defaultInitializer(name);
  }

  return (...args: any[]) => debuggers[name](...args);
}
