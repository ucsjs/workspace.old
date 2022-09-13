import { BehaviorSubject } from 'rxjs';

export interface Output<T> {
    key: string;
    type: any;
    value?: BehaviorSubject<T>;
}