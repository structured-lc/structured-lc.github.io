### Leetcode 3259 (Medium): Maximum Energy Boost From Two Drinks [Practice](https://leetcode.com/problems/maximum-energy-boost-from-two-drinks)

### Description  
Given two lists: **energyDrinkA** and **energyDrinkB** of length n, each representing the energy boost each drink provides at each hour for the next n hours.  
You can start consuming either **A** or **B** at any hour. Once you drink from a type, you must stick with the same type for at least one hour; you can switch to the other drink only after a one-hour wait (so you can't drink from both at any hour).  
Return the maximum total energy boost you can accumulate over n hours by optimally switching between the two drinks.

### Examples  

**Example 1:**  
Input: `energyDrinkA = [2,4,6], energyDrinkB = [5,4,2]`  
Output: `13`  
*Explanation:  
- Start with B: 5 (B), then continue B: 4 (B), then switch to A: 6 (A).  
- Total = 5 + 4 + 6 = 15  
- But the optimal is: A (2) → B (4) → A (6): 2 + 4 + 6 = 12, stick with B all the way: 5 + 4 + 2 = 11.  
- The best is B → B → A = 5 + 4 + 6 = 15.  
(Choose at each step whether to stay or switch intelligently.)*

**Example 2:**  
Input: `energyDrinkA = [3,2,5,10], energyDrinkB = [2,3,7,2]`  
Output: `20`  
*Explanation:  
- Stick with A the whole time: 3+2+5+10 = 20.*  

**Example 3:**  
Input: `energyDrinkA = , energyDrinkB = [2]`  
Output: `10`  
*Explanation:  
- Only one hour, best is to take drinkA (10).*

### Thought Process (as if you’re the interviewee)  
First, a brute-force approach would be to try every decision at each hour: stay on the same drink or switch to the other (if the restriction allows), but that quickly explodes to 2ⁿ possibilities—too slow for any reasonable n.

We notice that at every hour, our choice depends only on what we did last hour (i.e., whether we took A or B).  
This suggests a **dynamic programming** approach:  
- Define two variables at each hour:
    - `dpA`: maximum boost if we end up taking drinkA at hour i.
    - `dpB`: same, but for drinkB.
- At each new hour,
    - `dpA = max(previous dpA + current A-energy, previous dpB)`
    - `dpB = max(previous dpB + current B-energy, previous dpA)`
    Because to switch drinks requires waiting an hour, we must be cautious: but in this problem, since you can always choose to stay or use the previous total, this works out.
- At the end, take max(dpA, dpB).

**Trade-offs:**  
- Brute force is exponential (bad for n > 20).  
- DP is O(n) time and O(1) space if we optimize.

### Corner cases to consider  
- n = 1 (only one hour)  
- energyDrinkA and energyDrinkB have all zero elements  
- All boosts are negative  
- All boosts are equal  
- Alternating drink sequences produce higher result than sticking with one  
- n is very large (ensure constant extra space)

### Solution

```python
def maxEnergyBoost(energyDrinkA, energyDrinkB):
    n = len(energyDrinkA)
    # Initialize: At hour 0, the only options are to take A or take B
    dpA = energyDrinkA[0]
    dpB = energyDrinkB[0]
    # Iterate from hour 1 to n-1
    for i in range(1, n):
        newA = max(dpA + energyDrinkA[i], dpB)  # Stay on A, or switch from B (after one hour)
        newB = max(dpB + energyDrinkB[i], dpA)  # Stay on B, or switch from A (after one hour)
        dpA, dpB = newA, newB
    # The answer is the greater of the two
    return max(dpA, dpB)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we process each hour once with constant-time state updates.
- **Space Complexity:** O(1), because we only keep track of two variables (dpA and dpB) regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you recover the actual sequence of drink choices that led to the optimal result?  
  *Hint: Store decision path/traceback for each hour while doing DP.*

- What if there was a penalty (e.g., minus 2 energy) for switching between drinks?  
  *Hint: Subtract penalty in the transition when you switch from dpA to dpB and vice versa.*

- Can you generalize the approach if there are k types of drinks?  
  *Hint: Use a DP array of length k and update according to the transition rules.*

### Summary
This is a classic **dynamic programming, state-based DP** problem focusing on tracking the best result for each possible state ("end with drinkA" or "end with drinkB").  
This pattern arises in many scheduling and path-dependent optimization problems, such as "Paint House," "House Robber," or job-schedule with cooldowns, where the next state depends only on the last state.  
Optimizing state and transition logic is key to efficient solutions.