import axios from 'axios';
import { TextField, Grid, Box } from '@material-ui/core'
import { useState } from 'react';
import ListItems from '../listItem'
import noimage from '../../noimage.png'

const TvMazeApi = () => {

	const [listItems, setListItems] = useState([])

	const Search = async (query) => {
		let url = `http://api.tvmaze.com/search/shows?q=${query}`;

		let response = await axios(url);

		return response.data;
	}

	const onInputChange = async (value) => {
		if (value != '') {
			const res = await Search(value)

			let items = []

			// Create array of searched data objects
			res.forEach(element => {
				const item = element.show;

				items.push({
					id: item.id,
					image: item.image ? item.image.original || item.image.medium : noimage,
					name: item.name,
					// Limit description to fit card size 
					description: item.summary ? item.summary.toString().slice(0, 125) + '...' : '',
					rating: item.rating.average || '0.0'
				})
			});

			setListItems(items)
		} else {
			setListItems([])
		}
	}

	return (
		<>
			{/* Search input */}
			<TextField
				label="Search"
				variant="outlined"
				fullWidth
				onChange={(e) => onInputChange(e.target.value)}
			/>

			{/* Searched items to render */}
			<Box mt={5}>
				<Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
					{listItems.map((item) => 
						<Grid item xs={4} sm={4} md={2} key={item.id}>
							<Box m={2}>
								<ListItems
									image={item.image}
									name={item.name}
									description={item.description}
									rating={item.rating}
								/>
							</Box>
						</Grid>
					)}
				</Grid>
			</Box>
		</>
	)
}

export default TvMazeApi;