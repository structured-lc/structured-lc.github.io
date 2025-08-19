### Leetcode 3084 (Medium): Count Substrings Starting and Ending with Given Character [Practice](https://leetcode.com/problems/count-substrings-starting-and-ending-with-given-character)

### Description  
Given a string `s` and a character `c`, count the number of non-empty substrings in `s` that both start and end with the character `c`. The substring can have length 1 or greater, and substrings can overlap.  
In other words: for all possible substrings of `s`, count those where the first and last character is `c`.

### Examples  

**Example 1:**  
Input: `s = "abada", c = "a"`  
Output: `6`  
*Explanation: All substrings in `s` that start and end with "a" are: "a", "aba", "abada", "a", "ada", "a".*

**Example 2:**  
Input: `s = "zzz", c = "z"`  
Output: `6`  
*Explanation: All substrings are: "z" (positions 0), "z" (pos 1), "z" (pos 2), "zz" (0-1), "zz" (1-2), "zzz" (0-2).*

**Example 3:**  
Input: `s = "leetcode", c = "e"`  
Output: `3`  
*Explanation: Substrings: "e", "e", "ee".*

### Thought Process (as if you’re the interviewee)  
First, I considered a brute-force approach: For each possible substring in `s`, check if it starts and ends with `c`. This means iterating over all substrings, which would take O(n²) time. For large `s`, this is not feasible.

Then, I thought about what defines a substring starting and ending with `c`:  
- It's any substring whose start and end indices are both at positions in `s` where `s[i] == c`.  
- So, if there are `count` occurrences of `c` in `s`, then:
  - Each `c` by itself forms a valid substring (count such substrings).
  - Every pair of occurrences can form a unique substring (from `i` to `j`, where i < j).
- The total number of such substrings is count + number of ways to pick a pair of different occurrences = count + count × (count - 1) ÷ 2 = count × (count + 1) ÷ 2.

This observation gives O(n) time and O(1) space.

### Corner cases to consider  
- The string does not contain `c` at all (output should be 0).
- The string is length 1 (output is 1 if s == c, else 0).
- The string consists entirely of `c` (output should be n × (n + 1) ÷ 2).
- `c` occurs only once (output should be 1).
- Substrings are allowed to overlap.
- String is empty (but constraint says length ≥ 1).

### Solution

```python
def countSubstrings(s: str, c: str) -> int:
    # Count occurrences of c in s
    cnt = 0
    for ch in s:
        if ch == c:
            cnt += 1
    # Total substrings is cnt\*(cnt+1)//2
    return cnt * (cnt + 1) // 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of s, because we scan each character in the string once.
- **Space Complexity:** O(1), because we only use a constant amount of extra space for counting.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to list all the substrings found, not just count them?  
  *Hint: Consider storing the positions of `c` and iterating over all possible (i, j) pairs.*

- Can you count substrings starting and ending with different given characters?  
  *Hint: Use two nested loops, track all indices where start and end char occur.*

- How would you modify the approach if the string was very large and couldn't be held in memory?  
  *Hint: Process the string as a stream and update the count in one pass.*

### Summary
This problem demonstrates the "counting pairs" and combinatorics pattern—counting the number of ways two or more events (here, positions of `c`) can be combined. Instead of checking every substring, we use the mathematical formula for combinations to get an efficient O(n) solution. This counting pattern applies to similar substring, pair, or triplet problems in strings or arrays.

### Tags
Math(#math), String(#string), Counting(#counting)

### Similar Problems
