import React, { useState } from 'react'
import './switchTabs.scss'

const SwitchTabs = ({ data, onTabChange }) => {
	const [selectedTab, setSelectedTab] = useState(0)
	const [left, setLeft] = useState(0)

	const activeTab = (tab, index) => {
		setLeft(index * 100)
		setTimeout(() => {
			setSelectedTab(index)
		}, 300)
		onTabChange(tab, index)
	}

	return (
		<div className='switching-tabs'>
			<div className='switching-tabs__list'>
				{data.map((tab, index) => (
					<span key={index} 
					className={`switching-tabs__item ${selectedTab === index ? 'active' : ''}`}
						onClick={() => activeTab(tab, index)}>
						{tab}
					</span>
				))}
				<span className='switching-tabs__moving-bg' style={{ left }} />
			</div>
		</div>
	)
}

export default SwitchTabs