import { Link } from 'react-router-dom'

import { TextLogo } from '../../../assets/TextLogo'

import classes from './css/HomeLink.module.css'

const HomeLink = () => {
    return (
        <Link to="/" className={classes.link}>
            <TextLogo />
        </Link>
    )
}

export default HomeLink
