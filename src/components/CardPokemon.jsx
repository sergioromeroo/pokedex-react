import React from 'react';
import { Link } from 'react-router-dom';

export const CardPokemon = ({ pokemon,removePokemons }) => {
	return (
		<div className='card-pokemon'>
		<Link to={`/pokemon/${pokemon.id}`} >
			<div className='card-img'>
				<img
					src={pokemon.sprites.other.dream_world.front_default}
					alt={`Pokemon ${pokemon.name}`}
				/>
			</div>
			<button type="button" class="btn btn-success" >Ver mas</button>

			</Link>
			<button type="button" class="btn btn-danger" onClick={()=>{removePokemons(pokemon.id)}}>Delete</button>
			<div className='card-info'>
				<span className='pokemon-id'>N° {pokemon.id}</span>
				
				<h6>Name: {pokemon.name}</h6>

				<div className='card-types'>
				<h6>Weight: {pokemon.weight}</h6>
				</div>

				{/* de que tipo es: */}
				<div className='card-types'>
					<h6>Types:</h6>
					{pokemon.types.map(type => ( //lo recorro con un map porque dentro tiene mas array y no me va dejar traerlo facilmente por eso el map
						<span key={type.type.name} className={type.type.name}>
							{type.type.name}
						</span>
					))}
				</div>

				{/* habilidades es : */}
				<div className='card-types'>
				<h6>abilities:</h6>
					{pokemon.abilities.map(habil => ( //lo recorro con un map porque dentro tiene mas array y no me va dejar traerlo facilmente por eso el map
						<h6 key={habil.ability.name} className={habil.ability.name}>
							{habil.ability.name}
						</h6>
					))}
				</div>
			</div>

			</div>
	);
};
