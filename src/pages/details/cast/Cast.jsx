import React from "react"
import { useSelector } from "react-redux"

import "./cast.scss"

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import Img from "../../../components/lazyLoadImage/Img"
import avatar from "../../../assets/avatar.png"

const Cast = ({ data, loading }) => {
	const { url } = useSelector((state) => state.home)

	const skeleton = () => {
		return (
			<div className="skItem">
				<div className="circle skeleton"></div>
				<div className="row skeleton"></div>
				<div className="row2 skeleton"></div>
			</div>
		)
	}
	return (
		<section className="castSection">
			<ContentWrapper>
				<h2 className="sectionHeading">Актеры</h2>
				{!loading ? (
					<div className="listItems">
						{data?.map((item) => {
							let imgUrl = item.profile_path ? url.profile + item.profile_path : avatar
							return (
								<article key={item.id} className="listItem">
									<div className="profileImg">
										<Img src={imgUrl} />
									</div>
									<h3 className="name">{item.name}</h3>
									<span className="character">{item.character}</span>
								</article>
							)
						})}
					</div>
				) : (
					<div className="castSkeleton">
						{skeleton()}
						{skeleton()}
						{skeleton()}
						{skeleton()}
						{skeleton()}
						{skeleton()}
					</div>
				)}
			</ContentWrapper>
		</section>
	)
}
export default Cast
