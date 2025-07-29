### Leetcode 2800 (Medium): Shortest String That Contains Three Strings [Practice](https://leetcode.com/problems/shortest-string-that-contains-three-strings)

### Description  
Given three strings **a**, **b**, and **c**, find the string with **minimum length** that contains all three given strings as substrings.  
If there are multiple possible answers, return the **lexicographically smallest** one.  
You must return the answer as a string.

### Examples  

**Example 1:**  
Input: `a = "ab", b = "ba", c = "aba"`  
Output: `"aba"`  
Explanation:  
- `"aba"` contains `"ab"` (positions 0..1), `"ba"` (positions 1..2), and `"aba"` (positions 0..2).
- Among all such superstrings, `"aba"` is shortest (length 3), and is also lexicographically smallest.

**Example 2:**  
Input: `a = "ca", b = "a", c = "a"`  
Output: `"ca"`  
Explanation:  
- `"ca"` contains `"ca"` and contains `"a"` (twice; as an inclusion is enough).
- Shortest possible and lexicographically smallest.

**Example 3:**  
Input: `a = "abc", b = "bca", c = "cab"`  
Output: `"abcabca"`  
Explanation:  
- `"abcabca"` contains `"abc"` (positions 0..2), `"bca"` (positions 1..3 and 4..6), and `"cab"` (positions 2..4).
- All permutations for merging produce at least 7 characters; this is the lex smallest one.

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is: Try all possible permutations of the 3 strings' order and merge them one by one, ensuring maximum overlap, to minimize the final length.
- For each permutation (a,b,c), (a,c,b), (b,a,c), etc., merge the first two strings with max possible overlap, then merge that result with the third.  
- To merge two strings, see if one is a substring of the other, or else look for the maximum overlap suffix of the first with the prefix of the second.
- At the end, compare all 6 permutations' resultant strings; pick the shortest, lexicographically smallest one as required.
- This approach is feasible since there are only 6 possible permutations (\(3!\)), and individual merges involve only string manipulation, so overall performance is acceptable.
- Trade-off: This approach is easy to implement, not asymptotically optimal, but with only 3 strings the brute-force enumeration + greedy merging works well.

### Corner cases to consider  
- All three strings are identical (e.g., "aa", "aa", "aa").  
- Some strings are substrings of others (e.g., "abc", "bc", "c").  
- Strings with no common overlap (e.g., "x", "y", "z").  
- Strings contain repeating or overlapping parts in complex ways (e.g., "aaa", "aa", "a").  
- Very short or single-character strings.  
- Strings are already substrings of the others.

### Solution

```python
def minimumString(a: str, b: str, c: str) -> str:
    from itertools import permutations

    def merge(s: str, t: str) -> str:
        # If t is already fully contained in s, just return s
        if t in s:
            return s
        # Try max possible overlap: s suffix, t prefix
        max_overlap = 0
        min_len = min(len(s), len(t))
        # Check for largest k such that s[-k:] == t[:k]
        for k in range(min_len, 0, -1):
            if s[-k:] == t[:k]:
                max_overlap = k
                break
        return s + t[max_overlap:]
    
    res = None
    # Try all 6 orders of merging a, b, c
    for order in permutations([a, b, c]):
        merged = merge(merge(order[0], order[1]), order[2])
        # Pick lex smallest among all answers of minimal length
        if (res is None or 
            len(merged) < len(res) or 
            (len(merged) == len(res) and merged < res)):
            res = merged
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((a+b+c)^2).  
  - 6 permutations.
  - For each permutation, merging two strings is up to O(n^2) for finding overlap (but realistically, overlap checking on small strings is fast).
  - Overall, acceptable for small input size (constant permutations × merge cost).

- **Space Complexity:** O(a + b + c) for the merged string and temporary variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are given more than three strings: how can you generalize or optimize?  
  *Hint: Greedy merging based on max overlaps — can you prove optimality?*

- Can you optimize merging step to find the overlap more efficiently?  
  *Hint: Use KMP or Z-algorithm for faster overlap calculation.*

- If you want all possible answers of minimum length and not just the lexicographically smallest one, how would you do it?  
  *Hint: Store all equally optimal answers in a set/vector during enumeration.*

### Summary
This problem uses the "greedy merge on all permutations" approach, seeking maximal string overlaps to minimize length and breaking ties on lexicographical order.  
Patterns here relate to **superstring construction**, **greedy overlap merge**, and **permutation enumeration**, which also appear in DNA assembly, string deduction, and shortest path with complex state representations.  
While brute-force is feasible for 3 strings, for larger cases more advanced string algorithms (like minimal superstring problem with DP) or optimized greedy heuristics may be required.