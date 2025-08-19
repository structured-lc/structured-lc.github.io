### Leetcode 1599 (Medium): Maximum Profit of Operating a Centennial Wheel [Practice](https://leetcode.com/problems/maximum-profit-of-operating-a-centennial-wheel)

### Description  
You operate a Centennial Wheel with 4 gondolas, where each rotation can take up to 4 people. Each person pays a boardingCost when they board the gondola, and you pay a runningCost for each rotation. Customers arrive at each rotation (customers[i]). For each rotation:
- Add new arrivals to the waiting queue.
- Board up to 4 customers.
- Calculate profit (boarded × boardingCost − runningCost).
You may stop operating at any time, even with people still waiting. Return the minimum rotation number that gives the *maximum positive profit*. If profit is never positive, return -1.

### Examples  

**Example 1:**  
Input: `customers = [8,3], boardingCost = 5, runningCost = 6`  
Output: `3`  
*Explanation:  
- Rotation 1: 8 arrive, board 4, wait 4. Profit: 4×5−6 = 14.  
- Rotation 2: 3 arrive (wait 7), board 4 (wait 3). Profit: 4×5−6 = 14+14 = 22  
- Rotation 3: 0 arrive, board 3 (wait 0). Profit: 3×5−6 = 9. Total: 31+9=31  
Maximum profit at rotation 3.*

**Example 2:**  
Input: `customers = [10,9,6], boardingCost = 6, runningCost = 4`  
Output: `7`  
*Explanation:  
Board as many as possible each rotation:
- Rot1: 10, board 4 (6 left). Profit: 4×6−4 = 20.
- Rot2: 9+6=15, board 4 (11 left). Profit: 20+20=40.
- Continue boarding (while wait>0): Rot3: 4 (7), Rot4: 4 (3), Rot5: 4 (−1), Rot6: 3 (0).
Calculate profit each time; max profit after 7 rotations.*

**Example 3:**  
Input: `customers = [3,4,0,5,1], boardingCost = 1, runningCost = 92`  
Output: `-1`  
*Explanation:  
Cost per rotation is too high; profit never positive.*

### Thought Process (as if you’re the interviewee)  
My first thought is to simulate each rotation, keeping track of waiting and arriving customers. For each rotation:
- Add new customers to the waiting queue.
- Board up to 4.
- Compute profit.
Continue until there are no waiting customers and no more new customers. Track the maximum profit and the rotation when it occurs.  
Initial brute-force is acceptable as the loop at worst is a few rotations per customer. Optimization is not strictly needed as customer arrivals are limited and each customer only boards once.  
Tradeoff: simulation is simple and direct, and avoids mistakes from trying to skip rotations. If asked for optimization, we only have to continue while profit possibility exists, since after customers run out profit only decreases.

### Corner cases to consider  
- All customers can be boarded in ≤1 rotation.
- Boarding cost ≤ running cost: always negative profit.
- No customers arrive at all.
- Customers arriving after the end of the array (wait > 0 after loop).
- Last rotation has fewer than 4 customers.
- Profit never positive.

### Solution

```python
def minOperationsMaxProfit(customers, boardingCost, runningCost):
    max_profit = 0
    max_rotations = -1
    total_profit = 0
    wait = 0
    i = 0
    n = len(customers)
    rotations = 0

    while wait > 0 or i < n:
        # Add new arriving customers if available
        if i < n:
            wait += customers[i]
        # Number of people boarding this rotation
        board = min(wait, 4)
        wait -= board

        total_profit += board * boardingCost - runningCost
        rotations += 1

        if total_profit > max_profit:
            max_profit = total_profit
            max_rotations = rotations
        i += 1

    return max_rotations if max_profit > 0 else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k), where n = length of customers, and k = extra rotations needed to empty the waiting queue after customers run out. But since each person boards at most once, total iterations ≤ total customers / 4 + n.
- **Space Complexity:** O(1) extra; only a few integer counters are used, no additional data structures proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if there were variable-sized gondolas or more than 4 per rotation?  
  *Hint: Parameterize the boarding capacity.*

- If runningCost or boardingCost varied per rotation, how would your simulation change?  
  *Hint: Keep arrays/lists for costs; update calculation accordingly.*

- What if more customers can arrive during rotations after the input array ends?  
  *Hint: Consider event-driven simulation or continuous arrivals.*

### Summary
This problem is a simulation/greedy pattern: simulate process step by step and decide at each step what maximizes local profit, tracking the global maximum. It's common in resource-allocation or queueing problems, and applies to elevator, ferry, or simple batch-serving systems where each batch has a cost and limited capacity.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
