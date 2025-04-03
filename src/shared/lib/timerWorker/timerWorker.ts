export interface WorkerMessageData {
	command: 'start' | 'stop'
	startTime?: number
	endTime?: number
	step?: number
}

export interface WorkerResponse {
	time: number
	isRunning?: boolean
}

let intervalId: NodeJS.Timeout | null = null

const workerSelf = self as DedicatedWorkerGlobalScope

workerSelf.onmessage = (event: MessageEvent<WorkerMessageData>) => {
	const { command, startTime, endTime, step } = event.data

	if (command === 'start') {
		if (startTime === undefined || endTime === undefined || step === undefined) {
			return
		}

        if(intervalId) {
            clearInterval(intervalId)
            intervalId = null
        }

		let currentTime = startTime

		intervalId = setInterval(() => {
			currentTime += step

			workerSelf.postMessage({ time: currentTime } as WorkerResponse)

			if (currentTime === endTime) {
				if (intervalId) {
					clearInterval(intervalId)
				}
				workerSelf.postMessage({ time: 0, isRunning: false } as WorkerResponse)
				intervalId = null
			}
		}, 1000)
	} else if (command === 'stop') {
		if (intervalId) {
			clearInterval(intervalId)
			intervalId = null
		}
	}
}
