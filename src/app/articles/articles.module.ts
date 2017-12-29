import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from './../material.module';

// Services
import { ArticlesService } from './shared/services/articles.service';
import { ArticlesResolver } from './shared/resolvers/articles-resolver.service';
import { ArticleResolver } from './shared/resolvers/article-resolver.service';

// components
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

// containers
import { ArticlesComponent } from './containers/articles/articles.component';
import { ArticleComponent } from './containers/article/article.component';

export const ROUTES: Routes = [
  { path: '', component: ArticlesComponent, resolve: {articles: ArticlesResolver} },
  { path: 'new', component: ArticleComponent },
  { path: ':id', component: ArticleComponent, resolve: {article: ArticleResolver} },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    MaterialModule
  ],
  declarations: [
    ArticlesComponent,
    ArticleComponent,
    ArticleFormComponent,
    ArticleListComponent
  ],
  providers: [
    ArticlesService,
    ArticlesResolver,
    ArticleResolver
  ]
})
export class ArticlesModule {}
