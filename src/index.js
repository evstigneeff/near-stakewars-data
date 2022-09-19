const { getValidators, getBlocksUptime, getChunksUptime, getKickedOut, getSeatPrice, getTotalStake } = require("./api_requests")
const fsPromises = require('fs').promises
const path = require("path")
const filePath = path.join(__dirname, '/file')

const getData = async () => {
const resp1 = await getValidators()
const resp2 = await getKickedOut()
const resp3 = await getBlocksUptime()
const resp4 = await getChunksUptime()
const resp5 = await getSeatPrice()
const resp6 = await getTotalStake()

return [resp1, resp2, resp3, resp4, resp5, resp6]

}

const createFile = async (data) => {
        try {
            await fsPromises.writeFile(filePath, data)
        } catch (err) {
            console.error('Error occured while reading directory!', err);
        }
    }

createFile(getData())








