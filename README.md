
# Desafio — Laravel + React + Keycloak

Projeto fullstack com autenticação baseada em JWT usando **Keycloak**, **Laravel (API)** e **React + Vite + TypeScript**. A comunicação entre frontend e backend é autenticada via Bearer Token.

---

## Stack Utilizada

| Serviço       | Tecnologia                            |
|---------------|---------------------------------------|
| Node          | React + Vite + TypeScript + Bootstrap |
| php           | Laravel 12 + PHP 8.3 + PHP-FPM        |
| keycloack     | Keycloak 26.2.5                       |
| mysql         | MySQL 8                               |

---

## Como subir o projeto

> Requisitos: Docker e Docker Compose instalados.

### 1. Suba todos os serviços

```bash
docker-compose up --build
```

### 2. Gere a chave da aplicação Laravel (em outro terminal)

```bash
docker-compose exec php php artisan key:generate
```

### 3. Acesse os serviços no navegador

| Serviço       | URL                                 |
|---------------|-------------------------------------|
| React (Frontend) | http://localhost:3000            |
| Laravel (API) | http://localhost:8080/api/hello     |
| Keycloak      | http://localhost:8081               |

---

## Estrutura de Diretórios

```
.
├── docker-compose.yml          # Orquestração dos serviços
├── php/                    # Backend Laravel 11
│   ├── Dockerfile.dev              # PHP-FPM com Composer
├── node/             # Frontend React + TS + Vite
│   ├── Dockerfile.dev              # Container Node.js 22
├── keycloak/               # Realm exportado do Keycloak (.json)
├── api                      # Código fonte Laravel
├── client                      # Código fonte React/typescript
│   └── src/App.tsx            # Tela de login e requisição protegida
```

---

## Autenticação

A autenticação é feita usando **Keycloak**, com tokens JWT do tipo Bearer:

1. O usuário faz login com nome e senha no React (formulário customizado)
2. O React envia as credenciais para o endpoint de token do Keycloak
3. O React recebe o `access_token` e o usa para acessar a API Laravel
4. O Laravel valida o token com as chaves públicas do Keycloak (`jwk`)

---

## Testar API protegida

Exemplo de requisição com `curl`:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:8080/api/hello
```

## Testes automatizados

O arquivo `docker-compose.test.yml` estará simulando um processo/etapa de pipeline 


existem 2 cenários para esses testes:

### Fluxo 1 - o primeiro é acessar somente o SonarQube para realizar a troca de senha do admin

1. suba o serviço do SonarQube para acessar o painel
```bash
docker-compose -f docker-compose.test.yml up sonarqube
```
2. Acesse *http://localhost:9001* e realize o login com `admin` e senha `admin`
3. Após trocar a senha, altere no arquivo `docker-compose.test.yml` (é necessário alterar nos dois serviços, php e node)
```yml
      SONARQUBE_LOGIN: admin
      SONARQUBE_PASS: admin # -> altere para a nova senha
```
4. Agora com a senha alterada você rodar o comando para subir/rodar todos os testes
```bash
docker-compose -f docker-compose.test.yml up
```
5. veja os testes no painel do SonarQube


### Fluxo 2 - Ignore a troca de senha agora e apenas rode todos os testes.

1. rode o comando para rodar/subir todos os testes
```bash
docker-compose -f docker-compose.test.yml up
```
2. Acesse http://localhost:9001 e realize o login com `admin` e senha `admin`
3. Veja os testes no painel do SonarQube
4. Caso desejar rodar os testes novamente, precisará alterar a senha no arquivo `docker-compose.test.yml` para rodar novamente (é necessário alterar nos dois serviços, php e node)
```yml
      SONARQUBE_LOGIN: admin
      SONARQUBE_PASS: admin # -> altere para a nova senha
```
5. Atualize as instancias rodando o processo de up novamente
```bash
docker-compose -f docker-compose.test.yml up
```

## Preview do react buildado

O arquivo docker-compose.previww.yml estará simulando um ambiente final de produção pós build

```bash
docker-compose -f docker-compose.preview.yml up nginx
```

Acesse http://localhost:3000 

> Nesse momento o teste será apenas do frontend sem conexão com API, é apenas um exemplo do `multipart build`

---

## Comandos úteis

### Laravel

```bash
# Acessar container
docker-compose exec php bash

# Rodar migrations
php artisan migrate

# Ver rotas
php artisan route:list

# Ver testes
php artisan test

# Limpar cache
php artisan optimize:clear
```

### React

```bash
# Acessar container
docker-compose exec node sh

# Rodar Vite dev server (internamente)
npm run dev -- --host=0.0.0.0 --port=3000
```

---

## Limpeza

```bash
docker-compose down -v
```

---

## 📣 Contato

> Desenvolvido por Pedro Miguel
> Email: pmiguelima@gmail.com
