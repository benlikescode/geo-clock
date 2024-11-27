import { FC } from 'react'

const Spinner: FC = () => {
  return (
    <svg className={'h-10 w-10 fill-[#dadbdd] animate-spin'} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.542 1.487A21.507 21.507 0 00.5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 00-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 10-.9-2.863z"></path>
    </svg>
  )
}

export default Spinner