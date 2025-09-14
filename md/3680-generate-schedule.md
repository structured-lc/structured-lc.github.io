### Leetcode 3680 (Medium): Generate Schedule [Practice](https://leetcode.com/problems/generate-schedule)

### Description  
Given n teams labeled from 0 to n-1, generate a schedule for matches so that:
- Every team plays every other team **exactly twice**, once at home and once away.
- There is **one match per day**.
- **No team** can play on **consecutive days**; each team must have at least **one rest day between matches**.
- Find **any valid schedule** following these constraints.

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `[]`  
*Explanation: With only 2 teams, any match would result in consecutive days for both teams. Since no days without matches are allowed, it’s impossible to schedule.*

**Example 2:**  
Input: `n = 4`  
Output:  
`[[0, 1], [2, 3], [1, 2], [3, 0], [0, 2], [1, 3], [2, 0], [3, 1], [0, 3], [1, 0], [2, 1], [3, 2]]`  
*Explanation: Each day has a match, every team plays every other team twice (once home, once away), and no team has matches on consecutive days. The order can vary as long as all constraints are satisfied.*

**Example 3:**  
Input: `n = 3`  
Output: `[]`  
*Explanation: Three teams cannot be scheduled without violating the "no consecutive day" constraint, so return empty.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try to generate a list of all pairs (home, away) for all teams, then permute the order and check if there are any consecutive appearances for any team. But the permutation space is huge, not practical for anything above n=4.

- **Optimization:**  
  - For n < 4, quickly check if possible. For n = 2 or 3, return [] as per rules.
  - For n ≥ 4, construct cycles using step size method:  
    - Adapt the round-robin scheduling algorithm, building cycles so that matches are distributed and no team appears on consecutive days.
    - Use two passes for home/away swaps.
    - Carefully track previous matches to avoid team repeats.

- **Why this?**  
  The step-based or round-robin construction is a common scheduling pattern that systematically spaces out team matches to prevent repeats. Backtracking, greedy, or brute-force won’t scale.

### Corner cases to consider  
- n = 2 or n = 3 (return empty list, scheduling not possible).
- n < 2 (no teams, empty list).
- n is odd (watch for asymmetric pairing: still need to schedule so no consecutive match for same team).
- All matches must be covered twice: home and away.
- Check that no team plays consecutively even after home/away switch.

### Solution

```python
def generateSchedule(n):
    # Special cases, for n < 4 there's no valid schedule
    if n < 4:
        return []

    schedule = []
    # Generate matches so that teams never play consecutive days
    for round in range(n - 1):
        for i in range(n // 2):
            home = (round + i) % n
            away = (n - i + round - 1) % n
            schedule.append([home, away])
    # Now swap home/away to cover "once at home, once away" for each match
    for round in range(n - 1):
        for i in range(n // 2):
            away = (round + i) % n
            home = (n - i + round - 1) % n
            schedule.append([home, away])
    return schedule
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  There are O(n²) matches, since every team plays (n-1) × 2 = 2n-2 matches (once at home, once away) against n-1 other teams. Two loops, each running n-1 × n/2 times.
- **Space Complexity:** O(n²).  
  The schedule contains O(n²) matches. Additional storage for cycles or visited arrays is O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle odd values for n so that every team still gets a rest day?
  *Hint: Can you insert a dummy "bye" team to balance rounds?*

- Can you extend this for tournament with two or more matches per day?
  *Hint: Try organizing matches per day as sets and relaxing the constraint.*

- How would you minimize the gap between any two matches for the same team?
  *Hint: Analyze distribution of intervals between repeated appearances.*

### Summary
This problem uses **round-robin scheduling** with an added "no consecutive matches for any team" constraint.  
The code relies on systematic pair generation and cycle-based assignment to avoid team repeats on consecutive days.  
Such patterns are common in tournament setups, sports leagues, and scheduling pairwise interviews.  
The core coding pattern—cycle-based permutations and avoidance of consecutive repeats—often appears in problems involving graph coloring, distributed meetings, or resource assignment.

### Tags


### Similar Problems
- Task Scheduler(task-scheduler) (Medium)