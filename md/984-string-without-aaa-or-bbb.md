### Leetcode 984 (Medium): String Without AAA or BBB [Practice](https://leetcode.com/problems/string-without-aaa-or-bbb)

### Description  
You are given two integers, **a** and **b**. You need to construct a string of length **a + b** that contains exactly **a** `'a'` letters and **b** `'b'` letters, but **must not contain** the substring `'aaa'` or `'bbb'` anywhere. Return any string that satisfies these constraints. There may be multiple valid answers, and either is acceptable.

### Examples  

**Example 1:**  
Input: `a = 1, b = 2`  
Output: `abb`  
*Explanation: The valid strings are: "abb", "bab", or "bba". None of these contains three consecutive identical letters.*

**Example 2:**  
Input: `a = 4, b = 1`  
Output: `aabaa`  
*Explanation: The only possible valid arrangement is "aabaa". "aaaab" or strings with "aaa" would be invalid.*

**Example 3:**  
Input: `a = 2, b = 2`  
Output: `abab`  
*Explanation: "abab", "aabb", or "baba" are all valid as they do not contain "aaa" or "bbb".*

### Thought Process (as if you’re the interviewee)  
First, the brute-force idea would be to generate all permutations of "a" and "b", but that is very inefficient (factorial complexity).  
A better approach is to **always try to balance** the placement of 'a' and 'b' so that no three consecutive characters are the same. One way is to use a **greedy strategy**:  
- At every step, add up to two of the letter type that has more remaining, then one of the other.  
- For example, if there are more 'a's left than 'b's, add "aa" (if possible), then a "b". If numbers are equal or close, alternate.  
This ensures we never add three of the same letter in a row and always use all letters by the end.

Why greedy? If we ever have three more 'a's than 'b's, and add all three, we violate the constraint. So we space out the larger count as much as possible.  

This can be implemented using a loop checking counts of 'a' and 'b', always placing as many as we can (up to 2 in a row), breaking them up with the other letter.

### Corner cases to consider  
- a or b is **0** (all letters are of a single kind: only "a" or only "b")
- a and b are equal
- The difference between a and b is 1 or 2
- Very high numbers, such as a = 100, b = 0 (make sure still no "aaa" or "bbb")
- Output should be any valid string, not necessarily all of them

### Solution

```python
def strWithout3a3b(a: int, b: int) -> str:
    ans = []
    # Continue until both counts are depleted
    while a > 0 or b > 0:
        # Should we append 'a'? Choose greedily
        if a > b:
            to_add = 2 if a >= 2 else 1  # Add 'aa' if possible, else 'a'
            ans.append('a' * to_add)
            a -= to_add
            if b > 0:
                ans.append('b')
                b -= 1
        elif b > a:
            to_add = 2 if b >= 2 else 1  # Add 'bb' if possible, else 'b'
            ans.append('b' * to_add)
            b -= to_add
            if a > 0:
                ans.append('a')
                a -= 1
        else:
            # Counts are equal, so just alternate
            if a > 0:
                ans.append('a')
                a -= 1
            if b > 0:
                ans.append('b')
                b -= 1
    return ''.join(ans)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = a + b. We add exactly one letter per iteration until all used.
- **Space Complexity:** O(n). We use an extra list to build the string, then join at the end.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to avoid "aaaa" or "bbbb" instead?
  *Hint: Generalize the maximum allowed consecutive characters; make it a parameter.*

- Can you generate *all* possible valid strings?
  *Hint: Consider backtracking but note the exponential increase in output.*

- How to handle if a or b is negative, or their sum is less than the total length required?
  *Hint: Add input validation and constraint checking.*

### Summary  
This is a classic **greedy construction** problem: always place the maximum allowed consecutive of the "dominant" letter, then switch. This avoids illegal substrings by never letting more than two of the same letter group together. This **"Spacing/Grouping"** pattern frequently appears in problems where you must spread out items under specific adjacency constraints—such as task scheduling or seating arrangements to prevent clustering.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
