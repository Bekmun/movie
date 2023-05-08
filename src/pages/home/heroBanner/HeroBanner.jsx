import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './heroBanner.scss'
import useFetch from '../../../hook/useFetch'
import Img from '../../../components/lazyLoadImage/img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const HeroBanner = () => {
	const [background, setBackground] = useState('')
	const [query, setQuery] = useState('')
	const navigate = useNavigate()
	const { url } = useSelector((state) => state.home)

	const { data, loading } = useFetch('/movie/upcoming')

	useEffect(() => {
		const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
		setBackground(bg)
	}, [data])

	const searchQueryHandler = (event) => {
		if (event.key === 'Enter' && query.length > 0) {
			navigate(`/search/${query}`)
		}
	}

	return (
		<section className='heroBanner'>
			{!loading && <div className='backdrop-img'>
				<Img className='img' src={background} />
			</div>}
			<div className='opacity-layer' />
			<ContentWrapper>
				<div className='heroBannerContent'>
					<span className='title'>Добро пожаловать</span>
					<h2 className='subtitle'>
						Миллионы фильмов, телешоу и людей, которых нужно открыть. Исследуйте сейчас.
					</h2>
					<div className='searchInput'>
						<input type='text' placeholder='Поиск фильма или сериала...' onKeyUp={searchQueryHandler}
							onChange={e => setQuery(e.target.value)} />
						<button>Поиск</button>
					</div>
				</div>
			</ContentWrapper>
		</section>
	)
}

export default HeroBanner