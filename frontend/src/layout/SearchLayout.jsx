import { Outlet } from 'react-router-dom'
import HomeNavigation from '../components/widgets/HomeNavigation'
import Footer from '../components/widgets/Footer'

const SearchLayout = () => {
    return (
        <>
            <HomeNavigation />
            <Outlet />
            <Footer />
        </>
    )
}

export default SearchLayout
