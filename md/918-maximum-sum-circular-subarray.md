### Leetcode 918 (Medium): Maximum Sum Circular Subarray [Practice](https://leetcode.com/problems/maximum-sum-circular-subarray)

### Description  
Given a **circular integer array**, find the maximum possible sum of a non-empty subarray.  
A subarray can span differently because the end of the list is connected to the start: you can wrap around.  
You must return the largest sum achievable with any such subarray, but you cannot select any element more than once in a subarray (i.e., wraparound can only happen past the last element into the first, not multiple times).

### Examples  

**Example 1:**  
Input: `[1, -2, 3, -2]`  
Output: `3`  
*Explanation: The max subarray is just `[3]` (standard Kadane in the middle).*

**Example 2:**  
Input: `[5, -3, 5]`  
Output: `10`  
*Explanation: The max sum subarray can wrap: `[5, ..., 5]` (last and first elements), sum = 5 + 5 = 10.*

**Example 3:**  
Input: `[-3, -2, -3]`  
Output: `-2`  
*Explanation: All elements are negative; take the single max element: `-2`.*

### Thought Process (as if you’re the interviewee)  

- **Brute force**: Try every possible subarray, considering the circularity, for all O(n²) start and end points.  
  Too slow for n up to 30,000.
- **Standard maximum subarray (Kadane)** handles linear arrays. In the circular case, the maximum can be:
    - Either a single interval (use Kadane),
    - Or a *wrapping subarray* (elements at both ends, skipping some middle), which is equivalent to taking the total sum minus the minimum (contiguous) subarray.
- So, run:
    - Kadane’s algorithm for *max* subarray sum.
    - Also, Kadane for *min* subarray sum.
    - Calculate total.
    - The answer is `max(max_kadane, total_sum - min_kadane)` **but** if all numbers are negative, `total_sum - min_kadane` will be 0 (invalid, as at least one element must be taken), so just return max_kadane then.
- This approach is O(n).

### Corner cases to consider  
- All numbers negative (should return single highest element, not zero).
- Array of size 1.
- Array with all elements same (all positives, all negatives).
- Maximum sum occurs by wrapping (needs correct min subarray detection).
- Maximum subarray is the whole array.
- Wrapping would use all elements (must avoid zero subarrays due to min subarray = total sum).

### Solution

```python
def maxSubarraySumCircular(nums):
    # Helper to run standard Kadane's algorithm.
    def kadane(gen):
        curr_max = global_max = next(gen)
        for n in gen:
            curr_max = max(n, curr_max + n)
            global_max = max(global_max, curr_max)
        return global_max

    total_sum = sum(nums)
    
    # Max subarray sum using normal (non-circular) Kadane
    max_kadane = kadane(iter(nums))
    
    # Min subarray sum (for wrapping), by inverting numbers and applying Kadane
    min_kadane = kadane(-n for n in nums)
    min_kadane = -min_kadane  # revert the inversion
    
    # If all numbers are negative, total_sum - min_kadane = 0, so just return max_kadane
    if max_kadane < 0:
        return max_kadane
    else:
        return max(max_kadane, total_sum - min_kadane)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each Kadane pass over the list is linear, and there are two passes.
- **Space Complexity:** O(1), as only a constant number of variables is needed; no additional storage based on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct the actual subarray giving the max sum?  
  *Hint: Store start/end indices along with current sum, update whenever the global max changes.*

- Can you do this in-place with no helper functions or generator tricks?  
  *Hint: Explicitly run the loop; avoid functional programming for languages that don't support it.*

- What if you needed the minimum sum circular subarray?  
  *Hint: Use similar logic as for max, swap min/max wherever applicable.*

### Summary  
This is a hybrid of the **Kadane's algorithm** for max subarray sum (classic pattern) and a clever transformation to efficiently check wrapping subarrays via min subarray calculation.  
The key insight is turning “circular” into a “remove a continuous block in the middle”—a common trick in circular array problems, e.g., for circular max/min subarray or scheduling-type problems.


### Flashcard
Answer is max(Kadane’s on nums, total sum - min subarray sum), unless all numbers are negative.

### Tags
Array(#array), Divide and Conquer(#divide-and-conquer), Dynamic Programming(#dynamic-programming), Queue(#queue), Monotonic Queue(#monotonic-queue)

### Similar Problems
