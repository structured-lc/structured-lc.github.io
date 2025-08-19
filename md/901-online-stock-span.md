### Leetcode 901 (Medium): Online Stock Span [Practice](https://leetcode.com/problems/online-stock-span)

### Description  
You are asked to design a class, **StockSpanner**, which, for every new day's stock price, returns the "span" of that price. The **span** of today's price is defined as the maximum number of consecutive days (including today) the stock price has been **less than or equal** to today's price, going backwards.  
Every day you call the `.next(price)` method with a new price. The goal is to return the correct span for each price efficiently (ideally better than brute force).

### Examples  

**Example 1:**  
Input: `prices = [100, 80, 60, 70, 60, 75, 85]`  
Output: `[1, 1, 1, 2, 1, 4, 6]`  
*Explanation:*
- Day 1: 100 → span=1 (no previous days)
- Day 2: 80  → span=1 (no previous prices ≥80)
- Day 3: 60  → span=1
- Day 4: 70  → span=2 (includes yesterday: 60)
- Day 5: 60  → span=1
- Day 6: 75  → span=4 (includes: 60,70,60)
- Day 7: 85  → span=6 (includes: 75,60,70,60,80)

**Example 2:**  
Input: `prices = [10, 4, 5, 90, 120, 80]`  
Output: `[1, 1, 2, 4, 5, 1]`  
*Explanation:*
- Day 4: 90 → span=4 (10,4,5,90 are ≤90)
- Day 5: 120 → span=5 (all before are ≤120)
- Day 6: 80 → span=1

**Example 3:**  
Input: `prices = [30, 35, 40, 38, 35]`  
Output: `[1, 2, 3, 1, 1]`  
*Explanation:* 
- Day 3: 40 → span=3 (30,35,40)
- Day 4: 38 → span=1 (only itself)
- Day 5: 35 → span=1

### Thought Process (as if you’re the interviewee)  

- **Brute Force Idea**:  
  For each call to `next(price)`, look backwards day by day until you find a price greater than today’s price. Count the streak.  
  This gives **O(n) per query** and **O(n²) total** for n prices—too slow.

- **Optimization (Monotonic Stack):**  
  A stack can track previous prices and their spans.  
  - Each stack item holds `(price, span)`.  
  - For each next price, repeatedly pop stack while top price ≤ current price, summing up the popped spans.
  - This gives **amortized O(1)** per query since each element is pushed and popped at most once.

- **Tradeoff**:  
  Much faster queries (O(1) amortized), at the cost of keeping a stack of pairs.

### Corner cases to consider  
- Only one price (should return 1).
- All prices strictly increasing (spans increase by 1 each time).
- All prices the same (span increases by 1 each time).
- All prices decreasing (span is always 1).
- Very large inputs (ensure stack does not cause overflow).

### Solution

```python
class StockSpanner:
    def __init__(self):
        # Stack holds tuples: (price, span)
        self.stack = []

    def next(self, price: int) -> int:
        # Span for current day
        span = 1

        # Pop from stack while top price ≤ current price
        while self.stack and self.stack[-1][0] <= price:
            _, prev_span = self.stack.pop()
            span += prev_span

        # Push current price + its span
        self.stack.append((price, span))
        return span
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) amortized per `.next()` call.  
  Each price is pushed and popped at most once. There are n prices, so O(n) total.
- **Space Complexity:** O(n) in the worst case (strictly decreasing prices, stack grows to n).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you further reduce the space usage?  
  *Hint: Is it always necessary to store both price and span? Or could one be derived on the fly?*

- How would you handle updates if the price for a previous day needs to change?  
  *Hint: Think about the requirements for online vs. batch updates.*

- Can you preprocess a batch of N prices efficiently (offline problem)?  
  *Hint: Classic stack with reverse traversal, as in next greater element problems.*

### Summary
This problem uses the **monotonic stack** pattern to support efficient span computation for streaming prices.  
The same approach is applicable to similar "previous greater element" and histogram area problems—any scenario where you need to track previous items that satisfy a monotonic property (e.g., greater, smaller, etc.) for efficient retrieval.

### Tags
Stack(#stack), Design(#design), Monotonic Stack(#monotonic-stack), Data Stream(#data-stream)

### Similar Problems
- Daily Temperatures(daily-temperatures) (Medium)