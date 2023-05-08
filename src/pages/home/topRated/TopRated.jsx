import React, { useState } from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {
	const [endpoint, setEndpoint] = useState('movie')
	const { data, loading } = useFetch(`/${endpoint}/top_rated`)
	const onTabChange = (tab) => {
		setEndpoint(tab === 'Фильмы' ? 'movie' : 'tv')
	}

	return (
		<section className='carousel-trend'>
			<ContentWrapper>
				<h2 className='carousel-trend__title'>Высокие рейтинги</h2>
				<SwitchTabs data={['Фильмы', 'Телешоу']} onTabChange={onTabChange} />
			</ContentWrapper>
			<Carousel data={data?.results} loading={loading} endpoint={endpoint} />
		</section>
	)
}

export default TopRated