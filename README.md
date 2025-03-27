![Logo do Ping Push](logo/logo-h.svg)

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

