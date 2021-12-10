import { TextField, Grid, Box } from '@material-ui/core'
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import ListItems from './listItem'
import noimage from '../noimage.png'
import Search from './apis/search'

const TvMazeApi = () => {

	const [itemsToRender, setItemsToRender] = useState([])

	const [listItems, setListItems] = useState([])
	
	const [pageCount, setPageCount] = useState(0)

	const onInputChange = async (value) => {
		if (value != '') {
			const res = await Search(value)

			if (res) {
				// Items per page to render
				const cardsPerPage = 6,
					  totalPages = Math.ceil(res.length / cardsPerPage);

				let items = []
			
				for (let i = 0; i < totalPages; i++) {
					items.push(res.slice(i * cardsPerPage).slice(0, cardsPerPage))
				}
	
				setListItems(items)
				// Set first page to render
				setItemsToRender(items[0])
				setPageCount(totalPages)
			}
		} else {
			setListItems([])
			setItemsToRender([])
			setPageCount(0)
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

			{pageCount ? <Box mt={2}><Pagination count={pageCount} color="primary" onChange={(e, value) => setItemsToRender(listItems[value-1])} /></Box> : <></>}

			{/* Searched items to render */}
			<Box mt={2}>
				<Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
					{itemsToRender.map((item) => 
						<Grid item xs={4} sm={4} md={2} key={item.show.id}>
							<Box m={2}>
								<ListItems
									name={item.show.name}
									image={item.show.image ? item.show.image.original || item.show.image.medium : noimage}
									description={item.show.summary ? item.show.summary.toString().slice(0, 125) + '...' : ''}
									rating={item.show.rating.average || '0.0'}
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