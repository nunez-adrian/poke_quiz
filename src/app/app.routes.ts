import { Routes } from '@angular/router';
import { ChoiceSelectorComponent } from './components/choice-selector/choice-selector.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StartComponent } from './components/start/start.component';

export const routes: Routes = [
    {path: '', component: StartComponent, title: 'PokeQuiz'},
    {path: 'choice-selector', component: ChoiceSelectorComponent, title: 'Elige la opción correcta'},
    {path: '**', component: PageNotFoundComponent}
];