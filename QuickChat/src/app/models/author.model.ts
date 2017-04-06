import { FirebaseFlatSnapshot } from './firebase-flat-snapshot.model';

export class Author extends FirebaseFlatSnapshot {
    public displayname: string
    public photoURL: string

    constructor(obj?: any) {
        super(obj)
        this.displayname = obj && obj.displayname || ""
        this.photoURL = obj && obj.photoURL || ""
    }
}