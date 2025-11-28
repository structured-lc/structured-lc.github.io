### Leetcode 3474 (Hard): Lexicographically Smallest Generated String [Practice](https://leetcode.com/problems/lexicographically-smallest-generated-string)

### Description  
Given a string `s` consisting of digits, and two positive integers `a` and `b`, you can repeatedly perform the following operations in any order:
- Add `a` to every digit at an odd index (1-based, i.e., the 2ⁿᵈ, 4ᵗʰ, … digits), cycling each digit through 0-9 (i.e., (digit + a) % 10).
- Rotate the string to the right by `b` positions.

Your goal is to return the **lexicographically smallest string** that can be obtained after any number of operations.

### Examples  

**Example 1:**  
Input: `s = "5525", a = 9, b = 2`  
Output: `"2050"`  
*Explanation: All possible results are explored by adding 9 to odd indices and rotating by 2. `"2050"` is the smallest possible.*  

**Example 2:**  
Input: `s = "74", a = 5, b = 1`  
Output: `"24"`  
*Explanation: By adding 5 to the digit at the odd index, and rotating, the sequence `"24"` can be reached, which is the smallest.*  

**Example 3:**  
Input: `s = "0011", a = 4, b = 2`  
Output: `"0011"`  
*Explanation: The original string is already lexicographically smallest possible after any allowed operations.*  


### Thought Process (as if you’re the interviewee)  
First, I would try simulating all possible operations: add `a` to odd indices, rotate by `b`, repeat until a loop is detected or no new strings are seen.  
A brute-force solution would be to apply both operations in every possible order, keep track of visited strings to avoid cycles, and update the smallest string found so far if a lexicographically smaller one is generated.

However, brute-force may be inefficient for large input as the string and the number of operations can be significant. Yet, both operations are invertible and the possible number of unique strings is limited by the string's length and the modulo 10 nature of the addition. We can use BFS for shortest/lex smallest exploration, or DFS since our graph is small and we can mark all visited configurations.

For each unique string state:  
- Attempt the 'add a to odd indices' operation and enqueue if new.
- Attempt the 'rotate by b' operation and enqueue if new.
Repeat until all states are exhausted, and always update the minimal string found.

I would use a set to track visited configurations, to avoid cycles and unnecessary processing.

### Corner cases to consider  
- `a` or `b` is equal to the length of the string.
- All digits are the same.
- The initial string is already minimal.
- `b` is a divisor or not a divisor of the string's length.
- Addition yielding a digit wrap-around, e.g. 9+3 = 2 (mod 10).
- Smallest string is only reached after many steps, involving both rotate and add steps.


### Solution

```python
def findLexSmallestString(s: str, a: int, b: int) -> str:
    from collections import deque
    
    n = len(s)
    visited = set()
    result = s
    queue = deque()
    queue.append(s)
    visited.add(s)

    while queue:
        curr = queue.popleft()
        # Always update the smallest result
        if curr < result:
            result = curr
        
        # Operation 1: Add 'a' to digits at odd indices
        curr_list = list(curr)
        for i in range(1, n, 2):
            curr_list[i] = str((int(curr_list[i]) + a) % 10)
        add_op = ''.join(curr_list)
        if add_op not in visited:
            visited.add(add_op)
            queue.append(add_op)
        
        # Operation 2: Rotate the string to the right by b positions
        rotate_op = curr[-b:] + curr[:-b]
        if rotate_op not in visited:
            visited.add(rotate_op)
            queue.append(rotate_op)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Up to O(n × 10ⁿ) where `n` is the length of the string. However, due to modulo and rotation properties, practical unique state count is much lower. Each unique string is checked at most once.
- **Space Complexity:**  
  O(n × 10ⁿ) for storing all visited string states and the BFS queue. (But actual is much less because digit and position transitions are limited by the problem's constraints.)

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the string consisted of lowercase letters rather than digits?  
  *Hint: Consider how to handle character wrap-around, since letters are in base 26 rather than base 10.*

- Can you optimize this further if b is coprime to the length of the string?  
  *Hint: Look for cycles in the rotation and reduce states you must check.*

- If you can only perform each operation k times, how would you modify your algorithm?  
  *Hint: BFS/DFS traversal with a counter for operation depth in the visited state.*


### Summary
This problem is an application of BFS/DFS for state-space search, tracking visited configurations to avoid cycles, with string transformations as graph edges. The classic BFS "minimum-lex" exploration pattern applies when searching for minimal arrangements under allowed operations. This approach generalizes well to many combinatorial reordering and string transformation problems.


### Flashcard
BFS/simulation: apply operations (add 'a' to odd indices, rotate by b) in all possible orders, track visited strings, return lexicographically smallest.

### Tags
String(#string), Greedy(#greedy), String Matching(#string-matching)

### Similar Problems
- Lexicographically Smallest Equivalent String(lexicographically-smallest-equivalent-string) (Medium)