import instance, { get } from '../core/request'

export const getBanner = () => {
	return get('/banner')
}

export const getRecommendList = () => {
	return get('/personalized')
}

/* 推荐页专辑歌单 */
export const getRankTopList = () => {
	return get('/toplist/detail')
}
