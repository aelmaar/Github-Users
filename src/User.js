import React, { useState } from "react";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from "@material-ui/core";
import axios from "./axios";
import UserInfo from "./UserInfo";

function User({ user }) {
	const { login, avatar_url, html_url } = user;

	const [userInfo, setUserInfo] = useState({});
	const [error, setError] = useState("");
	const [open, setOpen] = useState(false);

	const fetchInfoUser = () => {
		const fetchData = async () => {
			await axios
				.get(`users/${login}`)
				.then((response) => {
					setUserInfo(response.data);
					setOpen(true);
				})
				.catch((error) => {
					setError(error.message);
					setOpen(true);
				});
		};
		fetchData();
	};

	return (
		<div>
			<Card className="user">
				<CardActionArea onClick={fetchInfoUser}>
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
				<CardActions>
					<Button
						href={html_url}
						target="_blank"
						rel="noopener noreferrer"
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
			<UserInfo
				userInfo={userInfo}
				open={open}
				error={error}
				handleClose={() => setOpen(false)}
			/>
		</div>
	);
}

export default User;
