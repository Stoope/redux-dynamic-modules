import { AnyAction, ReducersMapObject, Store } from "redux";

/**
 * Represents a module which is set of reducers, sagas, inital actions and final actions
 */
export interface IModule<State> {
  /**
   * Id of the module
   */
  id: string;

  /**
   * Reducers for the module
   */
  reducerMap?: ReducersMapObject<State, AnyAction>;

  /**
   * These actions are dispatched immediatly after adding the module in the store
   */
  initialActions?: AnyAction[];

  /**
   * These actions are dispatched immediatly before removing the module from the store
   */
  finalActions?: AnyAction[];
}

export interface IPlugin {
  middleware?: any[];
  onModuleManagerCreated?: (moduleManager: IModuleManager) => void;
  onModuleAdded?: (module: IModule<any>) => void;
  onModuleRemoved?: (module: IModule<any>) => void;
}

export interface IDynamicallyAddedModule {
  /**
   * Call to remove the module from the store
   */
  remove: () => void;
}

export interface IModuleManager {
  /**
   * Add the given module to the store
   */
  addModule: (module: IModule<any>) => IDynamicallyAddedModule
  addModules: (modules: IModule<any>[]) => IDynamicallyAddedModule;
}

export type IModuleStore<State> = Store<State> & IModuleManager & {
  /**
   * Remove all the modules from the store
   */
  dispose: () => void;
};

export interface IItemManager<T> {
  getItems: () => T[];
  add: (items: T[]) => void;
  remove: (item: T[]) => void;
}