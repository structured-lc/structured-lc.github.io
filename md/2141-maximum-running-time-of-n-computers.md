### Leetcode 2141 (Hard): Maximum Running Time of N Computers [Practice](https://leetcode.com/problems/maximum-running-time-of-n-computers)

### Description  
Given **n computers** and a list of battery capacities (in minutes), determine the **maximum number of minutes all n computers can run simultaneously**. You can swap batteries freely at any integer minute without penalty, but you cannot recharge batteries—they can only be used for their available charge. Each battery can only power one computer at a time. Find the upper bound for simultaneous run time before any computer would shut down.

### Examples  

**Example 1:**  
Input: `n = 2, batteries = [3,3,3]`  
Output: `4`  
*Explanation: There are 2 computers and 3 batteries with 3 minutes each. Both computers can run for 4 minutes:  
- Give the first two computers one battery each, run for 3 minutes.  
- Take the third battery and swap it into any computer for the final minute. Total: 3 + 1 = 4 minutes.*

**Example 2:**  
Input: `n = 2, batteries = [1,1,1,1]`  
Output: `2`  
*Explanation: There are 2 computers, and 4 batteries with 1 minute each. You can power both computers for 2 minutes by switching batteries after the first minute.*

**Example 3:**  
Input: `n = 3, batteries = [10,10,3,5]`  
Output: `8`  
*Explanation:  
- Total battery life = 28.  
- Maximum simultaneous runtime ≤ ⌊28 / 3⌋ = 9. But trying 9, you can only supply 3 + 5 + 10 + 10 = 28 total, but 9 × 3 = 27 needed.  
- By simulation, 8 minutes is possible, but not 9 (try assigning the two largest batteries to two computers and sharing the remaining between the third). Thus, maximum = 8 minutes.*

### Thought Process (as if you’re the interviewee)  
To maximize the running time, distribute all available battery life optimally.  
- **Brute-force approach:**  
  Try all possible runtimes from 1 upwards; for each, simulate the allocation (inefficient for large n or battery numbers).
- **Optimize:**  
  Notice that for a given runtime 't', a possible allocation must let *all* computers get at least 't' minutes total battery. Since batteries can swap, we only care about the *total battery supplied to all computers*.
  - We want the largest 't' such that `total battery supply ≥ n × t`.
  - The optimal value is up to total battery // n, but large batteries can't give more than t to a single computer in a t-minute run.
  - **Binary search**: Search for the largest t such that sum(min(battery, t) for all batteries) ≥ n × t.
- **Why binary search works:**  
  Because for any given t, we can check in O(m) if all n computers can run for t minutes; as t increases, this condition flips from possible to impossible exactly once.

### Corner cases to consider  
- n = 1. (Single computer: answer is sum(batteries).)
- Number of batteries < n (not enough to run all computers even once).
- Some batteries with 0 charge.
- Large batteries vs. many small batteries (e.g., [1000,1,1,1]).
- All batteries of equal size.
- Empty batteries list.
- Total battery smaller than n (can't run all even for a minute).

### Solution

```python
def max_run_time(n, batteries):
    # Sort to manage battery splitting and easy handling of surplus
    batteries.sort()
    total = sum(batteries)
    left, right = 1, total // n
    
    def can_run(t):
        # For a given t, can we dedicate t minutes to each computer?
        # Each battery can contribute at most t
        return sum(min(b, t) for b in batteries) >= n * t

    answer = 0
    while left <= right:
        mid = (left + right) // 2
        if can_run(mid):
            answer = mid  # Try for a larger t
            left = mid + 1
        else:
            right = mid - 1
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m log T), where m = number of batteries, and T = total battery life // n (the search range). For each of O(log T) binary search steps, sum over m batteries.
- **Space Complexity:** O(1) extra space (besides input), as only constant extra space is used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this if batteries could recharge during use?  
  *Hint: Consider periodic recharge events or using an infinite supply model.*

- What if some computers have higher power consumption than others?  
  *Hint: Each computer would need its own minimum threshold, changing allocation math.*

- Can you solve this without sorting or modifying the input array?  
  *Hint: Only total sum and counting batteries above some threshold may be needed.*

### Summary
This problem leverages the **binary search** on the answer technique—a key skill for interviewer and contestant alike. By testing if a global constraint can be met for a guessed value, we efficiently home in on the maximum feasible solution. This "binary search over answer space" applies widely, like in scheduling, resource allocation, and optimizing parallel task execution.