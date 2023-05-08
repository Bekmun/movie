import React, { useRef } from 'react'
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper"
import Img from "../lazyLoadImage/Img"
import PosterFallback from "../../assets/no-poster.png"
import CircleRating from '../circleRating/CircleRating';
import './carousel.scss'
import Genres from '../genres/Genres';

const Carousel = ({ data, loading, endpoint, title }) => {
	const carouselContainer = useRef()
	const { url } = useSelector((state) => state.home)
	const navigate = useNavigate()

	const navigation = (dir) => {
		const container = carouselContainer.current

		const scrollAmount = dir === 'left' ?
			container.scrollLeft - (container.offsetWidth + 20) :
			container.scrollLeft + (container.offsetWidth + 20)

		container.scrollTo({
			left: scrollAmount,
			behavior: 'smooth'
		})
	}

	const skItem = () => {
		return (
			<div className='skeleton-item'>
				<div className='carousel__poster-block skeleton'></div>
				<div className='carousel__text-block'>
					<div className='skeleton-item__title skeleton'></div>
					<div className='skeleton-item__date skeleton'></div>
				</div>
			</div>
		)
	}

	return (
		<div className='carousel'>
			<ContentWrapper>
			{title && <h2 className='carouselTitle'>{title}</h2>}
				<BsFillArrowLeftCircleFill className='carousel__left arrow'
					onClick={() => navigation('left')}
				/>
				<BsFillArrowRightCircleFill className='carousel__right arrow'
					onClick={() => navigation('right')}
				/>
				{!loading ? (
					<div className='carousel__items' ref={carouselContainer}>
						{data?.map((item) => {
							const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback

							return (
								<article key={item.id} className='carousel__item' onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
									<div className='carousel__poster-block'>
										<Img src={posterUrl} />
										<CircleRating rating={item.vote_average.toFixed(1)} />
										<Genres data={item.genre_ids.slice(0, 2)} />
									</div>
									<div className='carousel__text-block'>
										<h3 className='carousel__title'>
											{item.title || item.name}
										</h3>
										<span className='carousel__date'>
											{dayjs(item.release_Date).format('D MMM, YYYY')}
										</span>
									</div>
								</article>
							)
						})}
					</div>
				) : (
					<div className='loading-skeleton'>
						{skItem()}
						{skItem()}
						{skItem()}
						{skItem()}
						{skItem()}
					</div>
				)}
			</ContentWrapper>
		</div>
	)
}

export default Carousel