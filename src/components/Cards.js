import React from 'react';
import { CardItem } from './Card';
import './styles/Cards.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Cards() {
	const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
	const [row1Ref, row1Visible] = useScrollAnimation({ threshold: 0.2 });
	const [row2Ref, row2Visible] = useScrollAnimation({ threshold: 0.2 });

	return (
		<div className='cards' id="projects">
			<h1 ref={titleRef} className={`fade-in-up ${titleVisible ? 'visible' : ''}`}>Check out my projects</h1>
			<div className='cards__container'>
				<div className='cards__wrapper'>

					<ul ref={row1Ref} className={`cards__items fade-in-up ${row1Visible ? 'visible' : ''}`}>
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
					<ul ref={row2Ref} className={`cards__items fade-in-up ${row2Visible ? 'visible' : ''}`}>
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
