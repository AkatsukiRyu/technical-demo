import { NgModule } from '@angular/core';
import { FormsModule as angularFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './components/search/search.component';

@NgModule({
    declarations: [
        InputComponent,
        SearchComponent
    ],
    imports: [ 
        CommonModule,
        angularFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [
        InputComponent,
        SearchComponent
    ],
    providers: [],
})
export class FormsModule {}