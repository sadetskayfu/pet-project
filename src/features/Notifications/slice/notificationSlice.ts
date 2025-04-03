import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CreateNotificationBody, Notification } from '../model/Notification'
import { rootReducer } from '@/shared/redux/redux'
import { nanoid } from 'nanoid'

const maxStack = 5

interface NotificationSliceSchema {
	notifications: Notification[]
	notificationsQueue: Notification[]
	
}

const initialState: NotificationSliceSchema = {
	notifications: [],
	notificationsQueue: []
}

const notificationSlice = createSlice({
	name: 'notifications',
	initialState,
	selectors: {
		getNotifications: (state) => state.notifications,
	},
	reducers: {
		addNotification: (state, action: PayloadAction<CreateNotificationBody>) => {
			const id = nanoid()

			const notification: Notification = {
				id,
				timeToClose: 10000,
				...action.payload
			}
			
			if(state.notifications.length === maxStack) {
				state.notificationsQueue.push(notification)
			} else {
				state.notifications.push(notification)
			}
		},
		removeNotification: (state, action: PayloadAction<string>) => {
			state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
			
			if(state.notificationsQueue.length > 0) {
				state.notifications.push(state.notificationsQueue[0])
				state.notificationsQueue = state.notificationsQueue.filter((_, index) => index !== 0)
			}
		},
	},
}).injectInto(rootReducer)

export const notificationSelectors = notificationSlice.selectors
export const notificationActions = notificationSlice.actions

export const addNotification = notificationSlice.actions.addNotification

