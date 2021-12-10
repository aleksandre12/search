import * as React from 'react';
import { Typography, CardMedia, CardContent, Card, Box } from '@material-ui/core';

export default function ListItems(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
        <Box height={'18vh'}>
          <CardMedia
            component="img"
            height="100%"
            image={props.image}
            alt="green iguana"
          />
        </Box>
        <Box height={'30vh'}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.name} 
            </Typography>
            <Typography>Rating: {props.rating}</Typography>
            <Typography
              variant="body2"
              style={{ wordWrap: "break-word" }}
              dangerouslySetInnerHTML={{__html: props.description}}
            />
          </CardContent>
        </Box>
    </Card>
  );
}