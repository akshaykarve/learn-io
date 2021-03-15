import React from 'react';
import './ComponentStyle.css';
const SearchBox =({searchChange})=>{
	return (
		<div className='pa'>
			<input 
				className='searchBoxStyle'
				type='search'
				placeholder='Search platform'
				onChange={searchChange}
			/>
		</div>
	);
}
export default SearchBox;