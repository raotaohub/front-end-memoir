declare global {
	namespace NodeJS {
		interface Process {
			/**
			 * 是否是开发环境
			 */
			IS_DEV: boolean
		}
	}
}

export {}
