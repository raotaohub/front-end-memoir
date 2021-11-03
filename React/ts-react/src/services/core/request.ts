import axios, { AxiosRequestConfig } from 'axios'
import qs from 'querystring'

export const baseUrl = 'http://localhost:3000/' // 本机调试

const IS_DEV = process.env.NODE_ENV === 'development'

const instance = axios.create({
	baseURL: baseUrl,
	timeout: 3000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
instance.defaults.headers.get['Content-Type'] = 'application/json'

instance.interceptors.request.use(request => {
	if (typeof request.data === 'object') request.data = qs.stringify({ ...request.data })
	return request
})

instance.interceptors.response.use(
	response => {
		if (typeof response.data === 'string') response.data = qs.parse(response.data)
		return response.data
	},
	error => {
		return Promise.reject(error)
	}
)

export const get = <T = any>(
	url: string,
	params?: any,
	config?: AxiosRequestConfig<any>
): Promise<T> => {
	return instance.get(url, { params, ...config })
}

export const post = <T = any>(
	url: string,
	params?: any,
	config?: AxiosRequestConfig<any>
): Promise<T> => {
	return instance.post(url, params, config)
}

export default instance
