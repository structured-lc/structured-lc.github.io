### Leetcode 3100 (Medium): Water Bottles II [Practice](https://leetcode.com/problems/water-bottles-ii)

### Description  
You start with `numBottles` full water bottles. Each time you drink a bottle, you get an empty bottle. You can exchange `numExchange` empty bottles for one full bottle, but **after each exchange**, the required number (`numExchange`) needed to exchange **increases by 1**.  
Each bottle you exchange gives you a new full bottle (which you drink right away, yielding another empty).  
Return the **maximum number of water bottles you can drink** under these rules.

### Examples  

**Example 1:**  
Input: `numBottles = 13, numExchange = 6`  
Output: `15`  
*Explanation: Start with 13 full bottles, drink all for 13 empty bottles.  
- Exchange 6 empties → get 1 full (drink it, get 1 empty).  
  - Now have 13-6+1 = 8 empties.  
  - `numExchange` becomes 7.  
- Exchange 7 empties → get 1 full (now 8-7+1 = 2 empties, `numExchange` becomes 8).  
At this point, you can't do more exchanges. So, total bottles drunk: 13 (initial) + 1 + 1 = 15.*

**Example 2:**  
Input: `numBottles = 10, numExchange = 3`  
Output: `13`  
*Explanation:  
- Start with 10 full, drink all, 10 empty.  
- Exchange 3 → 1 full, now 10-3+1 = 8 empties, `numExchange`=4  
- Exchange 4 → 1 full, now 8-4+1 = 5, `numExchange`=5  
- Exchange 5 → 1 full, now 5-5+1 = 1, `numExchange`=6  
No more exchanges possible. Total: 10+1+1+1=13.*

**Example 3:**  
Input: `numBottles = 5, numExchange = 5`  
Output: `6`  
*Explanation:  
- Drink all 5, get 5 empty.  
- Exchange 5 → 1 full, now 1 empty, `numExchange`=6.  
No more possible. Total: 5+1=6.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Simulate the process: for each round, check if enough empty bottles to exchange, perform exchange, update counters, continue while possible.
- **Details:**  
  - After each exchange, increase the number required to exchange by 1.
  - The process ends when you have fewer empties than current `numExchange`.
- **Why not optimize further?** Each step strictly depends on the previous one because `numExchange` increases only *after* a successful exchange. No batch exchanges can be combined.
- **Chosen approach:** Direct simulation—intuitive, readable, and since constraints are small (≤100), efficiency is not a concern.

### Corner cases to consider  
- `numBottles` < `numExchange`: No exchanges occur.
- `numBottles` == `1`: Only one drink, no exchanges.
- `numExchange` == `1`: After every drink, you can always get a new bottle for a while (diverges, but the rule about no multi-batch exchanges restricts this).
- Very large `numBottles`, quickly increasing `numExchange`, will limit possible exchanges.
- After each exchange, check if you correctly update `numExchange` and the empty count.

### Solution

```python
def maxBottlesDrunk(numBottles: int, numExchange: int) -> int:
    # Initial drinks -- all starting bottles
    total_drunk = numBottles
    empties = numBottles

    while empties >= numExchange:
        # Exchange as many times as possible (only one per round per rules)
        # Exchange numExchange empty bottles for 1 full bottle
        empties -= numExchange     # spend empties
        total_drunk += 1          # drink the new bottle right away
        empties += 1              # new bottle gives another empty
        numExchange += 1          # after exchange, increase requirement

    return total_drunk
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(numBottles) in the worst case. Realistically, it's O(E), where E is how many exchanges can happen since each loop iteration corresponds to an exchange (numExchange increases each time).
- **Space Complexity:** O(1). Only a few variables used regardless of input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could perform *multiple* exchanges per round, before updating `numExchange`?
  *Hint: Allow batch exchanges in a round—simulate carefully!*

- Suppose `numExchange` increases by a different constant, or only after every K exchanges?
  *Hint: Track increments or use counters to generalize constraint.*

- If you can borrow up to X empties (debt) to exchange early, but must repay afterward?
  *Hint: Modify exchange criteria, ensure no invalid states.*

### Summary
This problem is a simulation with careful attention to "post-exchange" requirements. It's a direct example of the "simulate greedy exchanges with growing requirement" pattern, common in bottle-exchange or recycling simulation problems. This coding pattern applies to problems with *state changes after each operation*—important in resource management, game scoring, and constrained exchanges.


### Flashcard
Simulate bottle exchanges; track empty bottles and current exchange rate; after each successful exchange, increment the rate; continue until fewer empties than required.

### Tags
Math(#math), Simulation(#simulation)

### Similar Problems
- Water Bottles(water-bottles) (Easy)