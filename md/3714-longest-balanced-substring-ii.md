### Leetcode 3714 (Medium): Longest Balanced Substring II [Practice](https://leetcode.com/problems/longest-balanced-substring-ii)

### Description  
Given a string **s** consisting only of the characters 'a', 'b', and 'c', a **balanced substring** is defined as a substring in which each distinct character appears the exact same number of times.  
Your task is to return the length of the **longest balanced substring** of **s**.  
A substring could contain 1, 2, or all 3 unique characters, as long as their counts are the same.

### Examples  

**Example 1:**  
Input: `s = "abba"`  
Output: `4`  
Explanation: The substring `"abba"` is balanced since both 'a' and 'b' appear 2 times each.

**Example 2:**  
Input: `s = "aabcc"`  
Output: `3`  
Explanation: `"abc"` is balanced (each character appears once). Substrings like "aab", "bcc", etc., are not balanced.

**Example 3:**  
Input: `s = "abcabcbb"`  
Output: `6`  
Explanation: `"abcabc"` is balanced. It contains 'a', 'b', and 'c'; each appears 2 times.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Consider all possible substrings, count the frequency of each character within the substring, and check if all distinct characters have equal frequencies. This would be O(n³): O(n²) substrings, O(n) to count in each.  
- **Optimize for better performance:**  
  We need something much faster. Since the counts of 'a', 'b', and 'c' only need tracking, prefix sums can help. For any substring, if (countₐ - count_b, countₐ - count_c) are the same at two indices, then the substring between those indices is balanced (since the difference in appearances hasn't changed).  
  - Track prefix counts of each character.
  - Use a hashmap to store the earliest index where each (diffₐb, diffₐc) pair is seen.  
  - For every position, the substring between this and the first time we saw this difference pair will be balanced.  
  - For substrings of only 1 or 2 characters (e.g., all 'a', or just 'a' and 'b'), use straightforward solutions as edge cases.

### Corner cases to consider  
- Empty string (`""`)
- String with only one character, e.g., `"aaaa"`
- String with just two unique characters, e.g., `"aabbbb"`
- String with no balanced substring (e.g., all unique, all different counts)
- Substrings at the start or end of the original string
- Multiple balanced substrings, return the length of the longest

### Solution

```python
def longestBalanced(s: str) -> int:
    from collections import defaultdict

    n = len(s)
    maxlen = 0

    # 1. Check for one unique character (e.g., "aaaa")
    same_char = 1
    curr = 1
    for i in range(1, n):
        if s[i] == s[i - 1]:
            curr += 1
        else:
            same_char = max(same_char, curr)
            curr = 1
    same_char = max(same_char, curr)
    maxlen = max(maxlen, same_char)

    # 2. Check for two characters with equal count, sliding window with hashmap
    def two_char_balance(a, b):
        idx_map = {}
        idx_map[0] = -1  # diff = count_a - count_b
        diff = 0
        res = 0
        for i, ch in enumerate(s):
            if ch == a:
                diff += 1
            elif ch == b:
                diff -= 1
            else:
                diff = 0
                idx_map = {0: i}
                continue
            if diff in idx_map:
                res = max(res, i - idx_map[diff])
            else:
                idx_map[diff] = i
        return res

    pairs = [('a', 'b'), ('a', 'c'), ('b', 'c')]
    for a, b in pairs:
        maxlen = max(maxlen, two_char_balance(a, b))

    # 3. Check for all three having same count. Use diff pair (a-b, a-c).
    from collections import defaultdict
    diff_map = defaultdict(int)
    # map: (deltaₐb, deltaₐc) → first index seen
    diff_map[(0, 0)] = -1
    count = {'a': 0, 'b': 0, 'c': 0}
    for i, ch in enumerate(s):
        count[ch] += 1
        key = (count['a'] - count['b'], count['a'] - count['c'])
        if key in diff_map:
            maxlen = max(maxlen, i - diff_map[key])
        else:
            diff_map[key] = i

    return maxlen
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each character is processed in a single pass for all character pairs and for the three-character case.
- **Space Complexity:** O(n), for the hashmaps and prefix difference storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this solution for a string with more than 3 types of characters?  
  *Hint: Track every pair of difference combinations for k letters.*

- Can you return the substring itself, not just its length?  
  *Hint: Store start indices in your hashmaps.*

- Can this be done with less than O(n) space?  
  *Hint: Consider the pigeonhole principle for difference pairs.*

### Summary
The core approach is a *prefix sum with state hashing*—a powerful pattern for substring and subarray problems where balance or difference invariants need tracking. This technique applies to problems like Longest Subarray with Sum Zero, Equal Number of 0s and 1s, and generalizes to more characters and constraints with careful state management.


### Flashcard
Track prefix differences (count_a − count_b, count_a − count_c); if the same pair appears at two indices, the substring between them has equal character frequencies.

### Tags
Hash Table(#hash-table), String(#string), Prefix Sum(#prefix-sum)

### Similar Problems
