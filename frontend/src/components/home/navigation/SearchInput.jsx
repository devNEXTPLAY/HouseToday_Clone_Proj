import { IoIosSearch } from 'react-icons/io'

import classes from './css/SearchInput.module.css'

const SearchInput = ({ ...props }) => {
    return (
        <div className={classes.search}>
            <span>
                <IoIosSearch size="24" color="#2F3438" />
            </span>

            <input {...props} placeholder="통합 검색" />
        </div>
    )
}

export default SearchInput
