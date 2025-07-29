### Leetcode 2361 (Hard): Minimum Costs Using the Train Line [Practice](https://leetcode.com/problems/minimum-costs-using-the-train-line)

### Description  
Given two train routes connecting stops 0 through n:
- **regular[i]**: cost to travel between stop i and i+1 using the regular route.
- **express[i]**: cost to travel between stop i and i+1 using the express route.
You can switch to the express route at any stop by paying an additional **expressCost** (each time you switch).  
Switching back to the regular route is free. You start at stop 0, initially on the regular route.  
Find the **minimum cost to reach each stop 1 through n** using any sequence of route choices and switches.

### Examples  

**Example 1:**  
Input: `regular = [1,6,9,5]`, `express = [5,2,3,10]`, `expressCost = 8`  
Output: `[1,7,14,19]`  
*Explanation:*
- To stop 1: Regular route only, cost 1.
- To stop 2: Stay regular (1 + 6 = 7), or switch to express at 0 (1 + 8 + 2 = 11), choose 7.
- To stop 3: Minimum of (7 + 9 = 16 on regular) or (switch to express at 2: 7 + 8 + 3 = 18), or continue previous express path.
  Actually, the optimal sequence may involve switching routes multiple times; best cost to each stop is:
  - [1, 7, 14, 19].

**Example 2:**  
Input: `regular = [11,5,13]`, `express = [7,10,6]`, `expressCost = 3`  
Output: `[10,15,24]`  
*Explanation:*
- Take express at start: 3 + 7 = 10 to stop 1.
- For stop 2: Continue express (10 + 10 = 20), or switch back to regular at no cost (10 + 5 = 15).
- For stop 3: Can switch to express again (15 + 3 + 6 = 24).

**Example 3:**  
Input: `regular = [2,2,2]`, `express = [1,1,1]`, `expressCost = 100`  
Output: `[2,4,6]`  
*Explanation:*
- Always take regular (no reason to switch, as expressCost outweighs any savings).

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible sequences of regular/express and switches at each step, tracking the cost for every possible state—clearly exponential.
- **Dynamic Programming:**  
  At every stop, keep two states:
   - min cost to reach on regular
   - min cost to reach on express
  Transitions:
   - To regular: from regular last time, or from express (no extra switching cost).
   - To express: from regular last time (must pay switching cost), or from express (no switching cost).
  Iteratively update for each stop.
- Chose this DP because the state space is small (just two per stop) and it allows O(n) solution.

### Corner cases to consider  
- All regular costs are lower than express + expressCost (never switch).
- All express segments are much cheaper, so optimal is to switch immediately and stay.
- expressCost so high that express is never worth it.
- Some stops have dramatically lower express cost; best is to switch on and off.
- n = 1 (one segment).
- n = 0 (there are no segments).

### Solution

```python
def minimumCosts(regular, express, expressCost):
    n = len(regular)
    # cost_regular: min cost to reach stop i on regular
    # cost_express: min cost to reach stop i on express
    cost_regular = 0                     # Start at 0 on regular
    cost_express = expressCost           # Start at 0, but if switch to express, must pay expressCost first
    res = []

    for i in range(n):
        # To reach regular at stop i+1
        next_regular = min(
            cost_regular + regular[i],   # Stay regular
            cost_express + regular[i]    # Switch back from express (free) then take regular
        )
        # To reach express at stop i+1
        next_express = min(
            cost_regular + expressCost + express[i],  # Switch from regular (pay switching cost)
            cost_express + express[i]                 # Stay on express
        )
        res.append(min(next_regular, next_express))
        cost_regular, cost_express = next_regular, next_express

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of stops. We iterate through all segments once, constant work per stop.
- **Space Complexity:** O(n) for the output array, O(1) extra (we only use a few variables outside the result list).

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose there are multiple express lines with different costs and different switching costs?  
  *Hint: Try generalizing the DP to more than two states per stop.*

- What if you can only switch to express at certain stops (e.g., express only stops at certain stations)?  
  *Hint: Add a check to only allow switching/using express at those indices in your DP transition.*

- Can you also return the path taken to achieve the minimal cost for each stop?  
  *Hint: Classic DP path reconstruction: store back-pointers at each state and recover moves at the end.*

### Summary
This problem uses the **2D state Dynamic Programming pattern** with **"min cost to reach each stop in each mode"**. It's a classic case of modeling route selection with *stateful transitions* and is related to shortest path or min-cost multi-choice DP. The pattern is widely applicable in similar problems involving stateful route selection, like grid robots with different movement costs, or ticket purchase planning with various fare options.