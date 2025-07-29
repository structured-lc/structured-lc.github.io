### Leetcode 1518 (Easy): Water Bottles [Practice](https://leetcode.com/problems/water-bottles)

### Description  
You have `numBottles` full water bottles and can exchange `numExchange` empty bottles for one full bottle. Return the **maximum number of water bottles you can drink**.

Each time you finish a bottle, you get an empty. You can trade in empty bottles for new full ones, and continue until you can't exchange anymore.

### Examples  

**Example 1:**  
Input: `numBottles = 9, numExchange = 3`  
Output: `13`  
*Explanation: Drink 9. Exchange 9 / 3 = 3, so get 3 more. Now have 3 empty. Drink 3, now 3 empty. Exchange 3/3 = 1, get 1. Drink it, now 1 empty. Can't exchange anymore. Total bottles drunk: 9 + 3 + 1 = 13.*

**Example 2:**  
Input: `numBottles = 15, numExchange = 4`  
Output: `19`  
*Explanation: 15 / 4 = 3, drink 3 more, 3 empty left, can't exchange again. Total = 15+3+1=19.*

**Example 3:**  
Input: `numBottles = 5, numExchange = 5`  
Output: `6`  
*Explanation: Drink 5. 5/5 = 1 exchange, get 1 more, total = 6.*

### Thought Process (as if you’re the interviewee)  
Drink all current bottles, collect empties. While you have at least `numExchange` empties, trade them for new full bottles, drink them, and accumulate empties. Repeat until not enough empties to exchange. Simple simulation, no need for complex data structures.

### Corner cases to consider  
- numBottles < numExchange: cannot exchange, just return numBottles
- numBottles == numExchange
- numExchange == 1 (infinite loop? but not allowed in constraints)

### Solution

```python
def numWaterBottles(numBottles: int, numExchange: int) -> int:
    total = numBottles
    empty = numBottles
    while empty >= numExchange:
        new = empty // numExchange
        total += new
        empty = empty % numExchange + new
    return total
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(log(numBottles)), because with each step, bottles/empties decrease by a factor.
- **Space Complexity:** O(1), only integer variables, no extra data structure.

### Potential follow-up questions (as if you’re the interviewer)  
- What if you need to track the actual sequence of exchanges?  
  *Hint: Use a list to log each step, or return the stepwise counts.*

- What if exchange rate changes after each trade?  
  *Hint: Pass a function or list of rates, update accordingly in the loop.*

- How would you solve if you can borrow empties, but must return later?  
  *Hint: Keep track of borrowed amount, simulate borrowing and returning.*

### Summary
Simulate the **exchange process** step by step: drink, exchange, drink again. This is a classic greedy/resource consumption pattern. Can apply to other "consume-and-exchange" resource problems (like candy wrappers, bottles, or tickets).