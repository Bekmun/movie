import React, { useState } from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Popular = () => {
	const [endpoint, setEndpoint] = useState('movie')
	const { data, loading } = useFetch(`/${endpoint}/popular`)
	const onTabChange = (tab) => {
		setEndpoint(tab === 'Фильмы' ? 'movie' : 'tv')
	}

	return (
		<section className='carousel-trend'>
			<ContentWrapper>
				<h2 className='carousel-trend__title'>Популярные</h2>
				<SwitchTabs data={['Фильмы', 'Сериалы']} onTabChange={onTabChange} />
			</ContentWrapper>
			<Carousel data={data?.results} loading={loading} endpoint={endpoint} />
		</section>
	)
}

export default Popular