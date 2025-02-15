import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const baseUrl = 'https://bing-search-apis.p.rapidapi.com/api/rapid/web_search?keyword=how-to-use-excel-for-free&page=0&size=30';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', 'cb701cde5fmsh4bd34d057899688p1c7128jsn8ee7b083f275');
      headers.set('x-rapidapi-host', 'bing-search-apis.p.rapidapi.com');
      // headers.set('X-BingApis-SDK', 'true');
      // headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({newsCategory, count}) => `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
