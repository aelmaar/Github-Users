import React from "react";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from "@material-ui/core";
import {Link} from 'react-router-dom'

function User({ user }) {
	const { login, avatar_url, html_url } = user;

	return (
		<div>
			<Card className="user">
				<Link to={`/${login}`} style={{textDecoration:'none',color:"black"}}>
					<CardActionArea>
						<CardMedia
							className="user__profile"
							image={avatar_url}
							title="click her for more information"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{login}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Link>
				<CardActions>
					<Button
						href={html_url}
						target = "_blank"
						rel = "noopener noreferrer"
						style={{
							backgroundColor: "#2EA34F",
							color: "white",
							width: "100%",
							padding: ".2rem",
						}}
						size="large"
						variant="contained"
					>
						URL
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}

export default User;
