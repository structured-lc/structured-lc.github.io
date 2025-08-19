### Leetcode 3384 (Hard): Team Dominance by Pass Success [Practice](https://leetcode.com/problems/team-dominance-by-pass-success)

### Description  
Given two SQL tables — Teams and Passes — you must compute **team dominance** for each team and each half (first and second) of a soccer match.  
- The **Teams** table maps player\_id to team\_name.
- The **Passes** table records passes from one player to another, with a time\_stamp.
- A pass is **successful** when the pass\_to player is from the same team: counts as +1 point.
- A pass is **intercepted** if pass\_to is from a different team: counts as -1 point.
- The **first half** is from '00:00' to '45:00', the **second half** from '45:01' to '90:00'.
- For every team and half, sum the dominance score (as above) for passes made by the team, and return a row with (team\_name, half\_number, dominance).
- Output must be sorted by team\_name, then by half\_number.

### Examples  

**Example 1:**  
Input:  
Teams =  
| player_id | team_name |
|-----------|-----------|
| 1         | Arsenal   |
| 2         | Arsenal   |
| 3         | Arsenal   |
| 4         | Chelsea   |
| 5         | Chelsea   |
| 6         | Chelsea   |

Passes =  
| pass_from | time_stamp | pass_to |
|-----------|------------|---------|
| 1         | 00:15      | 2       |
| 2         | 00:45      | 3       |
| 3         | 01:15      | 1       |
| 4         | 00:30      | 1       |
| 2         | 46:00      | 3       |
| 3         | 46:15      | 4       |
| 1         | 46:45      | 2       |
| 5         | 46:30      | 6       |

Output:  
| team_name | half_number | dominance |
|-----------|-------------|-----------|
| Arsenal   | 1           | 2         |
| Arsenal   | 2           | 1         |
| Chelsea   | 1           | -1        |
| Chelsea   | 2           | 1         |

*Explanation:  
- First half:  
  - Arsenal passes (by 1,2,3): three passes among themselves (+1+1+1), one pass intercepted by Chelsea (-1, from 4→1).  
  - Chelsea's only pass: 4→1, but since the Chelsea player's pass_to is Arsenal, it's -1.
  - Second half:  
    - Arsenal: 2→3 and 1→2 (+1+1), 3→4 is intercepted (-1).  
    - Chelsea: 5→6 (+1).*  

**Example 2:**  
Input:  
Teams =  
| player_id | team_name |
|-----------|-----------|
| 10        | Red       |
| 20        | Blue      |

Passes =  
| pass_from | time_stamp | pass_to |
|-----------|------------|---------|
| 10        | 00:01      | 20      |
| 20        | 46:02      | 10      |

Output:  
| team_name | half_number | dominance |
|-----------|-------------|-----------|
| Blue      | 1           | 0         |
| Blue      | 2           | -1        |
| Red       | 1           | -1        |
| Red       | 2           | 0         |

*Explanation:  
- Red passes to Blue in first half: -1 for Red, 0 for Blue (no passes).
- Blue passes to Red in second half: -1 for Blue, 0 for Red.*

**Example 3:**  
Input:  
Teams =  
| player_id | team_name |
|-----------|-----------|
| 99        | Green     |

Passes =  
| pass_from | time_stamp | pass_to |
|-----------|------------|---------|

Output:  
| team_name | half_number | dominance |
|-----------|-------------|-----------|
| Green     | 1           | 0         |
| Green     | 2           | 0         |

*Explanation:  
- No passes at all. Both halves have score 0.*

### Thought Process (as if you’re the interviewee)  

- **Understand the requirements**:  
  For each team and each half (1, 2), sum up a dominance score: For every pass from a team in that half, +1 if to a teammate, -1 if to a different team. Need to report every team for both halves (even if no passes: result=0).
- **Brute-force**:  
  For each team and each half, filter all passes by that team's players as pass\_from and by half. For each such pass, compare pass\_to's team. Aggregate points. This is O(N) per team/half, costly if lots of data.
- **Optimization**:  
  - Build quick lookup: player\_id → team\_name.
  - For each pass, determine half by time\_stamp (if ≤'45:00': 1; else: 2).
  - For each pass, increment score for from\_team/half by +1 if to-team is same as from-team, else -1.
  - At the end, for every team and each half (1, 2), output the score (default 0 if missing).
- **Trade-offs**:  
  - O(P+T) time, where P=number of passes and T=number of teams.
  - Very efficient: O(P) to process passes, O(T) to glue up result.
  - Handles empty and non-present teams/halves by filling 0s.

### Corner cases to consider  
- No passes at all (each team must show 0 for both halves).
- All passes intercepted.
- All passes successful.
- Only one team present.
- No players at all.
- Very large number of teams/players.
- Timestamps on the edge ('45:00' in half 1; '45:01' in half 2).

### Solution

```python
# Data input: Teams = list of dicts: [{player_id:..., team_name:...}, ...]
#             Passes = [{pass_from:..., time_stamp:..., pass_to:...},...]
# Output: list of dicts: [{team_name:..., half_number:..., dominance:...},...]

def team_dominance_by_pass_success(Teams, Passes):
    # Map player_id to team_name
    player_team = {}
    for row in Teams:
        player_team[row['player_id']] = row['team_name']

    # Find all team_names
    team_names = set(player_team.values())
    
    # Prepare result dict: result[(team_name, half_number)] = dominance
    result = {(team, half): 0 for team in team_names for half in [1, 2]}
    
    # Helper to compute half from time_stamp
    def get_half(ts):
        mm, ss = map(int, ts.split(':'))
        total_sec = mm * 60 + ss
        # '45:00' is still half 1, '45:01' and up is half 2
        if (mm < 45) or (mm == 45 and ss == 0):
            return 1
        else:
            return 2
    
    # Go through all passes
    for p in Passes:
        from_id, to_id, ts = p['pass_from'], p['pass_to'], p['time_stamp']
        if from_id not in player_team or to_id not in player_team:
            continue  # skip if unknown players
        from_team = player_team[from_id]
        to_team = player_team[to_id]
        half = get_half(ts)
        if from_team == to_team:
            result[(from_team, half)] += 1
        else:
            result[(from_team, half)] -= 1

    # Prepare sorted output
    output = []
    for team in sorted(team_names):
        for half in [1, 2]:
            output.append({
                'team_name': team,
                'half_number': half,
                'dominance': result[(team, half)]
            })
    return output
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(P + N), where P = number of passes, N = number of players.  
  Justification: Mapping player\_id → team (O(N)), iterating passes (O(P)), result table O(T) where T=number of teams is small.
- **Space Complexity:**  
  O(N + T), for the player to team map (O(N)), and per team/half dominance tracking (O(T)), T = number of teams.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if there could be extra time/third halves?  
  *Hint: Make half\_number a function of time\_stamp, maybe parameterized.*

- Can you process millions of passes efficiently if input is streamed?  
  *Hint: Use dictionaries, process each in O(1), keep minimal memory for stats, maybe write to disk if needed.*

- How would you extend the logic if passes also had a success flag, not just team matching?  
  *Hint: Use the flag for dominance, not team comparison.*

### Summary
This problem is a **group-by and aggregate** pattern, combining basic dictionary mapping with timestamp binning. The method generalizes to any scenario where you accumulate per-group/per-interval counts or scores, such as in sports stats or event logs. It practices mapping, counting, and careful logic for grouping and edge cases—a classic pattern in real-world data analytics and coding interviews.

### Tags
Database(#database)

### Similar Problems
