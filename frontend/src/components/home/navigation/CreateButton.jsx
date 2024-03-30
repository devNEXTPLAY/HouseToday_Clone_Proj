import { Link } from 'react-router-dom'

import Button from '../../ui/Button'

import classes from './css/CreateButton.module.css'

const CreateButton = () => {
    return (
        <Link to="/write" className={classes.link}>
            <Button>글쓰기</Button>
        </Link>
    )
}

export default CreateButton
