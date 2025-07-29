### Leetcode 3346 (Medium): Maximum Frequency of an Element After Performing Operations I [Practice](https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i)

### Description  
Given an integer array **nums**, and two integers **k** and **numOperations**:  
You must perform exactly **numOperations** operations on **nums**, where in each operation you:
- Pick an index i (never the same index twice),
- Add any integer between **-k** and **k** (inclusive) to **nums[i]**.

After all operations, what's the **maximum possible frequency** (number of occurrences) you can achieve for any one value in the array?  
(You can choose different indices for your operations. You can only select each index once.)

### Examples  

**Example 1:**  
Input: `nums = [1,4,5]`, `k = 1`, `numOperations = 2`  
Output: `2`  
*Explanation: Add 0 to nums[1] (leaving it as 4), add -1 to nums[2] (making it 4). New array: [1,4,4]. Maximum frequency: 2 (number 4 appears twice).*

**Example 2:**  
Input: `nums = [5,11,20,20]`, `k = 5`, `numOperations = 1`  
Output: `2`  
*Explanation: Add 0 to nums[1] (leave 11), no other operations. Array: [5,11,20,20]. Maximum frequency: 2 (20 appears twice).*

**Example 3:**  
Input: `nums = `, `k = 0`, `numOperations = 0`  
Output: `1`  
*Explanation: No changes can be made. Only element 7. Frequency: 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every subset of indices (size ≤ numOperations), and every possible number to pick as the "target". For each, calculate how many elements could be converted to the target value within the allowed k range. This is exponential and infeasible if input is large, but nums is small (≤ 10 entries).
  
- **Optimized approach:**  
  Since nums is small (max 10 elements), we can:  
  - For each possible value v that could potentially be in the array after operations:
    - For each nums[i], check if |nums[i] - v| ≤ k (i.e., can we convert nums[i] into v by adding something in range [-k, k]?).
    - Count how many elements could be converted into v that are not already v.
    - If count ≤ numOperations, then frequency of v can be at least (current count of v) + min(numOperations, number of changeable indices).
    - Among all possible v, take the maximum such frequency.
  - For efficiency, only consider v’s in the range [min(nums) - k, max(nums) + k] (or numbers achievable with ±k from each nums[i]).
  - For each v, prioritize changing numbers which are not already v.

- **Trade-offs:**  
  - This approach is practical due to small array size. It’s O(n²*k) in the worst case, but for n≤10 and k≤10⁵ it is fast.
  - No complex data structures needed.

### Corner cases to consider  
- All elements already equal.
- k = 0 (no allowed changes).
- numOperations = 0 (can’t make any changes).
- numOperations >= n (you could change every element).
- Duplicate numbers in input—how does conversion affect frequency?
- Negative numbers or zero in nums.
- Target value not in original nums, but could be created using an operation.
- Multiple possible targets with same achievable frequency.
- k > max(nums).

### Solution

```python
def maxFrequency(nums, k, numOperations):
    n = len(nums)
    maxFreq = 1  # At least one element always exists

    # Generate all possible target values: v that nums[i] +-k can reach
    candidates = set()
    for num in nums:
        for delta in range(-k, k+1):
            candidates.add(num + delta)
    
    # For each possible target
    for target in candidates:
        diffs = []
        for idx in range(n):
            diff = abs(nums[idx] - target)
            if diff <= k:
                diffs.append((diff, idx))
        # Sort by indices; minimize number of operations needed
        # We'll always use as many diffs as allowed by numOperations
        freq = 0
        # We can take at most numOperations indices to set to target
        if len(diffs) >= 1:
            # Sort not necessary, just count
            freq = min(len(diffs), numOperations) + (
                len([x for x in range(n) if nums[x] == target])
                if numOperations < len(diffs) else 0
            )
            # Fix overcount: Only count each index once
            freq = max(freq, len([x for x in range(n) if nums[x] == target]))
            freq = min(freq, n)
        else:
            freq = len([x for x in range(n) if nums[x] == target])
        maxFreq = max(maxFreq, freq)
    return maxFreq
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² \* k) — For each number (n entries), we try each potential target in a range of size ≈ n\*(2k+1). For each, we loop through nums (O(n)), possible because n ≤ 10.
- **Space Complexity:** O(nk) — For storing the set of candidate targets, plus O(n) for diffs list at each check.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is much larger (e.g., up to 10⁵)?  
  *Hint: How to avoid trying every possibility? Could you use sorting and sliding window?*

- What if k is extremely large?  
  *Hint: Can you exploit the fact that almost any number can be converted to almost anything?*

- How would you handle negative numbers or arrays that are not sorted?  
  *Hint: Should your approach change in any way?*

### Summary
This solution uses an **enumeration and frequency counting pattern** typical for cases where the problem size is small and all possibilities can be checked efficiently. The key insight is to pick every achievable value as a potential target and maximize the number of indices you can convert to it within the allowed k range and operation limit. Variants of this pattern appear in “frequency maximization after changes”, “character replacement in strings”, and “at most k operations” sliding window problems.