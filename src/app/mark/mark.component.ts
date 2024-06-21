import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MarkComponent {
  palavrasChave = ['Markdown', 'Angular', 'TypeScript', 'JavaScript'];

  private adicionarDestaqueMarkdown(
    mensagem: string,
    palavrasChave: string[]
  ): string {
    // Utiliza expressão regular para encontrar e substituir palavras-chave com destaque
    palavrasChave.forEach((palavra) => {
      const regex = new RegExp(`\\b(${palavra})\\b`, 'gi'); // Expressão regular para correspondência de palavra inteira
      mensagem = mensagem.replace(regex, '<span class="destaque">$1</span>');
    });

    return mensagem;
  }

  markdownContent = `
    # Exemplo de Markdown

.destaque {
  background: blue; /* Cor de fundo azul para destaque */
  color: white; /* Cor do texto branco para destaque */
  padding: 2px 4px; /* Espaçamento interno para destacar */
  border-radius: 4px; /* Borda arredondada */
}


    \`\`\`typescript
    // Exemplo de código com a palavra-chave Angular
    import { Component } from '@angular/core'\n;



    @Component({
      selector: 'app-root',
      template: '<h1>Exemplo de Angular</h1>'
    })
    export class AppComponent {}
    \`\`\`

    Este é um exemplo de mensagem em **Markdown** que contém algumas palavras-chave como Angular, TypeScript, e JavaScript.
  `;

  mensagemComDestaque = this.adicionarDestaqueMarkdown(
    this.markdownContent,
    this.palavrasChave
  );
}
