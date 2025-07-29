### Leetcode 2592 (Medium): Maximize Greatness of an Array [Practice](https://leetcode.com/problems/maximize-greatness-of-an-array)

### Description  
Given an integer array nums, you can permute it to create a new array perm. The **greatness** of nums is the number of indices i (0 ≤ i < n) for which perm[i] > nums[i].  
Your task is to **rearrange** nums to maximize its greatness, and return the maximum greatness value possible. In simple terms: maximize how many positions of the permutation are greater than the original value at that position.

### Examples  

**Example 1:**  
Input: `nums = [1,3,5,2,1,3,1]`  
Output: `4`  
*Explanation: One optimal permutation is [2,5,1,3,3,1,1]. At indices 0,1,3,4: perm[i] > nums[i] (2 > 1, 5 > 3, 3 > 2, 3 > 1), so the answer is 4.*

**Example 2:**  
Input: `nums = [1,2,3,4]`  
Output: `3`  
*Explanation: We can use [2,3,4,1]. At indices 0,1,2: 2 > 1, 3 > 2, 4 > 3. Only the last index (1 ≤ 4) fails. Answer: 3.*

**Example 3:**  
Input: `nums = [5,5,5,5]`  
Output: `0`  
*Explanation: All values are equal. No permutation can create perm[i] > nums[i] for any index, so answer is 0.*


### Thought Process (as if you’re the interviewee)  
First, the brute-force approach would be to try all possible permutations and count, for each, how many positions perm[i] > nums[i]. But with n up to 10⁵, that's impossible.

We need a greedy and efficient solution.  
Key insight: For each original element, can we always find the "smallest available number" that is strictly greater than it?  
If we **sort nums**, and try to "pair" each original value with the next largest remaining value, we can maximize the count of indices where perm[i] > nums[i].  
This boils down to a greedy two-pointer sweep:

- Sort nums into arr1 and arr2 (could be the same).
- Use pointer i for arr1 (original nums), pointer j for arr2 (our perm).
- For each i, try to find the next j > i such that arr2[j] > arr1[i].
- If we succeed, that's one more element where perm[i] > nums[i]; increment both pointers.
- If arr2[j] ≤ arr1[i], increment j only.

Repeat until pointers go out of range.  
Why does this work? Because always matching the next higher available number prevents waste and ensures maximum matches.

**Trade-offs:**  
- This greedy, sorting-based approach is optimal for maximizing the greatness.  
- Brute-force is not feasible due to input constraints.

### Corner cases to consider  
- All elements are the same (e.g., [5,5,5,5]): answer must be 0.
- Strictly increasing or decreasing arrays.
- Minimum input size (length 1).
- Multiple duplicates and scattered values.
- Already optimal permutation.

### Solution

```python
def maximizeGreatness(nums):
    # Sort the numbers; arr1 is the original sorted, arr2 the 'perm' to use greedily
    arr1 = sorted(nums)
    arr2 = sorted(nums)
    
    i = j = res = 0
    n = len(nums)
    
    # Use a two-pointer technique:
    # i points to arr1 elements (original), j to possible perm elements
    while i < n and j < n:
        if arr2[j] > arr1[i]:
            # Found a number for the perm greater than the original
            res += 1
            i += 1
            j += 1
        else:
            # Not enough, try next potential perm value
            j += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to the sorting step.
- **Space Complexity:** O(n) for the extra sorted array and pointer/variable storage; no recursion or deep stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to maximize perm[i] < nums[i] instead?
  *Hint: Think about reversing the inequality and try a similar greedy pairing.*

- How would you solve it if you're asked to find the number of ways to achieve the maximum greatness?
  *Hint: Count the number of pairings possible at each step.*

- Can this approach be implemented in-place to save space?
  *Hint: Try using indices and original array directly after sorting, to avoid extra arrays.*

### Summary
This problem is a classic **two-pointers greedy matching** problem, with sorting to enable optimal pairing between the original and permuted arrays.  
This **greedy** technique is common in maximization problems where elements need to be matched under constraints (e.g., assign tasks, maximize events, assign resources).  
Other examples with similar patterns: assign cookies to children, maximize number of content children, scheduling non-overlapping intervals.