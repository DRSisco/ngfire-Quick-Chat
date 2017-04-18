import { FirebaseFlatSnapshot } from './firebase-flat-snapshot.model';

export class Author extends FirebaseFlatSnapshot {
    public displayName: string
    public photoURL: string

    constructor(obj?: any) {
        super(obj)
        this.displayName = obj && obj.displayName || ""
        this.photoURL = obj && obj.photoURL || ""
    }
}