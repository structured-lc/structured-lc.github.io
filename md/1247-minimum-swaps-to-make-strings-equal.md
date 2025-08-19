### Leetcode 1247 (Medium): Minimum Swaps to Make Strings Equal [Practice](https://leetcode.com/problems/minimum-swaps-to-make-strings-equal)

### Description  
Given two strings s1 and s2 of equal length consisting of only 'x' and 'y' characters, you can swap any two characters (from different strings) at the same position, i.e., swap s1[i] and s2[i]. Your goal: Make the two strings equal with the minimum number of swaps. If it's impossible, return -1.

### Examples  
**Example 1:**  
Input: `s1 = "xx", s2 = "yy"`  
Output: `1`  
*Explanation: Swap s1 with s2, resulting in both strings "yx" and "xy", then swap s1[1] with s2[1], but with minimum it's just one required swap.*

**Example 2:**  
Input: `s1 = "xy", s2 = "yx"`  
Output: `2`  
*Explanation: Swap both mismatched positions. It takes two swaps: swap s1 with s2[1], swap s1[1] with s2.*

**Example 3:**  
Input: `s1 = "xxyyxyxyxx", s2 = "xyyxyxxxyx"`  
Output: `4`  
*Explanation: Count all mismatches and pair them up—then follow the algorithm.*

### Thought Process (as if you’re the interviewee)  
First, observe that only differing positions are problematic:
- If s1[i] != s2[i], there are two cases:
    - ('x','y'): call these XY mismatches
    - ('y','x'): YX mismatches
Pairing up two XY or two YX can be fixed in 1 swap. If one XY and one YX left at the end, 2 swaps are needed.
If total mismatches (XY+YX) is odd, it's impossible (as only even number of chars can be swapped to equal).

### Corner cases to consider  
- Strings already equal
- Odd number of total mismatches
- Strings of different lengths (should never happen)
- Only one mismatch (not possible to fix)

### Solution

```python
def minimumSwap(s1: str, s2: str) -> int:
    xy = yx = 0
    n = len(s1)
    for i in range(n):
        if s1[i] == 'x' and s2[i] == 'y':
            xy += 1
        elif s1[i] == 'y' and s2[i] == 'x':
            yx += 1
    # If odd total mismatches, impossible to fix
    if (xy + yx) % 2 != 0:
        return -1
    # Each pair of XY or YX needs one swap; remaining one of each needs 2 swaps
    return xy // 2 + yx // 2 + 2 * (xy % 2)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), n = len(s1).
- **Space Complexity:** O(1).

### Potential follow-up questions (as if you’re the interviewer)  
- Can you make the solution more general for more than two characters?
  *Hint: Would need a frequency map and combinatorial pairing logic.*

- How would you output the actual swaps, not just the count?
  *Hint: Track indices and match pairs step by step.*

- What if you can swap at any position, not just the same index?
  *Hint: Minimum swaps reduces to counting cycles or using DSU/union-find techniques.*

### Summary
The problem is a greedy/counter pairing classic. Only care about mismatches and their pairing; rest can be ignored. This is related to string transformation/minimum replacement by swap, with the pairing logic being the critical observation.

### Tags
Math(#math), String(#string), Greedy(#greedy)

### Similar Problems
- Determine if Two Strings Are Close(determine-if-two-strings-are-close) (Medium)
- Make Number of Distinct Characters Equal(make-number-of-distinct-characters-equal) (Medium)