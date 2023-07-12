import { ProjectData } from '../project-details'

import TestVideo from '../../../assets/video/test.mp4'
import { text } from './lorem-ipsum'

export const sampleProject:ProjectData = {
	title : `Verkehrsmuseum Remise`,
	info : `Work: Design & Development  \nClient: Wiener Linien  \nAgency: [Zone Media](https://www.zonemedia.at/)`,
	description : `Project Description, [dkat](https://www.danielkauer.at/) ${text}\n\n${text}`,
	media : [TestVideo, 'https://placehold.co/800x800', 'https://placehold.co/1920x1080', 'https://placehold.co/90x160']
}

export const sampleProjects = [sampleProject, sampleProject, sampleProject, sampleProject, sampleProject]
