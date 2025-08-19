### Leetcode 3088 (Hard): Make String Anti-palindrome [Practice](https://leetcode.com/problems/make-string-anti-palindrome)

### Description  
Given a string `s` of **even** length, an *anti-palindrome* is a string where for each index 0 ≤ i < n, s[i] ≠ s[n - i - 1].  
You can swap any two characters any number of times.  
**Return:** the *lexicographically smallest* anti-palindrome string possible via rearrangement, or "-1" if impossible.  
If several answers exist, return the smallest in dictionary order.

### Examples  

**Example 1:**  
Input: `s = "abca"`  
Output: `"aabc"`  
Explanation:  
At all positions, each character differs from its mirrored position:  
- s='a', s[3]='c' (a≠c)  
- s[1]='a', s[2]='b' (a≠b)  
"aabc" is lexicographically minimal.

**Example 2:**  
Input: `s = "abba"`  
Output: `"aabb"`  
Explanation:  
- s='a', s[3]='b' (a≠b)  
- s[1]='a', s[2]='b' (a≠b)  
"aabb" is lex smallest valid.

**Example 3:**  
Input: `s = "cccd"`  
Output: `"-1"`  
Explanation:  
No rearrangement avoids matching character pairs at mirrored indices. At least one pair will always have the same character.

### Thought Process (as if you’re the interviewee)  

Start by handling impossible cases. If the string length is odd, it's always impossible, because the middle character would have to be unequal to itself.  
Count frequencies: if any character appears more than ⌊n/2⌋ times, we can't separate its copies enough to avoid matching on mirrored positions.  
Otherwise, the anti-palindrome can be achieved. For the smallest lex ordering, sort the string, then split into two halves, place them in mirrored arrangement:  
- First half fills s[0…m-1]
- Second half fills s[m…n-1]
Check mirrored indices (i with n-1-i). If s[i] == s[n-1-i], swap with a character beyond the duplicate run, if possible.  
If not possible, output "-1".

Optimizing:  
- Greedy: sort, alternate halves, perform minimal swaps only where duplicates exist in mirrored positions.

### Corner cases to consider  
- s is empty, or length 1 (always impossible, but input is guaranteed even length).
- All characters identical (impossible).
- A character appears more than ⌊n/2⌋ times (impossible).
- Already an anti-palindrome (should return sorted version for lex order, if allowed by constraints).

### Solution

```python
def makeAntiPalindrome(s: str) -> str:
    # Length must be even
    n = len(s)
    if n % 2 != 0:
        return "-1"
    s = list(s)
    s.sort()
    m = n // 2

    # If any character occurs more than n//2 times, impossible
    i = 0
    while i < n:
        cnt = 1
        while i + cnt < n and s[i + cnt] == s[i]:
            cnt += 1
        if cnt > m:
            return "-1"
        i += cnt

    # Initial configuration: sorted string
    # If the middle elements are the same, mirrored pairs could become identical
    if s[m] == s[m - 1]:
        # Try to move a different char to break up the duplicate run
        i = m
        while i < n and s[i] == s[i - 1]:
            i += 1
        j = m
        # For j from m to n-1, if duplicate persists, keep swapping
        while j < n and s[j] == s[n - j - 1]:
            if i >= n:
                return "-1"
            s[j], s[i] = s[i], s[j]
            i += 1
            j += 1
    return ''.join(s)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for the sorting, plus O(n) for frequency count and repair steps.
- **Space Complexity:** O(n) for storing the sorted character list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string can contain unicode characters?  
  *Hint: Use a robust frequency counter and verify all operations work on non-ASCII inputs.*

- If returning all possible anti-palindromes is required, how would you generate them?  
  *Hint: Need a generator/backtracking approach as more than one answer may exist for larger alphabets.*

- Can you optimize further if the string is very long or input size is constrained?  
  *Hint: Use in-place algorithms for swaps, and avoid extra data structures where possible.*

### Summary

This problem is a classic application of greedy reconstruction and counting, leveraging sorting and mirror pair checks. Many palindromic/anti-palindromic rearrangement problems (or similar problems like the rearrange string so no two adjacent are the same) use similar counting and frequency check ideas.  
Recognizing the core limitation—no character can appear more than half the times—is essential for efficient checking. Adjusting the sorted sequence for lexicographical ordering is a common pattern as well.

### Tags
String(#string), Greedy(#greedy), Sorting(#sorting), Counting Sort(#counting-sort)

### Similar Problems
