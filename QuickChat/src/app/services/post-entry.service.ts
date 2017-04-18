import { AuthorService } from './author.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { PostWithAuthor } from './../models/post.model';
import { Injectable } from '@angular/core';
import { Post } from "app/models/post.model";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Author } from "app/models/author.model";
import * as firebase from 'firebase';

@Injectable()
export class PostEntryService {
  readonly postsPath = "posts"
  private postIncrementStream: Subject<number>
  private _postWithAuthorsStream: Observable<PostWithAuthor[]>
  readonly postsBatchSize = 4
  public hasMorePosts = true

  constructor(private af: AngularFire, private authorService: AuthorService) { 
    this.postIncrementStream = new BehaviorSubject<number>(this.postsBatchSize);
    
    const numPostsStream : Observable<number> = this.postIncrementStream.scan(
      (total: number, nextValue: number) => { 
        return total + nextValue
    })
    const postsStream: Observable<Post[]> = numPostsStream.switchMap<number, Post[]>( (numPosts: number) => {
      return this.af.database.list(`/${this.postsPath}`, {
        query: {
          limitToLast: numPosts
        }
      })
    })

    this._postWithAuthorsStream = Observable.combineLatest<PostWithAuthor[]>(
      postsStream, 
      this.authorService.authorsMapStream,
      numPostsStream,
      (posts: Post[], authorMap: Map<string, Author>, numPosts: number) => {

        this.hasMorePosts = numPosts == posts.length

        const postWithAuthors : PostWithAuthor[] = [];
        for (let post of posts) {
          const postWithAuthor = new PostWithAuthor(post)
          postWithAuthor.author = authorMap[post.authorKey]
          postWithAuthors.push(postWithAuthor)
        }

        return postWithAuthors
      }
    )
  }

  displayMorePosts(): void{
    this.postIncrementStream.next(this.postsBatchSize)
  }

  add(post : Post) {
    firebase.database().ref().child(this.postsPath).push(post)
  }

  get postWithAuthorStream(): Observable<PostWithAuthor[]> {
    return this._postWithAuthorsStream
  }

}
