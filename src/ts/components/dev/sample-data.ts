import { ProjectData } from '../project-details'

import TestVideo from '../../../assets/video/test.mp4'
import { text } from './lorem-ipsum'

export const sampleProject:ProjectData = {
	id : `VerkehrsmuseumRemise`,
	title : `Verkehrsmuseum Remise`,
	info : `Work: Design & Development  \nClient: Wiener Linien  \nAgency: [Zone Media](https://www.zonemedia.at/)`,
	description : `Project Description, [dkat](https://www.danielkauer.at/) ${text}\n\n${text}`,
	image : 'https://placehold.co/800x800',
	media : [TestVideo, 'https://placehold.co/800x800', 'https://placehold.co/1920x1080', 'https://placehold.co/90x160']
}

export const sampleProject2:ProjectData = {
	id : `Schlossbergmuseum`,
	title : `Schlossbergmuseum Graz`,
	info : `Work: Development  \nClient: Graz Museum  \nAgency: [Zone Media](https://www.zonemedia.at/)`,
	description : `Project Description, [dkat](https://www.danielkauer.at/) ${text}\n\n${text}`,
	image : 'https://placehold.co/800x800',
	media : [TestVideo, 'https://placehold.co/800x800', 'https://placehold.co/1920x1080', 'https://placehold.co/90x160']
}

export const longTitle:ProjectData = {
	id : `LongTitle`,
	title : `Ein Projekt mit einem  \nwirklich langem Titel`,
	info : `Work: Development  \nClient: Graz Museum  \nAgency: [Zone Media](https://www.zonemedia.at/)`,
	description : `Project Description, [dkat](https://www.danielkauer.at/).  \nDafür nur ein ganz kurzer Beschreibungstext.`,
	image : 'https://placehold.co/800x800',
	media : [TestVideo, 'https://placehold.co/800x800', 'https://placehold.co/1920x1080', 'https://placehold.co/90x160']
}

export const singleMedia:ProjectData = {
	id : `SingleMedia`,
	title : `Single Media`,
	info : `Work: Design & Development  \nClient: Wiener Linien  \nAgency: [Zone Media](https://www.zonemedia.at/)`,
	description : `Project Description, [dkat](https://www.danielkauer.at/) ${text}`,
	image : 'https://placehold.co/800x800',
	media : [TestVideo]
}

export const sampleProjects = [sampleProject, sampleProject2, longTitle, singleMedia, sampleProject]
