### Leetcode 2750 (Medium): Ways to Split Array Into Good Subarrays [Practice](https://leetcode.com/problems/ways-to-split-array-into-good-subarrays)

### Description  
Given a binary array `nums`, you need to find the number of ways to split it into contiguous subarrays such that **every subarray has exactly one occurrence of '1'**. Each split must be non-empty and every '1' must be in a separate subarray. Return the result modulo 10⁹+7.

- A "good" subarray is defined as one containing exactly one '1'.
- Find the total number of ways to make such splits, or 0 if impossible.

### Examples  

**Example 1:**  
Input: `nums = [0,1,0,0,1]`  
Output: `3`  
*Explanation: There are 3 ways:*
- `[0,1] [0,0,1]`
- `[0,1,0] [0,1]`
- `[0,1,0,0] [1]`

**Example 2:**  
Input: `nums = [0,1,0]`  
Output: `1`  
*Explanation: Only one way:*
- `[0,1,0]` (the entire array, as there's only one '1')

**Example 3:**  
Input: `nums = [0,0,0]`  
Output: `0`  
*Explanation: No '1's in the array, so splitting into good subarrays is impossible.*

### Thought Process (as if you’re the interviewee)  
Start by understanding what a "good" subarray is: it must contain exactly one '1', and may contain any number of zeros.

Brute-force:  
Could enumerate all possible splits and check if every subarray is good. But this is exponential time and infeasible for n up to 10⁵.

Observations:  
If there are \(k\) ones, and we must have a subarray for each, then between any two consecutive ones, all zeros must be part of a split somewhere. Consider where to split: for every pair of consecutive '1's, the zeros between them (say there are z zeros between two ones) offer z+1 choices for splitting. For each such gap, we multiply the number of choices.

So, the answer = product over all pairs of consecutive '1's of (number of zeros between + 1).
If there are no ones, return 0. If only one '1', the whole array is the only "good" subarray, so answer is 1.

### Corner cases to consider  
- Array has no '1': return 0.
- Array has only one '1': return 1, any zeros around can be included; only one way.
- All elements are '1': each must be in its own subarray, and no zeros in between, only one way.
- Multiple zeros at the beginning or end: must be attached to the nearest '1'.
- Very large arrays (test MOD).

### Solution

```python
def numberOfGoodSubarraySplits(nums):
    MOD = 10**9 + 7
    n = len(nums)
    one_indices = [i for i, x in enumerate(nums) if x == 1]
    if not one_indices:
        return 0  # No 1's, no good subarrays
    ans = 1
    # Multiply the number of ways for every pair of consecutive 1's
    for i in range(1, len(one_indices)):
        gap = one_indices[i] - one_indices[i-1] - 1  # number of zeros between the ones
        ans = (ans * (gap + 1)) % MOD
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we scan the array once to find the indices of '1's.
- **Space Complexity:** O(n) in the worst case (if all elements are '1', we store their indices), but usually the number of '1's is much smaller.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle streaming input (where the array comes element by element)?
  *Hint: Can you keep only counts and the last '1' index instead of all indices?*
- What if "good" is redefined to mean "contains at most/at least one '1'"?
  *Hint: How does counting and splitting logic change?*
- Can you output all possible "good" splits instead of just the count?
  *Hint: Is it tractable for large n? How would you represent them efficiently?*

### Summary
We leveraged the observation that the only freedom in splitting comes from zeros between consecutive ones, resulting in a counting pattern based on gaps. The product-of-choices approach for each pair of '1's is classic combinatorics (multiplication principle). This is a common "gap between elements" product pattern, often seen in interval and string splitting questions.