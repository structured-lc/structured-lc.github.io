### Leetcode 3494 (Medium): Find the Minimum Amount of Time to Brew Potions [Practice](https://leetcode.com/problems/find-the-minimum-amount-of-time-to-brew-potions)

### Description  
You are given two arrays: **skill** (of length n, each element represents how long a wizard needs per unit mana to brew a potion) and **mana** (of length m, each element represents the required mana to brew each potion).  
You must brew the potions one by one, in *order*, and for each potion, it must go through all the wizards sequentially.  
- For the jᵗʰ potion, wizard i takes `skill[i] × mana[j]` time, but *each wizard can only start the next potion after they finish the current one*.  
- The process is *pipelined*: wizard 0 starts brewing potion j as soon as they’ve finished potion j-1, wizard 1 must wait until wizard 0 finishes, etc.

Return the minimum time needed after starting at time 0 to finish all the potions.

### Examples  

**Example 1:**  
Input: `skill = [1, 5, 2, 4]`, `mana = [5, 5, 1, 4 ,2]`  
Output: `87`  
*Explanation:  
- The brewing proceeds in 4 stages per potion.  
- For each potion, wizard i waits for their turn.  
- After pipelining through all stages, total time to finish brewing all potions (when last potion leaves last wizard) is 87.*

**Example 2:**  
Input: `skill = [2, 3]`, `mana = [4, 2]`  
Output: `18`  
*Explanation:  
- For potion 0:  
  - wizard 0: starts at 0, ends at 2×4=8  
  - wizard 1: waits until wizard 0 done, starts at 8, ends at 8+3×4=20  
- For potion 1:  
  - wizard 0: starts at 8, ends at 8+2×2=12  
  - wizard 1: waits until both: wizard 1 finishes previous (20) and wizard 0 finishes current (12), so starts at max(20,12)=20, ends at 20+3×2=26  
- Total time to finish all is when last potion leaves wizard 1: 26.*

**Example 3:**  
Input: `skill = [1]`, `mana = [10, 4, 5]`  
Output: `19`  
*Explanation:  
- Single wizard: process is linear.  
- Times: 1×10=10, 1×4=4, 1×5=5; sum = 10+4+5=19.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Simulate for each potion and each wizard, keeping track of when each wizard is available.  
  - For potion j, for wizard i: start time is the max of:
    - when this wizard finished previous potion,
    - when previous wizard finished this potion.
  - Compute finish time for each (i, j).
- **Why this is right:**  
  - This models the typical "pipeline" or "Gantt chart" scheduling process.
  - Simple nested loops, because each step only needs the time above and left in the 2D grid.
- **Optimization:**  
  - Since n, m (skill and mana sizes) are not large, O(n×m) simulation is acceptable.
  - No need for DP – forward simulation is enough.
- **Tradeoff:**  
  - Simple simulation keeps code clear and easy to reason about.  
  - No space needed except a single current row (times).

### Corner cases to consider  
- Empty skill or mana arrays (problem likely constraints: ≥1 length).
- Single wizard (length 1 skill): acts as a serial process (sum of all skill*mana[*]).
- Single potion (length 1 mana): each wizard waits for previous.
- Skill or mana values are zero.
- All wizards, or all potions, have same skill or mana.

### Solution

```python
def findMinimumTime(skill, mana):
    n = len(skill)
    m = len(mana)
    # time[i]: the time when wizard i is available for the current potion
    time = [0] * n
    for j in range(m):  # for each potion
        prev = 0  # time when previous wizard finished this potion
        for i in range(n):
            # wizard i starts potion j when both:
            # - they're done with previous potion (time[i])
            # - previous wizard is done with this potion (prev)
            start = max(time[i], prev)
            finish = start + skill[i] * mana[j]
            time[i] = finish  # update when this wizard free next
            prev = finish     # pass finish time to next wizard
    # after all potions brewed, the last wizard's free time is answer
    return time[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n × m), where n = len(skill), m = len(mana). Each potion-wizard cell processed once.
- **Space Complexity:**  
  - O(n) for time array tracking each wizard's available time.  
  - No extra storage proportional to number of potions.

### Potential follow-up questions (as if you’re the interviewer)  

- If each wizard could process multiple potions in parallel, how would your answer change?  
  *Hint: Think about resource-pooling, and task graph scheduling.*

- Can you process the potions in any order to minimize total time?  
  *Hint: Try arranging mana so bigger batches go earlier, like in multi-stage job optimization.*

- How would this change if each wizard could skip potions, or only some wizards are used for some potions?  
  *Hint: Think dynamic allocation, maybe DP over subsets.*

### Summary
This problem is a classic **pipeline simulation** (or “job-shop scheduling” for a single pipeline). The code models a Gantt chart for tasks in a stage-by-stage process, updating when each wizard is available. The pattern and logic is reusable for multi-stage manufacturing, CPU pipeline modeling, and “time to complete last job in sequence” setups.


### Flashcard
Simulate the pipeline: for each (wizard, potion) pair, compute finish time as max(wizard's previous finish, potion's previous finish) + brew_time.

### Tags
Array(#array), Simulation(#simulation), Prefix Sum(#prefix-sum)

### Similar Problems
