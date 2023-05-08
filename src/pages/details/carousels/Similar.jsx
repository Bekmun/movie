import React from 'react'
import useFetch from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Similar = ({ mediaType, id }) => {
	const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`)

	const title = mediaType === 'tv' ? 'Похожие сериалы' : 'Похожие фильмы'

	return (
		<Carousel
			title={title}
			data={data?.results}
			loading={loading}
			endpoint={mediaType}
		/>
	)
}

export default Similar