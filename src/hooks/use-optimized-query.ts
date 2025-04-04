
import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { useEffect } from 'react';

/**
 * Enhanced useQuery hook with optimized prefetching and caching capabilities
 */
export function useOptimizedQuery<TData, TError = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError, TData, QueryKey>
) {
  // Extract and format data from the queryKey for prefetch detection
  const queryId = Array.isArray(queryKey) ? 
    queryKey.map(item => typeof item === 'string' ? item : JSON.stringify(item)).join('-') : 
    String(queryKey);
  
  // Set default stale time longer than standard React Query to optimize caching
  const enhancedOptions: UseQueryOptions<TData, TError, TData, QueryKey> = {
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000,    // 30 minutes
    ...options,
  };
  
  // Use React Query's useQuery with enhanced options
  const queryResult = useQuery({
    queryKey,
    queryFn,
    ...enhancedOptions
  });
  
  // Record query access time for optimizing subsequent prefetches
  useEffect(() => {
    // Implementation of a simple access frequency tracking mechanism
    // which could be used to intelligently prefetch frequently accessed data
    const now = Date.now();
    
    // Get or initialize access history
    const accessHistory = JSON.parse(localStorage.getItem('queryAccessHistory') || '{}');
    const queryHistory = accessHistory[queryId] || { count: 0, lastAccessed: 0, timestamps: [] };
    
    // Update history
    queryHistory.count++;
    queryHistory.lastAccessed = now;
    queryHistory.timestamps = [...(queryHistory.timestamps || []).slice(-9), now];
    
    // Save updated history
    accessHistory[queryId] = queryHistory;
    localStorage.setItem('queryAccessHistory', JSON.stringify(accessHistory));
  }, [queryId]);
  
  return queryResult;
}
