### Leetcode 2434 (Medium): Using a Robot to Print the Lexicographically Smallest String [Practice](https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string)

### Description  
You are given a string **s**. There is a robot that builds a result string by simulating two operations until both **s** and the robot's stack (**t**) are empty:
- The robot can **take the first character from s** and *push* it onto its stack **t**.
- The robot can **pop the last character of t** and **write it onto the paper**.
Your goal is to return the **lexicographically smallest string possible** that can be written on the paper using only these two operations, applying them in any order until both **s** and **t** are exhausted.

### Examples  

**Example 1:**  
Input: `s = "zza"`  
Output: `"azz"`  
*Explanation: Start by pushing 'z' (t=['z']), push 'z' (t=['z','z']), push 'a' (t=['z','z','a']).  
Pop 'a' to the answer (res="a", t=['z','z']). Now, pop 'z' (res="az", t=['z']), pop 'z' (res="azz", t=[]).*

**Example 2:**  
Input: `s = "bac"`  
Output: `"abc"`  
*Explanation: Push 'b' (t=['b']), push 'a' (t=['b','a']), pop 'a' (res="a", t=['b']), pop 'b' (res="ab", t=[]).  
Push 'c' (t=['c']), pop 'c' (res="abc", t=[]).*

**Example 3:**  
Input: `s = "bdda"`  
Output: `"addb"`  
*Explanation: Push 'b' (t=['b']), push 'd' (t=['b','d']), push 'd' (t=['b','d','d']), push 'a' (t=['b','d','d','a']).  
Pop 'a' (res="a", t=['b','d','d']), pop 'd' (res="ad", t=['b','d']), pop 'd' (res="add", t=['b']), pop 'b' (res="addb", t=[]).*

### Thought Process (as if you’re the interviewee)  
First, the brute-force idea is to simulate **every possible sequence** of push/pop operations, but that's too slow (exponential).  
Intuitively, to get the lexicographically smallest string, we should always try to **pop** (i.e., output) the smallest viable character from our stack **as soon as we are sure it is optimal**.

Key observation:  
- If the top of the stack `t` is the **smallest character left** in the remaining `s` and `t`, we should pop it to the result as soon as possible.  
- To make this decision, we want to know for every point in `s` what is the minimal character left in `s` starting from now.
- So we preprocess to know, for each position, the smallest remaining character, and use a stack to simulate the robot.

For each step in `s`:
- Push the current char onto stack `t`.
- After each push, if the top of `t` ≤ the minimal remaining character in `s`, pop from `t` to result. Repeat as long as this is true.

This is a classic **greedy + monotonic stack** pattern.  
The overall time is linear because each character is pushed and popped at most once.

### Corner cases to consider  
- Empty string: s = "" → returns ""
- All identical characters: e.g., s = "aaaa"
- Already sorted string, e.g., s = "abcde"
- Strictly decreasing: s = "zyx"
- String with only one character: s = "a"
- Large strings with repeated smallest character late in s

### Solution

```python
def robotWithString(s: str) -> str:
    # Count the remaining frequency of each character in s
    from collections import Counter

    remaining = Counter(s)
    # Start with 'a' as the minimal possible next character
    min_char = 'a'
    t = []
    answer = []

    for c in s:
        # Decrement the count for the current character
        remaining[c] -= 1
        # Update the minimal character still left in s
        while min_char <= 'z' and remaining[min_char] == 0:
            min_char = chr(ord(min_char) + 1)
        # Push current character to the stack
        t.append(c)
        # Pop from the stack all chars ≤ min_char
        while t and t[-1] <= min_char:
            answer.append(t.pop())
    # Output the rest of the stack
    while t:
        answer.append(t.pop())
    return "".join(answer)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s).  
  Each character is pushed and popped from the stack at most once, and updating min_char is bounded by 26 for lowercase letters (constant).
  
- **Space Complexity:** O(n).  
  The stack and answer array may both grow up to the length of s.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contains unicode characters or uppercase letters?  
  *Hint: You'd need to generalize the frequency/min search logic.*

- Can you do this in-place or with minimal space?  
  *Hint: Try optimizing the space by reusing existing arrays or pointers.*

- Can you output the sequence of operations (push/pop), not just the resulting string?  
  *Hint: Track the operations as you simulate the stack.*

### Summary
This problem uses a **greedy** and **monotonic stack** pattern for lexicographically optimal problems, where processing order and immediate versus delayed operations matter.  
It's similar to problems like **"Remove Duplicate Letters"**, **"Valid Parentheses"**, and **"Monotonic Stack"** questions, where stack and frequency tracking help decide the best moment to pop.  
Understanding such patterns helps in parsing, string construction, and resource scheduling problems.

### Tags
Hash Table(#hash-table), String(#string), Stack(#stack), Greedy(#greedy)

### Similar Problems
- Find Permutation(find-permutation) (Medium)