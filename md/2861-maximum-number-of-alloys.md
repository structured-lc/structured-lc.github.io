### Leetcode 2861 (Medium): Maximum Number of Alloys [Practice](https://leetcode.com/problems/maximum-number-of-alloys)

### Description  
You are given:
- **n** metals, **k** machines.
- Each machine can produce alloys with its own *composition* requirement (how many units of each metal per alloy).
- You have a stock of each metal, each type with its own cost per unit.
- You also have a **budget**.
Find the **maximum number of alloys** you can build using *a single machine* without exceeding your budget, where buying extra metals is allowed.  
*All alloys must be built using the same machine’s recipe.*

### Examples  

**Example 1:**  
Input:  
n = 2, k = 3, budget = 10,  
composition = [[2,1],[1,2],[1,1]],  
stock = [1,1],  
cost = [5,5]  
Output: `2`  
*Explanation: It's best to use the 3rd machine. To make 2 alloys, you need:  
- 2 × [1,1] = [2,2] metals.  
- Stocks: [1,1], need to buy: [1,1] extra.  
- Cost: 1×5 + 1×5 = 10 (which equals the budget). So, max alloys is 2.*

**Example 2:**  
Input:  
n = 3, k = 2, budget = 20,  
composition = [[2,3,2],[1,1,1]],  
stock = [3,0,2],  
cost = [4,6,8]  
Output: `2`  
*Explanation: If you use the 2nd machine: Need 2×[1,1,1] = [2,2,2].  
- Stock: [3,0,2], need to buy: [0,2,0]  
- Cost: 2×6 = 12 ≤ 20. So, 2 is possible.*

**Example 3:**  
Input:  
n = 2, k = 3, budget = 10,  
composition = [[2,1],[1,2],[1,1]],  
stock = [1,1],  
cost = [5,5]  
Output: `2`  
*Explanation: See Example 1 — input repeated as Example 3 in some sources.*

### Thought Process (as if you’re the interviewee)  
First, brute force:  
- For each machine, try every possible number of alloys (`x` from 0 upwards), calculate metal needed.  
- See if you can satisfy requirements within stock and budget.  
- Not efficient: budget may be up to 10⁸, so O(k × max_alloys) is not feasible.

Optimize using binary search:  
- For each machine, binary search on number of alloys (`left=0, right=upper_bound`) it can make.  
- For a guess `mid`, calculate extra metal to buy for each type:  
  (composition[j] × mid) - stock[j], clamp at zero.  
  Total cost = sum over types of (units to buy × unit cost).  
  If total cost ≤ budget, try higher; else try less.  
- Repeat for all machines — answer is the max over machines.

Why this way?  
- Each machine’s alloys are independent; all alloys must come from only one machine.  
- Binary search (log scale) × per machine (up to 100) × per metal (up to 100) is efficient.

### Corner cases to consider  
- Not enough stock and insufficient budget for even a single alloy.
- Some costs or stocks are zero.
- Budget = 0 (must only use stock).
- All machines require more metal than possible even with budget.
- Large values of n, k, budget (stress test performance).
- Composition that requires only metals you have zero stock for.

### Solution

```python
def maxNumberOfAlloys(n, k, budget, composition, stock, cost):
    # Helper: check if 'count' alloys are possible for this machine index
    def can_make(machine_idx, count):
        needed = 0
        for j in range(n):
            req = composition[machine_idx][j] * count
            buy = max(0, req - stock[j])
            needed += buy * cost[j]
            if needed > budget:
                return False
        return True

    max_alloy = 0
    for i in range(k):
        # Binary search for this machine's max alloy count
        left, right = 0, budget + max(stock)
        while left < right:
            mid = (left + right + 1) // 2
            if can_make(i, mid):
                left = mid
            else:
                right = mid - 1
        max_alloy = max(max_alloy, left)
    return max_alloy
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k × n × logN), where k = number of machines, n = types of metals, N ≈ budget + max(stock).  
  For each machine, binary search (log(budget)) × n time per check.
- **Space Complexity:** O(1).  
  Only a few counters, no extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we allow alloys to be made with a mix of machines, not just one?  
  *Hint: Try modeling as a knapsack or linear programming problem.*

- What if metal costs change dynamically after each purchase?  
  *Hint: Simulation with priority queue or greedy allocation per step.*

- If several alloys can be slightly overbuilt, is there a way to minimize total cost while making at least a target alloy count?  
  *Hint: This may relate to integer programming or finer-grained binary search/greedy.*

### Summary
This problem uses the classic **binary search on the answer** pattern: for each machine, you check the largest feasible solution using binary search and a greedy feasibility check. Binary searching on solution quantity can be applied to many allocation problems — especially where "can we make at least X" is easy to check. This is common in production, scheduling, and resource-constrained optimization.


### Flashcard
For each machine, binary search the max number of alloys you can make within budget, checking metal needs per guess.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
