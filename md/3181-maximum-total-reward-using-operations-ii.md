### Leetcode 3181 (Hard): Maximum Total Reward Using Operations II [Practice](https://leetcode.com/problems/maximum-total-reward-using-operations-ii)

### Description  
You are given an integer array **rewardValues** of length *n*, where each value represents the “reward” you can collect at that index.  
- You start with **x = 0** and no indices marked.
- Any number of times, you can choose an **unmarked** index *i* where **rewardValues[i] > x**, add rewardValues[i] to x, and mark *i*.
- You cannot use the same index twice.
- Return the **maximum total reward** you can get by picking indices optimally.

### Examples  

**Example 1:**  
Input: `rewardValues = [1,1,3,3]`  
Output: `4`  
*Explanation: Pick index 0 (x=0→1), then index 2 (x=1→4). No other rewards greater than 4. Maximum is 4.*

**Example 2:**  
Input: `rewardValues = [1,6,4,3,2]`  
Output: `11`  
*Explanation: Pick index 0 (x=0→1), index 2 (x=1→5), index 1 (x=5→11). No further can be picked. Maximum is 11.*

**Example 3:**  
Input: `rewardValues = [7,3,2,9,1,5]`  
Output: `16`  
*Explanation: Pick index 4 (x=0→1), index 2 (x=1→3), index 1 (x=3→6), index 5 (x=6→11), index 0 (x=11→18) not possible, index 3 (x=11→20) not possible; so best series is x=0→1→3→6→11→16. Maximum is 16.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:** Try all possible pick orders where each time you only pick a value strictly greater than your running sum (x). But with n up to 5×10⁴, trying all permutations is infeasible.
- **Sort and Greedy:**  
  Since you can only pick values greater than your current *x*, pick the smallest available value > x each time. Sorting lets you always try the next minimal possible pick.
- **Dynamic Programming:**  
  What if there are multiple subsequences that create larger totals? Use a set (or boolean array) to track all possible *x* values after picking subsets, for each possible pick.  
  For each reward, try combining it with all possible partial sums so far if `reward > sum` (since we can only add if reward > x).  
  This approach is efficient since with limited sum range and small *n*, updating a DP set is tractable.
- **Final Choice:**  
  Use a set to store all reachable reward totals. For each reward in increasing order, try to add it to each existing sum if reward > x.  
  This covers all possible picking orders and doesn't miss out-of-order gain opportunities.

### Corner cases to consider  
- Single element array.
- All values equal.
- Input in descending order.
- Some values much larger than all remaining possible sum.
- Gaps between values so that some can never be picked.
- Largest value at the start.
- Repeated values.

### Solution

```python
def maximumReward(rewardValues):
    # Sort the rewardValues so we always consider picking smaller first
    rewardValues.sort()
    
    # Use a set to keep track of all achievable reward totals
    possible = set([0])

    # For each reward value, update the set for all current totals
    for reward in rewardValues:
        # For each sum x we have so far, if reward > x, new_sum = reward + x is possible
        new_sums = set()
        for x in possible:
            if reward > x:
                new_sums.add(x + reward)
        # Combine new possible sums with the current set
        possible.update(new_sums)
    
    # The answer is the largest achievable sum
    return max(possible)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n²) in the worst case, since for each reward you can try to add it to all previous possible sums (which at most doubles at each step). But as reward values grow, the set of possible sums often increases slowly.
- **Space Complexity:**  
  O(n²) for the set of possible sums. The set grows as new totals are generated, though pruning is implicit since many proposed new sums may be duplicates or unreachable.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you further optimize space for large input values?  
  *Hint: Can you use a bitset or a more compact structure for possible sums?*

- What if the rewards could be negative?  
  *Hint: How does the picking rule change, and how can you avoid cycling endlessly with negative values?*

- Can you reconstruct the picking order, not just the total?  
  *Hint: How do you track >predecessor< sums that led to the max total?*

### Summary
This problem uses a **DP with state compression (subset sums)** idea, often seen in knapsack and subset sum variants.  
The trick is converting the hard constraint (reward > x) into an incremental reachable sums solution.  
Patterns like this extend to any “building up values under constraints” where you can only add a new item if it keeps the running total above some threshold.