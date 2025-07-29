### Leetcode 859 (Easy): Buddy Strings [Practice](https://leetcode.com/problems/buddy-strings)

### Description  
Given two strings `s` and `goal`, determine whether you can make `s` equal to `goal` by swapping **exactly one pair** of distinct indices (i, j) in `s` (swap s[i] and s[j]).  
- *A swap must involve different indices (i ≠ j).*
- Return `True` if it is possible, otherwise return `False`.  

### Examples  

**Example 1:**  
Input: `s = "ab", goal = "ba"`  
Output: `True`  
*Explanation: Swapping indices 0 and 1 in "ab" gives "ba", which equals the goal.*

**Example 2:**  
Input: `s = "ab", goal = "ab"`  
Output: `False`  
*Explanation: The strings are already equal, but no swap of different indices can keep it the same unless there are duplicate characters.*

**Example 3:**  
Input: `s = "aa", goal = "aa"`  
Output: `True`  
*Explanation: The strings are already equal, and swapping the two 'a's keeps the string unchanged.*

**Example 4:**  
Input: `s = "abcd", goal = "abdc"`  
Output: `True`  
*Explanation: Swapping indices 2 and 3 in "abcd" gives "abdc".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force Approach:** Try all combinations of two indices, swap them, and check if the result equals `goal`. Too slow: O(n²).
- **Optimization:**  
  1. If `s` and `goal` have different lengths, return False immediately.
  2. If `s` equals `goal`, check for duplicate letters. A swap between two identical letters results in the same string, so return True if there is any duplicate character.
  3. If they are not equal, record positions where the characters differ. If there are exactly two such positions, check if swapping these makes the strings equal. Otherwise, return False.
- **Why this approach:**  
  - Only O(n) time—just one pass to compare and gather mismatches, and one more pass for duplicate check if needed.
  - It covers “already equal” with/without duplicates and “can be made equal by one swap.”

### Corner cases to consider  
- Empty string inputs (`""`)
- Strings of different lengths
- Both strings are already equal with and without duplicate characters
- Exactly two differences, but swapping doesn’t help
- More than two differences
- Single character strings

### Solution

```python
def buddyStrings(s: str, goal: str) -> bool:
    # If lengths differ, no swap will help
    if len(s) != len(goal):
        return False

    # If both strings are already equal,
    # check for any duplicate character (so a swap doesn't alter the string)
    if s == goal:
        seen = set()
        for c in s:
            if c in seen:
                return True  # found duplicate
            seen.add(c)
        return False  # no duplicates, can't perform a real swap

    # Find indices where s and goal differ
    diffs = []
    for i, (a, b) in enumerate(zip(s, goal)):
        if a != b:
            diffs.append(i)
        if len(diffs) > 2:
            return False  # more than two differences, cannot fix in one swap

    # There must be exactly two differences:
    if len(diffs) != 2:
        return False

    i, j = diffs
    # Check if swapping makes the strings equal
    return s[i] == goal[j] and s[j] == goal[i]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the strings. One pass for difference, one scan for duplicates in the edge case where s == goal.
- **Space Complexity:** O(1) extra space (excluding the input), as at most a few variables/sets are needed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were allowed **more than one swap**?  
  *Hint: Consider the permutation of mismatched positions.*

- How would you adapt the solution if you **could swap characters between s and goal**?  
  *Hint: This changes the comparison entirely—think in terms of multisets.*

- Can you design an **in-place version** if s is mutable (like a list)?  
  *Hint: Use index arithmetic, minimize auxiliary storage.*

### Summary
This solution uses a **mismatch-count and duplicate check pattern**—a frequent trick when contrasting two strings/arrays for “off-by-little” differences, such as “can I convert A to B with a single move?” This is common in questions about swaps (minimum swaps to match, adjacent swaps allowed, etc.), and the check for duplicates is a pattern seen in making a string remain unchanged by limited moves.