### Leetcode 1029 (Medium): Two City Scheduling [Practice](https://leetcode.com/problems/two-city-scheduling)

### Description  
Given a list where every person has a cost for traveling to city A and city B, you have *exactly* 2⋅n people. The task is to assign n people to city A and n people to city B, so that the **total travel cost is minimized**.  
For each person `i`, you are given two numbers: `costs[i]` is the price to send them to city A, `costs[i][1]` is the price to send them to city B.  
You need to decide who goes to which city, with the constraint that n people go to city A and n people go to city B, and you want the total cost to be as small as possible.

### Examples  

**Example 1:**  
Input: `costs = [[10,20],[30,200],[400,50],[30,20]]`  
Output: `110`  
*Explanation:  
There are 4 people (n = 2).  
Assign person 0 → A (cost 10), person 3 → A (cost 30), person 1 → B (cost 200), person 2 → B (cost 50).  
Total = 10 + 30 + 200 + 50 = 290.*

**Example 2:**  
Input: `costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]`  
Output: `1859`  
*Explanation:  
Sort people by (costA - costB). Assign smallest 3 differences to city A (persons 0, 3, 4), and the other 3 to city B.  
Sum their respective costs: 259 + 184 + 840 + 54 + 667 + 469 = 1859.*

**Example 3:**  
Input: `costs = [[100,200],[200,100]]`  
Output: `200`  
*Explanation:  
Just two people—one should go to city A and one to city B for minimum cost.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force way would try all possible ways to select n people for city A and n for city B, and calculate the cost for every combination. This is exponential time and infeasible for even small n.

We need a better approach.  
Here's an observation:  
- For every person, it might be much better to send them to one city versus another, depending on their cost difference.
- If we always send the people with the greatest savings to the cheapest city for them, we maximize savings.

So, let's compute for each person: saving = costA - costB. Sort the array by this value. The first n people (with the biggest advantage for city A) we send to city A. The other n go to city B.

This works because we are always picking the overall best "deals" for each city, and the allocation is forced to be n per city. Sorting and a greedy pick avoids the combinatorial explosion.

**Why is this valid?**  
This greedy approach works because, by forcing the biggest “gaps” in favor of city A towards city A, we minimize the sum. The rest go to city B.

### Corner cases to consider  
- All costs identical (still need to split evenly).
- All people much cheaper to one city (forces splitting so can't pick all the "best").
- Input where n = 1 (just two people).
- Costs with zeros or very large numbers.
- Empty input (shouldn't happen—guaranteed 2⋅n by problem, but worth guarding for code safety).

### Solution

```python
def twoCitySchedCost(costs):
    # Number of people per city
    n = len(costs) // 2
    
    # Sort by: lowest (costA - costB) first.
    # This means biggest savings for sending to A over B are first.
    costs.sort(key=lambda x: x[0] - x[1])
    
    total = 0
    # First n people go to city A, rest to city B.
    for i in range(n):
        total += costs[i][0]   # City A for first n
    for i in range(n, 2*n):
        total += costs[i][1]   # City B for rest
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  The sorting step dominates (sorting 2n people). Picking sums is linear O(n).

- **Space Complexity:** O(1) extra (in-place sort; just iterating and summing). No extra storage apart from counters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of people is not a multiple of 2?  
  *Hint: Can you generalize to unequal city quotas?*

- How would you solve if the quotas per city are not equal?  
  *Hint: Dynamic programming or more general assignment algorithms needed.*

- If instead of exactly n per city, you can have “at least k” in each city, how does that change things?  
  *Hint: Feasible with DP/knapsack-like strategies or min-cost flow.*

### Summary
This is a classic **greedy + sorting** pattern.  
By sorting with respect to the cost difference between city A and city B, we maximize the savings, while honoring the needed assignment split. This “sort + greedy pick” trick is common in scheduling, assignment, and minimal-cost partitioning problems, and helps avoid brute force enumeration in certain constrained allocation setups.