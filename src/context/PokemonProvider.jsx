import { useContext, useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { PokemonContext } from './PokemonContext';

export const PokemonProvider = ({ children }) => {
	/*  creo los  estados */
	const [allPokemons, setAllPokemons] = useState([]);
	const [globalPokemons, setGlobalPokemons] = useState([]);
	const [offset, setOffset] = useState(0);

	// Utilizar CustomHook - useForm
	const { valueSearch, onInputChange, onResetForm } = useForm({
		valueSearch: '',
	});

	/* estados simples para la carga de pagina y los checkbox */
	const [loading, setLoading] = useState(true)// para inicie cargando la pagina por eso true
	const [active, setActive] = useState(false)// para filtrar en checkbox siempre incia en false hasta que aprete boton y cambie a true el filtro


	/* *****consultas a las apis ***** */
	/* -----------------   traigo 30 pokemones -----------------*/
	const getAllPokemons = async (limit = 30) => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=${limit}&offset=${offset}`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setAllPokemons([...allPokemons, ...results]);//operador express operator exparso los 30 pokemones y tambien exparso el resultado al mismo tiempo es para el checkbox
		setLoading(false);//para decirme q ya cargo
	};

	/* ---------------otra funcion para llamar a TODOS sin limit--------------------*/
	const getGlobalPokemons = async () => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=100000&offset=0`
		);
		const data = await res.json();

		/* aca quiero mas info de los pokemons entro mas profundo al array con esto */

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setGlobalPokemons(results);
		setLoading(false);
	};



	/* -------------otra funcion para llamar pokemon por id -------------- */

	const getPokemonByID = async id => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};

		/* -------------otra funcion para borrar pokemon por id -------------- */

		const removePokemons = (pokemon) => {
			const {pokemons, setPokemons} = useContext(PokemonContext)
			const updatedPokemons = pokemons.filter(p => p !== pokemon)
			setPokemons(updatedPokemons)
		}
	

	useEffect(() => {
		getAllPokemons();
	}, [offset])//cada vez que offset camnbien que llame a la funcion que se ejecute a la api

	useEffect(() => {
		getGlobalPokemons();
	}, []);

	// BTN CARGAR MÁS
	const onClickLoadMore = () => {
		setOffset(offset + 30); //clickeo el cargar mas quiero otros 30
	};


	/* -----------------funcion para filtrar chekcbox ----------------------*/
	
	/* es para saber si un checkboox esta o no seleccionado */
	const [typeSelected, setTypeSelected] = useState({
		overgrow: false,
		blaze: false,
		torrent: false,
		static: false,
		chlorophyll: false,

	});

	const [filteredPokemons, setfilteredPokemons] = useState([]);

	/* es para saber si un checkboox esta o no seleccionado agarro todos los checkbox uso el checked q me 
devuelve un true o false y uso el name para guiarme de ahi el tipo de pokemon*/

	const handleCheckbox = e => {
		setTypeSelected({
			...typeSelected,
			[e.target.name]: e.target.checked,
		});

		/* si el checkbox esta seleccionado almacenamos en filteredresult los resultados del filtro que doy de habilidad de pokemones */

		if (e.target.checked) {
			const filteredResults = globalPokemons.filter(pokemon =>
				pokemon.abilities
					.map(habil => habil.ability.name)
					.includes(e.target.name)
			);

			/* exparso todo de mi array de filtrado y despues los resultados todos al mismo tiempo es para seleccionar
varios checkbox como q me muestre planta y tambien los dde fuego al mismo tiempo */
			setfilteredPokemons([...filteredPokemons, ...filteredResults]);

			/* en caso que se desmarque un checkbox  quiero que me devuelva todos aquellos pokemons q no formen parte de la habilidad seleccionado*/
		} else {
			const filteredResults = filteredPokemons.filter(
				pokemon =>
					!pokemon.abilities
						.map(habil => habil.ability.name)
						.includes(e.target.name)
			);
			setfilteredPokemons([...filteredResults]);
		}
	};

	return (
		<PokemonContext.Provider
			value={{
				valueSearch,
				onInputChange,
				onResetForm,
				allPokemons,
				globalPokemons,
				getPokemonByID,
				onClickLoadMore,
				// Loader //loading es para la carga de la pagina
				loading,
				setLoading,
				// Btn Filter //active es para el filter
				active,
				setActive,
				//filtrar por checkboxs
				handleCheckbox,
				filteredPokemons,
				//borrar pokemon
				removePokemons

			}}
		>
			{children}
		</PokemonContext.Provider>
	);
};
