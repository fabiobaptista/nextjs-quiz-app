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
      response = await this.fetch(
        data.url,
        {
          method: data.method.toUpperCase(),
          headers: data.headers,
          body: data.body
        }
      )
      switch(response.status) {
        case 200:
        case 201:  
          body = await response.json()
        break
        case 404: 
          body = response.json()
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