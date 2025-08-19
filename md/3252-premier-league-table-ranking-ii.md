### Leetcode 3252 (Medium): Premier League Table Ranking II [Practice](https://leetcode.com/problems/premier-league-table-ranking-ii)

### Description  
Given a table of Premier League stats for several teams (with columns: `team_id`, `team_name`, `wins`, `draws`, `losses`), calculate for each team:
- **Points:** 3 per win, 1 per draw, 0 per loss.
- **Position (Rank):** Ordered by points descending. Tied teams share the same rank, and the next rank skips accordingly (as in SQL `RANK()`).
- **Tier:** Teams are classified into 3 tiers:
  - **Tier 1:** Top 33% of teams (rounded up).
  - **Tier 2:** Next 33% (rounded up).
  - **Tier 3:** The rest.

Return each team's `team_name`, `points`, `position`, and `tier`, ordered by points descending and then by team_name ascending.

### Examples  

**Example 1:**  
Input:  
| team_id | team_name     | wins | draws | losses |
|---------|--------------|------|-------|--------|
| 1       | Arsenal      | 10   | 5     | 3      |
| 2       | Chelsea      | 10   | 5     | 3      |
| 3       | Liverpool    | 8    | 7     | 3      |
| 4       | Man City     | 8    | 7     | 3      |
| 5       | Tottenham    | 5    | 7     | 6      |

Output:  
| team_name  | points | position | tier   |
|------------|--------|----------|--------|
| Arsenal    | 35     | 1        | Tier 1 |
| Chelsea    | 35     | 1        | Tier 1 |
| Liverpool  | 31     | 3        | Tier 1 |
| Man City   | 31     | 3        | Tier 1 |
| Tottenham  | 22     | 5        | Tier 2 |

*Explanation:*
- Points = (Wins × 3) + (Draws × 1)
- Rank: Arsenal and Chelsea tie for first place (position = 1). Liverpool and Man City take next available rank (position = 3).
- n = 5, Top 33% = ⌈5×0.33⌉ = 2 teams (positions 1,1); Next 33% = ⌈5×0.67⌉ = 4 → up to position 4; Rest = Tier 3, but only 1 left gets Tier 2.
- The split is Tier 1: ranks 1-2, Tier 2: ranks 3-4, Tier 3: 5 and onward.

**Example 2:**  
Input:  
| team_id | team_name | wins | draws | losses |
|---------|-----------|------|-------|--------|
| 1       | A         | 11   | 4     | 3      |
| 2       | B         | 9    | 7     | 2      |
| 3       | C         | 7    | 8     | 4      |
| 4       | D         | 7    | 8     | 4      |
| 5       | E         | 1    | 9     | 9      |
| 6       | F         | 1    | 9     | 9      |

Output:  
| team_name | points | position | tier   |
|-----------|--------|----------|--------|
| A         | 37     | 1        | Tier 1 |
| B         | 34     | 2        | Tier 1 |
| C         | 29     | 3        | Tier 1 |
| D         | 29     | 3        | Tier 1 |
| E         | 12     | 5        | Tier 2 |
| F         | 12     | 5        | Tier 2 |

*Explanation:*  
6 teams: Top 33% = ⌈6×0.33⌉ = 2; Next 33% = ⌈6×0.67⌉ = 4.  
Positions 1-2: Tier 1, 3-4: Tier 2, 5-6: Tier 3.  
But since positions (ranks) 3 is shared, both C and D are Tier 1. E and F share 5, both are Tier 2.

**Example 3:**  
Input:  
| team_id | team_name | wins | draws | losses |
|---------|-----------|------|-------|--------|
| 1       | X         | 12   | 2     | 2      |

Output:  
| team_name | points | position | tier   |
|-----------|--------|----------|--------|
| X         | 38     | 1        | Tier 1 |

*Explanation:*  
Only 1 team, so it's Tier 1.

### Thought Process (as if you’re the interviewee)  
- **Step 1: Compute points** for each team using Points = wins × 3 + draws × 1.
- **Step 2: Rank** teams based on points (descending). If points tie, assign the same "rank" as in SQL's RANK() (so if 2 tie for first, both get 1, and next is 3).
- **Step 3: Tier assignment.**
  - Get the number of teams, n.
  - Find cutoffs: Tier 1 = positions ≤ ⌈n×0.33⌉, Tier 2 = positions ≤ ⌈n×0.67⌉, else Tier 3.
- **Implementation options:**  
  - **Brute force:** Sort, calculate points, and ranks naively.
  - **Optimized:** Use sort plus iteration for RANK() and compute tiers directly after.

*Trade-off*: No heavy optimization needed for reasonable n; sort + scan is acceptable.

### Corner cases to consider  
- All teams have the same points (all in Tier 1).
- Number of teams not divisible by 3 (check rounding: use ceiling).
- Only one team.
- Ties on points (verify correct RANK logic).
- No teams (empty list).
- Minimum values (0 wins, 0 draws, 0 losses).

### Solution

```python
def premier_league_table_ranking_ii(team_stats):
    # Calculate points for each team
    for team in team_stats:
        team['points'] = team['wins']*3 + team['draws']
    
    # Sort: points descending, then team_name ascending
    team_stats.sort(key=lambda x: (-x['points'], x['team_name']))
    
    n = len(team_stats)
    if n == 0:
        return []
    
    # Assign ranks (SQL RANK: equal points share same rank, next rank skips)
    prev_points = None
    rank = 0
    num_at_rank = 0
    for idx, team in enumerate(team_stats):
        if team['points'] != prev_points:
            rank = idx + 1
            num_at_rank = 1
        else:
            num_at_rank += 1
        team['position'] = rank
        prev_points = team['points']
        
    # Pre-compute cutoff positions for tiers
    tier1_bound = (n * 33 + 99) // 100  # ceiling of n*0.33
    tier2_bound = (n * 67 + 99) // 100  # ceiling of n*0.67

    # Assign tiers according to position
    for team in team_stats:
        pos = team['position']
        if pos <= tier1_bound:
            team['tier'] = 'Tier 1'
        elif pos <= tier2_bound:
            team['tier'] = 'Tier 2'
        else:
            team['tier'] = 'Tier 3'
    
    # Prepare the final output
    result = []
    for team in team_stats:
        result.append({
            'team_name': team['team_name'],
            'points': team['points'],
            'position': team['position'],
            'tier': team['tier']
        })
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), due to sorting the list of n teams.
- **Space Complexity:** O(1) extra (modifies input in-place), or O(n) if returning a copy for the result.

### Potential follow-up questions (as if you’re the interviewer)  

- How do you handle additional tie-breakers (e.g., goal difference) between teams?
  *Hint: Add a goal_difference field and sort by it as a secondary criterion.*

- How would you display multiple tiers, e.g., Tier 4 or Tier 5, for a larger or custom league?
  *Hint: Generalize tiers using intervals: total_teams//k, where k = number of tiers.*

- Can you implement this efficiently for a database (SQL) table?
  *Hint: Use window functions: RANK(), and CROSS JOIN for tier cutoffs.*

### Summary
This problem is a classic example of grouping and ranking, akin to "ranking with ties" as in SQL's RANK(). The tiering uses percentage-based cutoffs—common in leaderboard scenarios. The coding pattern used here is: **custom sort - rank assignment - group boundary calculation** (math ceiling), and is useful for leaderboard, grading, or percentile grouping system designs.

### Tags
Database(#database)

### Similar Problems
