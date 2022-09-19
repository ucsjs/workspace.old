import { BehaviorSubject } from 'rxjs';
export interface Input<T> {
    key: string;
    type: any;
    value?: BehaviorSubject<T>;
}
