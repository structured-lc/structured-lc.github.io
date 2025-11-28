### Leetcode 3746 (Medium): Minimum String Length After Balanced Removals [Practice](https://leetcode.com/problems/minimum-string-length-after-balanced-removals)

### Description  
You are given a string consisting only of characters 'A' and 'B'. You can repeatedly remove any substring where the number of 'A' characters equals the number of 'B' characters. After each removal, the remaining parts concatenate without gaps. Find the minimum possible length of the string after performing any number of such operations.

The key insight is that you don't need to find specific substrings—you just need to count how many characters can be balanced and removed overall. Every 'A' can potentially be paired with a 'B' for removal, regardless of their positions in the original string.

### Examples  

**Example 1:**  
Input: `"aaabbbac"`  
Output: `1`  
*Explanation: Count 3 A's and 3 B's. We can remove 3 pairs (6 characters total), leaving 1 character (the 'c')... wait, the string only has A's and B's. Let me recalculate: 4 A's and 3 B's. We can remove 3 pairs of A and B, leaving 1 A. Minimum length = 1*

**Example 2:**  
Input: `"aaaa"`  
Output: `4`  
*Explanation: The string contains only 'A' characters with no 'B' characters. We cannot form any balanced pairs, so no removal is possible. Minimum length = 4*

**Example 3:**  
Input: `"aabbcc"`  
Output: `2`  
*Explanation: Count 2 A's, 2 B's, and 2 C's... wait, only A and B exist. Let me use "aabb": 2 A's and 2 B's. We can remove all 4 characters as one balanced pair. Minimum length = 0. For "aabbac" with only A and B: 3 A's and 2 B's. We remove 2 pairs (4 characters), leaving 1 A. Minimum length = 1*


### Thought Process (as if you're the interviewee)  

**Initial Brute Force Idea:**  
My first thought is: what if I use a stack-based approach? For each character, if it matches the top of the stack but is the opposite character, I pop. This simulates removing balanced adjacent pairs.

**Why This Works:**  
After thinking through examples, I realize something powerful: it doesn't matter where the A's and B's are positioned. What matters is: can we match them? If I have 5 A's and 3 B's, I can always remove 3 A-B pairs, leaving 2 A's. The stack approach naturally finds these optimal matches because whenever we see an opposite character next to each other (in the stack), we remove them immediately—this is greedy and optimal.

**Optimization:**  
Actually, we can simplify even further. We don't need a full stack—we just need to count A's and B's. If we encounter an 'A', increment the A counter. If we encounter a 'B' and there's an A to pair with (counter > 0), we "remove" that pair by decrementing. The minimum length is the size of the stack (remaining characters) at the end.

**Final Approach - Stack Method:**  
Use a stack. For each character:
- If it's 'A', push it
- If it's 'B', check if the top is 'A'. If yes, pop (remove the pair). Otherwise, push 'B'.

Return the stack size at the end.

**Trade-offs:**  
- Stack approach: O(n) time, O(n) space. Very clear and intuitive.
- Counter approach: O(n) time, O(1) space. Mathematically clever but less intuitive.

I'll go with the stack approach for clarity in an interview, though the counter approach is also valid.


### Corner cases to consider  
- Empty string: Should return 0
- All same character: `"aaaa"` or `"bbbb"` → return length (no pairs to remove)
- Single character: `"a"` or `"b"` → return 1
- Already balanced: `"ab"` or `"aabb"` → return 0
- Alternating characters that cancel: `"abab"` → return 0
- One character type vastly outnumbers: `"aaaaab"` → return 4 (only 1 B to pair)


### Solution

```python
def minimumLength(s: str) -> int:
    # Use a stack to track characters
    # When we see an 'A', push it
    # When we see a 'B', check if top is 'A' and remove if possible
    stack = []
    
    for char in s:
        if char == 'A':
            stack.append('A')
        else:  # char == 'B'
            # If stack has 'A' on top, we can form a balanced pair
            if stack and stack[-1] == 'A':
                stack.pop()  # Remove the 'A'
            else:
                # No 'A' to pair with, so add this 'B'
                stack.append('B')
    
    # Return the length of remaining characters
    return len(stack)
```

Alternative counter-based solution:

```python
def minimumLength(s: str) -> int:
    # Count A's and B's as we iterate
    count_a = 0
    count_b = 0
    
    for char in s:
        if char == 'A':
            count_a += 1
        else:  # char == 'B'
            # If we have an 'A' to pair with, pair them (don't add the 'B')
            if count_a > 0:
                count_a -= 1
            else:
                # No 'A' to pair, so this 'B' stays
                count_b += 1
    
    # Return total remaining characters
    return count_a + count_b
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. We iterate through each character exactly once, and stack operations (push/pop) are O(1).

- **Space Complexity:** 
  - Stack approach: O(n) in the worst case (all characters are the same, so the entire string stays in the stack)
  - Counter approach: O(1) since we only use two integer counters regardless of input size


### Potential follow-up questions (as if you're the interviewer)  

- Can you solve this with O(1) space instead of O(n)?  
  *Hint: Think about whether you really need to store all characters. What information matters at each step? Can you track state with just counters?*

- What if the string contains multiple character pairs like 'AB', 'CD', 'EF' and we can remove any balanced substring (any character type paired)?  
  *Hint: Can you generalize the stack approach? How would counting work differently?*

- What if we want to return the actual minimum string (not just its length) after removals?  
  *Hint: How would you track which characters remain? Would you need to modify the stack approach to store indices or reconstructed strings?*

### Summary
This problem uses a **greedy stack pattern** where we immediately remove balanced pairs whenever possible. The key insight is that it's always optimal to remove a pair as soon as we can form one—there's no benefit to delaying removal. The stack naturally implements this by checking for opposite character matches as we scan left to right.

This pattern applies to many "balanced removal" problems like removing substrings (LeetCode 1544), canceling pairs in expressions, and matching parentheses-style problems. The counter-based optimization is a clever mathematical observation that you can pair any occurrence of one character with any occurrence of another, making the order irrelevant—only counts matter.

### Tags
String(#string), Stack(#stack), Counting(#counting)

### Similar Problems
