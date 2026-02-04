# Padrão de Desenvolvimento para Controllers (Somente Leitura)

Este documento define o padrão arquitetural para a criação de Controllers focados em consulta no projeto VMS Desktop.

## 1. Responsabilidades do Controller
O Controller atua como a camada intermediária entre a Interface (View/IPC) e os Dados (Model). Suas responsabilidades são:
1.  **Receber a requisição** do frontend (Processo Renderer).
2.  **Mapear as chaves** (DeModel/Banco -> ParaDTO/Frontend) para garantir nomes amigáveis.
3.  **Chamar o Model** para execução da query SQL.
4.  **Tratar Erros** e retornar uma resposta padronizada.

## 2. Métodos Padronizados
Utilizamos apenas operações de consulta:
*   `listar()`: Retorna um array com todos os registros ativos (`excluido_em IS NULL`).
*   `buscarPorId(uuid)`: Retorna um único registro buscado pelo UUID.

## 3. Formato de Resposta Padronizado
Todo método do controller deve retornar um objeto consistente:

```javascript
{
  success: boolean, // true se a consulta funcionou
  message: string,  // Mensagem em caso de erro
  data: any         // O array de registros ou objeto único
}
```

## 4. Exemplo de Implementação (Read-Only)

```javascript
import { entity_name_singular } from '../Models/entity_name_plural.js';

class entity_name_singularController {
    constructor() {
        this.model = new entity_name_plural();
    }

    async listar() {
        try {
            const dados = await this.model.listar();
            
            // Mapeamento opcional para nomes mais amigáveis no front
            const listaFormatada = dados.map(u => ({
                uuid: u.uuid_entity,
                nome: u.nome_entity,
                // ...
            }));

            return { success: true, data: listaFormatada };
        } catch (error) {
            console.error('Erro ao listar:', error);
            return { success: false, message: 'Falha ao recuperar dados.' };
        }
    }

    async buscarPorId(uuid) {
        try {
            const dado = await this.model.buscarPorId(uuid);
            if (!dado) return { success: false, message: 'Registro não encontrado.' };
            
            return { success: true, data: dado };
        } catch (error) {
            return { success: false, message: 'Erro na consulta por ID.' };
        }
    }
}

export default entity_name_singularController;
```

## 5. Boas Práticas de Consulta
1.  **Try/Catch Obrigatório**: Nunca deixe um erro do SQLite quebrar o processo principal do Electron.
2.  **DTO (Data Transfer Object)**: Se o banco possui colunas técnicas (ex: `sync_status`), não as envie para o frontend a menos que seja necessário.
3.  **Log de Erro**: Sempre use `console.error` para debugar falhas no backend sem expor stack traces sensíveis para o usuário final.
