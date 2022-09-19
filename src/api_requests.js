const initNear = require("./connect")

const blockNum = [1438750, 1448765, 1458768, 1468768, 1478768, 1488769, 1498770, 1508770, 1518775, 1528782,
    1538794, 1548797, 1558802, 1568816, 1578817, 1588822, 1598827, 1608833, 1618840, 1628842, 1638842, 1648844,
    1658850, 1668850, 1678852, 1688852, 1698865, 1708865, 1718865, 1728868, 1738869, 1748870, 1758872, 1768873,
    1778880, 1788880, 1798881, 1808881, 1818884, 1828884, 1838884, 1848884, 1858886, 1868891, 1878894, 1888895,
    1898896, 1908897, 1918898, 1928898, 1938899, 1948899, 1958901, 1968902, 1978918, 1988923, 1998932, 2008938,
    2018939, 2028941, 2038947, 2048951, 2058953, 2068954, 2078955, 2088955, 2098955, 2108955, 2118955, 2128957,
    2138957, 2148957, 2158959, 2168959, 2178959, 2188959, 2198959, 2208959, 2218959, 2228959, 2238959, 2248959,
    2258959, 2268959, 2278959, 2288959, 2298959, 2308959, 2318959, 2328959, 2338959, 2348959, 2358959, 2368959,
    2378959, 2388959, 2398959, 2408959, 2418959, 2428959, 2438959, 2448959, 2458959, 2468959, 2478959, 2488959,
    2498960, 2508960, 2518960, 2528960 ]

const yocto = 1000000000000000000000000


const getValidators = async () => {
    const near = await initNear()
    const array = []

    for await (let el of blockNum) {
        const data = await near.connection.provider.validators(el)

        const validators = data.current_validators
        // Number of validators in epoch
        array.push(validators.length)
    }
    return array
}


const getBlocksUptime = async () => {
    const near = await initNear()
    const array = []

    for await (let el of blockNum) {
        const data = await near.connection.provider.validators(el)
        let totalUptime = 0

        const validators = data.current_validators

        // Average blocks' uptime in epoch
        for (var i = 0; i < validators.length; i++) {
            let individualUptime = (validators[i].num_produced_blocks)/(validators[i].num_expected_blocks)*100
            individualUptime = individualUptime || 0
            totalUptime += individualUptime
        }

        const averageUptime = totalUptime/validators.length
        array.push(averageUptime)
    }
    return array
}

const getChunksUptime = async () => {
    const near = await initNear()
    const array = []

    for await (let el of blockNum) {
        const data = await near.connection.provider.validators(el)
        let totalUptime = 0

        const validators = data.current_validators

        // Average chunks' uptime in epoch
        for (var i = 0; i < validators.length; i++) {
            let individualUptime = (validators[i].num_produced_chunks)/(validators[i].num_expected_chunks)*100
            individualUptime = individualUptime || 0
            totalUptime += individualUptime
        }

        const averageUptime = totalUptime/validators.length
        array.push(averageUptime)
    }
    return array
}

const getKickedOut = async () => {
    const near = await initNear()
    const array1 = []
    const array2 = []
    const array3 = []

    for await (let el of blockNum) {
        const data = await near.connection.provider.validators(el)
        let lowBlocks = 0
        let lowChunks = 0
        let unstaked = 0

        
        const validators = data.prev_epoch_kickout
        // Number of kicked out validators in epoch

        for (var i = 0; i < validators.length; i++) {
            if (validators[i].reason.NotEnoughBlocks) {
                lowBlocks++
            } else if (validators[i].reason.NotEnoughChunks) {
                lowChunks++
            } else {
                unstaked++
            }
        }

        array1.push(lowBlocks)
        array2.push(lowChunks)
        array3.push(unstaked)
        
    }
    return [array1, array2, array3]
}

const getSeatPrice = async () => {
    const near = await initNear()
    const array = []

    for await (let el of blockNum) {
        const data = await near.connection.provider.validators(el)

        const validators = data.current_validators
        // Seat price in epoch
        const seatPrice = parseFloat(validators[validators.length - 1].stake) / yocto
        array.push(seatPrice)
    }
    return array
}

const getTotalStake = async () => {
    const near = await initNear()
    const array = []

    for await (let el of blockNum) {
        const data = await near.connection.provider.validators(el)
        let totalStake = 0

        const validators = data.current_validators
        // Total stake in epoch
        for (var i = 0; i < validators.length; i++) {
            const individualStake = parseFloat(validators[i].stake) / yocto
            totalStake += individualStake
        }
        array.push(totalStake)
    }
    return array
}

module.exports = { getValidators, getBlocksUptime, getChunksUptime, getKickedOut, getSeatPrice, getTotalStake }

