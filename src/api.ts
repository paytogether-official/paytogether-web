import axios, { AxiosInstance } from "axios";
import { useCommon } from "store/useCommon";

/*
    axios 인스턴스를 생성합니다.
    생성할때 사용하는 옵션들 (baseURL, timeout, headers 등)은 다음 URL에서 확인할 수 있습니다.
    https://github.com/axios/axios 의 Request Config 챕터 확인
*/
const instance: AxiosInstance = axios.create();
// const instance = axios.create({
//   baseURL: "https://api.paytogether.kr", // API 기본 URL
//   timeout: 5000, // 요청 제한 시간
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

/*
    1. 요청 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 요청 바로 직전 - 인자값: axios config
    2) 요청 에러 - 인자값: error
*/
instance.interceptors.request.use(
  function (config: any) {
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
    useCommon.setState({
      isLoading: true
    });

    return config;
  },
  function (error: any) {
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  }
);

/*
    2. 응답 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 응답 정성 - 인자값: http response
    2) 응답 에러 - 인자값: http error
*/
instance.interceptors.response.use(
  function (response: any) {
    useCommon.setState({
      isLoading: false
    });
    /*
        http status가 200인 경우
        응답 바로 직전에 대해 작성합니다.
        .then() 으로 이어집니다.
    */
    return response;
  },

  function (error: any) {
    /*
        http status가 200이 아닌 경우
        응답 에러 처리를 작성합니다.
        .catch() 으로 이어집니다.
    */
    useCommon.setState({
      isLoading: false
    });

    return Promise.reject(error);
  }
);

// 생성한 인스턴스를 익스포트 합니다.
export default instance;
