### Leetcode 525 (Medium): Contiguous Array [Practice](https://leetcode.com/problems/contiguous-array)

### Description  
Given a binary array (an array containing only 0s and 1s), return the maximum length of a **contiguous subarray** that contains equal numbers of 0s and 1s.  
A contiguous subarray means a sequence of elements that are consecutive and uninterrupted from a larger array. The answer should be the length of such the *longest* subarray.

### Examples  

**Example 1:**  
Input: `[0,1]`  
Output: `2`  
Explanation: The whole array `[0,1]` has one 0 and one 1. Length is 2.

**Example 2:**  
Input: `[0,1,0]`  
Output: `2`  
Explanation: Possible answers are `[0,1]` (indices 0–1) or `[1,0]` (indices 1–2), each with one 0 and one 1. Length is 2.

**Example 3:**  
Input: `[0,1,0,1,0,1,1]`  
Output: `6`  
Explanation: The subarray `[0,1,0,1,0,1]` (indices 0–5) has 3 zeros and 3 ones, for length 6.

### Thought Process (as if you’re the interviewee)  
First, a brute-force approach would be to check all possible subarrays. For each subarray, count the number of 0s and 1s and track the longest subarray with equal counts.  
But with n elements, this is O(n²) time: too slow for large arrays.

To optimize, notice that if we treat each 0 as -1, the task becomes finding the *longest* subarray where the prefix sum is the same at two different indices. That means the subarray in between has balanced numbers of 1s (+1) and 0s (−1).  
We use a hashmap to record the earliest index where each running sum occurs. When the same running sum appears again at a later index, the subarray between these two indices must have an equal count of 0s and 1s. Track the maximum such interval.

This approach uses a running prefix sum and a hashmap which provides constant-time lookups and updates.

### Corner cases to consider  
- Empty array → should return 0
- All elements are 0s or all 1s → return 0 (no balancing possible)
- No subarray has an exact balance except possibly pairs of adjacent elements
- Large array with several subarrays tied for max length
- Input with alternating long runs of 0s and 1s

### Solution

```python
def findMaxLength(nums):
    # Change 0 to -1 and calculate running sum (prefix sum)
    running_sum = 0
    # HashMap to store the earliest index for each running_sum
    sum_to_index = {0: -1}
    max_length = 0
    for i, num in enumerate(nums):
        # Treat 0 as -1, 1 as +1
        if num == 0:
            running_sum -= 1
        else:
            running_sum += 1
        # If this running_sum was seen before,
        # subarray between previous_index+1 and i has equal 0s and 1s
        if running_sum in sum_to_index:
            # Calculate the size of this subarray
            length = i - sum_to_index[running_sum]
            if length > max_length:
                max_length = length
        else:
            # Store index for first time we see this running_sum
            sum_to_index[running_sum] = i
    return max_length
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We iterate through the array once, each prefix sum computation and hashmap operation is O(1).
- **Space Complexity:** O(n) — In the worst case, we might store every prefix sum in the hashmap (up to n distinct sums).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array contains numbers other than 0 or 1?  
  *Hint: How can you generalize the prefix sum trick for counting arbitrary equal splits?*

- Can you return the actual longest subarray, not just the length?  
  *Hint: Along with the length, store where you found the running_sum at min and max indices.*

- What if you had to find *all* subarrays with equal number of 0s and 1s?  
  *Hint: Track all pairs of matching running_sum indices instead of just the max.*

### Summary  
This problem uses a classic **prefix sum / hashmap** pattern, where element values are re-mapped (0→−1) to exploit balancing as prefix sum recurrence.  
This trick is found in many balance/equalization subarray problems: subarray sum = K, longest well-performing interval, etc., where *prefix sum and first-occurrence hashmap* allow us to quickly identify intervals with special count properties.