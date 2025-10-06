import { ref } from 'vue'

const toasts = ref([])

export const useToast = () => {
	const addToast = (toast) => {
		const id = Date.now() + Math.random()
		const newToast = {
			id,
			type: 'info',
			duration: 5000,
			...toast
		}

		toasts.value.push(newToast)

		// Автоматическое удаление
		if (newToast.duration > 0) {
			setTimeout(() => {
				removeToast(id)
			}, newToast.duration)
		}

		return id
	}

	const removeToast = (id) => {
		const index = toasts.value.findIndex(toast => toast.id === id)
		if (index > -1) {
			toasts.value.splice(index, 1)
		}
	}

	const success = (title, description = '', options = {}) => {
		return addToast({
			type: 'success',
			title,
			description,
			...options
		})
	}

	const error = (title, description = '', options = {}) => {
		return addToast({
			type: 'error',
			title,
			description,
			...options
		})
	}

	const warning = (title, description = '', options = {}) => {
		return addToast({
			type: 'warning',
			title,
			description,
			...options
		})
	}

	const info = (title, description = '', options = {}) => {
		return addToast({
			type: 'info',
			title,
			description,
			...options
		})
	}

	return {
		toasts,
		addToast,
		removeToast,
		success,
		error,
		warning,
		info
	}
}
