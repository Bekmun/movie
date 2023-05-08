import React, { useState } from "react"

import "./videoSection.scss"

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import { PlayIcon } from "../PlayIcon"
import VideoPopup from "../../../components/videoPopup/VideoPopup"
import Img from "../../../components/lazyLoadImage/Img"

const VideosSection = ({ data, loading }) => {
	const [show, setShow] = useState(false)
	const [videoId, setVideoId] = useState(null)

	const loadingSkeleton = () => {
		return (
			<div className="skItem">
				<div className="thumb skeleton"></div>
				<div className="row skeleton"></div>
				<div className="row2 skeleton"></div>
			</div>
		)
	}

	return (
		<section className="videosSection">
			<ContentWrapper>
				<h2 className="sectionHeading">Официальные видео</h2>
				{!loading ? (
					<div className="videos">
						{data?.results?.map((video) => (
							<div key={video.id} className="videoItem" onClick={() => {
								setVideoId(video.id)
								setShow(true)
							}}>
								<div className="videoThumbnail">
									<Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
									<PlayIcon />
								</div>
								<span className="videoTitle">{video.name}</span>
							</div>
						))}
					</div>
				) : (
					<div className="videoSkeleton">
						{loadingSkeleton()}
						{loadingSkeleton()}
						{loadingSkeleton()}
						{loadingSkeleton()}
					</div>
				)}
			</ContentWrapper>
			<VideoPopup
				show={show}
				setShow={setShow}
				videoId={videoId}
				setVideoId={setVideoId}
			/>
		</section>
	);
};

export default VideosSection