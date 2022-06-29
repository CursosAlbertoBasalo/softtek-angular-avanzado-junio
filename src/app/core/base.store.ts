import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, Subject } from 'rxjs';

export type Action = { type: string; payload: any };
export type Reducer<T> = (state: T, payload: any) => T;
export type Selector<T, K> = (state: T) => K;
export type Change<T> = { action: Action; current: T; next: T };

export class BaseStore<T> {
  private state$: BehaviorSubject<T>;
  private changes$ = new Subject<Change<T>>();
  public reducers: Map<string, Reducer<T>> = new Map();
  public changes: any[] = [];

  constructor(initialState: T) {
    const nextState = this.clone(initialState);
    this.state$ = new BehaviorSubject(nextState);
  }

  public get(): T {
    const currentState = this.state$.value;
    return this.clone(currentState);
  }

  public set(newState: T) {
    const nextState = this.clone(newState);
    this.state$.next(nextState);
  }

  public dispatch(action: Action) {
    const reducer = this.reducers.get(action.type);
    if (reducer == null) throw Error('No reducer found for action type ' + action.type);
    const current = this.get();
    const next = reducer(current, action.payload);
    this.set(next);
    const change = { action, current, next };
    this.changes.push(change);
    this.changes$.next(change);
  }

  public get$(): Observable<T> {
    const state$ = this.state$.asObservable();
    return state$.pipe(map((state: T) => this.clone(state)));
  }

  public select$<K>(selector: Selector<T, K>): Observable<K> {
    return this.get$().pipe(map(selector), distinctUntilChanged());
  }

  public filter$<K>(actionType: string): Observable<Change<T>> {
    return this.changes$.asObservable().pipe(filter((change) => change.action.type === actionType));
  }

  private clone(source: any) {
    return JSON.parse(JSON.stringify(source));
  }
}

// type Cuenta = { propietario: string[]; saldo: number };

// function ingresar(state: Cuenta, payload: number): Cuenta {
//   const cuenta = { ...state };
//   cuenta.saldo += payload;
//   return cuenta;
// }
// function agregarTitular(state: Cuenta, payload: string): Cuenta {
//   const cuenta = { ...state };
//   cuenta.propietario.push(payload);
//   return cuenta;
// }

// const estadoInicial = { propietario: ['Daniel'], saldo: 0 };
// const cuenta$ = new StoreService<Cuenta>(estadoInicial);

// const reducers: Map<string, Reducer<Cuenta>> = new Map();
// reducers.set('INGRESAR', ingresar);
// reducers.set('AGREGAR_TITULAR', agregarTitular);

// cuenta$.reducers = reducers;

// const agregarCarmeloAction: Action = { type: 'AGREGAR_TITULAR', payload: 'Carmelo' };
// const current: Cuenta = { propietario: ['Daniel'], saldo: 100 };
// const reducer = reducers.get(agregarCarmeloAction.type);
// const ingresarAction: Action = { type: 'INGRESAR', payload: 5 };
// if (reducer) {
//   const newState = reducer(current, agregarCarmeloAction.payload);
// } else {
//   console.error('No reducer for this action type');
// }

// cuenta$.get$().subscribe((cuenta) => console.log(cuenta));
// //  { propietario: ['Daniel'], saldo: 0 };
// //  { propietario: ['Daniel'], saldo: 100 };
// //  { propietario: ['Daniel', 'Carmelo'], saldo: 100 };
// //  { propietario: ['Daniel', 'Carmelo'], saldo: 105 };

// cuenta$.select$<number>((cuenta) => cuenta.saldo).subscribe((saldo) => console.log(saldo));
// //   0
// //   100
// //   105

// // const cuenta = cuenta$.get();
// // cuenta.propietario = 'Carmelo'; // Carmelo

// // const otra = cuenta$.get();
// // otra.propietario; // Daniel

// // // cuenta$.state$.subscribe();
// // // cuenta$.state$.next()
// // cuenta$.get$().subscribe();
