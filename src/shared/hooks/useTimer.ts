import { useEffect, useState, useRef, useCallback } from 'react';
import { WorkerMessageData, WorkerResponse } from '@/shared/lib/timerWorker/timerWorker';

type UseTimerArgs = {
  variant: 'incr' | 'decr';
  enabled?: boolean
  onEnd?: () => void
  onStart?: () => void
};

export const useTimer = (args: UseTimerArgs) => {
  const { variant, enabled = true, onEnd, onStart, } = args;

  const step = variant === 'incr' ? 1 : -1;

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if(!enabled) return

    workerRef.current = new Worker(new URL('@/shared/lib/timerWorker/timerWorker', import.meta.url));
    
    workerRef.current.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { time: newTime, isRunning: workerRunning } = event.data;

      setTime(newTime);

      if (workerRunning === false) {
        setIsRunning(false);
        onEnd?.()
      }
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ command: 'stop' } as WorkerMessageData);
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [enabled, onEnd]);

  const startTimer = useCallback((startTime: number, endTime: number) => {
    if(!enabled) return

    if (workerRef.current) {
      setTime(startTime);
      setIsRunning(true);
      onStart?.()

      workerRef.current.postMessage({
        command: 'start',
        startTime,
        endTime,
        step,
      } as WorkerMessageData);
    }
  }, [step, enabled, onStart]);

  const endTimer = useCallback(() => {
    if(!enabled) return

    if (workerRef.current) {
      workerRef.current.postMessage({ command: 'stop' } as WorkerMessageData);
	  
      setIsRunning(false);
      onEnd?.()
    }
  }, [enabled, onEnd]);

  return { time, isRunning, startTimer, endTimer };
};