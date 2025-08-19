### Leetcode 1864 (Medium): Minimum Number of Swaps to Make the Binary String Alternating [Practice](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-binary-string-alternating)

### Description  
Given a binary string, you are asked to determine the *minimum number of character swaps* (any two indices, not just adjacent) needed to make the string *alternating*, meaning no two adjacent characters are the same—e.g., "0101..." or "1010...". If it is impossible (due to an imbalance in the number of '0's and '1's), return -1.

### Examples  

**Example 1:**  
Input: `s = "111000"`  
Output: `1`  
Explanation: Swap positions 1 and 4: `"111000"` → `"101010"`. Now the string is alternating.

**Example 2:**  
Input: `s = "010"`  
Output: `0`  
Explanation: The string is already alternating, so no swaps are needed.

**Example 3:**  
Input: `s = "1110"`  
Output: `-1`  
Explanation: The numbers of '0's and '1's differ by more than 1, so it's impossible to form an alternating string.

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Try all possible permutations by swapping pairs and check for alternation; this is clearly infeasible due to combinatorial explosion.

- **Observation:**  
  For a string of length n, possible alternating patterns are "0101..." and "1010...".  
  - Count occurrences of '0' and '1'. For alternation to be possible:
    - If n is even: counts of '0' and '1' must be equal.
    - If n is odd: counts must differ by exactly 1 (the extra character must match the parity of n).
  - For each of the two patterns:
    - Count how many characters are misplaced (i.e., expected char at each index).
    - The minimum number of swaps for that pattern is half the count of mismatches at even positions.

- **Optimization:**  
  - O(n) pass: count '0's and '1's, and mismatched places for both patterns.
  - Pick the feasible pattern (if any), and return the minimum swaps for that pattern.

### Corner cases to consider  
- String of length 1 (always alternating, no swap needed).
- Impossible cases (e.g., "111", where |count('0') - count('1')| > 1).
- Already alternating string.
- Input where all characters are the same.
- Very long strings at the input limit.

### Solution

```python
def min_swaps(s: str) -> int:
    # Count number of '0's and '1's
    c0 = s.count('0')
    c1 = s.count('1')
    n = len(s)
    
    # If counts are imbalanced, no alternating string is possible
    if abs(c0 - c1) > 1:
        return -1

    # Helper function to count swaps for a given starting character
    def swaps_needed(start_char: str) -> int:
        swaps = 0
        for i, ch in enumerate(s):
            expected = start_char if i % 2 == 0 else ('1' if start_char == '0' else '0')
            if ch != expected:
                swaps += 1
        # Each swap corrects two positions, so swaps // 2
        return swaps // 2

    min_swaps_needed = float('inf')
    # If c0 >= c1, try starting with '0'
    if c0 >= c1:
        min_swaps_needed = swaps_needed('0')
    # If c1 >= c0, try starting with '1'
    if c1 >= c0:
        min_swaps_needed = min(min_swaps_needed, swaps_needed('1'))

    return min_swaps_needed
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string (counting and checking mismatches require single pass scans).
- **Space Complexity:** O(1), only fixed variables for counts and swaps regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve the problem if swaps are permitted only between adjacent characters?  
  *Hint: Think about inversions and how to count minimum swaps with contiguous moves.*

- Does your approach still work if you’re restricted to only swapping a '0' and a '1'?  
  *Hint: Consider if the original approach takes this into account or needs a modification.*

- How does the algorithm change if the input string can contain characters other than '0' and '1'?  
  *Hint: Can you generalize pattern matching for k alternating characters?*

### Summary
This approach leverages **pattern-mismatch counting** and optimal correction by swapping, a common trick in problems about string transformation with minimal operations. Pattern matching is widely used in problems like constructing specific orders or rearranging arrays with constraints. This method is efficient and easily generalizes to other “apply minimal changes to achieve X alternating pattern” challenges.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
