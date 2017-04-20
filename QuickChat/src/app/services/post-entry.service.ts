import { AuthService } from './auth.service';
import { AuthorService } from './author.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { PostWithAuthor } from './../models/post.model';
import { Injectable } from '@angular/core';
import { Post } from "app/models/post.model";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Author } from "app/models/author.model";
import * as firebase from 'firebase';
import { Query } from "angularfire2/interfaces";

@Injectable()
export class PostEntryService {
  readonly postsPath = "posts"
  private postIncrementStream: Subject<number>
  private isMyPostsPageStream: Subject<boolean>

  private _postWithAuthorsStream: Observable<PostWithAuthor[]>
  readonly postsBatchSize = 4
  public hasMorePosts = true
  public hideLoadMoreButton = false;

  constructor(private af: AngularFire, private authorService: AuthorService, private authService: AuthService) { 
    this.postIncrementStream = new BehaviorSubject<number>(this.postsBatchSize)
    this.isMyPostsPageStream = new BehaviorSubject<boolean>(false)


    const numPostsStream : Observable<number> = this.postIncrementStream.scan(
      (total: number, nextValue: number) => { 
        return total + nextValue
    })

    const queryParameterStream: Observable<Query> = Observable.combineLatest<Query>(
      this.isMyPostsPageStream,
      numPostsStream,
      (isMyPostPage :boolean, numPosts: number) => {
        if (isMyPostPage) {
          return {
            orderByChild: 'authorKey',
            equalTo: this.authService.currentUserId
          }
        } else {
          return {
            limitToLast: numPosts
          }
        }
    })

    const postsStream: Observable<Post[]> = queryParameterStream.switchMap<Query, Post[]>( (queryParams: Query) => {
      return this.af.database.list(`/${this.postsPath}`, {
        query: queryParams
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

  showOnlyMyPost(isMyPostPage: boolean): void {
    this.hideLoadMoreButton = isMyPostPage
    this.isMyPostsPageStream.next(isMyPostPage)
  }

  remove(postKeyToRemove: string): void {
    firebase.database().ref().child(this.postsPath).child(postKeyToRemove).remove()
  }

  update(postKey: string, post: Post) {
    firebase.database().ref().child(this.postsPath).child(postKey).set(post)
  }

  add(post : Post) {
    firebase.database().ref().child(this.postsPath).push(post)
  }

  get postWithAuthorStream(): Observable<PostWithAuthor[]> {
    return this._postWithAuthorsStream
  }

}
