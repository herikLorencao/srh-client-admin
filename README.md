# Cliente Administrativo para Sistema de Recomendação Híbrido - SRH

Aplicação web para manutenção de cadastros e uso por usuários de perfil administrador. Esse sistema é parte da arquitetura do [Sistema de Recomendação Híbrido](https://github.com/herikLorencao/srh-backend) desenvolvido no trabalho de conclusão de curso de Sistemas de Informação do IFES - Campus Cachoeiro de Itapemirim no ano de 2020/2021.

## Funcionalidades


O sistema administrativo busca permitir que usuários de **perfil administrador** possam realizar suas tarefas, permitindo desde a manutenção de cadastros até a geração de recomendações. Segue abaixo a demonstração de algumas telas do sistema:

![Tela de Login](docs/prints/adminLogin.png)
![Cadastro de Projeto](docs/prints/adminCriarProjeto.png)
![Cadastro de dados do Projeto](docs/prints/adminCriarProjetoForm.png)
![Listagem de Tags](docs/prints/adminTags.png)
![Listagem de Recomendações](docs/prints/adminRecomendacoes.png)

## Utilização básica do sistema

Para uso do sistema basta clonar esse repositório com o seguinte comando:

```bash
git clone git@github.com:herikLorencao/srh-client-admin.git
```

Após esse passo é necessário a instalação das dependências, para isso é necessário que as seguintes ferramentas estejam instaladas em sua máquina:

- [Node JS](https://nodejs.org/pt-br/)
- [Yarn](https://yarnpkg.com/)
- [Quasar CLI](https://quasar.dev/quasar-cli/installation)

### Configuração do projeto

Para instalar as dependências do projeto execute o seguinte comando:

```bash
yarn
```

### Habilitando modo de desenvolvimento (hot reload e debug)

Para utilizar o modo de desenvolvimento execute o seguinte comando:

```bash
quasar dev
```

### Compilar projeto para produção

Para gerar uma nova versão de produção do projeto execute o seguinte comando:

```bash
quasar build
```

Para mais informações acerca do deploy acesse a [documentação do Quasar](https://quasar.dev/quasar-cli/developing-spa/deploying#General-deployment).
