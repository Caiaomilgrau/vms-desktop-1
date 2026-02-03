# Padrão de Desenvolvimento para Views (Frontend)

Este documento descreve o padrão arquitetural utilizado no frontend do projeto VMS Desktop para a construção de interfaces. O padrão utiliza uma separação clara entre a estrutura HTML (Templates) e a lógica de comportamento (Eventos e API).

## 1. Estrutura de Arquivos
Cada módulo (ex: `Usuario`, `Servico`) deve seguir a seguinte estrutura de pastas:
- `NomeModuloView.js`: Centralizador de templates HTML.
- `form/NomeModuloForm.js`: Lógica de criação/formulário.
- `listar/NomeModuloListar.js`: Lógica de listagem e ações (editar/excluir).

---

## 2. Componentes do Padrão

### A. NomeModuloView (A View "Pura")
Foca exclusivamente no **HTML** e manipulações visuais diretas.
- **Métodos `renderizarX()`**: Devem retornar strings de template (Template Literals).
- **Sem Lógica de Negócio**: Não deve fazer chamadas à API ou processar dados complexos.
- **Controle de UI**: Pode conter métodos para abrir/fechar modais ou animações simples.

### B. Lógica Handlers (Form e Listar)
Focam no **Comportamento** e na ponte com o **Backend**.
- **Instanciação**: Cria uma instância da View no `constructor` (`this.view = new NomeModuloView()`).
- **Renderização**: Chama o método da View para obter o HTML.
- **Gerenciamento de Eventos**:
    - Deve usar `setTimeout(() => this.adicionarEventos(), 0)` para garantir que o DOM foi injetado antes de buscar elementos.
    - Utiliza `event.preventDefault()` em formulários.
- **Chamadas de API**: Utiliza o objeto global `window.api` para comunicação IPC.

---

## 3. Fluxo de Funcionamento

1. **Chamada**: Um roteador principal chama o método de renderização do `Handler` (ex: `UsuarioListar.renderizarLista()`).
2. **Template**: O `Handler` solicita o HTML para a `View` (`this.view.renderizarLista(dados)`).
3. **Injeção**: O HTML é retornado para o roteador que o injeta no container principal (`#app`).
4. **Eventos**: O `Handler`, via `setTimeout`, busca os elementos injetados e anexa os `EventListener`.
5. **Ação**: Quando o usuário interage, o `Handler` processa, chama a `API`, e atualiza o DOM ou exibe alertas via `MensagemDeAlerta`.

---

## 4. Exemplos de Relação (VMS Pattern)

```mermaid
graph TD
    Router[Index/Main Router] --> Handler[UsuarioListar]
    Handler -->|1. Solicita HTML| View[UsuariosView]
    View -->|2. Retorna Template| Handler
    Handler -->|3. Retorna p/ Injeção| Router
    Handler -.->|4. Adiciona Eventos (async)| DOM[#app Container]
    DOM -->|5. Clique/Submit| Handler
    Handler -->|6. Chamada IPC| API[window.api]
```

## 5. Boas Práticas
- **Event Delegation**: Em listagens, ouça cliques no container pai (`this.app.addEventListener('click', ...)`) e use `e.target.classList.contains()` para identificar botões de ação.
- **Limpeza**: Sempre limpe campos de formulário após sucesso.
- **Feedback**: Utilize a classe `MensagemDeAlerta` para feedback visual ao usuário após operações de API.
