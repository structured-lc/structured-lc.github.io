### Leetcode 1011 (Medium): Capacity To Ship Packages Within D Days [Practice](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days)

### Description  
Given an array of package weights and an integer D representing the number of days, find the **minimum ship capacity** required to ship all packages within D days.  
- **Packages must be shipped in the given order**—you cannot reorder them.
- On any day, you may load any number of packages into the ship as long as the total weight does not exceed the ship’s capacity.
- The ship leaves each day with the loaded packages, and the rest are shipped on subsequent days.

Your goal is to determine the minimum possible capacity of the ship that allows all packages to be shipped within exactly D days.

### Examples  

**Example 1:**  
Input: `weights = [1,2,3,4,5,6,7,8,9,10], D = 5`  
Output: `15`  
*Explanation:  
Optimal way (for capacity 15):  
- Day 1: [1, 2, 3, 4, 5] (total = 15)  
- Day 2: [6, 7] (total = 13)  
- Day 3:  (total = 8)  
- Day 4:  (total = 9)  
- Day 5:  (total = 10)  
Any smaller capacity would require more than 5 days.*

**Example 2:**  
Input: `weights = [3,2,2,4,1,4], D = 3`  
Output: `6`  
*Explanation:  
One valid split for capacity 6:  
- Day 1: [3,2] (total = 5)  
- Day 2: [2,4] (total = 6)  
- Day 3: [1,4] (total = 5)  
Any lower capacity would not fit the packages in 3 days.*

**Example 3:**  
Input: `weights = [1,2,3,1,1], D = 4`  
Output: `3`  
*Explanation:  
One valid way is:  
- Day 1: [1,2] (total = 3)  
- Day 2: [3]  
- Day 3: [1]  
- Day 4: [1]  
Capacity 2 would not be enough (would take more than 4 days).*

### Thought Process (as if you’re the interviewee)  
Start by observing that **choosing a ship capacity lower than the heaviest package is impossible**. We also can't pick a capacity larger than the combined weight of all packages—because that would allow shipping everything in one day.

A brute-force approach would be to try all possible capacities in the range [max(weights), sum(weights)], simulating the shipping process for each capacity and checking if it can ship all packages in D or fewer days. However, this would be inefficient for large input.

Instead, we can apply a **binary search** on capacity:
- The search range is [max(weight), sum(weights)].
- For each midpoint capacity, simulate the shipping process to see if it is feasible to finish within D days.
  - If possible, try a smaller capacity (move left).
  - If not, try a larger capacity (move right).
- The minimal feasible capacity found is the answer.

This binary search pattern is common in optimization with monotonic constraints: when increasing the resource (capacity) can only make the task easier or equally easy.

### Corner cases to consider  
- Array of just **one package**.
- **All package weights equal**.
- **Extremely large D** (greater than the number of packages).
- **D = 1** (must ship everything in one day; answer is sum of weights).
- **Package with weight equal to sum of all others**.
- **Weights with wide distribution** (e.g. mix of very large and very small).

### Solution

```python
def shipWithinDays(weights, D):
    # Helper function: returns True if capacity is enough to ship within D days
    def can_ship(capacity):
        days_used = 1
        current_load = 0
        for w in weights:
            if current_load + w > capacity:
                days_used += 1
                current_load = 0
            current_load += w
        return days_used <= D

    left = max(weights)          # Can't be less than largest single package
    right = sum(weights)         # Single day capacity would be sum of all

    while left < right:
        mid = (left + right) // 2
        if can_ship(mid):
            right = mid
        else:
            left = mid + 1
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log S), where n = number of packages and S = sum of package weights.  
  - Each binary search step simulates shipping in O(n), and there are log(sum(weights)) binary search steps.
- **Space Complexity:** O(1) extra space beyond the input and variables, as we do not use any additional storage proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- If the order of the packages can be changed, can the minimal capacity be reduced?
  *Hint: Try grouping lighter and heavier packages to balance daily loads.*
- How would you handle the case where each package has a deadline?
  *Hint: You might need a more sophisticated scheduling algorithm, possibly greedy or dynamic programming.*
- Can this approach be adapted for streaming input (cannot store the full weights array)?
  *Hint: Consider what information is strictly required on each iteration, and whether one pass is feasible.*

### Summary
This problem uses the **binary search on the answer** (a.k.a. parametric/binary search), which is a widely used pattern in scheduling and load-balancing questions. This technique applies when the solution space is monotonic with respect to a parameter, and checking feasibility for a candidate value can be done efficiently. This pattern appears in interval-splitting, minimax cost, and similar problems in interviews.