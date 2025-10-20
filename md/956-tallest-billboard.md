### Leetcode 956 (Hard): Tallest Billboard [Practice](https://leetcode.com/problems/tallest-billboard)

### Description  
You are tasked with building a billboard supported by two steel supports of *equal height.* You’re given an array of rod lengths, and you can weld rods together (without cutting) to create each support. The goal is to pick two disjoint subsets of rods (can use any rod only once) so that each support has the same height, and that height is as large as possible. If it’s impossible (no nonzero equal supports), return 0.

### Examples  

**Example 1:**  
Input: `rods = [1,2,3,6]`  
Output: `6`  
*Explanation: One support uses {1,2,3} (1+2+3=6), the other uses {6}. Both are 6 high.*

**Example 2:**  
Input: `rods = [1,2,3,4,5,6]`  
Output: `10`  
*Explanation: Two subsets {2,3,5} and {4,6} can each make 10 (2+3+5=10, 4+6=10).*

**Example 3:**  
Input: `rods = [1,2]`  
Output: `0`  
*Explanation: No way to split rods into two equal-height supports. Return 0.*

### Thought Process (as if you’re the interviewee)  

Brute-force is to try every possible split of rods into two groups, calculate their sums, and track the maximum sum where both groups are equal height. But with up to 20 rods, the number of subset combinations (2^20) is astronomical.

A better approach is **Dynamic Programming**.  

- The state can be defined by the current difference between the two supports after placing some rods.
- Let’s use a map (or dict) where the key is the possible “difference” of heights (left - right), and the value is the **maximum possible height of the “smaller” side** for that difference.
- For each rod, explore adding it:
  - To the left side (increase diff by rod value)
  - To the right side (decrease diff by rod value)
  - Or skip it (no change)
- After all rods are considered, look for difference `0` in the map. The value will be the max height possible for both sides.
- At each step, keep only the **best** (i.e. max ‘smaller support’ height) value for each possible diff.

This is DP with state (rod index, height difference), but can be optimized further by using only one hashmap.

**Why hash map, not array?**  
Possible difference in heights can go up to sum(rods) both ways—it’s sparse, so hash map is space-efficient.

### Corner cases to consider  
- Empty rods array ⇒ should return 0.
- All rods of the same length.
- Impossible groups: can’t split even sum into two equal halves.
- Large rod that is larger than sum of others.
- All but one rod is zero.
- Only one rod in input.
- Multiple ways to split for maximum height.

### Solution

```python
def tallestBillboard(rods):
    # dp: {diff: max shorter support sum that can be achieved for 'diff'}
    dp = {0: 0}
    for rod in rods:
        new_dp = dp.copy()
        for diff, shorter in dp.items():
            # Option 1: add rod to left
            new_diff = diff + rod
            new_dp[new_diff] = max(new_dp.get(new_diff, 0), shorter)
            # Option 2: add rod to right
            new_diff = abs(diff - rod)
            longer = shorter + min(rod, diff)
            new_dp[new_diff] = max(new_dp.get(new_diff, 0), longer)
            # Option 3: skip (do nothing, already covered)
        dp = new_dp
    return dp.get(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × S), where `n = len(rods)`, `S = sum(rods)`.  
  Each rod is processed for all possible diffs, which can be up to about 5000 (for sum up to 5000 rods).
- **Space Complexity:** O(S), as the DP map can store a value for each difference, up to total sum of rods.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if you could split rods into pieces (not just weld)?
  *Hint: The state space and problem would be much simpler—greedy or different DP.*

- Can you reconstruct the subsets used in the optimal solution?
  *Hint: Backtrack using parent pointers or store path info at each DP state.*

- What if you want exactly three equal supports, not two?
  *Hint: State needs to track two differences, growing the DP space.*

### Summary
This problem uses a **Dynamic Programming with hashmap state**—a common “DP on difference” trick, useful when partitioning into equal sums/subsets. This approach also appears in subset sum variants, multi-way partitioning, and load balancing. The solution is a nice demonstration of efficient DP state compression and exploiting the problem’s symmetry.


### Flashcard
Use DP mapping difference→max sum; for each rod, update possible differences by adding to either side or skipping.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Partition Array Into Two Arrays to Minimize Sum Difference(partition-array-into-two-arrays-to-minimize-sum-difference) (Hard)