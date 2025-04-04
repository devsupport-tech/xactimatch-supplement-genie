
import { useState, useEffect, useCallback } from 'react';

// Create a type for messages sent to and from the worker
interface WorkerMessage<T = any> {
  id: string;
  type: string;
  payload?: T;
}

interface WorkerResponse<T = any> {
  id: string;
  result?: T;
  error?: string;
}

/**
 * Custom hook to use web workers for CPU-intensive operations
 */
export function useWorker(workerPath: string) {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize web worker
  useEffect(() => {
    // Only create web workers in browsers that support them
    if (typeof window !== 'undefined' && 'Worker' in window) {
      const newWorker = new Worker(workerPath);
      setWorker(newWorker);

      // Cleanup function
      return () => {
        newWorker.terminate();
      };
    } else {
      setError('Web Workers are not supported in this browser');
      return;
    }
  }, [workerPath]);

  // Function to send tasks to the worker
  const runTask = useCallback(<T, R>(type: string, payload?: T): Promise<R> => {
    return new Promise((resolve, reject) => {
      if (!worker) {
        reject(new Error('Worker not initialized'));
        return;
      }

      setIsLoading(true);
      setError(null);

      // Create unique ID for this task
      const id = Date.now().toString(36) + Math.random().toString(36).substring(2);

      // Create handler for worker response
      const handleMessage = (event: MessageEvent<WorkerResponse<R>>) => {
        const data = event.data;
        
        // Only process messages for this task
        if (data.id === id) {
          // Clean up the event listener
          worker.removeEventListener('message', handleMessage);
          setIsLoading(false);
          
          if (data.error) {
            setError(data.error);
            reject(new Error(data.error));
          } else {
            resolve(data.result as R);
          }
        }
      };

      // Add event listener for this task
      worker.addEventListener('message', handleMessage);

      // Send the task to the worker
      const message: WorkerMessage<T> = {
        id,
        type,
        payload
      };
      
      worker.postMessage(message);
    });
  }, [worker]);

  return {
    runTask,
    isLoading,
    error,
    supported: !!worker
  };
}
