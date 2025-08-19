### Leetcode 2023 (Medium): Number of Pairs of Strings With Concatenation Equal to Target [Practice](https://leetcode.com/problems/number-of-pairs-of-strings-with-concatenation-equal-to-target)

### Description  
Given an array of strings nums and a string target, count the number of pairs of indices (i, j) such that:
- i ≠ j (cannot use the same index twice)
- Concatenating nums[i] + nums[j] gives exactly the target string

The task is to efficiently count all such valid (i, j) pairs. Each string in nums is a non-empty digit string.

### Examples  

**Example 1:**  
Input: `nums = ["123", "4", "12", "34"], target = "1234"`  
Output: `2`  
*Explanation:*
- Pair (0,1): "123" + "4" = "1234"
- Pair (2,3): "12" + "34" = "1234"

**Example 2:**  
Input: `nums = ["a","a"], target = "aa"`  
Output: `2`  
*Explanation:*
- Pair (0,1): "a" + "a" = "aa"
- Pair (1,0): "a" + "a" = "aa"

**Example 3:**  
Input: `nums = ["ab","cd","ef"], target = "gh"`  
Output: `0`  
*Explanation:*
- No pair produces "gh" when concatenated.


### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to try every possible pair (i, j) where i ≠ j and check if nums[i] + nums[j] equals target. This is O(n²), which can be slow if nums is large.
- To optimize, notice that we want to efficiently count, for each possible split of target into two parts (target = a + b), the number of i with nums[i] = a and j with nums[j] = b (i ≠ j).
- We can:
  - Build a frequency count (dictionary) of all strings in nums.
  - For each split of target (from index 1 to len(target)-1), let a = target[:k], b = target[k:].
  - The count for each split is freq[a] × freq[b] (if a ≠ b), or freq[a] × (freq[a] - 1) for a == b (since we must have i ≠ j).
- This reduces the time to O(K × n), where K = len(target) (number of possible splits), and n = len(nums).
- This approach is efficient, handles all edge cases, and avoids using forbidden "library" shortcuts.


### Corner cases to consider  
- nums is empty or target is empty → Output should be 0.
- No possible split (target is length 1) → Output is 0.
- All nums are the same string, and target = nums+nums, should correctly count freq × (freq-1) orderings.
- Duplicate string pairs: both (i, j) and (j, i) can contribute if i ≠ j.
- Multiple ways to split target: each split must be checked.
- Split points producing empty strings are invalid (since all nums are non-empty).

### Solution

```python
def numOfPairs(nums, target):
    # Build frequency count of all strings in nums
    freq = {}
    for s in nums:
        if s in freq:
            freq[s] += 1
        else:
            freq[s] = 1

    result = 0
    n = len(target)
    # Try every possible split: target = prefix + suffix
    for i in range(1, n):
        a = target[:i]
        b = target[i:]
        # Avoid split into empty string(s), each must be non-empty
        if a in freq and b in freq:
            if a != b:
                result += freq[a] * freq[b]
            else:
                # Avoid picking same index twice
                result += freq[a] * (freq[a] - 1)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + K), where n = len(nums) and K = len(target).
  - Building the frequency map is O(n).
  - For each split (at most len(target)-1 positions), lookups are O(1) each.
- **Space Complexity:** O(n)
  - The frequency map can be up to O(n) in the worst case (all unique strings).
  - No extra storage beyond that.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums can have empty strings?  
  *Hint: Carefully handle splits to avoid including empty substrings; verify what happens when nums has "".*

- How would you modify the approach if order of indices in pairs doesn’t matter (i.e., unordered pairs)?  
  *Hint: Only count each unordered pair once or divide counts by 2 where both (i, j) and (j, i) are counted.*

- Can you do this in O(n) time if all string lengths are small?  
  *Hint: Try to exploit properties of short strings. Can you use counting arrays or radix sorting?*

### Summary
The solution uses the "frequency map + string split" pattern, which is very efficient anytime you need all pairs of elements that together form a larger object (like concatenating to form a target). This double-counting technique (product of frequencies, with adjustment for self-pairs) is common in pair-count and substring problems, and can also be applied to other problems like counting pairs of words that form palindromes, anagrams, or other composite string properties.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Two Sum(two-sum) (Easy)