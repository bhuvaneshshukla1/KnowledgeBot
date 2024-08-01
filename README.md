<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!--[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->




</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About KnewledgeBot



KnowledgeBot is an LLM-powered chatbot application which aims to provide the following functionalities:-
1. Accurate Responses to user queries.
2. Formulate queries with the most relevant context from extensive contextual data.

The application implements Retrieval-Augmented-Generation (RAG) to achieve the above mentioned functionalities.

RAG specifications:-
1. Embedding model: paraphrase-MiniLM-L6-v2 (Embedding model converts the natural language text into vector embeddings)
2. Embeddings Similarity Search module : faiss (faiss is used to measure the similarity between vector embeddings of contextual data and the user query to retreve most relevant sections of context embeddings)

Query Response Time Optimizations:-
This chatbot also leverages distributing caching of chat history to prevent higher latency of historyDB calls. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

FrontEnd
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

BackEnd
* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![Python][Python]][Python-url]
* [![Flask][Flask]][Flask-url]



Cloud
* [![AWS Lambda][AWSLambda]][lambda-url]
* [![AWS EC2][AWSEc2]][ec2-url]
* [![AWS EKS][AWSEKS]][eks-url]

LLM
* [![llama3][llama3]][llama3-url]
* [![Ollama][Ollama]][Ollama-url]
  


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* ollama
   - Download and install from this [link](https://ollama.com/download) or download application binaries from this [link](https://github.com/ollama/ollama/releases/tag/v0.3.2)
* download llama3.1 model using ollama
  ```sh
  ollama run llama3.1
  ```
* python - version 3.11.x
* python modules:-
   ```sh
  pip install ollama flask sentence-transformers faiss boto3
  ```
   


### Installation

1. Clone the repo
   ```sh
   git clone [https://github.com/your_username_/Project-Name.git](https://github.com/bhuvaneshshukla1/KnowledgeBot.git
   ```
2. Install NPM packages
   Frontend:-
   ```sh
   npm install axios@^1.7.2 bootstrap@^5.3.3 react@^18.3.1 react-bootstrap@^2.10.4 react-dom@^18.3.1 react-router-dom@^6.25.1 socket.io-client@^4.7.5
   ```
   Backend ( Chat-App-Backend):-
    ```sh
   npm install aws-sdk@^2.1664.0 axios@^1.7.2 bcryptjs@^2.4.3 cors@^2.8.5 express@^4.19.2 jsonwebtoken@^9.0.2 morgan@^1.10.0 socket.io@^4.7.5
   ```
   
4. build frontend and run
   ```sh
   npm install
   ```
   ```sh
   npm dev run
   ```
5. run backend appplications:-
   ```sh
   node hello.js
   ```
   ```sh
   python llm-client.py
   ```
   ```sh
   python LLM.py
   ```
   ```sh
   python LLM.py
   ```

   
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
<!--## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p> ..>















<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Node.js]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=nodedotjs
[Node-url]: https://nodejs.org/en
[React.js]: https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-000000?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[AWSLambda]: https://img.shields.io/badge/aws%20lambda-000000?style=for-the-badge&logo=awslambda
[lambda-url]: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[AWSEc2]: https://img.shields.io/badge/aws%20ec2-000000?style=for-the-badge&logo=amazonec2
[ec2-url]: https://jquery.com
[AWSEKS]: https://img.shields.io/badge/aws%20eks-000000?style=for-the-badge&logo=amazoneks
[eks-url]: https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html
[llama3]: https://img.shields.io/badge/llama%203.1-000000?style=for-the-badge
[llama3-url]: https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/MODEL_CARD.md
[Express.js]: https://img.shields.io/badge/EXPRESS%20JS-000000?style=for-the-badge&logo=express
[Express-url]: https://expressjs.com/
[Python]: https://img.shields.io/badge/python-000000?style=for-the-badge&logo=python
[Python-url]: https://www.python.org/
[Flask]: https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
[Ollama]: https://img.shields.io/badge/ollama-000000?style=for-the-badge
[Ollama-url]: https://ollama.com/

* [![Express][Express.js]][Express-url]
* [![Python][Python]][Python-url]
* [![Flask][Flask]][Flask]
* [![Ollama][Ollama]][Ollama]


