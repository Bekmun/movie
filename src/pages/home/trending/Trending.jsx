import React, { useState } from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import './trending.scss'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {
	const [endpoint, setEndpoint] = useState('day')
	const { data, loading } = useFetch(`/trending/all/${endpoint}`)
	const onTabChange = (tab) => {
		setEndpoint(tab === 'Сегодня' ? 'day' : 'week')
	}

	return (
		<section className='carousel-trend'>
			<ContentWrapper>
				<h2 className='carousel-trend__title'>В тренде</h2>
				<SwitchTabs data={['Сегодня', 'Неделя']} onTabChange={onTabChange} />
			</ContentWrapper>
			<Carousel data={data?.results} loading={loading} />
		</section>
	)
}

export default Trending