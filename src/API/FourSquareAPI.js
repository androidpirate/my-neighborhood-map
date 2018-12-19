class Helper {
  static baseURL() {
    return 'https://api.foursquare.com/v2/'
  }

  static auth() {
    const keys = {
      client_id: 'YDUZ4OQAGKFI1TJZAI1W5TXERR3DRQL3M2ZI2R11YAVEXNUF',
      client_secret: 'QPS55Y2HMQ4SGS5IWZXI55I3UJVCFJHSBVWGVKKP42A3ZZWJ',
      v: '20181201'
    }
   return Object.keys(keys).map(key => `${key}=${keys[key]}`).join('&')
  }

  static urlBuilder(urlParams) {
    if(!urlParams) {
      return ""
    }
    return Object.keys(urlParams)
      .map(key => `${key}=${urlParams[key]}`)
      .join('&')
  }

  static headers() {
    return {
      Accept: "application/json"
    }
  }

  static simpleFetch(endpoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers()
    }
    return fetch(
      `${Helper.baseURL()}${endpoint}?${Helper.auth()}
       &${Helper.urlBuilder(urlParams)}`,
       requestData
    ).then(res => res.json())
  }
}

export default class SquareAPI {
  static searchVenues(urlParams) {
    return Helper.simpleFetch("venues/search", "GET", urlParams)
  }
}
