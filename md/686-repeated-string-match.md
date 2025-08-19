### Leetcode 686 (Medium): Repeated String Match [Practice](https://leetcode.com/problems/repeated-string-match)

### Description  
Given two strings **a** and **b**, return the minimum number of times you must repeat **a** so that **b** is a substring of the resulting string.
- If it is impossible, return -1.

Think: You are to “repeat” string **a** several times, then see if **b** can be found somewhere inside; if so, return the count of repeats; otherwise, return -1.

### Examples  

**Example 1:**  
Input: `a = "abcd", b = "cdabcdab"`  
Output: `3`  
*Explanation: "abcd" repeated 3 times is "abcdabcdabcd". This contains "cdabcdab" as a substring.*[1][2]

**Example 2:**  
Input: `a = "a", b = "aa"`  
Output: `2`  
*Explanation: "a" repeated 2 times is "aa". This contains "aa" as a substring.*[1][2]

**Example 3:**  
Input: `a = "a", b = "a"`  
Output: `1`  
*Explanation: "a" repeated 1 time is "a". This contains "a" as a substring.*[1]

**Example 4:**  
Input: `a = "abc", b = "wxyz"`  
Output: `-1`  
*Explanation: No amount of repeating "abc" can produce a string where "wxyz" is a substring.*[1][2]

### Thought Process (as if you’re the interviewee)  
First idea:  
- **Brute-force:**  
    - Repeat **a** up to as many times as needed so the repeated string is at least as long as **b**.
    - Then check if **b** is a substring.
    - However, if **b** starts near the end, you may need to repeat **a** a couple more times.  
    - For example: suppose a = "abcd", b = "cdabcdab".
- **Optimization:**
    - The minimum number of repeats to cover **b** is ⌈len(b)/len(a)⌉.
    - But due to overlap at the join, check one or two more repetitions.
    - For each number of repetitions from this minimum up to min+2, see if **b** appears as a substring.
    - Return the first k that works; else return -1.  
- **Why this works:**  
    - If **b** can be present, it must be after at most min+2 repeats since any partial overlaps are covered.
    - This approach avoids unnecessary repeats.

### Corner cases to consider  
- **b** is longer than multiple repeats of **a**, but not a substring at any repeat.
- **a** and **b** are the same string.
- **b** contains characters not present in **a** at all.
- Very short strings: single character cases.
- **b** starts near the join between two repeated **a**s.
- Edge constraints: maximum string lengths (10⁴).

### Solution

```python
def repeatedStringMatch(a: str, b: str) -> int:
    # Calculate minimum repeats needed to possibly contain b
    min_repeats = -(-len(b) // len(a))  # Equivalent to ceil(len(b) / len(a))
    
    repeated = a * min_repeats
    # Check current repetition
    if b in repeated:
        return min_repeats
    # Check one extra repetition (to cover overlaps at the join)
    repeated += a
    if b in repeated:
        return min_repeats + 1
    # Otherwise, it's impossible
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((len(b) + len(a)) \* min_repeats)  
  - Because we concatenate and check substring up to about (len(b)/len(a)) + 2 times.
  - Substring search (`in`) is O(N), and total repeated string is up to 2 \* len(a) + len(b).

- **Space Complexity:** O(len(a) \* repeats)  
  - We store the whole repeated string up to about len(a) \* (⌈len(b)/len(a)⌉ + 1).
  - No extra data structures used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to find all starting indices of **b** in the repeated **a**?
  *Hint: Think about modified substring search algorithms like KMP.*

- How does the approach change if **a** or **b** can be empty?
  *Hint: Handle edge cases explicitly and clarify requirements for empty substrings.*

- Could you optimize substring checking for very large inputs?
  *Hint: Try using efficient substring search like Rabin-Karp or KMP instead of `in`.*

### Summary
This problem fits the **sliding window** and **string duplication/concatenation** pattern. The core insight is realizing you only ever need to try up to ⌈len(b)/len(a)⌉ + 2 repeats because any possible overlap will be within that range. This pattern often appears in problems where partial matches may occur at the ends of repeated segments, useful in string processing, circular arrays, and pattern matching situations.

### Tags
String(#string), String Matching(#string-matching)

### Similar Problems
- Repeated Substring Pattern(repeated-substring-pattern) (Easy)