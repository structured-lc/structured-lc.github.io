### Leetcode 2840 (Medium): Check if Strings Can be Made Equal With Operations II [Practice](https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii)

### Description  
Given two strings s₁ and s₂ of the same length containing only lowercase English letters, you can repeatedly perform the following operation on either string: choose two indices i and j with i < j and (j - i) even, then swap the characters at those indices.  
Determine if it is possible to make the two strings equal using any number of such operations.

### Examples  

**Example 1:**  
Input: `s1 = "abcdba", s2 = "cabdab"`  
Output: `True`  
*Explanation:  
We can apply these swaps to s₁:  
- Swap i=0,j=2: s₁ = "cbadba"  
- Swap i=2,j=4: s₁ = "cbbdaa"  
- Swap i=1,j=5: s₁ = "cabdab" = s₂*  

**Example 2:**  
Input: `s1 = "abe", s2 = "bea"`  
Output: `False`  
*Explanation:  
It is not possible to make the two strings equal with any number of allowed swaps.*  

**Example 3:**  
Input: `s1 = "aabb", s2 = "abab"`  
Output: `True`  
*Explanation:  
Characters at even indices and odd indices can be rearranged independently by the swap rule. Sorting both results in a match.*  

### Thought Process (as if you’re the interviewee)  
- First, note the swap rule: (j - i) must be even, which means i and j are both even, or both odd.  
- That means:  
  - Even-indexed characters can only ever swap with other even indices.
  - Odd-indexed characters can only swap with other odd indices.
- So:  
  - The multiset (counts) of characters at even indices must match between both strings, and the same for odd indices.
  - If those two multisets match, we can always rearrange to get from one to the other by repeated swaps.
  - Brute-force is not needed, only compare sorted lists (or counts) for even and odd indices separately for s₁ and s₂.

### Corner cases to consider  
- Strings of length 1 (no swaps possible, must match exactly)
- Strings where s₁ == s₂ initially (must return True)
- Strings with all identical characters (always True)
- Maximal length case, to check efficiency

### Solution

```python
def can_be_equal(s1: str, s2: str) -> bool:
    # Extract even and odd indexed characters from both strings
    even_s1 = [s1[i] for i in range(0, len(s1), 2)]
    odd_s1  = [s1[i] for i in range(1, len(s1), 2)]
    even_s2 = [s2[i] for i in range(0, len(s2), 2)]
    odd_s2  = [s2[i] for i in range(1, len(s2), 2)]

    # Sort both lists so that their multisets can be compared
    if sorted(even_s1) != sorted(even_s2):
        return False
    if sorted(odd_s1) != sorted(odd_s2):
        return False

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each string is divided into two arrays and sorted (O(n log n)), but with only 26 possible characters per position, counting sort can reduce it to O(n).
- **Space Complexity:** O(n) — Storing the split even/odd arrays for both strings. If optimised with counting arrays (since only 26 characters), space can be O(1).

### Potential follow-up questions (as if you’re the interviewer)  

- What if swaps are only allowed at *even* indices, regardless of spacing?  
  *Hint: Think about restrictions on which indices can swap.*

- Can you optimise the approach for very large strings (n > 10⁶)?  
  *Hint: Is there a more efficient way than sorting for this scenario?*

- How would the answer change if you could swap any two indices regardless of their parity or spacing?  
  *Hint: Is the string just a permutation problem in that case?*

### Summary
This problem uses the **bucket grouping and rearrangement** pattern—identifying transformation invariants under restricted swaps. Analyzing which positions are interchangeable leads to an efficient check using character counts or sorted arrays per index parity. This pattern appears in several problems, especially those with "swap only certain positions" or "groupwise operation" rules.