import { SantaMessageApiRequest } from "@/type/SantaMessageApiRequest"
import { SantaMessageApiResponse } from "@/type/SantaMessageApiResponse"

const UNKNOWN_API_RESPONSE_DATA = "Something went wrong, please try again later"

export const sendMessageToSanta = async ( 
  user_id: string,
  gift_message: string
) => {

  const message = {
    user_id,
    gift_message,
  } as SantaMessageApiRequest

  const res = await fetch("/api/santa_message", {
    method: 'POST',
    body: JSON.stringify( message)
  }).then(async (res) => {
    return res
  }).catch((err) => {
    console.log("Error sendMessageToSanta ::", err)
    throw Error(err)
  })

  const resData = await res.json() as SantaMessageApiResponse
  if (!resData) {
    throw Error(UNKNOWN_API_RESPONSE_DATA)
  }
  return resData
}