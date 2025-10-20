### Leetcode 899 (Hard): Orderly Queue [Practice](https://leetcode.com/problems/orderly-queue)

### Description  
Given a string and an integer k, you can perform the following operation any number of times: choose one of the first k letters in the string and append it to the end of the string. Your goal is to return the lexicographically smallest string possible after any number of such moves.

### Examples  

**Example 1:**  
Input: `s = "cba", k = 1`  
Output: `acb`  
*Explanation: You can only move the first letter to the end (since k=1), simulating a rotation. All possible rotations: "cba" → "bac" → "acb". The smallest is "acb".*

**Example 2:**  
Input: `s = "baaca", k = 3`  
Output: `aaabc`  
*Explanation:  
- Move the 1ˢᵗ letter "b" to the end: "aacab"
- Move the 3ʳᵈ letter "c" to the end: "aaabc"
- This is the smallest possible string.*

**Example 3:**  
Input: `s = "daily", k = 2`  
Output: `adily`  
*Explanation:  
- Move the 2ⁿᵈ letter "a" to the end: "dilya"
- Now all possible such moves can achieve "adily", which is the smallest possible string.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For every arrangement, repeatedly simulate each possible move. This would be exponential and infeasible.
- **Observations:**  
  - If `k == 1`, we are only allowed to move the first character to the end, which means we can only rotate the string. Thus, only rotations are possible. The answer is the lex smallest rotation.
  - If `k > 1`, we have the freedom to move any of the first `k` letters. If `k ≥ 2`, after a few moves, we can swap any two adjacent letters, and thereby, we can get any permutation possible. Thus, we simply return the sorted string.
- **Optimized Solution:**  
  - If `k == 1`, check all string rotations.
  - If `k > 1`, sort the string and return it.

### Corner cases to consider  
- Single character string (`s = "a", k = 1`)
- `k` is larger than or equal to the length of `s` (`k ≥ len(s)`)
- String with all identical letters (`s = "aaaa", k = 1`)
- Already lex smallest string
- Very long strings to test efficiency

### Solution

```python
def orderlyQueue(s: str, k: int) -> str:
    # If k > 1, we can fully sort the string
    if k > 1:
        # Return the string sorted lexicographically
        return ''.join(sorted(s))
    else:
        # For k == 1, only rotations are allowed
        # Find the lex smallest rotation
        result = s
        for i in range(1, len(s)):
            rotated = s[i:] + s[:i]
            if rotated < result:
                result = rotated
        return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - For `k == 1`: O(n²) — each of the n-1 rotations takes O(n) string manipulation and comparison.
  - For `k > 1`: O(n log n) due to sorting the string.
- **Space Complexity:**
  - O(n): Need extra space to hold rotations or sorted string.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize finding the minimal rotation for very large strings?
  *Hint: Is there an algorithm to find the lex smallest rotation in linear time?*
- If the strings include uppercase and symbols, how does your solution change?
  *Hint: How does sorted order differ with other character sets?*
- How would you return all possible minimal strings if there are multiple?
  *Hint: What if duplicates are allowed and all minimal arrangements are required?*

### Summary
This problem sharply distinguishes between "rotation" and "permutation" possibilities based on k. For k = 1, efficient string manipulation is key; for k > 1, the result always boils down to sorting — a pattern common in string manipulation and permutation-type interview questions. The lexicographical rotation problem (for k = 1) is a classic and appears in other questions such as "Find the smallest rotation" or "Shifted string matching."


### Flashcard
If k = 1, answer is the lex smallest rotation; if k ≥ 2, answer is the sorted string.

### Tags
Math(#math), String(#string), Sorting(#sorting)

### Similar Problems
