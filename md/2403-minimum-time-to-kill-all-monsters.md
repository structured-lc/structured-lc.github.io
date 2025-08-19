### Leetcode 2403 (Hard): Minimum Time to Kill All Monsters [Practice](https://leetcode.com/problems/minimum-time-to-kill-all-monsters)

### Description  
Given a list of monsters, each with a certain power, you must kill all of them. You start with 0 mana. Each day, you gain mana *gain*, which increases by 1 every time you defeat a monster (starts at 1). You can only defeat a monster if your current mana is at least as large as its power, at which point your mana resets to 0, and your daily mana gain increases by 1. The objective is to determine the *minimum* number of days needed to kill all the monsters by choosing the optimal order.

### Examples  

**Example 1:**  
Input: `power = [3,1,4]`  
Output: `4`  
Explanation:  
- Day 1: Gain 1 mana (mana=1). Kill monster 2 (power=1), reset, gain increases to 2.
- Day 2: Gain 2 mana (mana=2).
- Day 3: Gain 2 mana again (mana=4). Kill monster 3 (power=4), reset, gain increases to 3.
- Day 4: Gain 3 mana (mana=3). Kill monster 1 (power=3), all monsters defeated.

**Example 2:**  
Input: `power = [1,1,4]`  
Output: `4`  
Explanation:  
- Day 1: Gain 1 mana. Kill monster 1 (power=1). Gain → 2.
- Day 2: Gain 2 mana. Kill monster 2 (power=1). Gain → 3.
- Day 3: Gain 3 mana (mana=3).
- Day 4: Gain 3 mana again (mana=6). Kill monster 3 (power=4), all monsters defeated.

**Example 3:**  
Input: `power = [2,2,2]`  
Output: `3`  
Explanation:  
- Day 1: Gain 1 mana (mana=1).
- Day 2: Gain 1 mana (mana=2). Kill monster 1 (power=2), gain → 2.
- Day 3: Gain 2 mana (mana=2). Kill monster 2 (power=2) or monster 3, gain → 3.
- Remaining: Kill last monster next day.

### Thought Process (as if you’re the interviewee)  
First, brute-force: try all permutations of the kill order, simulate each, and calculate the days needed. Since mana gain increases *after* each kill, the order matters.

This brute-force is feasible for very small n (≤ 8), using permutations. For larger n, we need a DP/state compression:

- Represent the list of killed monsters as a bitmask (1 bit per monster).
- State includes: which monsters are killed, days passed, current mana, and *current* gain.
- Use memoization to avoid recalculating states.
- For each state, for every monster not yet killed, simulate waiting until mana ≥ its power, then kill, reset mana, increase gain, and recurse.
- The answer is the minimum days across all possible elimination orders.

DP formulas:
- Let mask be a bitmask of killed monsters, gain be current daily mana gain.
- For each monster not yet killed, compute days needed to get enough mana, then transition to new mask, days, and next gain.

Why choose this approach:
- All combinations are possible; greedily killing weakest or strongest first is not optimal in general.
- The problem size is capped (n ≤ 16), so bitmask DP is tractable.

### Corner cases to consider  
- All monsters have the same power.
- Monsters with power 0.
- Monsters with power far larger than daily gain.
- Single monster (n = 1).
- Empty array (n = 0, should return 0).
- All monsters with increasing powers.

### Solution

```python
def minimumTimeToKillAllMonsters(power):
    from functools import lru_cache

    n = len(power)
    
    @lru_cache(None)
    def dp(mask, gain):  # mask: bits for monsters killed; gain: mana gain per day (starts at 1)
        if mask == (1 << n) - 1:  # all killed
            return 0
        
        min_days = float('inf')
        for i in range(n):
            if not (mask & (1 << i)):
                # Simulate waiting to kill the iᵗʰ monster
                # start with 0 mana, accumulate until ≥ power[i]
                need = power[i]
                # minimum days needed with current gain
                days = (need + gain - 1) // gain  # ceil(need/gain)
                # Next: kill i, reset mana, gain increases by 1
                next_mask = mask | (1 << i)
                next_gain = gain + 1
                total_days = days + dp(next_mask, next_gain)
                min_days = min(min_days, total_days)
        return min_days

    return dp(0, 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × n).  
  - There are 2ⁿ possible masks (killed/not for each monster).
  - For each mask, we try up to n possible choices.
- **Space Complexity:** O(2ⁿ).  
  - Due to memoization (`@lru_cache`) on mask and gain. Gain is at most n+1, but mask dominates.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the monsters respawn after some days?
  *Hint: Track extra states like respawn timers in DP.*

- What if the mana does not reset after each kill?
  *Hint: The state transition needs to maintain leftover mana after each kill.*

- How would you handle optimal order when there’s additional constraints (e.g. you can kill two per day)?
  *Hint: Extend states or simulate combinations for double kills per day.*

### Summary
This problem uses **bitmask DP/state compression**—a key technique for combinatorial optimization over subsets (when n ≤ 20). This is similar to TSP DP (“held-karp” algorithm). It is widely applicable for subset selection with order-dependent costs, such as scheduling, traveling salesman, and similar sequencing problems that have exponential states but compact transitions.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
- Closest Room(closest-room) (Hard)
- Eliminate Maximum Number of Monsters(eliminate-maximum-number-of-monsters) (Medium)
- Number of Ways to Build Sturdy Brick Wall(number-of-ways-to-build-sturdy-brick-wall) (Medium)