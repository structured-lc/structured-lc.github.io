### Leetcode 3388 (Medium): Count Beautiful Splits in an Array [Practice](https://leetcode.com/problems/count-beautiful-splits-in-an-array)

### Description  
Given an array `nums`, a split is called **beautiful** if you can break `nums` into three contiguous subarrays, `nums₁`, `nums₂`, and `nums₃` (concatenated in order) such that:
- Either `nums₁` is a prefix of `nums₂`, **or**
- `nums₂` is a prefix of `nums₃`.

Return the number of ways you can make such a split.

### Examples  

**Example 1:**  
Input: `nums = [1,1,2,1]`  
Output: `2`  
Explanation:  
- Split as [1] | [1,2] | [1]: `[1]` is a prefix of `[1,2]`.
- Split as [1] | [1] | [2,1]: `[1]` is a prefix of `[1]`.
(No other split yields a "beautiful" split.)

**Example 2:**  
Input: `nums = [1,2,3,4]`  
Output: `0`  
Explanation:  
There is no way to split into three parts so the required prefix condition is met.

**Example 3:**  
Input: `nums = [3,3,3,3]`  
Output: `3`  
Explanation:  
- [3] | [3] | [3,3]: `[3]` is a prefix of `[3]`, and `[3]` is a prefix of `[3,3]`
- [3] | [3,3] | [3]: `[3]` is a prefix of `[3,3]`
- [3,3] | [3] | [3]: `[3]` is a prefix of `[3]`

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible pairs of split points (i, j) for array boundaries. For each, check whether the prefix condition holds. This is O(n³) due to examining and comparing subarrays—a non-starter for n up to 5000.
- **Optimize prefix checks:** Noticing that prefix checks between subarrays are repeated, we can precompute the Longest Common Prefix (LCP) for any pair (start₁, start₂).
- **LCP idea:** Build a 2D LCP array such that `lcp[i][j]` stores the length of the common prefix between `nums[i:]` and `nums[j:]`.
- **Key Observations:**  
  - If `nums₁` (length i) is a prefix of `nums₂` (starting at i) ⇒ `lcp[i] ≥ i`
  - If `nums₂` (length j-i), is a prefix of `nums₃` (starting at j) ⇒ `lcp[i][j] ≥ j-i`
- The rest is checking, for all splits 1 ≤ i < j ≤ n-1, if these prefix and length constraints hold.

This approach drops run-time to O(n²). Space is also O(n²) due to the LCP matrix. That’s acceptable for n up to 5000.

### Corner cases to consider  
- The array is too small to split (fewer than 3 elements).
- All elements identical (multiple valid splits).
- All elements different (usually no split is possible for prefix matches).
- Long runs of repeating numbers.
- Edge splits, e.g., [a] | [b] | [c].

### Solution

```python
def countBeautifulSplits(nums):
    n = len(nums)
    if n < 3:
        return 0

    # lcp[i][j] = length of longest common prefix between nums[i:] and nums[j:]
    lcp = [[0] * (n + 1) for _ in range(n + 1)]

    # Fill lcp array from back to front
    for i in range(n - 1, -1, -1):
        for j in range(n - 1, i, -1):
            if nums[i] == nums[j]:
                lcp[i][j] = lcp[i + 1][j + 1] + 1

    ans = 0
    # Try all possible splits (i, j): 1 ≤ i < j ≤ n-1
    for i in range(1, n - 1):    # first cut after i-1
        for j in range(i + 1, n): # second cut after j-1
            # Check if nums₁ is a prefix of nums₂
            if i <= j - i and lcp[0][i] >= i:
                ans += 1
            # Or if nums₂ is a prefix of nums₃
            elif j - i <= n - j and lcp[i][j] >= j - i:
                ans += 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  - LCP computation is O(n²).
  - Checking all (i, j) split positions is also O(n²).
- **Space Complexity:** O(n²)  
  - The LCP table requires n × n storage.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you reduce the space from O(n²) to O(n)?
  *Hint: Is it possible to re-compute LCPs on the fly for current (i, j) rather than storing all?*

- What if you wanted to find the actual splits, not just their count?
  *Hint: Track split indices and reconstruct subarrays.*

- How would you adapt this for strings (not integers)?
  *Hint: String LCP/substring matching with hashing or suffix structures.*

### Summary
We used LCP preprocessing for prefix comparison to efficiently enumerate valid triple splits in O(n²) time and space. This problem mirrors standard techniques in substring matching and prefix array construction. The two-pointer and sliding window approaches are insufficient here since arbitrary-length subarray prefix equality is required. This LCP table idea is applicable to problems requiring fast, repeated prefix or substring comparison, especially in string or sequence analysis contexts.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
