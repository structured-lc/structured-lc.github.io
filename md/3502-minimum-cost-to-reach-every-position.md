### Leetcode 3502 (Easy): Minimum Cost to Reach Every Position [Practice](https://leetcode.com/problems/minimum-cost-to-reach-every-position)

### Description  
Given an array `cost` of size `n`, there are `n+1` people in a queue (positions `0` to `n`). You start at the very end: position `n`.  
To reach any position `i` (0 ≤ i < n), you must swap positions with people ahead of you. Swapping with person at position `i` costs `cost[i]`. Swapping with someone behind you is free.  
For each position `i`, return the minimum total cost to reach that position from the end, given these swap rules.

### Examples  

**Example 1:**  
Input: `cost = [5,2,4,1]`  
Output: `[5,2,2,1]`  
*Explanation: To reach position 0, you must pay 5. To reach position 1, you can swap for 2. For position 2, the minimum among [5,2,4] is 2, and for position 3, the minimum among [5,2,4,1] is 1.*

**Example 2:**  
Input: `cost = [7,3,6,2,5]`  
Output: `[7,3,3,2,2]`  
*Explanation: For position 0 it costs 7, for position 1 it costs 3. For position 2, the min among [7,3,6] is 3; for position 3, min([7,3,6,2]) is 2; for 4, min([7,3,6,2,5]) is 2.*

**Example 3:**  
Input: `cost = [1,1,1,1]`  
Output: `[1,1,1,1]`  
*Explanation: Every swap to a position costs 1, so the min at every index is 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For every position i (0…n-1), simulate moving from the end, calculate the minimum total cost to reach i by examining the costs of all valid swaps for previous indices. For every i, search over 0…i, to get the minimum cost. This is O(n²).
- **Optimized:** Notice that for position i, you can always get there for at least cost[i]. But you can reach i via any path that involves someone behind you swapping for free. Thus, the *minimum* cost to reach any position i is just the minimum of cost[0…i]. Build up this min as you scan cost from left to right, so it’s a running minimum.
- **Justification:** Whenever you want to reach position i, after possibly reaching any j<i (as many swaps as needed for free), the only thing that matters is what’s the cheapest person among [0…i] to swap with.  
- **Trade-offs:** O(n) time, O(1) extra space for running min, or O(n) for output.

### Corner cases to consider  
- Only one element in cost.
- All costs the same.
- Cost contains very large or very small (1) values at various locations.
- Cost array is empty (not possible by problem constraints, but always check).
- Extremely large arrays for performance.

### Solution

```python
def minCosts(cost):
    # Initialize output list and running minimum
    ans = []
    min_cost = float('inf')
    # Iterate over each cost; build the running minimum
    for c in cost:
        min_cost = min(min_cost, c)
        ans.append(min_cost)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the size of the `cost` array. Only one pass is needed to compute the running minimum for each position.
- **Space Complexity:** O(n) for the answer array. The running minimum uses O(1) space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you could swap with multiple people simultaneously, or the cost of swaps depended on the distance?
  *Hint: Think about Dijkstra or BFS if costs or swap patterns get more complex.*

- Suppose swap costs are dynamic or can decrease over time—can you process updates efficiently?
  *Hint: Consider segment trees or data structures for dynamic range min queries.*

- What if the queue is circular?
  *Hint: How would the definition of 'in front' and 'behind' change?*


### Summary
This is a classic **prefix minimum** pattern—maintain a running minimum as you process an array left to right.  
It’s common in problems where, for each position, you want the minimum/maximum up to that point. The technique is widely used in range queries, monotonic stack/queue optimizations, and dynamic programming, whenever a cumulative monotonic property is leveraged for efficiency.


### Flashcard
For each position i, the minimum cost is the minimum of cost[i] and the minimum cost to reach any j < i (since you can swap j and i for free).

### Tags
Array(#array)

### Similar Problems
