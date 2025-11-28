### Leetcode 3478 (Medium): Choose K Elements With Maximum Sum [Practice](https://leetcode.com/problems/choose-k-elements-with-maximum-sum)

### Description  
You are given two integer arrays, **nums1** and **nums2**, both of length *n*, and an integer *k*.  
For each index *i* in **nums1**, find all indices *j* such that nums1[j] < nums1[i].  
From these, you can select at most *k* corresponding values from **nums2[j]** in order to maximize their total sum.  
Return an array **answer** of length *n*, where answer[i] is the maximum possible sum for index *i* as described above.

### Examples  

**Example 1:**  
Input:  
nums1=`[4,2,1,5,3]`, nums2=`[10,20,30,40,50]`, k=`2`  
Output:  
`[80, 30, 0, 110, 60]`  
*Explanation:*
- i=0: nums1=4. Candidates j: 1 (2), 2 (1), 4 (3). Their nums2: 20, 30, 50. Pick top 2: 50+30=80.
- i=1: nums1[1]=2. Candidates j: 2 (1). Their nums2: 30. Pick up to 2, so sum=30.
- i=2: nums1[2]=1. No nums1[j] < 1. Sum=0.
- i=3: nums1[3]=5. Candidates j: 0 (4), 1 (2), 2 (1), 4 (3). nums2: 10, 20, 30, 50. Pick 2: 50+60=110.
- i=4: nums1[4]=3. Candidates j: 1 (2), 2 (1). nums2: 20, 30. Pick 2: 30+30=60.

**Example 2:**  
Input:  
nums1=`[1,2,3,4]`, nums2=`[10,20,30,40]`, k=`1`  
Output:  
`[0, 10, 20, 30]`  
*Explanation:*
- i=0: no smaller; 0.
- i=1: j=0, nums2=10.
- i=2: j=0,1, nums2=10,20. Pick 20.
- i=3: j=0,1,2, nums2=10,20,30. Best is 30.

**Example 3:**  
Input:  
nums1=`[5,5,5]`, nums2=`[1,2,3]`, k=`3`  
Output:  
`[0,0,0]`  
*Explanation:*  
No nums1[j] < nums1[i] for any i.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each i, scan through 0...n-1, collect nums2[j] for all j such that nums1[j] < nums1[i], sort those, pick largest k, sum.  
  This is O(n\*n log n) and inefficient for large n (up to 10⁵).

- **Optimization approach:**  
  The key is that for each i, you want to efficiently find all nums2[j] where nums1[j] < nums1[i].  
  Sorting nums1 and processing in order lets us accumulate the best k nums2 values seen so far.

  Specifically:
  1. Create a list of pairs (nums1[i], nums2[i], i).
  2. Sort by nums1[i].
  3. As you iterate, use a min-heap to keep the k largest nums2 values.  
     When at (value, value2, orig_idx), answer[orig_idx] = sum of up to k best nums2 so far.
     Then add current nums2 to heap for later elements.

  **Trade-offs:**  
  - Heap insertions are O(log k).  
  - Sorting is O(n log n).  
  - Ultimately O(n log n) time, O(n) space.  
  This is efficient and accepted for n up to 10⁵.

### Corner cases to consider  
- Empty arrays (n=0).
- k=0: Output should all be 0.
- Duplicate elements in nums1.
- All nums1 elements equal (no valid j for any i).
- k larger than potential candidates for a given i.
- nums2 containing negative numbers.
- Only one element in nums1.

### Solution

```python
from typing import List
import heapq

def findMaxSum(nums1: List[int], nums2: List[int], k: int) -> List[int]:
    n = len(nums1)
    # Prepare: (nums1 value, nums2 value, original index)
    arr = [(nums1[i], nums2[i], i) for i in range(n)]
    # Sort pairs by nums1 ascending
    arr.sort()
    # Min-heap for the largest k seen nums2 values so far
    max_heap = []
    sum_so_far = 0
    answer = [0] * n

    for val, val2, idx in arr:
        # For this position, we want the sum of up to k largest nums2 from previous elements (i.e., nums1[j] < nums1[i])
        answer[idx] = sum_so_far
        # Add current nums2 to the heap
        heapq.heappush(max_heap, val2)
        sum_so_far += val2
        # If heap > k, remove smallest; only keep top k
        if len(max_heap) > k:
            to_remove = heapq.heappop(max_heap)
            sum_so_far -= to_remove

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n) for sorting, and each heap operation is O(log k) × n at most, dominated by O(n log n).
- **Space Complexity:**  
  O(n) for storing the tuples and answer array; O(k) for the heap.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is very large (ex: n)?  
  *Hint: Is the heap still efficient, or can you use a sum directly?*

- How do you handle negative nums2 values?  
  *Hint: Does the heap logic or output change?*

- Can you provide the indices of the elements that contribute to the sum?  
  *Hint: Track where each number came from.*

### Summary
This problem uses the **sorting with heap (priority queue) sliding max** pattern.  
The key is to process items in increasing order of nums1, maintaining a heap of the largest k nums2 values seen so far.  
This reduces the problem from quadratic to O(n log n), a common pattern for maximizing subarray/subset sums under ordering constraints.  
The technique is broadly applicable in selection/subsequence maximization problems under monotonicity constraints.


### Flashcard
Sort nums1 while tracking indices, use min-heap to maintain k largest nums2 values as you process sorted nums1 in order—efficiently accumulate valid candidates.

### Tags
Array(#array), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
