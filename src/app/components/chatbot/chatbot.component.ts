import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TimelineComponent } from "../timeline/timeline.component";
import { FormsModule } from "@angular/forms";
import { firstValueFrom } from "rxjs";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    TimelineComponent,
    HttpClientModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('chatBody') private chatBody!: ElementRef;

  chatVisible = false;
  question = '';
  messages: Message[] = [];
  isTyping = false;
  showQuickReplies = true;
  showDetailedSuggestions = false;
  showScrollToLastMessage = false;
  private shouldScroll = false;

  quickReplies: string[] = [
    '👨‍💻 What are your skills?',
    '📁 Show me your projects',
    '📧 How can I get in touch?',
    '🎓 What is Jorge education?'
  ];

  detailedSuggestions: string[] = [
    '👨‍💻 What are your skills?',
    '📁 Show me your projects',
    '📧 How can I get in touch?',
    '🎓 What is Jorge education?',
    '🏆 What are your achievements?',
    '🛠️ What technologies do you use?',
    '📄 Can you build me your CV?',
    '🌍 Where are you based?'
  ];

  get currentSuggestions(): string[] {
    // Se só tem a mensagem de boas-vindas, mostra iniciais
    if (this.messages.length <= 1) {
      return this.quickReplies;
    }
    // Depois da primeira pergunta, mostra detalhadas
    return this.detailedSuggestions;
  }
  constructor(private http: HttpClient) {}

  openChat() {
    this.chatVisible = true;

    if (this.messages.length === 0) {
      this.messages.push({
        text: 'Hello! 👋 I’m JorgeAI, Jorge’s AI assistant. How may I help you?',
        isBot: true,
        timestamp: new Date()
      });
    }
  }
  sendQuickReply(reply: string) {
    // Remove emojis da mensagem antes de enviar
    const cleanMessage = reply.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();

    this.question = cleanMessage;
    this.askQuestion();

    // Esconde as mensagens predefinidas após o primeiro uso
    this.showQuickReplies = true;
    this.showDetailedSuggestions = false;
  }

  askQuestion() {
    if (!this.question.trim() || this.isTyping) {
      return;
    }

    this.messages.push({
      text: this.question,
      isBot: false,
      timestamp: new Date()
    });

    // Esconde quick replies após primeira mensagem
    this.showQuickReplies = false;
    this.showDetailedSuggestions = false;


    const userQuestion = this.question;
    this.question = '';

    this.isTyping = true;
    this.shouldScroll = true;

    this.callChatAPI(userQuestion).then(response => {
      this.isTyping = false;

      this.messages.push({
        text: response,
        isBot: true,
        timestamp: new Date()
      });

      this.shouldScroll = true;
      if (response.length > 300) {
        console.log('✅ Vai mostrar botão!');
        setTimeout(() => {
          this.showScrollToLastMessage = true;
          console.log('🔘 Botão ativado!');
        }, 500);
      }
    }).catch(error => {
      this.isTyping = false;
      this.messages.push({
        text: 'Sorry, an error occurred. Please try again.',
        isBot: true,
        timestamp: new Date()
      });
      this.shouldScroll = true;
      console.error('Erro ao chamar API:', error);
    });
  }

  private async callChatAPI(question: string): Promise<string> {
    try {
      console.log('📤 Enviando pergunta:', question);

      const response = await firstValueFrom(
        this.http.post<any>('https://plain-river-0111.gocasesxdlol.workers.dev/api/rag/query', {
          question: question
        })
      );

      console.log('📥 Resposta recebida:', response);

      // A tua API retorna em 'body'
      if (response.body) {
        return response.body;
      } else if (response.answer) {
        return response.answer;
      } else if (response.message) {
        return response.message;
      } else if (response.response) {
        return response.response;
      } else if (typeof response === 'string') {
        return response;
      } else {
        console.warn('⚠️ Formato de resposta desconhecido:', response);
        return 'Recebi a resposta mas não consegui interpretá-la.';
      }

    } catch (error: any) {
      console.error('❌ Erro ao chamar API:', error);

      // Mensagens de erro mais específicas
      if (error.status === 0) {
        throw new Error('Não consegui conectar ao servidor. Verifica se está a correr em http://localhost:3000');
      } else if (error.status === 404) {
        throw new Error('Endpoint não encontrado. Verifica se /api/rag/query está correto.');
      } else if (error.error?.message) {
        throw new Error(error.error.message);
      } else {
        throw error;
      }
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch(err) { }
  }

  // Formata a mensagem (preserva quebras de linha e converte markdown simples)
  formatMessage(text: string): string {
    return text
      .replace(/\n/g, '<br>')  // Quebras de linha
      .replace(/\* (.*?)(?=\n|$)/g, '$1')  // Negrito para *
      .replace(/• (.*?)(?=\n|$)/g, '&nbsp;&nbsp;• $1');  // Indentação para •
  }

  scrollToLastMessage(): void {
    if (this.chatBody && this.messages.length > 0) {
      const chatElement = this.chatBody.nativeElement;
      const allMessages = chatElement.querySelectorAll('.message');
      const lastMessage = allMessages[allMessages.length - 1];

      if (lastMessage) {
        // Scroll para o início da última mensagem
        lastMessage.scrollIntoView({
          behavior: 'smooth',
          block: 'start' // Alinha ao topo
        });

        // Esconde o botão após clicar
        this.showScrollToLastMessage = false;
      }
    }
  }

  toggleSuggestions() {
    if (this.showScrollToLastMessage) {
      // Se o botão "View answer" estiver visível, esconde-o e mostra as sugestões
      this.showScrollToLastMessage = false;
      this.showDetailedSuggestions = true;
    } else {
      // Alterna normalmente
      this.showDetailedSuggestions = !this.showDetailedSuggestions;
    }
  }

}
