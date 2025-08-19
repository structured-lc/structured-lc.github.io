### Leetcode 1790 (Easy): Check if One String Swap Can Make Strings Equal [Practice](https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal)

### Description  
Given two strings of equal length, s1 and s2, can you make them equal by performing at most one swap of any two characters in s1 (you can swap the same character with itself if needed)?  
A swap is picking any two indices in s1 and swapping their characters.  
Return true if s1 can be made equal to s2 with at most one such swap (or if they are already equal). Return false otherwise.

### Examples  

**Example 1:**  
Input: `s1="bank", s2="kanb"`  
Output: `true`  
*Explanation: Swap 'b' (s1) and 'k' (s1[3]) in s1 → "kanb".*

**Example 2:**  
Input: `s1="attack", s2="defend"`  
Output: `false`  
*Explanation: More than one swap required, so not possible.*

**Example 3:**  
Input: `s1="kelb", s2="kelb"`  
Output: `true`  
*Explanation: Strings are already equal; no swap needed.*

**Example 4:**  
Input: `s1="abcd", s2="dcba"`  
Output: `false`  
*Explanation: Need more than one swap to match.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try all possible swaps in s1 (O(n²)), check each result with s2. This is slow for longer strings.

- **Optimized**:  
  - Compare s1 and s2 index by index.
  - Record indices where characters differ.
  - If **no differences**: strings already equal, return true.
  - If **exactly 2 differences** at indices i and j: check that swapping s1[i] and s1[j] makes the strings equal, i.e.,  
    s1[i] = s2[j] and s1[j] = s2[i].
  - Any other case (only 1 difference, or more than 2): not possible with single swap.
- **Trade-offs**: This checks in one pass, O(n), and only needs to remember at most two indices.

### Corner cases to consider  
- Strings are already equal (no swap needed).
- Strings differ at only one position (cannot fix with one swap).
- Strings differ at more than two positions (cannot fix with one swap).
- Strings contain duplicate letters.
- Strings of length 1 (either equal or not, swap with itself allowed).

### Solution

```python
def areAlmostEqual(s1: str, s2: str) -> bool:
    # If the strings are already equal, one swap (even no swap) is valid
    if s1 == s2:
        return True

    # Collect indices where s1 and s2 differ
    diff = []
    for i in range(len(s1)):
        if s1[i] != s2[i]:
            diff.append(i)
            # No need to proceed if more than two mismatches
            if len(diff) > 2:
                return False

    # If there are exactly two differences, check if swapping makes equal
    if len(diff) == 2:
        i, j = diff
        return s1[i] == s2[j] and s1[j] == s2[i]
    
    # Not possible otherwise
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of s1/s2. Each character is checked once.
- **Space Complexity:** O(1) extra space, since at most two mismatch indices are stored (ignoring input size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can swap characters in both s1 and s2?
  *Hint: Does allowing swaps in either string help?*

- What if you are allowed up to k swaps?
  *Hint: Think about counting number of differences: is k ≥ len(diff)/2 enough?*

- Can you perform the swap only on s2 instead of s1?  
  *Hint: Would the algorithm change?*

### Summary
This problem is a variation on string mismatch and swap.  
The core pattern is **comparing differences and simulating a minimal "fix" (in this case, swap)**; this pattern appears in anagram checks and error-correction problems.  
It can be generalized for "at most k swaps" or "two-way swaps."  
The solution is efficient, O(n), and needs only a simple differences check.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Buddy Strings(buddy-strings) (Easy)
- Make Number of Distinct Characters Equal(make-number-of-distinct-characters-equal) (Medium)
- Count Almost Equal Pairs I(count-almost-equal-pairs-i) (Medium)