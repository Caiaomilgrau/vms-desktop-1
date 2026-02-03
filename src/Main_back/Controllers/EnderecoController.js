import Endereco from '../Models/Endereco.js';

class EnderecoController {
    constructor() {
        this.enderecoModel = new Endereco();
    }

    // 1. Listagem
    async listar() {
        try {
            const dados = await this.enderecoModel.listar();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao listar endereços:', error);
            return { success: false, message: 'Falha ao carregar lista de endereços.' };
        }
    }

    // 2. Busca por ID
    async buscarPorId(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID não fornecido.' };

            const endereco = await this.enderecoModel.buscarPorId(uuid);
            if (!endereco) {
                return { success: false, message: 'Endereço não encontrado.' };
            }
            return { success: true, data: endereco };
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
            return { success: false, message: 'Erro interno ao buscar endereço.' };
        }
    }

    // 3. Cadastro
    async cadastrar(dadosFrontend) {
        try {
            // Validação
            const erros = this.validarDados(dadosFrontend);
            if (erros.length > 0) {
                return { success: false, message: erros.join(', ') };
            }

            // Mapeamento (Frontend -> Model)
            const enderecoParaSalvar = {
                id_usuario: dadosFrontend.id_usuario,
                cep_endereco: dadosFrontend.cep,
                logradouro_endereco: dadosFrontend.logradouro,
                numero_endereco: dadosFrontend.numero,
                complemento_endereco: dadosFrontend.complemento || null,
                bairro_endereco: dadosFrontend.bairro,
                cidade_endereco: dadosFrontend.cidade,
                uf_endereco: dadosFrontend.uf,
                sync_status_endereco: 0
            };

            const id = await this.enderecoModel.adicionar(enderecoParaSalvar);
            return { success: true, message: 'Endereço cadastrado com sucesso!', data: { id } };

        } catch (error) {
            console.error('Erro ao cadastrar endereço:', error);
            return { success: false, message: 'Erro ao cadastrar endereço. Verifique os dados.' };
        }
    }

    // 4. Atualização
    async atualizar(dadosFrontend) {
        try {
            if (!dadosFrontend.uuid) return { success: false, message: 'ID do endereço necessário para atualização.' };

            // Verifica existência
            const existe = await this.enderecoModel.buscarPorId(dadosFrontend.uuid);
            if (!existe) return { success: false, message: 'Endereço não encontrado para edição.' };

            // Validação
            const erros = this.validarDados(dadosFrontend, true);
            if (erros.length > 0) return { success: false, message: erros.join(', ') };

            // Mapeamento
            const enderecoAtualizado = {
                uuid: dadosFrontend.uuid,
                id_usuario: dadosFrontend.id_usuario || existe.id_usuario,
                cep_endereco: dadosFrontend.cep || existe.cep_endereco,
                logradouro_endereco: dadosFrontend.logradouro || existe.logradouro_endereco,
                numero_endereco: dadosFrontend.numero || existe.numero_endereco,
                complemento_endereco: dadosFrontend.complemento !== undefined ? dadosFrontend.complemento : existe.complemento_endereco,
                bairro_endereco: dadosFrontend.bairro || existe.bairro_endereco,
                cidade_endereco: dadosFrontend.cidade || existe.cidade_endereco,
                uf_endereco: dadosFrontend.uf || existe.uf_endereco,
                sync_status_endereco: 0
            };

            await this.enderecoModel.atualizar(enderecoAtualizado);
            return { success: true, message: 'Endereço atualizado com sucesso!' };

        } catch (error) {
            console.error('Erro ao atualizar endereço:', error);
            return { success: false, message: 'Erro ao salvar alterações do endereço.' };
        }
    }

    // 5. Remoção
    async remover(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID inválido.' };

            const endereco = await this.enderecoModel.buscarPorId(uuid);
            if (!endereco) return { success: false, message: 'Endereço não encontrado.' };

            await this.enderecoModel.remover({ uuid });
            return { success: true, message: 'Endereço removido com sucesso.' };
        } catch (error) {
            console.error('Erro ao remover endereço:', error);
            return { success: false, message: 'Falha ao excluir endereço.' };
        }
    }

    // Método Auxiliar de Validação
    validarDados(dados, isUpdate = false) {
        const erros = [];
        if (!isUpdate && !dados.id_usuario) erros.push("Usuário é obrigatório");
        if (!dados.cep) erros.push("CEP é obrigatório");
        if (!dados.logradouro) erros.push("Logradouro é obrigatório");
        if (!dados.numero) erros.push("Número é obrigatório");
        if (!dados.bairro) erros.push("Bairro é obrigatório");
        if (!dados.cidade) erros.push("Cidade é obrigatória");
        if (!dados.uf) erros.push("UF é obrigatória");
        return erros;
    }
}

export default EnderecoController;