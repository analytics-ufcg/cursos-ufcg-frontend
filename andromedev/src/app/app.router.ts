import { Routes, RouterModule } from '@angular/router'
import {SearchComponent} from './modules/search/search.component'
import {CursosComponent} from './modules/cursos/cursos.component'
const routes: Routes = [
    {
        path: '',
        component: SearchComponent
    },
    {
        path: 'cursos',
        component: CursosComponent
    },

];
export const RoutesModule = RouterModule.forRoot(routes);