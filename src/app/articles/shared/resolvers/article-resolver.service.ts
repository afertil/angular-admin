import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Article, ArticlesService } from '../services/articles.service';

@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Article> {

    return this.articlesService.getArticle(route.params['id']);

  }
}
