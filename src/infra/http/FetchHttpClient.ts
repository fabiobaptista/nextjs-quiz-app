import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/Http'

export default class FetchHttpClient implements HttpClient {
  private readonly fetch: any

  constructor() {
    this.fetch = fetch
  }
  async request (data: HttpRequest): Promise<HttpResponse> {
    let body
    let response: Response

    try {
      response = await this.fetch(data.url)

      switch(response.status) {
        case 200: 
          body = await response.json()
        break
        case 404: 
          body = ''
        break
        default:
          body = ''
        break
      }
    } catch (error) {
      response = error as Response
      body = ''
    }
    
    return {
      statusCode: response.status,
      body: body
    }
  }
}