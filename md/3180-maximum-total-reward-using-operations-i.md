### Leetcode 3180 (Medium): Maximum Total Reward Using Operations I [Practice](https://leetcode.com/problems/maximum-total-reward-using-operations-i)

### Description  
You are given an integer array **rewardValues** of length *n*, each representing a reward you can take, but you can only take an element if it is **strictly greater** than your current accumulated total reward (*start at 0*). Once you take a reward, you "mark" it and cannot pick it again.  
**Goal:** Maximize your total reward by picking rewards in an optimal order.

- At each step, pick any unmarked reward `rewardValues[i]` if `rewardValues[i] > x` (x = current total reward), add it to x, and mark it.  
- Continue this any number of times.  
- **Return:** The maximum possible final total reward.

### Examples  

**Example 1:**  
Input: `[1,1,3,3]`  
Output: `4`  
Explanation:  
Pick index 0 (reward 1), x = 1.  
Next, reward 1 is not valid (equal, not greater), pick index 2 (reward 3), x = 4.  
Other entries are ≤ current x after marking, so cannot pick more.  
Final reward: 1+3=4.

**Example 2:**  
Input: `[1,6,4,3,2]`  
Output: `11`  
Explanation:  
Pick reward 1 (x=1), then reward 2 (x=3), then reward 3 (x=6), then reward 4 (x=10) is not valid, but reward 6 is still available.  
However, optimized order:  
- Pick 1 (x=1),  
- Pick 2 (x=3),  
- Pick 4 (x=7),  
- Pick 6 (x=13) is not possible, because after picking 4 (which is 6), before addition, x=7, and only 6 is left (not >7), so in practice, actual path is:  
Pick 1 (x=1), next pick 3 (x=4), then pick 4 (x=8), can't pick 6 (already x=8).  
Maximum achievable after optimal order is 11.

**Example 3:**  
Input: `[1,2,8,4,3,9]`  
Output: `24`  
Explanation:  
Pick 1 (x=1), then 2 (x=3), then 3 (x=6), then 4 (x=10), then 8 (x=18), then 9 (x=27) not valid (no reward > 18 left).  
Maximum final reward is 24.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - Try every permutation; simulate picking numbers by the rule, only add if current > x.  
  - For n = 2000, factorial complexity is intractable.

- **Greedy?**  
  - Could picking smallest first always be best? Not necessarily. Sometimes, skipping a small value early might allow bigger jumps later.
  - But, since "can only pick values > x," picking smaller values first gives more opportunities for future picks (since it increases x slowly).
  - **Key Insight:** Always consider picking as many smaller rewards as possible first to maximize the number of pickable rewards.

- **Optimized approach:**  
  - **Sort** the array.  
  - For each value in sorted order, only pick it if it is strictly greater than current x.  
  - Repeat until we hit a value ≤ x, then continue.  
  - But, picking any value in sorted order that satisfies value > x always leaves "marked" states and larger x for the next pick.
  - Since all numbers are ≥1, we can build up as high as possible.

- **Implementation Plan:**  
  - Sort the array.  
  - Initialize x = 0.  
  - For each value: If value > x, x += value.  
  - Otherwise, skip.

### Corner cases to consider  
- All values the same  
- Only one element  
- Array with large gaps (e.g., [1, 10, 100])  
- Already sorted or reverse sorted  
- Very large n (up to 2000 elements)  
- Only one pick possible (because initial value is too small)

### Solution

```python
def maxTotalReward(rewardValues):
    # Sort the rewards to process from smallest to largest
    rewardValues.sort()
    total = 0  # initial total reward (x)
    for reward in rewardValues:
        # Only pick reward if it's strictly greater than current total
        if reward > total:
            total += reward  # add reward to total and mark it
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting: O(n log n)  
  - Single pass through array: O(n)  
  - Total: O(n log n)

- **Space Complexity:**  
  - O(1) extra space (not counting input sort, since it can be done in-place), O(n) if sort allocates.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could pick multiple rewards in a step?  
  *Hint: Consider combinations, dynamic programming extensions.*

- What if "reward > total" is replaced with "reward ≥ total"?  
  *Hint: How would this affect greedy choices? Re-evaluate the step logic.*

- How would you solve for the sequence of picked indices, not just total sum?  
  *Hint: Track which indexes you select; update a result array as you go.*

### Summary
This problem is solved via a **greedy + sorting** approach, processing rewards in increasing order and only accepting adding a reward if it increases total reward according to rules. This allows maximizing the number of pickable rewards, leading to the highest possible total. This pattern is common in greedy algorithms, especially when step eligibility depends on current state and action history (like "can only pick values strictly larger than sum-so-far"). This can be paralleled with the "scheduling without overlap" or "select as many as possible by increasing order" category in greedy problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
