# Song 2 Image

Este projeto tem como objetivo gerar imagens a partir das estrofes de uma música, utilizando o Dall-E 2 como gerador.
Este projeto se encarrega de extrair as palavras de uma estrofe de uma música e então gerar o input para o Dall-E gerar as imagens, utilizando o contexto do **snippet**, uma pequena frase, retirada da própria música, que melhor a representa. 
Esse snippet é adquirido através do **[musixmatch](https://www.musixmatch.com/pt-br)**

# 1. Dependências

- [Python 3.9+](https://www.python.org/downloads/)
- [Microsoft Visual C++ 14 ou superior](https://learn.microsoft.com/pt-br/cpp/windows/latest-supported-vc-redist?view=msvc-170)
- [Git e Git bash](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/download/)

# 2. Instalação

## 2.1. Download do Projeto
Primeiro, clone o repositório com: 

```shell
git clone https://github.com/IvanNSBS/Song2Image.git
```

## 2.2. Configurando o Projeto

### 2.2.1. Configurando a sua conta do Spotify

1. asdsa
   
### 2.2.2. Configurando o Musixmatch

1. asdsad

### 2.2.3. Configurando o Dall-E 2

1. adasd

# 3. Executando o Projeto

## 3.1 Backend Server

Abra o git bash e execute o script **_run_backend_server.sh_** digitando
```shell
./run_backend_server.sh
```

Isso irá automaticamente executar todas as etapas para excução do back-end. Irá criar o virtual environment do python, instalar todas as dependências do projeto e então executá-lo.
Na primeira vez, isso irá demorar um pouco pois irá instalar todos os pacotes do python necessários. Nas execuções seguintes, isso não será mais feito. 
Esse processo irá criar uma pasta **.venv** no diretório do backend, que é ignorada pelo git. Caso deseje instalar todas as dependências denovo, apague-o e rode o script novamente

## 3.2 Front End

Abra o git bash na raiz dop projeto e digite os seguintes comandos, na mesma ordem, para instalar as dependências

```shell
npm install -g yarn
```

```shell
cd song-2-image
```

```shell
yarn
```

E então o seguinte comando para executar o front-end.
```shel
yarn dev
``` 
O front-end será então compilado caso esteja sendo executado pela primeira vez. Então, ele finalmente ficará disponível na página http://localhost:3000

## 3.3 Gerando as imagens

1. Faça o login no spotify com a sua conta. Lembre-se da etapa de configuração do Spotify, pois haverá um erro de rede caso ela não esteja configurada corretamente
2. Pesquise pela musica que você quer gerar as imagens e então selecione-a ao clicar nela
3. Selecione o tipo de arte que você deseja utilizar para a imagem
4. Digite o ambiente que você quer que as imagens passem, como uma prisão, uma arena de gladiadores, uma rua, etc. Esse passo é opcional e o campo pode ser deixado em branco, mas recomendamos que seja dado algum input para ele
5. Espere que o back-end termine de processar os dados da música e então clique em "Gerar Imagem". Enquanto o back-end está fazendo este processamento, o botão ficará desativado e terá um nome de "Loading".
6. As imagens demorarão um pouco para ser geradas. No final, caso queira gerar mais imagens, atualize a página. Fique atento as limitações de token da sua conta do Dall-E 2, pois caso não hajam tokens o suficiente para gerar a música, a geração irá falhar e nunca completará

