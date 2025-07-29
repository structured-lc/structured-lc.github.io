### Leetcode 2391 (Medium): Minimum Amount of Time to Collect Garbage [Practice](https://leetcode.com/problems/minimum-amount-of-time-to-collect-garbage)

### Description  
You are given an array `garbage` where `garbage[i]` is a string representing the types of garbage (Metal "M", Paper "P", Glass "G") present at the iᵗʰ house in a row of houses. An array `travel`, where `travel[i]` is the number of minutes it takes to move from house i to house i+1, is also given.  
There are three garbage trucks, each responsible for picking up only one type of garbage, starting at house 0. Only one truck can move or collect at a time, and each unit of garbage takes 1 minute to pick up. Each truck only needs to travel as far as the last house where its respective garbage appears. Return the minimum total time needed to collect all garbage in the city.

### Examples  

**Example 1:**  
Input: `garbage = ["G","P","GP","GG"]`, `travel = [2,4,3]`  
Output: `21`  
*Explanation:  
- "P" truck travels to house 2 (house 1 collects 1P, house 2 collects 1P), needs to move from 0→1 (2 min), 1→2 (4 min): total travel 6 min + collect 2P = 2 min.  
- "G" truck travels to house 3 (house 0, 2, 3 have G), needs 2+4+3=9 min travel + collect 4G = 4 min (house 0, 2x(G) at house 3, 1x(G) at house 2).  
- "M" truck is not needed (no M anywhere).  
Total pick-up = 2 (P) + 4 (G) = 6, total travel = 6 (P) + 9 (G, up to house 3) = 15  
Total = 6 + 15 = 21.*

**Example 2:**  
Input: `garbage = ["MMM","PGM","GP"]`, `travel = [3,10]`  
Output: `37`  
*Explanation:  
- "M" truck: visits house 0, 1; 2 has no "M". Travel: 0→1 (3 min), collect: 3(M, 0), 1(M, 1): 4  
- "P" truck: visits house 0, 1, 2. Last house for P is 2. Travel: 0→1 (3), 1→2 (10): 13, collect: 1(P, 1), 1(P, 2): 2  
- "G" truck: visits 1,2. Last G at 2. Travel: 0→1+1→2 = 13, collect: 1(G, 1), 1(G, 2): 2  
Total collect = 3+1+1+1+1+1=8  
Total travel = 3 (M to 1) + 13 (P to 2) + 13 (G to 2). Notice, only travel up to last house for each.  
Total = sum of collection times for all = 8, sum of all relevant truck routes = 3 + 13 + 13 = 29.  
Result = 8 + 29 = 37.*

**Example 3:**  
Input: `garbage = ["G"]`, `travel = []`  
Output: `1`  
*Explanation: Only one house and 1 glass. Just pick up that glass (1 min).*

### Thought Process (as if you’re the interviewee)  
Start by noting that:
- Collection takes 1 min per garbage unit.
- Each truck only travels as far as the last occurrence of its garbage type.
- When traveling, a truck follows `travel` from house 0 up to its latest point.

Naive/brute-force: Simulate each truck's journey in a separate pass, tack on the appropriate amount of travel time and picking up time by going through the entire list for each type.  
Optimized approach:
- Compute the total number of each type of garbage for collection.
- For each type, determine the last house index where that type occurs.
- Sum up the travel time for each truck by summing `travel[0:last_index]`.
- Total = sum of all pick-up times + the sum of each truck's required travel.

This is efficient: a single pass to count each type's count and last location, another for prefix sum travel if needed.

### Corner cases to consider  
- Only one garbage type exists
- Only one house (travel is empty)
- All houses empty except one
- All types present in every house
- `travel` contains large numbers
- No garbage of a certain type (don't route that truck at all)

### Solution

```python
def garbageCollection(garbage, travel):
    # To store the last house index where M, P, G appears
    last = {'M': 0, 'P': 0, 'G': 0}
    n = len(garbage)
    total_time = 0

    # Find last occurrence for each type, and total pick up time
    for i in range(n):
        for c in garbage[i]:
            last[c] = i
        total_time += len(garbage[i])

    # Prefix sum for travel for O(1) interval sum queries
    pre_travel = [0] * n
    for i in range(1, n):
        pre_travel[i] = pre_travel[i - 1] + travel[i - 1]

    # For each truck, add the travel up to its last stop
    for t in "MPG":
        total_time += pre_travel[last[t]]
    return total_time
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of houses. The algorithm makes a constant number of passes through the `garbage` and `travel` arrays.
- **Space Complexity:** O(n), primarily for the prefix sum array (`pre_travel`). Other variables take O(1) space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if only one truck can operate at a time and must switch types at each stop?
  *Hint: You may need to simulate processes serially or track type switch costs.*

- How do you optimize if houses are on a circular route?
  *Hint: Consider wrapping travel sums and the impact of truck routing.*

- If some houses can have zero garbage, can you further optimize the travel path?
  *Hint: Is it beneficial to skip certain empty houses in travel calculations?*

### Summary
This follows the prefix-sum, last occurrence, and simulation coding patterns. The idea of "prefix sum for interval queries" is common in path, travel, or cumulative cost problems. The technique also applies to single-pass optimizations for "last index" and efficient multi-agent routing as seen in logistics, mail/bus routing, or pipeline scheduling tasks.