### Leetcode 3043 (Medium): Find the Length of the Longest Common Prefix [Practice](https://leetcode.com/problems/find-the-length-of-the-longest-common-prefix)

### Description  
Given two arrays of integers, arr1 and arr2, find the length of the **longest common prefix** that appears as a prefix in any number from both arrays. The prefix must be shared by at least one integer in arr1 and one in arr2. The prefix is defined in the digit-wise sense (i.e., leading digits), not as a difference in value.

### Examples  

**Example 1:**  
Input: `arr1 = [1234, 567, 89]`, `arr2 = [123, 561, 8]`  
Output: `3`  
Explanation:  
- 1234 and 123 both share the prefix "123" (length 3).  
- No longer prefix is common in any pair.

**Example 2:**  
Input: `arr1 = [98, 7]`, `arr2 = [123, 456]`  
Output: `0`  
Explanation:  
- There is no common starting digit sequence among any pair, so the result is 0.

**Example 3:**  
Input: `arr1 = [11111, 11234]`, `arr2 = [11112, 11345]`  
Output: `4`  
Explanation:  
- 11111 and 11112 share the prefix "1111" (length 4).  
- No longer prefix is common.

### Thought Process (as if you’re the interviewee)  
First, I’d clarify what a ‘common prefix’ means: for this problem, two numbers have a common prefix if their decimal string representations share the same starting digits.  
A brute-force method is to compare all possible pairs from arr1 and arr2, comparing their digit-by-digit prefixes and tracking the longest. This is O(m×n×L), where m, n are array lengths, L is max digit length.

But we can optimize:
- For every number in arr1, store all its possible prefixes in a set.
- For each number in arr2, try all its prefixes from longest to shortest; if any of these is found in the set, calculate and update the result.

This brings overall time to O(M×D) where M is total number count and D is max digit length (since each digit results in a prefix substring to insert/check).

Alternatively, a Trie (Prefix Tree) approach can be used for more complex prefix queries, but for this setup a Set suffices and is efficient.

### Corner cases to consider  
- arr1 or arr2 has only one number.
- Both arrays share no starting digits at all.
- Numbers are very short (one digit).
- Very large numbers with identical long prefixes.
- Leading zeros (should never happen for integer input).
- Duplicate numbers within or across arrays.

### Solution

```python
def longest_common_prefix_length(arr1, arr2):
    # Helper to get all prefixes as strings for a number
    def get_prefixes(num):
        s = str(num)
        prefixes = []
        for i in range(1, len(s) + 1):
            prefixes.append(s[:i])
        return prefixes

    # Store all prefixes from arr1 in a set
    prefix_set = set()
    for num in arr1:
        prefix_set.update(get_prefixes(num))

    # For arr2, check all prefixes (from long to short), update max if matched
    res = 0
    for num in arr2:
        s = str(num)
        for i in range(len(s), 0, -1):
            prefix = s[:i]
            if prefix in prefix_set:
                res = max(res, i)
                # Can break since longer prefixes checked first
                break
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((m + n) × D)
  - m = length of arr1, n = length of arr2, D = maximum number of digits in any number.
  - Every number in arr1 and arr2 processed up to D times for prefix generation/check.
- **Space Complexity:** O(m × D)
  - The set may store up to m × D prefixes (though actual is much less in practice since prefixes overlap).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you **return the actual prefix(es)** with this maximum length?
  *Hint: Store mapping from prefix to its length, track which ones matched.*

- How would the solution change if **leading zeros** in input were allowed?
  *Hint: Keep prefixes as strings, handle zero-padding on conversions.*

- Could you improve to **O(N)** if both arrays were massive?
  *Hint: Use Trie, limit prefix search depth, or early pruning.*

### Summary
This problem demonstrates efficient **prefix enumeration and set/mapping techniques**, a common pattern for substring/prefix problems. The approach here mirrors substring hash-set matching (used in problems like Longest Common Substring) and is also related to trie-based pattern matching in text or numeric contexts. It’s broadly useful in string manipulation, file system prefix matching, and autocomplete scenarios.