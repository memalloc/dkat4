import styled from 'styled-components'

export const SinglePageProjectsTrial = (props:any) => {

	return	<Container>

				<ScreenContent>
					initial screen content placeholder
				</ScreenContent>

				<ProjectsHeader>
					selected projects
				</ProjectsHeader>

				<Project>Project</Project>
				<Project>Project</Project>
				<Project>Project</Project>
				<Project>Project</Project>
				<Project>Project</Project>
				<Project>Project</Project>
				<Project>Project</Project>
				<Project>Project</Project>
				<Project>Project</Project>
				<Project>Project</Project>
				<Project>Project</Project>

			</Container>
}

const onMobileAspectRatio = 'max-aspect-ratio: 6/10'

const Container = styled.div`
	user-select: none;
	font-family: ArvoRegular;
	background: #aaa;

	display: grid;
	justify-items: center;

	position: fixed;
	left: 0px;
	top: 0px;
	right: 0px;
	bottom: 0px;

	padding-bottom: 25vh;	

	overflow: scroll;

	scroll-snap-type: y mandatory;

	@media (${onMobileAspectRatio}) {
		scroll-snap-type: none;
	}
`

const ScreenContent = styled.div`
	width: 100vw;
	height: 100vh;

	background: #555;
	color: #bbb;

	display: grid;
	place-items: center;

	scroll-snap-align: center;
`

const ProjectsHeader = styled.div`
	background: rgba(0,0,0,0.7);
	color: #eee;
	width: 100vw;

	padding: 1vh 0vh;

	position: sticky;
	top: 0vh;
`

const Project = styled.div`
	width: 60vh;
	height: 60vh;

	margin-top: 5vh;
	margin-bottom: 5vh;

	background: #ddd;
	color: #555;

	display: grid;
	place-items: center;

	scroll-snap-align: center;

	@media (${onMobileAspectRatio}) {
		width: 100vw;
		height: 100vw;

		margin-top: 5vw;
		margin-bottom: 5vw;
	}
`