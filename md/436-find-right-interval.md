### Leetcode 436 (Medium): Find Right Interval [Practice](https://leetcode.com/problems/find-right-interval)

### Description  
You are given an array of intervals, where `intervals[i] = [starti, endi]` and each start is unique.

The right interval for an interval i is an interval j such that `startj >= endi` and `startj` is minimized. Note that i may equal j.

Return an array of right interval indices for each interval i. If no right interval exists for interval i, then put -1 at index i.

### Examples  

**Example 1:**  
Input: `intervals = [[1,2]]`  
Output: `[-1]`  
*Explanation: There is only one interval in the collection, so it outputs -1.*

**Example 2:**  
Input: `intervals = [[3,4],[2,3],[1,2]]`  
Output: `[-1,0,1]`  
*Explanation: There is no right interval for [3,4]. For [2,3], the right interval is [3,4]. For [1,2], the right interval is [2,3].*

**Example 3:**  
Input: `intervals = [[1,4],[2,3],[3,4]]`  
Output: `[-1,2,-1]`  
*Explanation: There is no right interval for [1,4] and [3,4]. For [2,3], the right interval is [3,4].*

### Thought Process (as if you're the interviewee)  
This problem requires finding the smallest start time that is ≥ each interval's end time. The key insights:

1. **Sorted search**: For each interval's end, find the smallest start ≥ end
2. **Index preservation**: Need to maintain original indices after sorting
3. **Binary search**: Use binary search for efficient lookup

Approaches:
1. **Brute force**: For each interval, check all others - O(n²)
2. **Sort + Binary search**: Sort by start times, use binary search - O(n log n)
3. **TreeMap/SortedList**: Use balanced BST for dynamic queries

The sort + binary search approach provides optimal time complexity.

### Corner cases to consider  
- Single interval
- No right intervals exist for any interval
- All intervals have right intervals
- Intervals with same start/end times
- Nested intervals
- Adjacent intervals (end = start)

### Solution

```python
def findRightInterval(intervals):
    import bisect
    
    n = len(intervals)
    
    # Create list of (start_time, original_index) and sort by start_time
    starts = [(intervals[i][0], i) for i in range(n)]
    starts.sort()
    
    result = []
    
    for i in range(n):
        end_time = intervals[i][1]
        
        # Find the smallest start_time >= end_time using binary search
        # We need to search in the start_times only
        start_times = [start for start, _ in starts]
        pos = bisect.bisect_left(start_times, end_time)
        
        if pos < len(starts):
            result.append(starts[pos][1])  # Return original index
        else:
            result.append(-1)  # No right interval found
    
    return result

# More efficient approach using single binary search setup
def findRightIntervalOptimized(intervals):
    import bisect
    
    n = len(intervals)
    
    # Create and sort start times with their original indices
    starts = sorted((intervals[i][0], i) for i in range(n))
    start_times = [start for start, _ in starts]
    
    result = []
    
    for i in range(n):
        end_time = intervals[i][1]
        
        # Binary search for smallest start_time >= end_time
        pos = bisect.bisect_left(start_times, end_time)
        
        if pos < n:
            result.append(starts[pos][1])
        else:
            result.append(-1)
    
    return result

# Alternative approach using sorting both arrays
def findRightIntervalTwoArrays(intervals):
    n = len(intervals)
    
    # Create arrays with original indices
    start_indices = list(range(n))
    end_indices = list(range(n))
    
    # Sort by start and end times respectively
    start_indices.sort(key=lambda i: intervals[i][0])
    end_indices.sort(key=lambda i: intervals[i][1])
    
    result = [-1] * n
    j = 0  # Pointer for start_indices
    
    # Process intervals in order of their end times
    for i in range(n):
        end_idx = end_indices[i]
        end_time = intervals[end_idx][1]
        
        # Find first interval whose start >= current end time
        while j < n and intervals[start_indices[j]][0] < end_time:
            j += 1
        
        if j < n:
            result[end_idx] = start_indices[j]
    
    return result

# HashMap approach for cleaner code
def findRightIntervalHashMap(intervals):
    import bisect
    
    # Map start time to original index
    start_to_index = {}
    starts = []
    
    for i, (start, end) in enumerate(intervals):
        start_to_index[start] = i
        starts.append(start)
    
    starts.sort()
    
    result = []
    
    for start, end in intervals:
        # Find smallest start >= end
        pos = bisect.bisect_left(starts, end)
        
        if pos < len(starts):
            right_start = starts[pos]
            result.append(start_to_index[right_start])
        else:
            result.append(-1)
    
    return result

# Manual binary search implementation
def findRightIntervalManual(intervals):
    n = len(intervals)
    
    # Create and sort start times with indices
    starts = [(intervals[i][0], i) for i in range(n)]
    starts.sort()
    
    def binary_search(target):
        """Find smallest start_time >= target."""
        left, right = 0, len(starts)
        
        while left < right:
            mid = (left + right) // 2
            if starts[mid][0] >= target:
                right = mid
            else:
                left = mid + 1
        
        return left
    
    result = []
    
    for i in range(n):
        end_time = intervals[i][1]
        pos = binary_search(end_time)
        
        if pos < len(starts):
            result.append(starts[pos][1])
        else:
            result.append(-1)
    
    return result

# Brute force approach for comparison
def findRightIntervalBruteForce(intervals):
    n = len(intervals)
    result = []
    
    for i in range(n):
        end_time = intervals[i][1]
        min_start = float('inf')
        right_index = -1
        
        # Check all intervals for the right interval
        for j in range(n):
            start_time = intervals[j][0]
            if start_time >= end_time and start_time < min_start:
                min_start = start_time
                right_index = j
        
        result.append(right_index)
    
    return result

# Using heaps (alternative approach)
def findRightIntervalHeap(intervals):
    import heapq
    
    n = len(intervals)
    
    # Min-heap of (start_time, index)
    starts = [(intervals[i][0], i) for i in range(n)]
    heapq.heapify(starts)
    
    # Create list of (end_time, original_index) sorted by end_time
    ends = [(intervals[i][1], i) for i in range(n)]
    ends.sort()
    
    result = [-1] * n
    available_starts = []
    start_heap = list(starts)
    
    for end_time, orig_idx in ends:
        # Add all starts that could be right intervals
        while start_heap and start_heap[0][0] < end_time:
            heapq.heappop(start_heap)
        
        if start_heap:
            result[orig_idx] = start_heap[0][1]
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting and O(n log n) for n binary searches, so overall O(n log n).
- **Space Complexity:** O(n) for storing the sorted start times and result array.

### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this to find the left interval instead of right interval?  
  *Hint: Find the largest start time ≤ end time using bisect_right and adjust accordingly.*

- What if you needed to find all possible right intervals, not just the closest one?  
  *Hint: Collect all intervals where start ≥ end instead of just the minimum.*

- How would you handle the case where intervals can have duplicate start times?  
  *Hint: The problem states starts are unique, but you'd need to handle ties in sorting/searching.*

- Can you optimize this for the case where you need to query many times with different interval sets?  
  *Hint: Use persistent data structures or precompute common queries.*

### Summary
This problem demonstrates the power of combining sorting with binary search for efficient range queries. The key insight is recognizing that we need to find the smallest element in a sorted sequence that satisfies a condition, which is a classic binary search application. This pattern appears frequently in interval problems, scheduling algorithms, and computational geometry. Understanding how to preserve original indices while sorting and performing efficient lookups is crucial for many algorithmic challenges involving data transformation and queries.

### Tags
Array(#array), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
- Data Stream as Disjoint Intervals(data-stream-as-disjoint-intervals) (Hard)