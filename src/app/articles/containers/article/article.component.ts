import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Article, ArticlesService } from '../../shared/services/articles.service';
import { LoggerService } from '../../../shared/logger/logger.service';

@Component({
  selector: 'app-article',
  styleUrls: ['article.component.scss'],
  template: `
    <div>
      <app-article-form
        [article]="article"
        (create)="addArticle($event)"
        (update)="updateArticle($event)"
        (remove)="removeArticle()">
      </app-article-form>
    </div>
  `
})
export class ArticleComponent implements OnInit {

  article: Article;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private loggerService: LoggerService
  ) {}

  ngOnInit() {

    // Retrieve the prefetched articles
    this.route.data.subscribe(
      (data: { article: Article }) => {
        this.article = data.article;
      }
    );
  }

  addArticle(event: Article) {
    this.articlesService.createArticle(event)
      .subscribe(
        res => {
          this.loggerService.success('Article successfully added');
          this.backToArticles();
        },
        error => this.loggerService.error(error.error.message)
      );
  }

  updateArticle(event: Article) {
    const key = this.route.snapshot.params.id;

    this.articlesService.updateArticle(key, event)
      .subscribe(
        res => {
          this.loggerService.success('Article successfully updated');
          this.backToArticles();
        },
        error => this.loggerService.error(error.error.message)
      );
  }

  removeArticle() {
    const key = this.route.snapshot.params.id;

    this.articlesService.deleteArticle(key)
      .subscribe(
        res => {
          this.loggerService.success('Article successfully deleted');
          this.backToArticles();
        },
        error => this.loggerService.error(error.error.message)
      );
  }

  backToArticles() {
    this.router.navigate(['articles']);
  }
}
