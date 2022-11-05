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

### 2.2.1 Criando os arquivos **.env**

Para o projeto funcionar corretamente é necessária a criação de dois arquivos **.env**, sendo um para o Backend e outro para o Frontend. Os arquivos **.env** precisam estar nos diretórios **backend_server** e **song-2-image** respectivamente.

No **.env** do Backend devemos definir as seguintes variáveis:
1. **MUSIX_MATCH_API_KEY**
2. **CLIENT_ID**
3. **CLIENT_SECRET**

E no **.env** do Front:
1. **NEXT_PUBLIC_DALLE_TOKEN**
2. **NEXT_PUBLIC_CLIENT_ID**
3. **NEXT_PUBLIC_CLIENT_SECRET**

### 2.2.2. Configurando a sua conta do Spotify

1. Entre em no site de spotify developer: https://developer.spotify.com/
    
    ![](readme_images/1%20spotify%20dev%20home.PNG)
2. Vá em dashboard e crie sua conta do Spotify developer
    
    ![](readme_images/2%20spotify%20dev%20log%20in.PNG)
3. No seu dashboard crie um app
    
    ![](readme_images/3%20spotify%20dev%20create%20an%20app.PNG)
4. Prencha os campos
    
    ![](readme_images/4%20spotify%20dev%20create%20app%20form.PNG)
5. Pronto, logue abra o app e veja sua home page

    ![](readme_images/5%20spotify%20dev%20example%20app%20home.PNG)
6. Procure seu CLIENT_ID e CLIENT_SECRET

    ![](readme_images/6%20spotify%20keys.PNG)
7. Adicione os usuários do spotify além da sua própria conta que participará da versão de developer
    
    ![](readme_images/7%20spotify%20user%20add.PNG)
8. Em Edit, vá em redirect URIs e adicione http://localhost:3000
    
    ![](readme_images/8%20Spotify%20edit%20settings.PNG)
   
### 2.2.3. Configurando o Musixmatch

1. Entre em no site do musiXMatch developer: https://developer.musixmatch.com/

    ![](readme_images/10%20musiXmatch%20dev%20login.PNG)
2. Crie uma conta
3. Vá na página do seu perfil
4. Vá em Dashboard, depois em Applications, crie seu app e lá estará sua chave, MUSIX_MATCH_API_KEY

    ![](readme_images/11%20musixmatch%20dashboard.PNG)
    


### 2.2.4. Configurando o Dall-E 2

1. Acesse a página https://labs.openai.com/
2. Crie sua conta do Dall-E 2
3. Efetue o Login
4. Abra o Developer Tools do navegador (F12)
5. Clique na aba Network
6. Escreva um prompt desejado na página do Dall-e e pressione o botão "Generate"
7. Na aba Network procure por um fetch para o endpoint https://labs.openai.com/api/labs/tasks
8. No Header da request procure pelo campo **authorization**
9. Copie o token fornecido no campo **authorization**
10. Remova o **Bearer** do inicio do token deixando apenas a parte **sess-** e o código que aparece em seguida
11. Atribua o token a uma variável chamada **NEXT_PUBLIC_DALLE_TOKEN** no .env do projeto Frontend

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

# 4. Melhorias e Próximos Passos

1. Playback do spotify
2. Geração de vídeo com imagens geradas e música
3. Animação de transição entre as imagens
4. Melhora do algoritmo de NLP para encontrar as keywords
5. Tradução de músicas em outras línguas
