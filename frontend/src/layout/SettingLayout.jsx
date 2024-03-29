import { Outlet } from 'react-router-dom'
import HomeNavigation from '../components/widgets/HomeNavigation'
import { SettingSubNav } from '../components/widgets/SettingSubNav'

const SettingLayout = () => {
    return (
        <>
            <HomeNavigation />
            <SettingSubNav />
            <Outlet />
        </>
    )
}

export default SettingLayout
