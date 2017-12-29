import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Article, ArticlesService } from '../../shared/services/articles.service';

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
    private articlesService: ArticlesService
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
      .subscribe(data => this.backToArticles());
  }

  updateArticle(event: Article) {
    const key = this.route.snapshot.params.id;

    this.articlesService.updateArticle(key, event)
      .subscribe(data => this.backToArticles());
  }

  removeArticle() {
    const key = this.route.snapshot.params.id;

    this.articlesService.deleteArticle(key)
      .subscribe(data => this.backToArticles());
  }

  backToArticles() {
    this.router.navigate(['articles']);
  }
}
