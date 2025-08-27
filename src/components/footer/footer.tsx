import { useEffect, useState } from 'react'
import styled from 'styled-components'



const FooterContainer = ({ className }) => {
    const [city, setCity] = useState('')
    const [temp, setTemp] = useState('')
    const [description, setDescription] = useState('')

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Krasnodar&units=metric&lang=ru&appid=745016c12ea5c40becf9d05ffed039c3',
		)
			.then((data) => data.json())
			.then(({name, main, weather}) => {
                setCity(name)
                setTemp(String(Math.round(main.temp)))
                setDescription(weather[0].description)
            })
	}, [])
	return (
		<footer className={className}>
			<div>
				<div>weblog</div>
				<div>web@developer.com</div>
			</div>
			<div>
                <div>{city}, {new Date().toLocaleString('ru', {day: 'numeric', month: 'long'})}</div>
                <div> {temp} градусов, {description}</div>
			</div>
		</footer>
	)
}

export const Footer: any = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	padding: clamp(13px, 1.39vw, 20px) clamp(27px, 2.78vw, 40px);
	box-shadow: 0px 2px 17px #000;
    line-height: 20px
`
