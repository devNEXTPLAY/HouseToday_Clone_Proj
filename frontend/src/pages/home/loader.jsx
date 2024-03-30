import { defer } from 'react-router-dom'

const loadDataHousewarmingParty = async () => {
    const response = await fetch('http://localhost:3005/api/blog/list/0/?code=1')

    if (!response.ok) {
        throw new Error('서버 오류')
    } else {
        const responseData = await response.json()
        return responseData
    }
}

export const loaderHousewarmingParty = () => {
    return defer({
        data: loadDataHousewarmingParty(),
    })
}

const loadDataKnowHow = async () => {
    const response = await fetch('http://localhost:3005/api/blog/list/1/?code=1')

    if (!response.ok) {
        throw new Error('서버 오류')
    } else {
        const responseData = await response.json()
        return responseData
    }
}

export const loaderKnowHow = () => {
    return defer({
        data: loadDataKnowHow(),
    })
}

const loadDataHousePhoto = async () => {
    const response = await fetch('http://localhost:3005/api/blog/list/2/?code=1')

    if (!response.ok) {
        throw new Error('서버 오류')
    } else {
        const responseData = await response.json()
        return responseData
    }
}

export const loaderHousePhoto = () => {
    return defer({
        data: loadDataHousePhoto(),
    })
}
