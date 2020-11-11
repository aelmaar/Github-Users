import React, { useState, useEffect } from "react";
import axios from "./axios";
import github from "./github.png";
import { Avatar, Button } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";

function UserInfoPerson() {
	const [fetchInfoUser, setFetchInfoUser] = useState({});
	const [userRepo, setUserRepo] = useState([]);
	const [error, setError] = useState("");
	const { login } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(`users/${login}`)
				.then((response) => {
					setFetchInfoUser(response.data);
				})
				.catch((error) => {
					setError(error.message);
				});
		};
		fetchData();
	}, [login]);
	useEffect(() => {
		const fetchDataRepo = async () => {
			await axios
				.get(`users/${login}/repos`)
				.then((response) => {
					console.log(response.data);
					const data = response.data;
					setUserRepo(data.reverse().slice(0, 6));
				})
				.catch((error) => {
					setError(error.message);
				});
		};
		fetchDataRepo();
	}, [login]);

	return (
		<div>
			<header className="app__header">
				<img src={github} alt="github" className="app__logo" />
				<Link to="/" style={{ textDecoration: "none" }}>
					<Button style={{ fontSize: 30, color: "white" }}>
						<i class="fas fa-home"></i>
					</Button>
				</Link>
			</header>
			<div className="user__container">
				{!error ? (
					<div className="user__info">
						<div className="user__avatar">
							<div className="avatar">
								<Avatar
									src={fetchInfoUser.avatar_url}
									alt=""
									style={{
										alignSelf: "center",
										width: "30vw",
										height: "30vw",
									}}
								/>
								<h3>{fetchInfoUser.name}</h3>
							</div>
							<Button
								style={{
									backgroundColor: "#2EA34F",
									color: "white",
									marginBottom: 10,
								}}
								href={fetchInfoUser.html_url}
								variant="contained"
								size="small"
								target="_blank"
								rel="noopener noreferrer"
							>
								url
							</Button>
							<div
								style={{ textAlign: "justify" }}
								className="info__specific"
							>
								<div>
									<h4>
										<span>{fetchInfoUser.followers}</span>{" "}
										followers
									</h4>
									<h4>
										<span>{fetchInfoUser.following}</span>{" "}
										following
									</h4>
								</div>
								<div>
									<h4>
										<span>
											{fetchInfoUser.public_repos}
										</span>{" "}
										public repository
									</h4>
									<h4>
										<span>
											{fetchInfoUser.public_gists}
										</span>{" "}
										public gists
									</h4>
								</div>
							</div>
						</div>
						<div className="user__repos">
							<h3>Latest Repositories</h3>
							<div className="repos">
								{userRepo.map(
									({
										full_name,
										html_url,
										language,
										description,
									}) => (
										<div className="repo">
											<div>
												<a
													href={html_url}
													target="_blank"
													rel="noopener noreferrer"
												>
													{full_name}
												</a>
												<p style={{ marginBottom: 30 }}>
													{description}
												</p>
											</div>
											<p>
												<span>{language}</span>
											</p>
										</div>
									)
								)}
							</div>
						</div>
					</div>
				) : (
					<h1>{error}</h1>
				)}
			</div>
		</div>
	);
}

export default UserInfoPerson;
