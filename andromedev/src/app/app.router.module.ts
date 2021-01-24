import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import {CursosModule} from './modules/cursos/cursos.module'
import {SearchComponent} from './modules/search/search.component'

const routes: Routes = [
    {
        path: '',
        component: SearchComponent
    },
    {
        path: ':curso',
        loadChildren: () => CursosModule,
    },

];
@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}