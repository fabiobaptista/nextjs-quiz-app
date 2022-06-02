import AxiosHttpClient from '../infra/http/AxiosHttpClient';
import { HttpClient } from '../data/protocols/Http';
import FetchHttpClient from '../infra/http/FetchHttpClient';

export default class HttpClientFactory {
  static Fetch = (): HttpClient => new FetchHttpClient()
  static Axios = (): HttpClient => new AxiosHttpClient()
}