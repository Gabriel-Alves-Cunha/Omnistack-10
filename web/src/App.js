import React, { useState, useEffect } from "react"; // useState é uma funcao para criar um estado que vai ser observado
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import api from "./services/api";
import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

// Tres conceitos principais do React:
// -> O que é Componente: é uma funcao que retorna algum conteúdo html, css e/ou javascript, o qual nao interfere com o restante da aplicacao; primeira letra da funcao é sempre maiúscula.
// -> O que é Propriedade: atributos, informacoes que um componente PAI passa para o FILHO.
// -> O que é Estado: informacoes mantidas pelo componente (lembrar: imutabilidade -> performance)

function Example() {
	const [counter, setCounter] = useState(0); // Dentre parentesis, o valor inicial
	// O React aposta na imutabilidade de variáveis: o setState sempre cria um novo valor.

	function incrementCounter() {
		setCounter(counter + 1);
	}

	return (
		<>
			<h1>Contador: {counter}</h1>
			<button onClick={incrementCounter}>Incrementar</button>
		</>
	);
	// Como <div></div> poderia atrapalhar a estilizacao, posso usar <></>

	// Toda funcao que é própria de um componente, tem que ser declarado dentro dele.
}

//-------------------------------------------

function App() {
	const [devs, setDevs] = useState([]);

	useEffect(() => {
		async function loadDevs() {
			const response = await api.get("/devs");

			setDevs(response.data);
		}

		loadDevs();
	}, []);

	async function handleAddDev(data) {
		const response = await api.post("/devs", data);

		//console.log(response.data);

		setDevs([...devs, response.data]); // Adicao dentro de um array no javascript! Se fosse remocao, seria .filter()! Se fosse alteracao: .map()!
	}

	// div#app
	// aside -> html para fazer sidebar
	// class -> className no jsx
	return (
		<div id="app">
			<aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev}/>
			</aside>

			<main>
				<ul>
					{devs.map(dev => (
						/* Nao coloco chaves (que representa o corpo da funcao) porque eu estou declarando o retorno da funcao (é a mesma coisa que escrever `{
                            return ();}`)! */
						<DevItem key={dev._id} dev={dev} />
					))}
				</ul>
			</main>
		</div>
	);
}

export default App;

// Enfim, para separar este arquivo, que ficou com muito código, a primeira coisa que procuro é ver qual pedaco eu posso botar em um novo arquivo sem alterar/atingir/influenciar o código!
