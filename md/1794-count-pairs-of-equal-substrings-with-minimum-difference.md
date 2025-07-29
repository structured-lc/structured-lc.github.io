### Leetcode 1794 (Medium): Count Pairs of Equal Substrings With Minimum Difference [Practice](https://leetcode.com/problems/count-pairs-of-equal-substrings-with-minimum-difference)

### Description  
Given two strings, **firstString** and **secondString**, count the number of quadruples (i, j, a, b) such that the substring from the iᵗʰ to the jᵗʰ character (inclusive) in **firstString** is **equal** to the substring from the aᵗʰ to the bᵗʰ character (inclusive) in **secondString**, and the value (j - a) is minimized among all such possible quadruples. Return the number of such quadruples.

- 0 ≤ i ≤ j < len(firstString)
- 0 ≤ a ≤ b < len(secondString)
- firstString[i..j] == secondString[a..b]
- (j - a) is minimized among all matching quadruples.

### Examples  

**Example 1:**  
Input: `firstString = "abcd", secondString = "bccda"`  
Output: `1`  
*Explanation: The only quadruple is (0,0,4,4), as "abcd" == "ccda" is not true for any substring, but "a" matches "a" at positions (3 in firstString, 4 in secondString), making the only possible minimal (j - a) = -1 for "a", which is the minimum among all matches.*

**Example 2:**  
Input: `firstString = "abc", secondString = "def"`  
Output: `0`  
*Explanation: There is no common substring between "abc" and "def".*

**Example 3:**  
Input: `firstString = "aab", secondString = "baa"`  
Output: `2`  
*Explanation: "a" occurs twice in firstString (positions 0 and 1) and also twice in secondString (positions 1 and 2). The minimal j - a for all such matches happens when matching "a" at firstString[1] and secondString[2], and firstString and secondString[1], both yielding the minimum possible difference. Hence, there are 2 quadruples.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Compare all possible substrings from firstString and secondString, for all valid (i, j, a, b). For each substring match, compute (j - a) and track the minimum. Then, count all quadruples with that minimum. This approach is O(n⁴) (where n = length of the longer string) and infeasible for large inputs.

- **Observation:**  
  The requirement to minimize (j - a) suggests that **shorter substrings** yield smaller or equal values, especially substrings of length 1, i.e., individual character matches. For any longer substring, (j - a) only increases.

- **Optimization:**  
  Focus on matching **single characters** only:
    - For each character c, find all indices i in firstString where firstString[i] == c.
    - For each character c, find all indices a in secondString where secondString[a] == c.
    - For each pair (i, a), compute (i - a).
    - Track the minimal value min_diff.
    - Count pairs (i, a) where (i - a) == min_diff.

- **Why this works:**  
  Any longer matching substring will not give a smaller value of (j - a) than a matching single character substring, since increasing substring length increases j and b in parallel.

### Corner cases to consider  
- Both strings empty: should return 0.
- No common characters.
- All characters are the same.
- Multiple minimal differences with different characters.
- Strings of length 1.
- Non-overlapping characters.

### Solution

```python
def countQuadruples(firstString: str, secondString: str) -> int:
    # Dictionary mapping character to list of its indices in firstString
    indices_first = {}
    for idx, c in enumerate(firstString):
        indices_first.setdefault(c, []).append(idx)
        
    # Dictionary mapping character to list of its indices in secondString
    indices_second = {}
    for idx, c in enumerate(secondString):
        indices_second.setdefault(c, []).append(idx)
    
    min_diff = float('inf')
    count = 0
    
    # For each character occurring in both strings
    for c in indices_first:
        if c in indices_second:
            for i in indices_first[c]:
                for a in indices_second[c]:
                    diff = i - a
                    if diff < min_diff:
                        min_diff = diff
                        count = 1
                    elif diff == min_diff:
                        count += 1
                    
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × m) in the worst case, where n = len(firstString), m = len(secondString), since for each character, all pairs of positions in both strings might need to be considered.

- **Space Complexity:**  
  O(n + m), storing positions of each character from both strings.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to find **all quadruples** (not just count)?  
  *Hint: Change count to saving (i, i, a, a) for every matching (i, a) achieving min_diff.*

- What if the strings are extremely **large (millions of chars)**?  
  *Hint: Efficient hashing, batch processing, or only storing counters may be needed.*

- Can the solution be **generalized to substrings of length k** instead of only single characters?  
  *Hint: Consider rolling hash or trie for substrings of fixed length.*

### Summary
This problem is a good test of recognizing when a brute-force substring search is unnecessary and that **single-character matching** suffices for optimality, allowing O(n × m) complexity instead of O(n⁴). This pattern appears frequently in substring and minimal-difference/constrained matching problems, where focusing on simpler matches yields optimality. The core principle is that **sometimes the minimum of an expression is achieved under the simplest case** (here, substring length 1). Techniques of frequency mapping and minimal comparisons are widely applicable in string processing questions.