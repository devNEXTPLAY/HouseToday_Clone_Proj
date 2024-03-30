import { CiBellOn } from 'react-icons/ci'

import Button from '../../ui/Button'
import classes from './css/Notification.module.css'

const NotificationButton = () => {
    return (
        <button className={classes.notification}>
            <CiBellOn />
        </button>
    )
}

export default NotificationButton
