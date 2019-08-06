import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'SisPC';

  constructor(
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.messageService.add({severity:'success', summary: "Login efetuado!", detail:'Bem Vindo '+sessionStorage.getItem('nome'), life: 10000}); 
    
  }
  
}
