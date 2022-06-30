import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, Subject } from 'rxjs';

export type Action = { type: string; payload: any };
export type Reducer<T> = (state: T, action: Action) => T;
export type Selector<T, K> = (state: T) => K;
export type Change<T> = { action: Action; current: T; next: T };

export class BaseStore<T> {
  private state$: BehaviorSubject<T>;
  public changes$ = new Subject<Change<T>>();
  public actions$ = new Subject<Action>();
  public reducer!: Reducer<T>;

  constructor(initialState: T) {
    const nextState = this.clone(initialState);
    this.state$ = new BehaviorSubject(nextState);
  }

  public get(): T {
    const currentState = this.state$.value;
    return this.clone(currentState);
  }

  public dispatch(action: Action) {
    this.actions$.next(action);
    const current = this.get();
    const next = this.reducer(current, action);
    this.state$.next(next);
    const change = { action, current, next };
    this.changes$.next(change);
  }

  public get$(): Observable<T> {
    const state$ = this.state$.asObservable();
    return state$.pipe(map((state: T) => this.clone(state)));
  }

  public select$<K>(selector: Selector<T, K>): Observable<K> {
    return this.get$().pipe(map(selector), distinctUntilChanged());
  }

  public actionFiltered$<K>(actionType: string): Observable<Action> {
    return this.actions$.asObservable().pipe(filter((action) => action.type === actionType));
  }

  private clone(source: any) {
    return JSON.parse(JSON.stringify(source));
  }
}

// public reducers: Map<string, Reducer<T>> = new Map();
// const reducer = this.reducers.get(action.type);
// if (reducer == null) throw Error('No reducer found for action type ' + action.type);
// next = reducer(current, action.payload);

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
