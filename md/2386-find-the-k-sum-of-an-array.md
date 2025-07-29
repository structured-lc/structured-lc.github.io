### Leetcode 2386 (Hard): Find the K-Sum of an Array [Practice](https://leetcode.com/problems/find-the-k-sum-of-an-array)

### Description  
Given an integer array `nums` and a positive integer `k`, you are to find the **kᵗʰ largest** subsequence sum. A **subsequence** is any sequence you get by deleting some or no elements (in order). The empty subsequence has a sum of 0.  
Return the k-Sum, i.e., the kᵗʰ largest sum obtainable by any subsequence of `nums` (counts *all* duplicates – sums don't need to be unique).

### Examples  

**Example 1:**  
Input: `nums = [2,4,-2]`, `k = 5`  
Output: `2`  
*Explanation: All possible subsequence sums in decreasing order: 6, 4, 4, 2, 2, 0, 0, -2. The 5th largest is 2.*

**Example 2:**  
Input: `nums = [1,-2,3,4,-10,12]`, `k = 16`  
Output: `10`  
*Explanation: There are 2⁶=64 subsequences. The 16th largest is 10.*

**Example 3:**  
Input: `nums = [3, -1, 2]`, `k = 2`  
Output: `3`  
*Explanation: All subsequence sums: 3+2=5, 3, 2, -1, 3-1, 2-1, 0, etc. The 2nd largest is 3.*

### Thought Process (as if you’re the interviewee)  

Brute force:  
Try all possible subsequences (2ⁿ), sum each, sort the sums, pick the kᵗʰ largest.  
- Impractical for n > 20.

Optimize:  
- Notice: The **maximum sum** is by adding all positives (ignore negatives), since negatives only reduce the sum.  
- Instead of brute-forcing, think in terms of picking negatives to *remove* from this max sum.
- If we sort absolute values of nums in descending order, then at each step, we can either include or not include an element, reducing the sum by the element’s value if excluded.

Pattern:  
- Each subsequence sum is the max sum minus some subset sum of the absolute values of the nums we "flip" from present to absent.

Algorithm:
1. **Get max sum** (sum of all positives).
2. **Convert nums to abs values**, sort ascending.
3. Use a **min-heap** (priority queue) to efficiently enumerate the k smallest sums formed by combining negative reductions (i.e., by "excluding" a number).
4. For each element, try choosing or skipping it recursively; in code, push new sums into the heap for each decision path.
5. Pop k-1 times (each time, pushing new possible reductions never seen before), then the result is max_sum - current_heap_sum.

Tradeoffs:  
- This is a classic k-th smallest/largest problem but in a subsequence sum space, best handled by heap + set for de-dup.
- Time: O(n log n + k log k), Space: O(n + k).

### Corner cases to consider  
- All numbers positive or all negative.
- Duplicates in nums.
- k = 1 (should be max possible sum).
- k > number of unique (or even total) possible sums.
- Empty subsequence (sum = 0).

### Solution

```python
import heapq

def kSum(nums, k):
    # Calculate the maximum sum by taking all positive numbers
    max_sum = sum(x for x in nums if x > 0)
    # Convert all numbers to their absolute values and sort
    abs_nums = sorted(abs(x) for x in nums)
    n = len(nums)

    # Min-heap: (current_sum, idx). Start with (0, 0): no reduction, start at idx=0
    heap = [(0, 0)]
    # Visited set to avoid duplicates: (sum_index, idx)
    visited = set((0, 0))

    for _ in range(k - 1):
        curr_sum, i = heapq.heappop(heap)
        if i < n:
            # Option 1: Exclude abs_nums[i], add reduction
            next1 = (curr_sum + abs_nums[i], i + 1)
            if next1 not in visited:
                heapq.heappush(heap, next1)
                visited.add(next1)
            # Option 2: Don't start new exclude, allow previous excludes only (branch at next i but same reduction)
            if i > 0:
                next2 = (curr_sum - abs_nums[i - 1] + abs_nums[i], i + 1)
                if next2 not in visited:
                    heapq.heappush(heap, next2)
                    visited.add(next2)

    # Result: subtract total reduction from max_sum
    return max_sum - heap[0][0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n + k log k), where n is length of nums. We sort nums and do up to O(k) heap operations (each O(log k)).
- **Space Complexity:** O(n + k). O(n) for the abs_nums array and O(k) for the heap and visited set.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large k, when k ≫ n?  
  *Hint: Is it possible to avoid pushing so many states in the heap? What if k > total possible sums?*

- Can you do this without using extra space for a set?  
  *Hint: When is de-duping crucial? Is order of heap pushes enough?*

- How would you adapt this for unique subsequence sums?  
  *Hint: Should you use a different approach for pruning duplicates?*

### Summary
This problem uses the **heap/priority queue k-th smallest/largest** pattern, applied to a combination sum space where each decision is a branch in exclude/include. This approach is common in problems such as "K-th smallest pair sum" or "K-th smallest path sum," and is particularly useful when the total number of possibilities is too large to enumerate, but you only need k of them. Key ideas: maximizing subsequence sum, converting to reductions, and heap-based enumeration.