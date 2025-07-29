### Leetcode 2996 (Easy): Smallest Missing Integer Greater Than Sequential Prefix Sum [Practice](https://leetcode.com/problems/smallest-missing-integer-greater-than-sequential-prefix-sum)

### Description  
Given an integer array `nums`, find the sum of the longest prefix where each element increases by exactly 1 from the previous (i.e., `nums, nums[1], ... nums[k]` where for each i: `nums[i] == nums[i-1] + 1`).  
Then, return the **smallest positive integer `x` that is missing from `nums`** and satisfies `x ≥ prefix_sum` (the sum of the longest sequential prefix).

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 2, 5]`  
Output: `6`  
*Explanation: The longest sequential prefix is [1, 2, 3] (because 2 is not 3+1), sum = 1+2+3 = 6.  
6 is not in nums, and 6 ≥ 6. So answer is 6.*

**Example 2:**  
Input: `nums = [4, 5, 6, 7, 10]`  
Output: `22`  
*Explanation: The longest sequential prefix is [4, 5, 6, 7], sum = 4+5+6+7 = 22.  
22 is not in nums. All numbers after 22 are also missing, but 22 is the smallest such x ≥ 22.*

**Example 3:**  
Input: `nums = [3, 5, 6, 7, 8]`  
Output: `29`  
*Explanation: The longest sequential prefix is [3], sum = 3.  
3 is present, but the smallest missing x ≥ 3 is 4 (but 4 is not in nums), but by definition, we only sum sequentially.  
Since only the first number is the prefix (others don't follow +1), prefix_sum = 3,  
The smallest x ≥ 3 missing from nums is 4.*

### Thought Process (as if you’re the interviewee)  
- Start by identifying the **longest prefix** where each next element increases by 1.
- Compute its **sum**.
- Keep track of **which numbers are present** in nums (using a set for O(1) lookup).
- Start at `prefix_sum` and increment x by 1 until we find the first `x` not in the set.
- This is efficient since we only scan the prefix once, construct a set, and loop from prefix_sum upwards.

- **Brute force**: For each possible sum (for all prefixes), check missing integers > that sum. **Inefficient!**
- **Optimized**: Only need **longest increasing by 1** prefix and start searching at its sum.  
  Set lookup for existence is O(1); total time is O(n).

### Corner cases to consider  
- Empty array ⇒ not possible per constraints (but if so, return 1).
- nums of length 1.
- All numbers negative (could have negative prefix_sum).
- All numbers present up to prefix_sum (so have to search above).
- Duplicate values in array.
- Large numbers.
- Strictly decreasing or random arrays.

### Solution

```python
def missingInteger(nums):
    # Step 1: Find the sum of the longest sequential prefix
    prefix_sum = nums[0]
    for i in range(1, len(nums)):
        # Check if current value is exactly 1 greater than previous
        if nums[i] == nums[i - 1] + 1:
            prefix_sum += nums[i]
        else:
            break

    # Step 2: Build a set for O(1) lookups
    present = set(nums)

    # Step 3: Find the smallest integer ≥ prefix_sum not in nums
    x = prefix_sum
    while x in present:
        x += 1
    return x
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums).  
  Justification:  
  - One pass to check prefix (O(n)).
  - Build set from nums (O(n)).
  - At most O(n) increments above prefix_sum (worst case, but rarely needed).
- **Space Complexity:** O(n) for the set to store existing numbers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the prefix can be *any* increasing sequence, not just +1?
  *Hint: Modify to find the prefix which is strictly increasing, not just sequential by 1.*

- Can you do this in O(1) additional space?
  *Hint: Avoid the set by searching in sorted nums (trade-off: must sort).*

- What if the input can contain duplicates or negative numbers? Does your solution handle this?
  *Hint: Think about how the sum and set checks behave with such inputs.*

### Summary
This question is an example of using **prefix scanning** and a **hash set for missing number search**, often seen for "first missing positive" type problems. The logic is a mix of sequential prefix finding and classic set-based membership testing.  
It makes use of the **greedy** technique (longest valid prefix) and **set lookups** (hash-based existence check).  
This pattern appears in array manipulation and simulation problems, especially where you need to "fast forward" to the smallest integer not represented in a set of encountered numbers.