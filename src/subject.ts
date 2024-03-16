import { Observer } from './observer';

export interface Subject {
    attachObserver(o: Observer): void;
    detachObserver(o: Observer): void;
    notifyObservers(): void;
}