import { useEffect, useState } from 'react'

import { api } from '../services/api'

import '../styles/sidebar.scss'

import { Button } from './Button'
interface Genre {
	id: number
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
	title: string
}

interface SidebarProps {
	selectedGenreId: number
	setSelectedGenreId: (setSelectedGenreId: number) => void
}

export function SideBar({ selectedGenreId, setSelectedGenreId }: SidebarProps) {
	const [genres, setGenres] = useState<Genre[]>([])

	useEffect(() => {
		api.get<Genre[]>('genres').then((response) => {
			setGenres(response.data)
		})
	}, [])

	function handleClickButton(id: number) {
		setSelectedGenreId(id)
	}

	return (
		<div className='buttons-container'>
			{genres.map((genre) => (
				<Button
					key={String(genre.id)}
					title={genre.title}
					iconName={genre.name}
					onClick={() => handleClickButton(genre.id)}
					selected={selectedGenreId === genre.id}
				/>
			))}
		</div>
	)
}
