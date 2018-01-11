import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { APP_CONFIG } from './../../../../config';

export interface Article {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  created_at: Date;
  updated_at: Date;
}

@Injectable()
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${APP_CONFIG.api}/articles`);
  }

  getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(`${APP_CONFIG.api}/articles/${id}`);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${APP_CONFIG.api}/articles`, article);
  }

  updateArticle(id: string, article: Article): Observable<any> {
    return this.http.put(`${APP_CONFIG.api}/articles/${id}`, article);
  }

  deleteArticle(id: string): Observable<Article> {
    return this.http.delete<Article>(`${APP_CONFIG.api}/articles/${id}`);
  }
}
