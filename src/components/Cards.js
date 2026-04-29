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
							text='Generative AI-based conversational assistant for diabetic patients with predictive health analytics and data visualization.'
							label='Glucoguide'
							path='https://github.com/krutharth1047/Glucoguide'
							tags={['Python', 'Generative AI', 'Healthcare']}
						/>
						<CardItem
							src='images/agrismart.png.avif'
							text='AI-driven platform for crop prediction, fertilizer guidance, and yield forecasting with GPT and Stripe API integration.'
							label='AgriSmart'
							path='https://github.com/krutharth1047/AgriSmart'
							tags={['Full Stack', 'GPT API', 'Stripe']}
						/>
					</ul>
					<ul ref={row2Ref} className={`cards__items fade-in-up ${row2Visible ? 'visible' : ''}`}>
						<CardItem
							src='images/autopilotnet.jpg'
							text='Deep learning model to predict steering angles for autonomous vehicles using NVIDIA end-to-end learning framework.'
							label='Autopilotnet'
							path='https://github.com/krutharth1047/Autopilotnet'
							tags={['Deep Learning', 'PyTorch', 'Computer Vision']}
						/>
						<CardItem
							src='images/storysign.jpeg'
							text='Python-based project exploring sign recognition and accessibility solutions using computer vision techniques.'
							label='StorySign'
							path='https://github.com/krutharth1047/StorySign'
							tags={['Python', 'OpenCV', 'Accessibility']}
						/>
					</ul>

				</div>
			</div>
		</div>
	);
}

export default Cards;