/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { pinata } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { sql } from '@vercel/postgres';
import { GetContracts, prohibitionBaseAddress, ReverseSplitString } from './utils'


const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  hub: {
    apiUrl: "https://hubs.airstack.xyz",
    fetchOptions: {
      headers: {
        "x-airstack-hubs": process.env.AIRSTACK_API_KEY ? process.env.AIRSTACK_API_KEY : "",
      }
    }
  },
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  return c.res({
    action: '/framemanager',
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to right, #432889, #17101F)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        > Mint a Day Manager
        </div>
      </div>
    ),
    intents: [
      <Button>Enter</Button>,
    ]
  })
})

app.frame('/collection/:range', async (c) => {
  // 0x47a91457a3a1f700097199fd63c039c4784384ab:127000000:127999999
  const { range } = c.req.param()

  if (!range) {
    return ReturnUnverified(c, "Invalid contract address")
  }

  const contractInfo = range.split(':')

  if (contractInfo.length != 2) {
    return ReturnUnverified(c, "Invalid contract address")
  }

  const startId = contractInfo[0]
  const endId = contractInfo[1]

  const response = await GetContracts(`${prohibitionBaseAddress}:${range}`)
  if (response.length <= 0) {
    return ReturnUnverified(c, "Unable to find contract details")
  }

  const contract = response[0]
  console.log(contract)
  const name = contract.name
  const image = contract.image
  const descriptionRaw = contract.description

  let description = ReverseSplitString(descriptionRaw, '\r\n')
  description = description.replaceAll('\r', '')

  const url = contract.externalUrl

  var intents = [
    <Button action={`/view/${range}`}>Explore Collection</Button>
  ]

  if (url) {
    intents.push(<Button.Redirect location={`${url}`}>More Info</Button.Redirect>)
  }

  var descriptionDiv = []
  if (description) {
    descriptionDiv.push(<div
      style={{
        color: 'white',
        fontSize: 20,
        fontStyle: 'normal',
        letterSpacing: '-0.025em',
        lineHeight: 1.4,
        marginTop: 10,
        padding: '0 120px',
        whiteSpace: 'pre-wrap'
      }}
    >
      {`${description}`}
    </div>)
  }

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:'linear-gradient(to right, #432889, #17101F)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'black',
            fontSize: 30,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap'
          }}
        >
          {`${name}`}
        </div>
        {descriptionDiv}
        <img src={`${image}`}   style={{
            marginTop: 30,
            maxWidth: '300', /* Set maximum width */
            maxHeight: '300px', /* Set maximum height */
            alignSelf: 'center', /* Align image to center horizontally */
        }}/>
      </div>
    ),
    imageAspectRatio: "1:1",
    intents
  })
})

app.frame('/view/:range/:token', async (c) => {
  // 0x47a91457a3a1f700097199fd63c039c4784384ab:127000000:127999999
  const { range, token } = c.req.param()

  if (!range) {
    return ReturnUnverified(c, "Invalid contract address")
  }

  const contractInfo = range.split(':')

  if (contractInfo.length != 2) {
    return ReturnUnverified(c, "Invalid contract address")
  }

  const startId = contractInfo[0]
  const endId = contractInfo[1]

  const response = await GetContracts(`${prohibitionBaseAddress}:${range}`)
  if (response.length <= 0) {
    return ReturnUnverified(c, "Unable to find contract details")
  }

  let tokenId = 0
  if (!token) {
    tokenId = parseInt(startId)
  } else {
    tokenId = parseInt(token)
  }

  const contract = response[0]
  console.log(contract)
  const name = contract.name
  const image = contract.image
  const descriptionRaw = contract.description

  let description = ReverseSplitString(descriptionRaw, '\r\n')
  description = description.replaceAll('\r', '')

  const url = contract.externalUrl

  var intents = [
    <Button action={`/view/${range}`}>Next</Button>,
    <Button action={`/view/${range}`}>Random</Button>
  ]

  if (url) {
    intents.push(<Button.Redirect location={`${url}`}>More Info</Button.Redirect>)
  }

  var descriptionDiv = []
  if (description) {
    descriptionDiv.push(<div
      style={{
        color: 'white',
        fontSize: 20,
        fontStyle: 'normal',
        letterSpacing: '-0.025em',
        lineHeight: 1.4,
        marginTop: 10,
        padding: '0 120px',
        whiteSpace: 'pre-wrap'
      }}
    >
      {`${description}`}
    </div>)
  }

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:'linear-gradient(to right, #432889, #17101F)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'black',
            fontSize: 30,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap'
          }}
        >
          {`${name}`}
        </div>
        {descriptionDiv}
        <img src={`${image}`}   style={{
            marginTop: 30,
            maxWidth: '300', /* Set maximum width */
            maxHeight: '300px', /* Set maximum height */
            alignSelf: 'center', /* Align image to center horizontally */
        }}/>
      </div>
    ),
    imageAspectRatio: "1:1",
    intents
  })
})

app.frame('/framemanager', async (c) => {
  const { verified, frameData } = c

  if (!verified) {
    return ReturnUnverified(c, "Please login to Farcaster")
  }
  const { fid } = frameData || {}

  const response = await GetContracts()
  // console.log(response)
  
  if (!fid) {
    return ReturnUnverified(c, "Unable to resolve FID . . .")
  }

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:'linear-gradient(to right, #432889, #17101F)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 40,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {`Done`}
        </div>
      </div>
    )
  })
})

function ReturnUnverified(c: any, message: string) {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:'linear-gradient(to right, #432889, #17101F)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 30,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {`${message}`}
        </div>
      </div>
    ),
  })
}

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
