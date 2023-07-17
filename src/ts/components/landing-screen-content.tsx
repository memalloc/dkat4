import styled from 'styled-components'

interface Props {
	onScrollToProjects : ()=>void	
}

export const LandingScreenContent = (props:Props) => {
	return	<>
				initial screen content placeholder!
				<Button onClick={()=>{
					props.onScrollToProjects()
				}}>
					scroll to projects
				</Button>
			</>
}

// - - - - - - - - - - - - - - - - - - - - - - - - temp

const Button = styled.div`
	color: #555;
	background: #bbb;
	padding: 5px;

	display: inline;

	&:hover {
		background: #ddd;	
		color: #333;	
	}
`
