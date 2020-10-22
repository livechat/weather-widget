import axios from 'axios'

class LiveChatApiClient {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.livechatinc.com/v3.2',
    })
  }
}

export default LiveChatApiClient
