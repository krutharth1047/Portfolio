import React from 'react';
import { CardItem } from './Card';
import './styles/Cards.css';

function Cards() {
	return (
		<div className='cards' id="projects">
			<h1>Check out my projects</h1>
			<div className='cards__container'>
				<div className='cards__wrapper'>
					
					<ul className='cards__items'>
						<CardItem
							src='images/glucoguide.webp'
							text='Python-based project focused on healthcare data insights and tracking.'
							label='Glucoguide'
							path='https://github.com/krutharth1047/Glucoguide'
						/>
						<CardItem
							src='images/agrismart.png.avif'
							text='Smart agriculture platform built using PHP to improve farming solutions.'
							label='AgriSmart'
							path='https://github.com/krutharth1047/AgriSmart'
						/>
					</ul>
					<ul className='cards__items'>
						<CardItem
							src='images/autopilotnet.jpg'
							text='Python project implementing autonomous navigation/control concepts.'
							label='Autopilotnet'
							path='https://github.com/krutharth1047/Autopilotnet'
						/>
						<CardItem
							src='images/storysign.jpeg'
							text='Python-based project exploring sign recognition / accessibility solutions.'
							label='StorySign'
							path='https://github.com/krutharth1047/StorySign'
						/>
					</ul>
					
					
	
					
				</div>
			</div>
		</div>
	);
}

export default Cards;
