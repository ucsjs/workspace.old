import { BehaviorSubject } from 'rxjs';
import { Type } from "../enums/types.enum";

export interface Input<T> {
    key: string;
    type: Type;
    value?: BehaviorSubject<T>;
}