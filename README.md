# Trybe Scheduler 2.0 🎉

Seja bem vindo ao **Trybe Scheduler**, esse projeto tem como objetivo facilitar a organização do seu tempo durante o curso da Trybe, mas como?
Simples! Basta copiar lá no seu Slack os horários do dia, e colar no campo "Agenda do Dia" na aplicação, e nós vamos nos encarregar de adicionar esses horários na sua agenda, e te lembrar quando chegar o horário de cada atividade.

## ![image](https://i.imgur.com/00TIFGe.gif)

Projeto dedicado aos estudantes da instituição Trybe para ajudar nos agendamentos diários de aula 😀

## Link do projeto:

https://trybe-schedule.vercel.app/

# Vamos contribuir?

## Como Iniciar 🌟

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:michaelcaxias/trybe-schedule.git
$ cd trybe-schedule
```

Para iniciá-lo, siga os passos abaixo:

```bash
# Instale as dependências
$ npm install
# Inicie o projeto
$ npm start
# Acesse o link: http://localhost:3000/ no navegador
```

**ATENÇÃO:** Se você fizer só até aqui, ao iniciar o projeto você não vai conseguir usa-lo por falta de autorização na API, para criar a sua chave, siga o passo a passo abaixo!

## Como desenvolver localmente 💻

Para desenvolver localmente, você além de clonar o repositório vai ter que fazer mais algumas coisas, primeiro, vamos lá!

### Vamos ativar a API do Google Calendar 📅

Para ativar a API do Google Calendar, você vai precisar de uma conta do Google, e seguir os passos abaixo:

#### **Criando um primeiro projeto**

1. Acesse o [Google Cloud Platform](https://console.cloud.google.com/)
2. No canto superior esquerdo do painel, depois de ter logado, vai ter uma mensagem "Seleciono um Projeto" se você não já tiver criado um, clique nessa mensagem. (**Se já tiver criado pule essa parte**)
3. Agora, um Popup vai aparecer, no canto superior direito do Popup tem uma opção "Novo Projeto", clique nela.
4. Agora, você vai ter que dar um nome para o seu projeto, a organização pode ser a "Sem Organização", e depois clique em "Criar".

#### **Ativando a API do Google Calendar**

Você provavelmente foi redirecionado para a página de APIs e serviços, se não foi, acesse ela [aqui](https://console.cloud.google.com/apis/dashboard).

1. Clique em "Biblioteca" na barra lateral da esquerda.
2. Procure por "Google Calendar API"
3. Clique em "Google Calendar API"
4. Clique em "Ativar"

#### **Criando a tela de consentimento**

1. Clique em "Tela de permissão OAuth" na barra lateral da esquerda
2. Selecione "Externo" e clique em "Criar"
3. Pode preencher só os campos obrigatórios "Nome do app", "Endereço de e-mail do suporte" e lá me baixão "Dados de contato do desenvolvedor", depois clique em "Salvar e continuar"
4. Na próxima tela, você vai ter que adicionar os escopos que você vai usar, para isso, clique em "Adicionar ou remover escopos" e adicione os seguintes escopos:
   ![image](https://i.imgur.com/AXMcvy9.png)
5. Depois de adicionar os escopos, clique em "Salvar e continuar"
6. Agora você vai adicionar os usuários de teste que vão poder usar a API, para isso, clique em "Add Users" e adicione o seu e-mail, depois clique em "Salvar e continuar"
7. Pronto, agora vá até lá em baixo e clique em voltar para o Painel

#### **Criando as credenciais**

1. Clique em "Credenciais" na barra lateral da esquerda
2. Clique em "Criar credenciais" e selecione "ID do cliente OAuth"
3. Selecione "Aplicativo da Web" e adicione o nome da aplicação.
4. Em Origens JavaScript autorizadas adicione o endereço da aplicação, que provavelmente vai ser http://localhost:3000 já que você está no local.
5. Em URI de redirecionamento autorizados adicione o endereço da aplicação, que provavelmente vai ser http://localhost:3000 já que você está no local.
6. Clique em "Criar" e copie o ID do cliente, você vai precisar dele para colonar no `.env` no seu local, no .env voce vai ver um Array, o segundo objeto desse Array tem algumas chaves, a primeira é o ID, o id é 2, isso já vai estar configurado, agora em `clientId` adicione esse ID de cliente.
7. Agora vamos criar mais uma credencial, para isso, clique em "Criar credenciais" e selecione "Chave de API".
8. A chave será gerada e aparecerá na sua tela, copie ela e cole no `.env` no seu local, no .env voce vai ver um Array, o segundo objeto desse Array tem algumas chaves, a primeira é o ID, o id é 2, isso já vai estar configurado, agora em `apiKey` adicione essa chave de API.
9. **Pronto, agora você já pode usar a API do Google Calendar localmente.**

**Finalmente, depois de ter feito tudo isso, adicionado as chaves na sua `.env`, basta rodar `npm start` para iniciar o projeto, claro, não esqueça do `npm install` antes de tudo.**

---

## Como contribuir ℹ️

1. Crie um fork do projeto
2. Clone a branch main com `git checkout -b 'nome-da-sua-branch'`, desse jeito você vai criar uma nova branch para fazer as suas alterações
3. Faça as alterações que você quiser, depois, faça os seus commits, e por fim use `git push -u origin 'nome-da-sua-branch'` para enviar as suas alterações para o seu fork
4. Agora, você vai ter que criar um Pull Request, para isso, venha até esse repositório que você está agora, e lá em cima vai aparecer um botão escrito "Compare & pull request", clique nele, se não aparecer esse botão, clique em "Pull requests" e depois em "New pull request"
5. Agora, você vai ter que preencher algumas informações, como o título do seu PR, e uma descrição, depois, clique em "Create pull request"
6. Pronto, agora é só esperar alguém revisar o seu PR, e se tudo estiver certo, ele vai ser aceito e vai ser adicionado ao projeto.

---

[Termos de Uso](https://trybe-schedule.vercel.app/terms-and-conditions) e [Políticas de Privacidade](https://trybe-schedule.vercel.app/privacy-policy)

## Documentação do Google Calendar

https://developers.google.com/calendar/api/quickstart/js
![image](https://user-images.githubusercontent.com/79621661/143962267-cd4fda15-2637-4425-ab4f-93862d66443b.png)
