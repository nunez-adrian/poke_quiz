import { Routes } from '@angular/router';
import { ChoiceSelectorComponent } from './components/choice-selector/choice-selector.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StartComponent } from './components/start/start.component';
import { VictoryComponent } from './components/victory/victory.component';

export const routes: Routes = [
    {path: '', component: StartComponent, title: 'PokeQuiz'},
    {path: 'choice-selector', component: ChoiceSelectorComponent, title: 'Choose wisely...'},
    {path: 'victory', component: VictoryComponent, title: 'Congrats!'},
    {path: '**', component: PageNotFoundComponent, title: 'Page Not found'}
];