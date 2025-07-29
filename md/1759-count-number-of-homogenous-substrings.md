### Leetcode 1759 (Medium): Count Number of Homogenous Substrings [Practice](https://leetcode.com/problems/count-number-of-homogenous-substrings)

### Description  
Given a string s, return the number of homogenous substrings of s.  
A string is **homogenous** if all characters in the substring are identical.  
A substring is any contiguous sequence within s (of any length ≥ 1).
Large values possible — return the result modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `s = "abbcccaa"`  
Output: `13`  
Explanation:  
- "a" appears 3 times ("a" at indices 0, 6, 7)  
- "aa" appears 1 time ("aa" at indices 6,7)  
- "b" appears 2 times  
- "bb" appears 1 time  
- "c" appears 3 times  
- "cc" appears 2 times  
- "ccc" appears 1 time  
Total: 3 + 1 + 2 + 1 + 3 + 2 + 1 = 13

**Example 2:**  
Input: `s = "aaaa"`  
Output: `10`  
Explanation:  
- Single "a": 4 times (indices 0,1,2,3)  
- "aa": 3 times (indices 0-1, 1-2, 2-3)  
- "aaa": 2 times (indices 0-2, 1-3)  
- "aaaa": 1 time (indices 0-3)  
Total: 4 + 3 + 2 + 1 = 10

**Example 3:**  
Input: `s = "abc"`  
Output: `3`  
Explanation:  
Each character is a single-letter homogenous substring. So only "a", "b", and "c" — total 3.

### Thought Process (as if you’re the interviewee)  
Brute-force:  
- Consider all possible substrings (O(n²) substrings), check if all characters are the same for each. That’s much too slow for n up to 10⁵.

Optimization:  
- Key insight: For a run of k consecutive identical letters, the number of homogenous substrings is k × (k + 1) ⁄ 2.  
    - Example: for "aaaa" (k=4): substrings are all singles (4), all pairs (3), triples (2), the whole thing (1): 4 + 3 + 2 + 1 = 10.
- Thus, just scan the string, count the length of each run of identical letters, sum up k × (k + 1) ⁄ 2 for each run.

Implementation plan:  
- Loop through the string, keep count of consecutive identical letters (`count`).  
- When the letter changes (or at the end), add count × (count + 1) ⁄ 2 to answer, reset count to 1.

This is O(n) time, O(1) extra space. No need for any fancy data structures.

### Corner cases to consider  
- Single-character string (e.g., "a")
- String with no repeated characters ("abcde")
- String with all repeated characters ("aaaaa")
- Runs at the end of string
- Maximum-length input
- String with alternating characters ("ababab")

### Solution

```python
def countHomogenous(s):
    MOD = 10**9 + 7
    ans = 0
    count = 1
    
    # iterate starting from index 1 to end
    for i in range(1, len(s)):
        if s[i] == s[i-1]:
            count += 1
        else:
            # add the sum for the previous run
            ans += count * (count + 1) // 2
            ans %= MOD
            count = 1  # reset
            
    # add the last run
    ans += count * (count + 1) // 2
    ans %= MOD
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of s. We scan the string once and do constant work at every step.
- **Space Complexity:** O(1), as we only use a few integer variables, regardless of input length.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if you needed to count substrings with at most one different character?
  *Hint: Consider sliding window or two-pointer for substrings with ≤1 mismatch.*

- How would you handle a stream of characters where you can’t store the whole string?
  *Hint: Maintain the current streak and incrementally update answer.*

- How would you modify the approach if you’re restricted from using division (`// 2`)?
  *Hint: Use accumulation or pairing logic to avoid direct division.*

### Summary
This problem demonstrates the **run-length counting** pattern for substring problems:  
- Scan the string linearly.
- For each run of identical chars, use k × (k + 1) ⁄ 2 substrings.
- This pattern appears frequently in substring and sliding window counting, such as similar "count substrings with property X" problems.
No extra data structures — just smart counting!