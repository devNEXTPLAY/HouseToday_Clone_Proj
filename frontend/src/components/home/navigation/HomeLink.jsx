import { Link } from 'react-router-dom'

import { TextLogo } from '../../../assets/TextLogo'

const HomeLink = () => {
    return (
        <Link to="/">
            <TextLogo />
        </Link>
    )
}

export default HomeLink
