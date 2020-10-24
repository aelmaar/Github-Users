import React from "react";
import { Modal, makeStyles, Avatar, Button } from "@material-ui/core";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 360,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(1, 1, 1),
	},
	avatar: {
		width: 150,
		height: 150,
		alignSelf: "center",
	},
}));

function UserInfo({ open, userInfo, error, handleClose }) {
	const {
		followers,
		following,
		public_repos,
		public_gists,
		name,
		html_url,
		avatar_url,
	} = userInfo;
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	return (
		<div>
			<Modal open={open} onClose={handleClose}>
				<div style={modalStyle} className="user__container">
					{!error ? (
						<div className="user__info">
							<div className="user__avatar">
								<Avatar
									src={avatar_url}
									alt=""
									className={classes.avatar}
								/>
								<h3>{name}</h3>
								<Button
									style={{
										backgroundColor: "#2EA34F",
										color: "white",
									}}
									href={html_url}
									variant="contained"
									size="small"
									target="_blank"
									rel="noopener noreferrer"
								>
									url
								</Button>
							</div>
							<div style={{ flexShrink: "0" }}>
								<h3>
									followers <span>{followers}</span>
								</h3>
								<h3>
									following <span>{following}</span>
								</h3>
								<h3>
									public repository
									<span>{public_repos}</span>
								</h3>
								<h3>
									public gists <span>{public_gists}</span>
								</h3>
							</div>
						</div>
					) : (
						<h1>{error}</h1>
					)}
				</div>
			</Modal>
		</div>
	);
}

export default UserInfo;
