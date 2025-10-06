<template>
	<ToastProvider>
		<ToastRoot v-bind="$attrs" class="toast" :class="{
			'toast--success': type === 'success',
			'toast--error': type === 'error',
			'toast--warning': type === 'warning',
			'toast--info': type === 'info'
		}">
			<ToastTitle class="toast__title">
				<slot name="title">{{ title }}</slot>
			</ToastTitle>
			<ToastDescription class="toast__description">
				<slot name="description">{{ description }}</slot>
			</ToastDescription>
			<ToastAction v-if="action" class="toast__action">
				<slot name="action">{{ action }}</slot>
			</ToastAction>
			<ToastClose class="toast__close">
				<slot name="close">
					<TheClose />
				</slot>
			</ToastClose>
		</ToastRoot>

		<ToastViewport class="toast-viewport" />
	</ToastProvider>
</template>

<script setup>
import TheClose from '@/components/icons/TheClose.vue'
defineProps({
	type: {
		type: String,
		default: 'info',
		validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
	},
	title: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	action: {
		type: String,
		default: ''
	}
})
</script>

<style lang="scss">
.toast {
	display: flex;
	align-items: flex-start;
	gap: 12px;
	min-width: 300px;
	max-width: 400px;
	padding: 16px;
	border-radius: 8px;
	border: 1px solid;
	background-color: hsl(240 10% 3.9%);
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	position: relative;
	overflow: hidden;

	&--success {
		border-color: hsl(142 76% 36%);
		background-color: hsl(142 76% 36% / 10%);

		.toast__title {
			color: hsl(142 76% 36%);
		}
	}

	&--error {
		border-color: hsl(0 62.8% 30.6%);
		background-color: hsl(0 62.8% 30.6% / 10%);

		.toast__title {
			color: hsl(0 62.8% 30.6%);
		}
	}

	&--warning {
		border-color: hsl(38 92% 50%);
		background-color: hsl(38 92% 50% / 10%);

		.toast__title {
			color: hsl(38 92% 50%);
		}
	}

	&--info {
		border-color: hsl(217 91% 60%);
		background-color: hsl(217 91% 60% / 10%);

		.toast__title {
			color: hsl(217 91% 60%);
		}
	}
}

.toast__title {
	font-size: 14px;
	font-weight: 600;
	color: hsl(0 0% 98%);
	margin: 0;
	flex: 1;
}

.toast__description {
	font-size: 13px;
	color: hsl(240 5% 64.9%);
	margin: 4px 0 0 0;
	line-height: 1.4;
}

.toast__action {
	margin-top: 8px;

	button {
		padding: 4px 8px;
		font-size: 12px;
		font-weight: 500;
		border-radius: 4px;
		border: 1px solid currentColor;
		background-color: transparent;
		color: inherit;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			background-color: currentColor;
			color: hsl(240 10% 3.9%);
		}
	}
}

.toast__close {
	position: absolute;
	top: 12px;
	right: 12px;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	background-color: transparent;
	color: hsl(240 5% 64.9%);
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background-color: hsl(240deg 3.7% 15.9% / 50%);
		color: hsl(0 0% 98%);
	}

	svg {
		width: 14px;
		height: 14px;
	}
}

.toast-viewport {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9999;
	width: 400px;
	max-width: 100vw;
	padding: 16px;
	pointer-events: none;

	[data-radix-toast-viewport] {
		pointer-events: auto;
	}
}

/* Анимации */
.toast[data-state="open"] {
	animation: slideInRight 0.2s ease-out;
}

.toast[data-state="closed"] {
	animation: slideOutRight 0.2s ease-in;
}

@keyframes slideInRight {
	from {
		transform: translateX(100%);
		opacity: 0;
	}

	to {
		transform: translateX(0);
		opacity: 1;
	}
}

@keyframes slideOutRight {
	from {
		transform: translateX(0);
		opacity: 1;
	}

	to {
		transform: translateX(100%);
		opacity: 0;
	}
}
</style>
