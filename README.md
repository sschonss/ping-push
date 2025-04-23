![Logo do Ping Push](/docs/logo/logo-h.svg)

## Demonstração do App

https://github.com/sschonss/ping-push/raw/main/docs/media/checkpoint2.mp4

## Sobre o app:

O Ping Push é um aplicativo onde você pode receber notificações personalizadas. Você pode criar um tópico, como por exemplo "cpu-monitor-project-x" e se inscrever nele. Depois de inscrito, você vai receber um token que pode ser usado para enviar notificações para todos os inscritos no tópico.

Para enviar uma notificação, você precisa fazer uma requisição POST para o endpoint `/send` com o seguinte corpo:

```json
{
    "topic": "cpu-monitor-project-x",
    "message": "CPU usage is above 90%"
}
```

### Funcionalidades:

Esse projeto contempla as seguintes funcionalidades:

- [x] Criar um tópico e se inscrever nele
- [x] Remover inscrição de um tópico
- [x] Copiar token de inscrição

### Funcionalidades futuras:

- [ ] Receber notificações

Para as notificações serem enviadas, é necessário publicar o app nas lojas de aplicativos (Google Play e App Store), e por enquanto, o app não vai ser publicado.

## Protótipos de tela:

Link para o protótipo no Figma: [Protótipo do Ping Push](https://www.figma.com/design/oupeZFYUG1e6msKAPCpnFY/Ping-Push?node-id=0-1&t=lWazAhLxsvr3J89p-1)

## Imagens:

![Logo do Ping Push](/docs/logo/logo-h.svg)

### 1. Tela de Login

![Tela de Login](/docs/screens/login.png)

### 2. Tela de Criar Conta

![Tela de Criar Conta](/docs/screens/create-account.png)

### 3. Tela Home

![Tela Home](/docs/screens/home.png)

### 4. Tela do Tópico

![Tela do Tópico](/docs/screens/topic.png)

### 5. Tela de Criar Tópico

![Tela de Criar Tópico](/docs/screens/create-topic.png)

## Modelagem do Banco

O Ping Push utiliza Firebase como banco de dados NoSQL para armazenar os dados da aplicação. Abaixo estão os schemas das coleções utilizadas:

### Schemas do Firebase

```javascript
// Collection: users
{
  _id: ObjectId,
  email: String,
  name: String,
  password: String,
  createdAt: Date,
  lastAccess: Date
}

// Collection: topics
{
  _id: ObjectId,
  name: String,
  createdBy: ObjectId,  // Referência ao usuário
  createdAt: Date,
}

// Collection: notifications
{
  _id: ObjectId,
  topicId: ObjectId,  // Referência ao tópico
  message: String,
  sentAt: Date,
  sentBy: String
}
```

## Planejamento de Sprints

O desenvolvimento do aplicativo está organizado em sprints semanais, com foco em entregas incrementais. Abaixo está o cronograma detalhado:

### Sprint 1 (1 semana) - Configuração Inicial
- Configuração do ambiente React Native
- Configuração do MongoDB Atlas
- Desenvolvimento das telas de login e criação de conta
- Configuração do sistema de autenticação (fake)

### Sprint 2 (1 semana) - Funcionalidades Básicas
- Desenvolvimento da tela inicial (Home)
- Implementação do CRUD de tópicos
- Criação da API para gerenciamento de tópicos
- Integração para operações básicas
- Testes unitários das operações CRUD

### Sprint 3 (1 semana) - Sistema de Inscrições
- Desenvolvimento da tela de detalhes do tópico
- Implementação do sistema de inscrições
- Desenvolvimento do gerador de tokens
- Sistema de gerenciamento de inscrições
- Testes de integração do sistema de inscrições

### Sprint 4 (1 semana) - Finalização
- Testes de integração completos
- Correção de bugs identificados
- Otimização de performance
- Documentação técnica e de usuário
- Revisão final de segurança

## Atualizações desde o último checkpoint

### Recursos aplicados dos módulos anteriores

#### Expo Router
- Implementação completa do sistema de navegação usando Expo Router
- Configuração de layouts e meta-dados para todas as telas
- Navegação entre telas usando `router.push()` e `router.replace()`

#### NativeWind
- Estilização das telas principais usando Tailwind CSS
- Criação de tema personalizado com cores e fontes do app
- Componentes reutilizáveis estilizados com NativeWind

### Componentes Personalizados

1. **TopicCard**
   - Componente reutilizável para exibir informações de tópicos
   - Implementa o padrão de composição para flexibilidade
   - Usado nas telas Home e Info Topic

2. **CustomButton**
   - Botão personalizado com diferentes variantes
   - Implementa o padrão de props para customização
   - Usado em todas as telas para ações principais

### Boas Práticas Aplicadas

1. **Composição de Componentes**
   - Implementada no TopicCard para permitir diferentes conteúdos
   - Permite reutilização mantendo flexibilidade

2. **Props Pattern**
   - Usado no CustomButton para personalização de estilos
   - Permite variações mantendo consistência

3. **Componentização**
   - Separação de lógica em componentes menores
   - Melhora manutenibilidade e reusabilidade

### Status das Sprints

#### Sprint 1 (1 semana) - Configuração Inicial ✅
- [x] Configuração do ambiente React Native
- [x] Configuração do MongoDB Atlas
- [x] Desenvolvimento das telas de login e criação de conta
- [x] Configuração do sistema de autenticação

#### Sprint 2 (1 semana) - Funcionalidades Básicas ✅
- [x] Desenvolvimento da tela inicial (Home)
- [x] Implementação do CRUD de tópicos
- [x] Criação da API para gerenciamento de tópicos
- [x] Integração para operações básicas
- [x] Testes unitários das operações CRUD

#### Sprint 3 (1 semana) - Sistema de Inscrições 🚧
- [x] Desenvolvimento da tela de detalhes do tópico
- [ ] Implementação do sistema de inscrições
- [ ] Desenvolvimento do gerador de tokens
- [ ] Sistema de gerenciamento de inscrições
- [ ] Testes de integração do sistema de inscrições

#### Sprint 4 (1 semana) - Finalização ⏳
- [ ] Testes de integração completos
- [ ] Correção de bugs identificados
- [ ] Otimização de performance
- [ ] Documentação técnica e de usuário
- [ ] Revisão final de segurança
