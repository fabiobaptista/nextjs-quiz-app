import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/Http'
import axios, { AxiosResponse, AxiosStatic } from 'axios'

export default class AxiosHttpClient implements HttpClient {
  private readonly client: AxiosStatic

  constructor() {
    this.client = axios
  }
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await this.client.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      axiosResponse = (error as AxiosResponse)
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}