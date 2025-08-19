### Leetcode 1062 (Medium): Longest Repeating Substring [Practice](https://leetcode.com/problems/longest-repeating-substring)

### Description  
Given a string S, find the length of the **longest substring** that appears **at least twice** in S. Substrings may overlap but must not be identical occurrences.  
If there is no repeating substring, return 0.

### Examples  

**Example 1:**  
Input: `abcd`  
Output: `0`  
*Explanation: No substring appears more than once.*

**Example 2:**  
Input: `abbaba`  
Output: `2`  
*Explanation: The substrings `"ab"` and `"ba"` each appear twice and have length 2. There is no longer repeating substring.*

**Example 3:**  
Input: `aabcaabdaab`  
Output: `3`  
*Explanation: The substring `"aab"` appears three times. No longer repeating substring exists.*

**Example 4:**  
Input: `aaaaa`  
Output: `4`  
*Explanation: The substring `"aaaa"` appears twice. Though `"aaa"` or `"aa"` appear more times, we want the longest possible.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Check all possible substrings and count their occurrences. Time: O(n³) (extract and compare all substrings).

- **Improve with hashing:**  
  For each possible length L (from n-1 down to 1), use a set to store seen substrings of length L. If any duplicate found, that's the answer. Still O(n²L) time, but more manageable up to moderate string length.

- **Optimization (Binary Search + HashSet):**  
  Since, as substring length increases, repetitions get less likely, use binary search on length L:
    - For a candidate L, use a set to check if any substrings of length L repeat.
    - If yes, increase L; else, decrease L.  
  This approach gives O(n² log n) time.

- **Possible Suffix Array solution:**  
  If further optimized, build a suffix array, sort all suffixes and find longest common prefix between consecutive suffixes. Though elegant and theoretically optimal, may be overkill for S up to 1500.

The **binary search + hashset** is clean, efficient, and easy to implement for this input size.

### Corner cases to consider  
- Empty string (though per constraints S is length ≥ 1)
- All characters the same (e.g., "aaaaa", expect n-1)
- All unique characters (e.g., "abcde", expect 0)
- Repeats only for substrings of length 1
- Substrings can overlap (make sure to allow overlapping occurrence, e.g. "aaa" contains two overlapping "aa").
- Longest repeating substring occurs more than twice

### Solution

```python
def longestRepeatingSubstring(S):
    n = len(S)
    
    # Helper to check if any substring of length L repeats
    def search(L):
        seen = set()
        for i in range(n - L + 1):
            substring = S[i:i+L]
            if substring in seen:
                return True
            seen.add(substring)
        return False
    
    left, right = 1, n
    answer = 0
    while left <= right:
        mid = left + (right - left) // 2
        if search(mid):
            answer = mid    # substring of length mid repeats, try longer
            left = mid + 1
        else:
            right = mid - 1
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² log n)  
  - Each binary search iteration: O(n) substring checks, each O(L) time (where L is substring length ≤ n). So O(n²) per search. Binary search adds a log n factor.
- **Space Complexity:** O(n²) in worst case: storing all substrings in the set for a given length.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string is very long (e.g., up to 10⁶ characters)?  
  *Hint: Consider more memory-efficient substring hashing (e.g. Rabin–Karp rolling hash), or suffix arrays.*

- How would you retrieve the repeated substring(s), not just the length?  
  *Hint: Store the repeating substrings or their starting positions while searching.*

- Can you do this with less than O(n²) memory?  
  *Hint: Use rolling hash with integer values rather than storing substrings.*

### Summary
This is a classic **binary search on answer**, coupled with set-based substring lookup, and is a typical example of the *string search* and *binary search on result* pattern.  
The core trick is translating "find the longest X for which a boolean test returns true" into a binary search, and efficiently using hash sets to check for repeated substrings.  
Related techniques include Rabin–Karp hashing (for rolling substring checks), and suffix array/LCP array (for all substring match problems).

### Tags
String(#string), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Rolling Hash(#rolling-hash), Suffix Array(#suffix-array), Hash Function(#hash-function)

### Similar Problems
