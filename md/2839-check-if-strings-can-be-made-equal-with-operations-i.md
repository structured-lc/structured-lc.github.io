### Leetcode 2839 (Easy): Check if Strings Can be Made Equal With Operations I [Practice](https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-i)

### Description  
You are given two strings `s1` and `s2`, both of length 4 and consisting of lowercase English letters. You can repeatedly choose two indices `i` and `j` such that `j - i = 2` (there is exactly one character between them) and swap `s[i]` and `s[j]` in either of the strings any number of times. Return `True` if it is possible to make both strings equal, else return `False`.  
The key is that only swaps between positions 0 and 2 or between 1 and 3 are allowed.

### Examples  

**Example 1:**  
Input: `s1 = "abcd"`, `s2 = "cdab"`  
Output: `True`  
*Explanation:  
- Swap s1 and s1[2]: "abcd" → "cbad"  
- Swap s1[1] and s1[3]: "cbad" → "cdab" (equals s2)*

**Example 2:**  
Input: `s1 = "abcd"`, `s2 = "dacb"`  
Output: `False`  
*Explanation:  
No sequence of allowed swaps can convert s1 into s2.*

**Example 3:**  
Input: `s1 = "abab"`, `s2 = "baba"`  
Output: `True`  
*Explanation:  
- Swap s1 and s1[2]: "abab" → "baba" (equals s2)*

### Thought Process (as if you’re the interviewee)  
First, I recognize that the only allowed swaps are:
- between indices 0 and 2
- between indices 1 and 3

Therefore, characters at even indices (0, 2) can be rearranged among themselves, and characters at odd indices (1, 3) can be rearranged among themselves, but not between even and odd positions.

Brute-force would try all possible sequences of allowed swaps, but with only 4 positions that's possible but not efficient nor scalable.

Optimized approach:
- Extract characters from even indices (0,2) from both `s1` and `s2` and compare the multisets after sorting.
- Do the same for odd indices (1,3).
- If both sorted pairs match, it's possible to transform `s1` into `s2`.

This approach is chosen because the groupings by parity are independent due to allowed swap positions.

### Corner cases to consider  
- Input where `s1 == s2` (should return `True`)
- Input where only one character is different but both even and odd sets match after sorting (should return `True`)
- Completely different characters (e.g., "aaaa" vs "bbbb")
- All characters same ("aaaa" vs "aaaa")
- Any set where parity-separated multisets do not match

### Solution

```python
def canBeEqual(s1: str, s2: str) -> bool:
    # Extract characters at even and odd indices
    s1_even = [s1[0], s1[2]]
    s1_odd = [s1[1], s1[3]]
    s2_even = [s2[0], s2[2]]
    s2_odd = [s2[1], s2[3]]
    
    # Sort both the even and odd parts
    if sorted(s1_even) != sorted(s2_even):
        return False
    if sorted(s1_odd) != sorted(s2_odd):
        return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). Each string has length 4, so all operations (extract, sort, compare) are constant-time.
- **Space Complexity:** O(1). Only a fixed amount of storage for arrays of size 2 or 4.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string length is not fixed at 4?
  *Hint: Generalize strategy for arbitrary even lengths and consider all pairs with |i-j|=2.*

- Can this be solved without sorting?
  *Hint: Use counting (e.g. hashmap or array for letter counts) for each parity group.*

- What if swaps can have more flexible distances (e.g., all even-even or odd-odd swaps allowed)?
  *Hint: Consider treating even and odd indexed groups as separate multisets regardless of gap.*

### Summary
This approach uses the "bucket by parity, compare after normalization" pattern, which is common in permutation-with-restricted-swap problems. It's efficient because, for fixed short inputs, both sorting and counting are constant time. The pattern applies in broader contexts where swaps or moves are restricted by position parity or index difference, such as some string and array rearrangement problems.


### Flashcard
Extract characters at even indices and odd indices separately; check if sorted(even chars of s1) == sorted(even chars of s2) and same for odd.

### Tags
String(#string)

### Similar Problems
