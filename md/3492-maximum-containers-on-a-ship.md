### Leetcode 3492 (Easy): Maximum Containers on a Ship [Practice](https://leetcode.com/problems/maximum-containers-on-a-ship)

### Description  
You are given three integers:  
- `n` – the ship's deck is an n × n grid (so there are n² spaces for containers)
- `w` – the weight of a single container
- `maxWeight` – the maximum total weight the ship can carry

You must determine the maximum number of containers that can be loaded onto the ship without exceeding the ship's weight capacity, and not exceeding the number of available cells on the deck.  
In other words, you can place at most n² containers, as long as their total weight ≤ maxWeight.

### Examples  

**Example 1:**  
Input: `n = 2, w = 3, maxWeight = 15`  
Output: `4`  
*Explanation: The deck has 2 × 2 = 4 cells. Total possible weight for 4 containers is 4 × 3 = 12 ≤ 15. All 4 containers fit. The answer is 4.*

**Example 2:**  
Input: `n = 4, w = 3, maxWeight = 12`  
Output: `4`  
*Explanation: Deck has 16 cells, but max you can fit by weight is ⌊12/3⌋ = 4 containers (since 4 × 3 = 12 = maxWeight). Weight, not space, is the limit.*

**Example 3:**  
Input: `n = 3, w = 5, maxWeight = 12`  
Output: `2`  
*Explanation: Deck has 9 cells, but ⌊12/5⌋ = 2 (since 2 × 5 = 10 ≤ 12). 3 would be 15 > 12, so answer is 2.*

### Thought Process (as if you’re the interviewee)  
First, I observe that the ship deck allows up to n² containers by space.  
The ship's weight limit allows at most ⌊maxWeight / w⌋ containers, because each container weighs w.

So, to ensure both constraints are satisfied,  
- The max you can load is the minimum of n² and ⌊maxWeight / w⌋.

**Brute-force idea:**  
Try all numbers from 1 up to n² and stop when total weight > maxWeight.  
But that's unnecessary since ⌊maxWeight / w⌋ gives the max number allowed by weight in O(1).

**Efficient approach:**  
Calculate max by space (n²), and by weight (⌊maxWeight / w⌋), and return the smaller of the two.

No sophisticated algorithms are needed; it's just math and min().

### Corner cases to consider  
- n = 1, small deck size  
- w > maxWeight: can't load any containers  
- w = 1: try with huge maxWeight  
- maxWeight exactly divisible by w  
- maxWeight < w (zero containers possible)  
- Large n with small maxWeight

### Solution

```python
def maximumContainersOnShip(n, w, maxWeight):
    # max containers by cell count
    max_by_space = n * n
    # max containers by weight limit
    max_by_weight = maxWeight // w
    # answer: can't exceed either limit
    return min(max_by_space, max_by_weight)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), since only a few arithmetic operations (multiplication, integer division, and min) are used.
- **Space Complexity:** O(1), as no additional data storage is required—the computation uses fixed space regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if each container’s weight varies?  
  *Hint: You may need to use a greedy approach; can you always fit the lightest first?*

- Suppose the deck has some blocked cells (cannot be used). How would your logic change?  
  *Hint: You'll need the count of available cells, not just n².*

- If containers have volume and weight constraints, and cells have different volume limits, what changes?  
  *Hint: Need to check both per-cell and global conditions—consider a more complex packing algorithm.*

### Summary
This problem is a classic example of *resource allocation* constrained by two independent limits, solved using the min pattern.  
The same pattern (take the minimum imposed by independent constraints) is common in capacity planning, array allocation, and resource scheduling problems.  
No loops or recursion are needed; math suffices for constant time solution.