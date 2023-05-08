import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import Select from "react-select"

import "./explore.scss"

import useFetch from "../../hook/useFetch"
import { fetchDataFromApi } from "../../utils/api"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import MovieCard from "../../components/movieCard/MovieCard"
import Spinner from "../../components/spinner/Spinner"

let filters = {}

const sortbyData = [
	{ value: "popularity.desc", label: "Популярность по убыванию" },
	{ value: "popularity.asc", label: "Популярность по возрастанию" },
	{ value: "vote_average.desc", label: "Рейтинг по убыванию" },
	{ value: "vote_average.asc", label: "Рейтинг по возрастанию" },
	{
		value: "primary_release_date.desc",
		label: "Дата выпуска по убыванию",
	},
	{ value: "primary_release_date.asc", label: "Дата выпуска по возрастанию" },
	{ value: "original_title.asc", label: "Название (А-Я)" },
]

const Explore = () => {
	const [data, setData] = useState(null)
	const [pageNum, setPageNum] = useState(1)
	const [loading, setLoading] = useState(false)
	const [genre, setGenre] = useState(null)
	const [sortby, setSortby] = useState(null)
	const { mediaType } = useParams()

	const { data: genresData } = useFetch(`/genre/${mediaType}/list`)

	const fetchInitialData = () => {
		setLoading(true)
		fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
			setData(res)
			setPageNum((prev) => prev + 1)
			setLoading(false)
		})
	}

	const fetchNextPageData = () => {
		fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then((res) => {
			if (data?.results) {
				setData({
					...data,
					results: [...data?.results, ...res.results],
				});
			} else {
				setData(res);
			}
			setPageNum((prev) => prev + 1)
		})
	}

	useEffect(() => {
		filters = {}
		setData(null)
		setPageNum(1)
		setSortby(null)
		setGenre(null)
		fetchInitialData()
	}, [mediaType])

	const onChange = (selectedItems, action) => {
		if (action.name === "sortby") {
			setSortby(selectedItems)
			if (action.action !== "clear") {
				filters.sort_by = selectedItems.value
			} else {
				delete filters.sort_by
			}
		}

		if (action.name === "genres") {
			setGenre(selectedItems)
			if (action.action !== "clear") {
				let genreId = selectedItems.map((g) => g.id)
				genreId = JSON.stringify(genreId).slice(1, -1)
				filters.with_genres = genreId
			} else {
				delete filters.with_genres
			}
		}

		setPageNum(1)
		fetchInitialData()
	};

	return (
		<div className="explorePage">
			<ContentWrapper>
				<div className="pageHeader">
					<div className="pageTitle">
						{mediaType === "tv" ? "Все сериалы" : "Все фильмы"}
					</div>
					<div className="filters">
						<Select
							isMulti
							name="genres"
							value={genre}
							closeMenuOnSelect={false}
							options={genresData?.genres}
							getOptionLabel={(option) => option.name}
							getOptionValue={(option) => option.id}
							onChange={onChange}
							placeholder="Выберите жанры"
							className="react-select-container genresDD"
							classNamePrefix="react-select"
						/>
						<Select
							name="sortby"
							value={sortby}
							options={sortbyData}
							onChange={onChange}
							isClearable={true}
							placeholder="Сортировать по"
							className="react-select-container sortbyDD"
							classNamePrefix="react-select"
						/>
					</div>
				</div>
				{loading && <Spinner initial={true} />}
				{!loading && (
					<>
						{data?.results?.length > 0 ? (
							<InfiniteScroll
								className="content"
								dataLength={data?.results?.length || []}
								next={fetchNextPageData}
								hasMore={pageNum <= data?.total_pages}
								loader={<Spinner />}
							>
								{data?.results?.map((item, index) => {
									if (item.media_type === "person") return;
									return (
										<MovieCard
											key={index}
											data={item}
											mediaType={mediaType}
										/>
									);
								})}
							</InfiniteScroll>
						) : (
							<span className="resultNotFound">
								Sorry, Results not found!
							</span>
						)}
					</>
				)}
			</ContentWrapper>
		</div>
	);
};

export default Explore;