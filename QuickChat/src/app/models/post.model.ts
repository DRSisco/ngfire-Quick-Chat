import { FirebaseFlatSnapshot } from './firebase-flat-snapshot.model';

export class Post extends FirebaseFlatSnapshot {
    public postBody: string
    public authorKey: string

    constructor(obj?: any) {
        super(obj)
        this.postBody = obj && obj.postBody || ""
        this.authorKey = obj && obj.authorKey || ""
    }
}