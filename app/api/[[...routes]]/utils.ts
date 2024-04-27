import sdk from '@api/reservoirprotocol';
import { Network, Alchemy } from 'alchemy-sdk'

const reservoirUrl = 'https://api-arbitrum.reservoir.tools'
const prohibitionBaseAddress = '0x47A91457a3a1f700097199Fd63c039c4784384aB'

const alchemySettings = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.BASE_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(alchemySettings);

async function GetContracts(contractAddress?: string) {
    if (!contractAddress) {
        contractAddress = prohibitionBaseAddress
    }

    await sdk.auth(`${process.env.RESERVOIR_API_KEY}`);
    await sdk.server(reservoirUrl);
    let response = await sdk.getCollectionsV7({
        community: 'prohibition',
        // sortBy: 'createdAt',
        accept: '*/*',
    })

    if (!response || !response.data || !response.data.collections) {
        return []
    }

    return response.data.collections
}

function ReverseSplitString(str: string | undefined, separator: string) {
    if (!str) {
        return ""
    }

    const arr = str.split(separator);

    const reversedArr = arr.reverse();

    const reversedString = reversedArr.join(separator);

    return reversedString;
}

function GetAlchemyTokenInfo(tokenId: number) {
    // let alchemyOptions = {
    //     contractAddresses: [contractAddress]
    // }
    // const ownedNfts = await alchemy.nft.getNftsForOwner(address, alchemyOptions)
    // if (ownedNfts.ownedNfts.length > 0) {
    //     hasToken = true;
    // }
}

export { GetContracts, ReverseSplitString, prohibitionBaseAddress }