### Leetcode 1212 (Medium): Team Scores in Football Tournament [Practice](https://leetcode.com/problems/team-scores-in-football-tournament)

### Description  
Given two tables: `Teams` (with `team_id`, `team_name`) and `Matches` (with `host_team`, `guest_team`, `host_goals`, `guest_goals`), calculate the total points for each team after all matches.  
- A win earns **3 points**.
- A draw earns **1 point**.
- A loss earns **0 points**.
Each team may appear as host or guest in matches. Return each team's **id**, **name**, and **total points**—ordered by points descending, breaking ties using team_id ascending.

### Examples  

**Example 1:**  
Input:  
`Teams` =  
| team_id | team_name    |
|---------|-------------|
| 10      | LeetCode FC |
| 20      | New York FC |
| 30      | Atlanta     |
| 40      | Chicago     |
| 50      | Toronto     |

`Matches` =  
| host_team | guest_team | host_goals | guest_goals |
|-----------|------------|------------|-------------|
| 10        | 20         | 3          | 0           |
| 20        | 30         | 2          | 2           |
| 30        | 10         | 1          | 0           |
| 40        | 20         | 0          | 3           |
| 50        | 30         | 1          | 1           |

Output:  
| team_id | team_name    | num_points |
|---------|-------------|------------|
| 30      | Atlanta     | 5          |
| 10      | LeetCode FC | 4          |
| 20      | New York FC | 4          |
| 50      | Toronto     | 1          |
| 40      | Chicago     | 0          |

*Explanation:  
- Atlanta (30): win as guest (+3), draw as guest (+1), draw as guest (+1) = 5  
- LeetCode FC (10): win as host (+3), loss as guest (0), draw as guest (+1) = 4  
- New York FC (20): loss as guest (0), draw as host (+1), win as guest (+3) = 4  
- Toronto (50): draw as host (+1) = 1  
- Chicago (40): loss as host (0) = 0

**Example 2:**  
Input:  
`Teams` has teams [1,2,3], `Matches` is empty.  
Output:  
| team_id | team_name | num_points |
|---------|-----------|------------|
| 1       | ...       | 0          |
| 2       | ...       | 0          |
| 3       | ...       | 0          |

*Explanation:  
All teams have 0 points since no matches were played.

**Example 3:**  
Input:  
`Teams` includes a team never referenced in `Matches` (i.e., did not play any match).
Output:  
That team is included with `num_points = 0`.

*Explanation:  
Teams with no matches are shown, with 0 points.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each team, scan all matches and calculate their points as host and as guest. O(T × M) with T=number of teams, M=matches.  
- **Optimized approach:**  
  - **Step 1:** For each row in `Matches`, compute points for both host and guest.  
  - **Step 2:** "Flatten" the matches so each team’s match result (win/draw/loss) appears on one logical row.  
  - **Step 3:** Group by team and sum up points.  
  - **Step 4:** Join with the `Teams` table—they want to see all teams, including those with zero points.
  - For SQL, this is done by a **UNION ALL**: each match produces two rows (one per team), then aggregate.  
  - Order by `num_points` descending, then by team_id ascending.

- **Trade-off:** This approach allows linear scan over the `Matches` table, handling any team—whether they played as host, guest, or not at all.

### Corner cases to consider  
- Team never played a match (should get 0 points but still appear in output).
- Team played only as host or only as guest.
- Teams with the same number of points (order by team_id).
- Empty `Teams` or `Matches` tables.
- All matches ended in draws.

### Solution

```python
# We'll simulate the query logic in Python using lists/dicts

def team_scores_in_tournament(teams, matches):
    # teams: List of [team_id, team_name]
    # matches: List of [host_team, guest_team, host_goals, guest_goals]

    # Build initial results dict: team_id -> [team_name, points]
    results = {tid: [tname, 0] for tid, tname in teams}

    for host, guest, h_goals, g_goals in matches:
        # Host outcome
        if h_goals > g_goals:
            results[host][1] += 3
        elif h_goals == g_goals:
            results[host][1] += 1
        # Guest outcome
        if g_goals > h_goals:
            results[guest][1] += 3
        elif g_goals == h_goals:
            results[guest][1] += 1

    # Prepare result as list of [team_id, team_name, num_points]
    answer = [[tid, results[tid][0], results[tid][1]] for tid in results]
    
    # Sort: first by points descending, then by team_id ascending
    answer.sort(key=lambda x: (-x[2], x[0]))
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(M + T + T log T):  
    - O(M) to process all matches.
    - O(T) to build empty results table.
    - O(T log T) for sorting result by points/team_id (T = number of teams).
- **Space Complexity:**  
  - O(T):  
    - Store each team’s current point tally and name.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you aggregate additional stats, like wins, losses, and draws per team?  
  *Hint: Track multiple counters in the dict.*

- What if you had millions of matches and teams—how would you scale this?  
  *Hint: Process in batches in DB or stream processing.*

- How would you handle tournaments with two legs (home and away aggregate scoring)?  
  *Hint: Additional columns/logic to calculate aggregate results.*

### Summary
This problem uses the **group by + aggregation** pattern—very common in leaderboard queries. Constructing a “two-way” participation table with UNION ALL (or equivalent row expansion logic) is vital whenever an entity can appear as multiple columns in a dataset. This technique is widely applicable in rankings, sports, and competition problems.

### Tags
Database(#database)

### Similar Problems
