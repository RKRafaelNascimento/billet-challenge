# Billet Challenge

## Descrição

[Billet Challenge](https://github.com/RKRafaelNascimento/billet-challenge) Repositório inicial.

## Instalação

```bash
$ npm install
```

## Configuração

Adiciona .env.development, seguindo a .env.example

## Iniciar a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Iniciar com docker

```bash
# raiz do projeto
$ docker-compose up -d
```

## Teste

Adiciona .env.test, seguindo a .env.example

```bash
# unit tests
$ npm run test
```



# Endpoint

## Curl
```bash

curl --location --request POST 'http://localhost:3000/billet/information' \
--header 'Content-Type: application/json' \
--data-raw '{
    "typedLine": "34191.09008 01011.090444 00961.620002 7 81850000132609"
}'
```

 Metodo |  Endpoint  | Body
| ------------------- | ------------------- | ------------------- |
|  POST |  /billet/information' | { typedLine: string } |


## Exemplo de resposta

```
{
    "typedLineValid": true,
    "value": "R$1.326.09",
    "dueDate": "05/03/2020",
    "barcode": "34197818500001326091090001011090440096162000"
}
```

Códigos válidos:

```
 Titulo: 34191.09008 01011.090444 00961.620002 7 81850000132609
 Convenio: 84680000000-8 98390109011-5 00416671792-8 40138853108-9
```