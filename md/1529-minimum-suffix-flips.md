### Leetcode 1529 (Medium): Minimum Suffix Flips [Practice](https://leetcode.com/problems/minimum-suffix-flips)

### Description  
Given a binary string **target** of length *n*, you start with a string **s** that is all zeroes. You can pick any index *i* (0 ≤ i < n), and **flip all bits from i to the end** (0 becomes 1, 1 becomes 0) in one operation. Find the minimum number of such operations to turn **s** into **target**.

### Examples  

**Example 1:**  
Input: `target = "10111"`  
Output: `3`  
*Explanation:  
Start with "00000":  
- Flip at index 0:    "11111"  
- Flip at index 1:    "10000"  
- Flip at index 2:    "10111" (done)*

**Example 2:**  
Input: `target = "101"`  
Output: `3`  
*Explanation:  
Start with "000":  
- Flip at index 0:    "111"  
- Flip at index 1:    "100"  
- Flip at index 2:    "101" (done)*

**Example 3:**  
Input: `target = "00000"`  
Output: `0`  
*Explanation:  
Start with "00000", which is already equal to the target, so no flips needed.*

### Thought Process (as if you’re the interviewee)  
Brute force would try all possible flip sequences—very inefficient.  
Instead, observe the properties:
- Each *flip* at index *i* changes all bits from i onwards.
- If current bit is correct, no action; if not, a flip at this position is needed.
- The effect of previous flips accumulates: The *parity* (even or odd) of the number of flips so far tells us the current state of s[i].
- But simpler: The answer is the **number of times the current target bit differs from the previous one (starting from the first, compared to '0')**.
- For example, every time there's a change in target (from the previous char), we incur a flip.

Trade-off: O(n) time, O(1) space. Very efficient.

### Corner cases to consider  
- target is all zeros → output 0  
- target is all ones → output 1  
- Alternating pattern: "010101..." → flip at every position  
- Empty string (n=0) → output 0  
- Single character: "0" → 0, "1" → 1  
- Consecutive same digits: only 1 flip for the run

### Solution

```python
def minFlips(target: str) -> int:
    flips = 0
    prev = '0'  # Initial string s starts with all '0'
    for c in target:
        # Whenever current target differs from previous, we need a flip
        if c != prev:
            flips += 1
            prev = c  # Next time, compare to this character
    return flips
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is length of target. We scan target once.
- **Space Complexity:** O(1). Only constant variables used (no extra arrays or recursion).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could **flip any substring**, not just suffix?  
  *Hint: See if a greedy approach still works—more flexibility often means a harder problem!*

- How would you **simulate and return** the actual flip positions, not just the count?  
  *Hint: Track indices at which you made a flip for reconstruction.*

- Can you solve it if **s** starts as an arbitrary string (not all '0's)?  
  *Hint: Start with the given initial state instead of '0', and use similar logic.*

### Summary
This is a classic case of counting state transitions: Every bit in target that is different from the previous (starting from '0') triggers a flip. This greedy, single-pass approach is efficient and a common pattern for problems involving minimum operation sequences under limited move types. Similar reasoning can be adapted to bulb-flipping and toggling problems.


### Flashcard
Determine the number of flips needed by comparing each bit to the previous target bit, considering the cumulative effect of flips.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
- Minimum Operations to Make Binary Array Elements Equal to One II(minimum-operations-to-make-binary-array-elements-equal-to-one-ii) (Medium)