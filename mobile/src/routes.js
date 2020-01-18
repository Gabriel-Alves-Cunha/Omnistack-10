import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const Routes = createAppContainer(
	// Letra maiúscula pq é componente && tal fn precisa ficar por fora de toda a aplicacao.
	// Passo um obj com todas as rotas do app.
	createStackNavigator(
		{
			Main: {
				screen: Main, // O que vai ser renderizado (obrigatório).
				navigationOptions: {
					title: "DevRadar" // O headerTitle é se eu quiser colocar uma imagem ou componente no lugar de title.
				}
			}, // Se eu quiser trocar o título dessa pág: Main: {} -> transformo em obj.
			Profile: {
				screen: Profile,
				navigationOptions: {
					title: "Perfil no Github"
				}
			}
		},
		{
			defaultNavigationOptions: {
                // Aplicada a todas as telas.
                headerTintColor: '#fff',
                headerBackTitleVisible: false,
				headerStyle: {
                    backgroundColor: "#7d40e7"
				}
			}
		}
	)
);

export default Routes;
