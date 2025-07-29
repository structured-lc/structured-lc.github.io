### Leetcode 2811 (Medium): Check if it is Possible to Split Array [Practice](https://leetcode.com/problems/check-if-it-is-possible-to-split-array)

### Description  
Given an array **nums** of length **n** and an integer **m**, you are allowed to repeatedly split any subarray of length at least 2 into two non-empty contiguous subarrays, if and only if the sum of elements in the "split" (i.e., the subarray being divided) is at least **m**.  
Your task: Determine if it is possible, by repeatedly applying this operation, to split the original array into **n** subarrays, each of length 1 (i.e., every single element separated).

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 3, 2, 3]`, `m = 6`  
Output: `true`  
*Explanation: We can do the following splits:  
- Split [2, 3, 3, 2, 3] into [2, 3, 3, 2] and [3] (sum = 13 ≥ 6)  
- Split [2, 3, 3, 2] into [2] and [3, 3, 2] (sum = 10 ≥ 6 for both subarrays)  
- Continue splitting [3, 3, 2] into [3] and [3, 2], then [3, 2] into [3] and [2]  
Now, all subarrays are length 1, so answer is true.*

**Example 2:**  
Input: `nums = [1, 1, 1]`, `m = 3`  
Output: `false`  
*Explanation: The total sum is 3, but every adjacent pair sums to 2, which is < m. No split is possible.*

**Example 3:**  
Input: `nums = [2, 2, 1]`, `m = 4`  
Output: `true`  
*Explanation: Split [2, 2, 1] into [2] and [2, 1] (sum = 5 ≥ 4), then [2, 1] into [2] and [1] (sum = 3). All subarrays are length 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  - Try every possible way to split the array at every subarray, recursively checking if the operation is possible until all elements are size 1.  
  - This is very inefficient (exponential complexity), especially for larger inputs.

- **Observation:**  
  - *Base Case:* If the length is less than 3 (i.e., 1 or 2), then we can always split, as either already single, or for two elements, their sum can be checked directly.
  - *Key Insight:* For n ≥ 3, check whether **any adjacent pair** in the array sums to at least m.  
    - If such a pair exists, we can always eventually reduce the array to single elements by always splitting at this pair (since you can repeatedly use the same operation on subarrays).

- **Optimized Idea:**  
  - If the array has fewer than 3 elements, return True (trivially splittable).
  - Otherwise, for each i (1 ≤ i < n), if nums[i-1] + nums[i] ≥ m, return True.
  - If no such pair exists, return False.

- **Why This Works:**  
  - If at every split, we can always find at least one "safe" spot to cut, we can always reduce the array to single elements. If not, at some point we will be forced to split an adjacent pair whose sum is < m, which is not allowed.

### Corner cases to consider  
- Array of length 1 (always splittable)
- Array of length 2 (always splittable if sum ≥ m)
- No two adjacent elements' sum ≥ m
- All elements are the same
- Array sum just equals m vs. adjacent pairs < m
- Large values of m (impossible to split unless a large pair exists)

### Solution

```python
# Check if you can split array according to the rules.
def canSplitArray(nums: list[int], m: int) -> bool:
    # Arrays of length 1 or 2: always possible to split to singles
    if len(nums) < 3:
        return True
    # For longer arrays, check for any adjacent pair with sum ≥ m
    for i in range(1, len(nums)):
        if nums[i - 1] + nums[i] >= m:
            return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - We only loop once through n-1 adjacent pairs in the array.
- **Space Complexity:** O(1)  
  - No extra data structures; uses constant space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return **one sequence of splits** leading to all 1-length arrays?  
  *Hint: Track the starting indices and for every valid adjacent pair, remember the split point.*

- What if the split was not just on adjacent elements, but any subarray where the sum of the *entire subarray* is ≥ m?  
  *Hint: Consider prefix sums and dynamic programming.*

- How would you handle this if there were restrictions that *every split* must be exactly at the middle of the array?  
  *Hint: Think recursively about halving, check if possible at each step.*

### Summary
The approach leverages a key insight about adjacent pairs to avoid unnecessary recursion or brute force, turning a seemingly tricky split problem into a single sweep for qualifying "cut points". This greedy/search pattern is common in array splitting and partitioning tasks. Variants of this logic often appear in DP-on-arrays, partitioning, and subarray sum problems.