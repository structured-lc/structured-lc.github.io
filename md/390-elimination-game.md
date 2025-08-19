### Leetcode 390 (Medium): Elimination Game [Practice](https://leetcode.com/problems/elimination-game)

### Description  
Given an increasing list of integers from 1 to n, repeat this process until only one number remains:
- From left to right, remove the first element and every other element after that (so, remove 1, 3, 5, ...).
- Then, from right to left, remove the current rightmost number and every other number from what's left.
- Continue alternating left-to-right and right-to-left elimination until a single number is left.
Return this final value.

### Examples  

**Example 1:**  
Input: `n = 9`  
Output: `6`  
*Explanation:  
arr=[1,2,3,4,5,6,7,8,9]  
→ [2,4,6,8] (left to right)  
→ [2,6] (right to left)  
→  (left to right)*

**Example 2:**  
Input: `n = 1`  
Output: `1`  
*Explanation:  
arr=[1]  
Already just one value, so return 1.*

**Example 3:**  
Input: `n = 20`  
Output: `8`  
*Explanation:  
arr=[1...20]  
→ [2,4,6,8,10,12,14,16,18,20] (left-right)  
→ [2,6,10,14,18] (right-left)  
→ [6,14] (left-right)  
→  (right-left)
→  (will be final for n=20 after correct sequence)*

### Thought Process (as if you’re the interviewee)  
First, I thought about simulating the process by keeping a list and repeatedly removing elements based on the current direction. For each pass, eliminate alternate numbers from the current direction, flipping direction after each pass.

However, this is very inefficient for large n (up to 10⁹), since generating and updating such a list would be way too slow and memory intensive.

After analyzing, I realized the process is similar to repeatedly halving the list and updating either the start or end, depending on whether we're proceeding left-to-right or right-to-left, and whether the number of remaining elements is even or odd.

With some math insight, we can model the process by tracking:
- the starting number (`head`)
- the step size (the difference between surviving adjacent numbers)
- the number of remaining numbers (which halves after every round)
- direction (left→right or right→left)

Key points:
- Every left-to-right pass always removes the first item, so `head` always advances by the current step.
- Every right-to-left pass, the head only advances if the number of remaining numbers is odd (since if even, the head survives).
- Double the step size after each pass, halve the list length.
- Keep processing until only one number remains.

This process reduces the run time to O(log n).

### Corner cases to consider  
- n = 1 (trivial case, must return 1)
- n is a power of two (pattern is clean)
- n is very large (test against integer overflow)
- n is even or odd (impacts elimination on each pass)
- Minimum inputs (n=1), maximum inputs (n=10⁹)

### Solution

```python
def lastRemaining(n: int) -> int:
    # Initialization
    head = 1         # Start of the list
    step = 1         # Step between surviving elements
    left = True      # Start from left to right
    remaining = n    # Elements left

    while remaining > 1:
        # Always move the head if we're going left,
        # or if remaining is odd when going right
        if left or remaining % 2 == 1:
            head += step
        # Update for next round
        remaining //= 2      # Half the numbers remain
        step *= 2            # The step doubles after each round
        left = not left      # Alternate direction

    return head
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), since the number of rounds is proportional to ⌊log₂ n⌋ — the number of times we can halve n.
- **Space Complexity:** O(1), as we use only a constant number of variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you prove why the O(log n) solution always produces the correct result?  
  *Hint: Try writing what remains for small n on paper and deduce a pattern for how the head moves after each pass.*

- What happens if instead of removing from alternate ends, we always removed from the same direction?  
  *Hint: How would the sequence and survivor change? Try working through n=9 step by step.*

- How would you modify your code if the list started from a different number, e.g., [k, ..., k+n-1]?  
  *Hint: See if the `head` initialization or `step` would change. Consider how elimination always progresses.*

### Summary

This problem is a recurring elimination process that can be solved with careful simulation of head position, step size, and direction—reducing what appears to be a brute-force simulation (O(n)) down to an O(log n) mathematical pattern. This approach is related to problems involving circular lists, fast exponentiation, and sequence analysis where the state can be described incrementally. You can apply this incremental elimination/halving trick in problems involving Josephus circle, skip lists, and divide-and-conquer scenarios.

### Tags
Math(#math), Recursion(#recursion)

### Similar Problems
- Min Max Game(min-max-game) (Easy)