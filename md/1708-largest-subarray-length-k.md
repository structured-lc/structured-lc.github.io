### Leetcode 1708 (Easy): Largest Subarray Length K [Practice](https://leetcode.com/problems/largest-subarray-length-k)

### Description  
Given an array of distinct integers, find a contiguous subarray of length k such that the subarray is lexicographically the largest possible. In other words, among all subarrays of length k, return the one which would appear last in dictionary order if compared element by element.

### Examples  

**Example 1:**  
Input: `nums = [1,4,5,2,3]`, `k = 3`  
Output: `[5,2,3]`  
*Explanation: Among all subarrays of length 3:  
[1,4,5], [4,5,2], [5,2,3].  
- [5,2,3] is the largest lexicographically.*

**Example 2:**  
Input: `nums = [9,7,4,6,5,3,8]`, `k = 2`  
Output: ``  
*Explanation: Among all subarrays of length 2:  
[9,7], [7,4], [4,6], [6,5], [5,3], [3,8].  
- [9,7] < [9,8] < ... so  is the largest (appears if k=1; if k=2, answer is [8,x] if available, otherwise largest starting at max element).*

**Example 3:**  
Input: `nums = [2,1]`, `k = 1`  
Output: `[2]`  
*Explanation: [2] and [1], so [2] is larger.*

### Thought Process (as if you’re the interviewee)  
- First, brute-force would be to generate every contiguous subarray of length k; compare each lexicographically, and pick the largest. This is O(n\*k).
- Can we optimize?  
  Since all elements are distinct, the subarray starting at the largest possible value in `nums[0 .. n-k]` is always going to be lex greatest:  
  - The first element dominates the comparison, so among all possible starts for length k, pick one beginning at the maximum value in `nums[0 .. n-k]`.
- In Python, simply find `max(nums[0:n-k+1])`, get its index, return `nums[index:index+k]`.
- This approach is O(n) time, O(k) output.

### Corner cases to consider  
- `nums` length equals k (only one subarray).
- k = 1 (just max single element).
- k = len(nums) - 1 (subarray starting at the max in prefix).
- All elements increasing/decreasing.
- Input at boundaries (first or last element holds max).
- Negative numbers.

### Solution

```python
def largestSubarray(nums, k):
    # Find the maximum element in the first (n-k+1) elements
    # This ensures any subarray starting beyond this would not have enough length k
    max_start_value = max(nums[:len(nums) - k + 1])
    start_idx = nums.index(max_start_value)
    # Slice subarray of length k starting at the found index
    return nums[start_idx : start_idx + k]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums). We scan up to (n-k+1) elements for max, and slice k elements. Both steps are O(n).
- **Space Complexity:** O(k), for the returned subarray. No extra storage besides output.

### Potential follow-up questions (as if you’re the interviewer)  

- If the input array can contain duplicate values, how does your approach change?  
  *Hint: Lex comparison may require comparing the entire k-length subarrays, not just their starting points.*

- How would you solve this if asked for the lexicographically smallest subarray?  
  *Hint: Replace max with min and proceed similarly.*

- How would you solve it in place, modifying the input array?  
  *Hint: Consider if slice assignment is allowed, or just return view/pointer to the subarray.*

### Summary
This problem is a classic example of *windowed selection with greedy choice*. When all values are unique, the optimal solution is to search for the highest possible prefix (the largest first element possible for a k-length subarray); this greedy method leverages lexicographic comparison properties. The approach is very efficient (O(n)), straightforward, and frequently appears in sliding window and greedy algorithm problems. Variants of this problem can surface in max/min subarray or string substring selection scenarios.


### Flashcard
The lex largest subarray of length k starts at the maximum value in nums[0..n-k]—pick the leftmost max if duplicates exist.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
