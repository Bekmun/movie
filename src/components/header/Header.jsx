import React, { useState, useEffect } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc"
import { useNavigate, useLocation } from "react-router-dom"

import "./header.scss"

import ContentWrapper from "../contentWrapper/ContentWrapper"
import logo from "../../assets/movix-logo.svg"

const Header = () => {
	const [show, setShow] = useState("top")
	const [lastScrollY, setLastScrollY] = useState(0)
	const [mobileMenu, setMobileMenu] = useState(false)
	const [query, setQuery] = useState("")
	const [showSearch, setShowSearch] = useState("")
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location])

	const controNavbar = () => {
		if (window.scrollY > 200) {
				if (window.scrollY > lastScrollY && !mobileMenu) {
					setShow('hide')
				} else {
					setShow('show')
				}
			} else {
				setShow('top')
			}
			setLastScrollY(window.scrollY)
	}

	useEffect(() => {
		window.addEventListener('scroll', controNavbar)
		return () => {
			window.removeEventListener('scroll', controNavbar)
		}
	}, [lastScrollY])

	const searchQueryHandler = (event) => {
		if (event.key === 'Enter' && query.length > 0) {
			navigate(`/search/${query}`)
			setTimeout(() => {
				setShowSearch(false)
			}, 1000)
		}
	}

	const openSearch = () => {
		setMobileMenu(false)
		setShowSearch(true)
	}

	const openModuleMenu = () => {
		setMobileMenu(true)
		setShowSearch(false)
	}

	const navigationHeader = (type) => {
		if (type === 'movie') {
			navigate('/explore/movie')
		} else {
			navigate('/explore/tv')
		}
		setMobileMenu(false)
	}

	return (
		<header className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
			<ContentWrapper>
				<div className="logo" onClick={() => navigate('/')}>
						<img src={logo} alt='Логотип сайта' />
				</div>
				<ul className="menu-list">
					<li className="menu-list__item" onClick={() => navigationHeader('movie')}>Фильмы</li>
					<li className="menu-list__item" onClick={() => navigationHeader('tv')}>Сериалы</li>
					<li className="menu-list__item"><HiOutlineSearch onClick={openSearch} /></li>
				</ul>
				<div className="module-menu">
					<HiOutlineSearch onClick={openSearch} />
					{mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openModuleMenu} />}
				</div>
			</ContentWrapper>
			{showSearch && <div className="search-bar">
				<ContentWrapper>
					<div className="search-bar__input">
						<input type='text' placeholder='Поиск...' onKeyUp={searchQueryHandler}
							onChange={e => setQuery(e.target.value)} />
							<VscChromeClose onClick={() => setShowSearch(false)} />
					</div>
				</ContentWrapper>
			</div>}
		</header>
	)
}

export default Header;