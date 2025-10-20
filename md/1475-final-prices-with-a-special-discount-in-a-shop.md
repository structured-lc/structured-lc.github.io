### Leetcode 1475 (Easy): Final Prices With a Special Discount in a Shop [Practice](https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop)

### Description  
Given a list of item prices, for each item, find the first price to its right that is less than or equal to it and subtract it as a discount. If none, the price stays.

### Examples  
**Example 1:**  
Input: `prices = [8,4,6,2,3]`  
Output: `[4,2,4,2,3]`  
*Explanation: For 8, next less or equal is 4 (8-4=4). For 4: next less or equal is 2 (2), for 6: 2 (4), for 2: none to the right (2), for 3: none (3).*

**Example 2:**  
Input: `prices = [1,2,3,4,5]`  
Output: `[1,2,3,4,5]`  
*Explanation: No discounts apply, as no rightward less-or-equal prices.*

**Example 3:**  
Input: `prices = [10,1,1,6]`  
Output: `[9,0,1,6]`  
*Explanation: For 10: discount is 1, for 1: next is 1, for 1 (second): none, for 6: none.*

### Thought Process (as if you’re the interviewee)  
The brute-force is nested loops: for each price i, look right for the first price ≤ prices[i]. This is O(n²). But this is the classic "next smaller element" problem, which can be solved using a stack for O(n) time. Traverse from right to left, use stack to find rightmost less-or-equal quickly.

### Corner cases to consider  
- All increasing prices (no discounts)
- All same prices
- All decreasing prices
- Single element

### Solution

```python
def finalPrices(prices):
    n = len(prices)
    stack = []
    res = prices[:]
    for i in range(n-1, -1, -1):
        # Pop elements greater than prices[i]
        while stack and stack[-1] > prices[i]:
            stack.pop()
        if stack:
            res[i] -= stack[-1]
        # Push current price onto stack
        stack.append(prices[i])
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), each element pushed and popped at most once.
- **Space Complexity:** O(n), for the stack and result.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you do it if you could not use extra space for the stack?  
  *Hint: Try modifying the array in place using next indices.*
- How to adapt for the next strictly smaller, instead of less than or equal?  
  *Hint: Adjust stack pop condition.*
- If the discount can come from any position after i (not just first)?  
  *Hint: Use min from the rest of the list.*

### Summary
This is a classic monotonic stack problem, often used for "next smaller/greater" type questions. Mastering this pattern is extremely helpful for array/stack-based interview questions, such as those on histogram area and stock span.


### Flashcard
Use a monotonic stack to find the next price ≤ current to the right; subtract it for each item in one O(n) pass.

### Tags
Array(#array), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
