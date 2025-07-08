'use client'

export default function StreakControls({onClick, className='', children}) {
	const defaultStyle = ' bg-green-500 text-white px-3 py-1 hover:cursor-pointer hover:bg-green-600';

	return (
		<button onClick={onClick} className={(className + defaultStyle).trimStart()}>{children}</button>
	)
}