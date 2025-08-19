### Leetcode 1103 (Easy): Distribute Candies to People [Practice](https://leetcode.com/problems/distribute-candies-to-people)

### Description  
Given a total number of candies and a number of people standing in a row, distribute the candies in rounds: in each round, give the 1ˢᵗ person 1, the 2ⁿᵈ person 2, … up to the nᵗʰ person who gets n. In the next round, start again from the first person, but this time continue the count, giving the next incremental number. If you run out of candies before a person's turn, give them as many as remain. Return the final distribution of candies to each person as a list.

### Examples  

**Example 1:**  
Input: `candies = 7, num_people = 4`  
Output: `[1,2,3,1]`  
*Explanation: Distribute in order — person1 gets 1, person2 gets 2, person3 gets 3, now 1 candy remains so person4 gets 1. Final: [1,2,3,1].*

**Example 2:**  
Input: `candies = 10, num_people = 3`  
Output: `[5,2,3]`  
*Explanation: First round: person1 gets 1, person2 gets 2, person3 gets 3 (remaining = 4). Second round: person1 gets 4 (now 0 left), so [5,2,3].*

**Example 3:**  
Input: `candies = 15, num_people = 4`  
Output: `[6,2,3,4]`  
*Explanation: 1st round: [1,2,3,4] (left 5). 2nd round: person1 gets 5 (left 0). Final: [6,2,3,4].*

### Thought Process (as if you’re the interviewee)  
First, simulate the process as described:

- Initialize a list for `num_people` with zeroes.
- Keep a counter for both the next person and the number of candies to hand out (which increases by 1 each turn).
- On each iteration, hand out min(remaining_candies, candies_to_give) to the appropriate person.
- Continue until candies run out.
- This brute-force simulation is efficient enough (since the people count is modest and steps are bounded by sqrt(2×candies)), and avoids off-by-one or arithmetic mistakes.

There are advanced mathematical optimizations, but for clarity and reliability, an iterative approach is straightforward and fast for problem constraints.

### Corner cases to consider  
- If `candies` < `num_people`, not everyone gets a candy (some will get zero).
- If `candies` == 0, all get zero.
- Only 1 person (`num_people = 1`).
- Only 1 candy (`candies = 1`).
- Large number of candies (e.g., `candies = 10⁹`, check performance).
- Distribute exactly an even amount, e.g., `candies = num_people \* k`.

### Solution

```python
def distributeCandies(candies, num_people):
    # Create result list initialized to zeros
    result = [0] * num_people
    i = 0    # Iteration count: the number of candies to give is i+1

    while candies > 0:
        # Find the person index
        person = i % num_people
        # Number of candies to give this turn
        give = min(candies, i + 1)
        result[person] += give
        candies -= give
        i += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(√candies) — Each step hands out one more candy, so total gives is about the integer k where cumulative sum (1+2+3+...+k) ≈ candies. So, at most O(√candies) steps.
- **Space Complexity:** O(num_people) — Only need a list with one entry per person.

### Potential follow-up questions (as if you’re the interviewer)  

- If there were millions of people but only a few candies, can you optimize memory?  
  *Hint: Short-circuit if candies < num_people.*

- If instead of sequentially increasing distribution, the gifting pattern was random or based on another rule, how would your approach change?  
  *Hint: Consider abstracting the giving logic for flexibility.*

- How would you efficiently handle very large values of candies (up to 10¹⁸) without iteration?  
  *Hint: Calculate the maximum full rounds mathematically and distribute in blocks where possible.*

### Summary
This problem uses the simulation/greedy pattern, where you directly follow the specified steps. The technique—walking through a repeated sequence and distributing resources with a constraint—is a common pattern in resource allocation, round-robin distribution, and many simulation-based interview questions. The approach is simple, effective, and can be extended to similar distribution challenges.

### Tags
Math(#math), Simulation(#simulation)

### Similar Problems
- Distribute Money to Maximum Children(distribute-money-to-maximum-children) (Easy)