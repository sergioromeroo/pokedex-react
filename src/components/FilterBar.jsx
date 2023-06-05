import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';

export const FilterBar = () => {
	const { active, handleCheckbox } = useContext(PokemonContext);

	return (
		<div className={`container-filters ${active ? 'active' : ''}`}>
			<div className='filter-by-type'>
				<span>ability</span>

				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='overgrow'
						id='overgrow'
					/>
					<label htmlFor='overgrow'>Overgrow</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='blaze'
						id='blaze'
					/>
					<label htmlFor='blaze'>Blaze</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='torrent'
						id='torrent'
					/>
					<label htmlFor='torrent'>Torrent</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='static'
						id='static'
					/>
					<label htmlFor='static'>Static</label>
				</div>
				
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='chlorophyll'
						id='chlorophyll'
					/>
					<label htmlFor='chlorophyll'>Chlorophyll</label>
				</div>
			</div>
		</div>
	);
};
