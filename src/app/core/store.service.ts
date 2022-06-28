import { BehaviorSubject, map, Observable } from 'rxjs';

export class StoreService<T> {
  private state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject(this.clone(initialState));
  }

  public get(): T {
    return this.clone(this.state$.value);
  }

  public set(newState: T) {
    this.state$.next(this.clone(newState));
  }

  public get$(): Observable<T> {
    return this.state$.asObservable().pipe(map((state) => this.clone(state)));
  }

  private clone(source: any) {
    return JSON.parse(JSON.stringify(source));
  }
}

type Cuenta = { propietario: string; saldo: number };

const estadoInicial = { propietario: 'Daniel', saldo: 0 };
const cuenta$ = new StoreService<Cuenta>(estadoInicial);
const cuenta = cuenta$.get();
cuenta.propietario = 'Carmelo'; // Carmelo

const otra = cuenta$.get();
otra.propietario; // Daniel

// cuenta$.state$.subscribe();
// cuenta$.state$.next()
cuenta$.get$().subscribe();
