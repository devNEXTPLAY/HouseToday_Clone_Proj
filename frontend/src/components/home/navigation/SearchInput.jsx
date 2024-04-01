import { IoIosSearch } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

import classes from './css/SearchInput.module.css'

const SearchInput = ({ ...props }) => {
    const navigate = useNavigate()

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?keyword=${e.target.value}`)
        }
    }

    return (
        <div className={classes.search}>
            <span>
                <IoIosSearch size="24" color="#2F3438" />
            </span>

            <input {...props} onKeyDown={handleKeyDown} placeholder="통합 검색" />
        </div>
    )
}

export default SearchInput
