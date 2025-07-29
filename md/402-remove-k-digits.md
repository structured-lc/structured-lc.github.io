### Leetcode 402 (Medium): Remove K Digits [Practice](https://leetcode.com/problems/remove-k-digits)

### Description  
Given a non-negative integer as a string **num** and an integer **k**, remove exactly **k** digits from **num** so that the resulting number is the smallest possible.  
Digits must be removed in order; you cannot rearrange them. The answer should have no leading zeros. If the result is empty, return "0".

### Examples  

**Example 1:**  
Input: `num = "1432219", k = 3`  
Output: `"1219"`  
*Explanation: Remove '4', '3', and one '2'. The smallest string after removals is `"1219"`.*

**Example 2:**  
Input: `num = "10200", k = 1`  
Output: `"200"`  
*Explanation: Remove the first '1', resulting in `"0200"`. Drop leading zeroes to get `"200"`.*

**Example 3:**  
Input: `num = "10", k = 2`  
Output: `"0"`  
*Explanation: Both digits are removed, so we return `"0"`.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all combinations of removing k digits from num. This is extremely inefficient due to combinatorial explosion; not practical for large inputs.
- **Greedy + Stack (Optimized):**
  - To get the smallest number, try to remove the largest digits at earlier (more significant) positions.
  - Iterate from left to right, using a stack. If the current digit is less than the last stacked digit (and we still have removals left), pop the last.
  - Add the current digit to the stack.  
  - At the end, if any removals left (k > 0), remove from the end of the stack.
  - Build the final string from stack, and remove leading zeroes.
  - This greedy approach guarantees the lexicographically and numerically smallest outcome, and is fast for even large input (O(n) time).

### Corner cases to consider  
- k = len(num): Remove all digits, should return `"0"`.
- Leading zeroes in the result (should strip all).
- num contains repeated digits.
- k = 0 (should return num itself, minus leading zeroes).
- num is already sorted in increasing or decreasing order.
- All digits are the same.
- Input is the minimum allowed length (1 digit).

### Solution

```python
def removeKdigits(num: str, k: int) -> str:
    stack = []
    
    # Iterate over digits
    for digit in num:
        # Remove digits from stack if possible and they are larger than current digit
        while k > 0 and stack and stack[-1] > digit:
            stack.pop()
            k -= 1
        stack.append(digit)
    
    # If some removals left, remove from end (least significant)
    while k > 0:
        stack.pop()
        k -= 1

    # Build result string and strip leading zeros
    result = ''.join(stack).lstrip('0')
    
    return result if result else '0'
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(num).  
  Each digit is pushed and possibly popped from the stack at most once.
- **Space Complexity:** O(n), the stack can hold up to all digits (worst case if k=0).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to *maximize* the number instead of minimize?
  *Hint: Reverse the comparison in the stack step.*

- Suppose the input can include extremely large numbers (more than 10⁶ digits). How would you handle efficiency and/or data types?
  *Hint: Discuss streaming solutions or language limitations with string/array handling.*

- How would you handle a constraint where you can't use extra space (i.e., no stack)?
  *Hint: Can you use in-place processing or pointer manipulation? What are the tradeoffs?*

### Summary
This problem is a classic **monotonic stack** / **greedy** pattern.  
The key is to always remove the "leftmost higher digits" to make the final number small, mirroring the logic of "find the next smaller element."  
This approach is seen in problems such as "Next Greater Element", "Largest Rectangle in Histogram", and is common in competitive coding to optimize brute-force digit removal.