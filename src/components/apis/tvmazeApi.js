import axios from 'axios';
import { TextField, Grid, Box } from '@material-ui/core'
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import ListItems from '../listItem'
import noimage from '../../noimage.png'

const TvMazeApi = () => {

	const [listItems, setListItems] = useState([])

	const [returnedItems, setReturnedItems] = useState([])
	
	const [pageCount, setPageCount] = useState(0)

	const [cardsPerPage, setCardsPerPage] = useState(6)

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

			let firstPage = paginator(items, 1, cardsPerPage);

			setReturnedItems(items)
			setListItems(firstPage.data)
			setPageCount(firstPage.totalPages)
		} else {
			setReturnedItems([])
			setListItems([])
			setPageCount(0)
		}
	}

	const paginator = (items, currentPage, perPageItems) =>{
		let page = currentPage || 1,
		perPage = perPageItems || 10,
		offset = (page - 1) * perPage,
	
		paginatedItems = items.slice(offset).slice(0, perPageItems),
		totalPages = Math.ceil(items.length / perPage);
	
		return {
			totalPages: totalPages,
			data: paginatedItems
		};
	}

	const paginationChanged = (reqPage) => {
		let page = paginator(returnedItems, reqPage, cardsPerPage);

		setListItems(page.data)
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

			{pageCount ? <Box mt={2}><Pagination count={pageCount} color="primary" onChange={(e, value) => paginationChanged(value)} /></Box> : <></>}

			{/* Searched items to render */}
			<Box mt={2}>
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