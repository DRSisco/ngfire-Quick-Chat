import { Author } from './author.model';
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


export class PostWithAuthor extends Post {
    public author: Author

    constructor(obj?: any) {
        super(obj)
        this.author = obj && obj.author || {}
    }
}