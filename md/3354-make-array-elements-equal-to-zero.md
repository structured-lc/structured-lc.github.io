### Leetcode 3354 (Easy): Make Array Elements Equal to Zero [Practice](https://leetcode.com/problems/make-array-elements-equal-to-zero)

### Description  
Given an array of integers `nums`, you can choose any position where `nums[i] == 0` as your starting point, and select a movement direction (left or right). You move step-by-step in that direction:
- If your index goes out of bounds, you stop.
- If the element you land on is 0, keep moving in the same direction.
- If the element is greater than 0, reverse your direction and move one step, repeat until out of bounds.

The goal is to count the number of starting points (indices with value 0) that can visit all non-zero elements exactly once using the above rule.

### Examples  

**Example 1:**  
Input: `nums = [1,0,2,1,0,2,3,0]`  
Output: `2`  
Explanation:  
- Start at index 1 (0), go right: cannot visit all non-zeros exactly once.  
- Start at index 4 (0), go right: valid path.  
- Start at index 7 (0), go left: valid path.

**Example 2:**  
Input: `nums = [0,1,2,0]`  
Output: `2`  
Explanation:  
- Start at index 0 (0): right direction works (visits 1,2).
- Start at index 3 (0): left direction works (visits 2,1).

**Example 3:**  
Input: `nums = [0,0]`  
Output: `0`  
Explanation:  
- There are no non-zero elements to visit, so there are zero valid starting points.

### Thought Process (as if you’re the interviewee)  
First, understand the rules clearly, perhaps simulating a few runs.  
Brute-force approach: For each index where nums[i] == 0, try both directions, simulating the movement stepwise and counting the number of non-zero elements visited without repetition. But this leads to O(n²) time, not efficient given possible input limits.

Key insight: for a path to visit all non-zeros exactly once, the zeros must be at the boundary of the block of non-zeros. For a zero at index i to allow such a path:
- All non-zero elements either appear consecutively to the right or left of that zero.
- So, it's possible only if the prefix sum before i equals the sum of all non-zeros minus the prefix till i, and the block is consecutive (i.e., all zeros are outside the non-zero block).

Thus, one can scan from left-to-right, compute prefix sums and total sum to check for this condition in O(n).

### Corner cases to consider  
- Array contains only zeros.
- Only one non-zero element.
- All non-zeros are consecutive with zeros at both ends.
- All zeros in the middle, with non-zeros at boundary.
- No zeros at all.

### Solution

```python
def countStartIndices(nums):
    total_sum = sum(nums)
    prefix_sum = 0
    count = 0
    n = len(nums)
    for i, x in enumerate(nums):
        if x == 0:
            # All non-zeros to the left?
            if prefix_sum == total_sum - prefix_sum:
                count += 1
        prefix_sum += x
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One pass to compute total_sum, one pass to compute prefix_sums and check; n is the length of nums.
- **Space Complexity:** O(1) — Only a few integer variables used (no extra arrays).

### Potential follow-up questions (as if you’re the interviewer)  

- What if zeros appear in between non-zero blocks?  
  *Hint: Try simulating the process — is it ever possible to visit all non-zeros exactly once in such configuration?*

- Can there be more than two valid starting indices?  
  *Hint: Consider the structure of the array and where the zeros are in relation to the non-zero block.*

- Suppose the movement direction can be changed arbitrarily during the process?  
  *Hint: How does the possibility of direction changes affect the path coverage and uniqueness?*

### Summary
This problem uses a prefix-sum scan to identify valid starting zeros by checking if the block of non-zero elements is strictly to the left or right, a classic two-pointer or prefix-sum array pattern. This technique is commonly used in partition or subarray problems such as those involving balancing or boundary conditions.

### Tags
Array(#array), Simulation(#simulation), Prefix Sum(#prefix-sum)

### Similar Problems
