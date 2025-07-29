### Leetcode 2279 (Medium): Maximum Bags With Full Capacity of Rocks [Practice](https://leetcode.com/problems/maximum-bags-with-full-capacity-of-rocks)

### Description  
You're given `n` bags, each with a specific maximum capacity and a current number of rocks inside. You're also provided with some extra rocks (`additionalRocks`), which you can freely distribute among the bags. The goal is to maximize the number of bags that reach full capacity (i.e., the rocks in that bag exactly equal its maximum capacity) by distributing the extra rocks optimally.

### Examples  

**Example 1:**  
Input: `capacity = [2,3,4,5], rocks = [1,2,4,4], additionalRocks = 2`  
Output: `3`  
*Explanation: Bags 0 needs 1 rock, bag 1 needs 1 rock, bag 2 is already full, bag 3 needs 1 rock. Put 1 rock in bag 0 (now 2 rocks), 1 in bag 1 (3 rocks). Now, bags 0,1,2 are full. 3 bags total are full.*

**Example 2:**  
Input: `capacity = [10,2,2], rocks = [2,2,0], additionalRocks = 100`  
Output: `3`  
*Explanation: Bag 0 needs 8 rocks, bag 1 is full, bag 2 needs 2 rocks. We have enough extra rocks: fill bag 0 (add 8), bag 2 (add 2). Now all bags are full. 3 bags total are full.*

**Example 3:**  
Input: `capacity = [5,5,5], rocks = [1,2,3], additionalRocks = 2`  
Output: `0`  
*Explanation: Bag 0 needs 4, bag 1 needs 3, bag 2 needs 2 more rocks. Total deficit is 9, but we only have 2 extra rocks, so no bag can be completely filled.*

### Thought Process (as if you’re the interviewee)  
The first thing I'd think about is for each bag, how many rocks are needed to fill it (`deficit = capacity[i] - rocks[i]`). Since our aim is to maximize the *number* of bags filled, we want to "fully fill" those bags that need the least extra rocks first.  
The brute-force solution would be to try all combinations of distributing rocks, but that's exponentially slow. Instead, I sort the list of deficits (excluding already full bags, which have deficit zero—these instantly count towards our answer).  
I'll iterate through the sorted deficits, and for each, if I have enough `additionalRocks`, fill the bag, decrement `additionalRocks`, and increment my answer. If I don't have enough left, I stop.  
This greedy approach is both optimal and efficient: always fill the bag that needs the fewest rocks next, maximizing the number of bags filled.

### Corner cases to consider  
- Some bags may already be full at the beginning (deficit = 0).
- `additionalRocks` = 0 (no distribution possible).
- All or none of the bags can possibly be filled.
- Bags with 0 needed rocks mixed with large deficits.
- Input arrays are empty or of length 1.
- All capacities and rocks are equal.

### Solution

```python
def maximumBags(capacity, rocks, additionalRocks):
    # Compute how many rocks are needed for each bag
    deficits = [c - r for c, r in zip(capacity, rocks)]
    # Sort by least needed to most needed
    deficits.sort()
    
    full_bags = 0
    
    # Try to fill bags in order of least extra rocks needed
    for deficit in deficits:
        if deficit == 0:
            # Already full
            full_bags += 1
            continue
        if additionalRocks >= deficit:
            additionalRocks -= deficit
            full_bags += 1
        else:
            break
    return full_bags
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Sorting the deficits array takes O(n log n), and the rest (looping through n bags) is O(n).

- **Space Complexity:** O(n)  
  One extra array (`deficits`) of size n is used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to not just count, but also return the indices of the bags that get filled?  
  *Hint: Keep track of the original indices alongside deficits, and sort with that.*

- What if you can fill bags partially and get partial credit (e.g., sum of percent filled)?  
  *Hint: Consider the fractional knapsack approach and compute portions.*

- What if after you distribute all rocks, you need to minimize the maximum deficit leftover in any bag?  
  *Hint: Try binary search on answer, or greedy with a max heap.*

### Summary
This is a classic greedy problem: always fully fill bags that need the least to become full first. The pattern—"sort deficits, greedy allocation"—is common in knapsack-like or resource allocation problems. This approach is optimal when maximizing count, and the greedy strategy works because the cost (rocks per bag) is independent across bags, so locally optimal choices lead to a globally optimal result.