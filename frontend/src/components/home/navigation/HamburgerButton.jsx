import { useState } from 'react'

import { RxHamburgerMenu } from 'react-icons/rx'

import classes from './css/HamburgerButton.module.css'
import HamburgerNav from './HamburgerNav'

const HamburgerButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleIsOpen = () => setIsOpen((prevIsOpen) => !prevIsOpen)

    return (
        <>
            <button className={classes.hamburger} onClick={handleIsOpen}>
                <RxHamburgerMenu />
            </button>

            {isOpen && <HamburgerNav onOff={handleIsOpen} />}
        </>
    )
}

export default HamburgerButton
