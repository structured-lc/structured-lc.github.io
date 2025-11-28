### Leetcode 3390 (Hard): Longest Team Pass Streak [Practice](https://leetcode.com/problems/longest-team-pass-streak)

### Description  
Given a **Teams** table mapping each player to a team, and a **Passes** table representing sequential passes in a football match (with pass_from, pass_to, time_stamp), find, for each team, the **longest consecutive streak of passes between players of the same team**—a streak is broken if the ball is passed to an opposing team. For each team, return the team name and their longest same-team pass streak, ordered by team name.

### Examples  

**Example 1:**  
Teams:  
| player_id | team_name |
|-----------|-----------|
| 1         | Arsenal   |
| 2         | Arsenal   |
| 3         | Arsenal   |
| 4         | Arsenal   |
| 5         | Chelsea   |
| 6         | Chelsea   |
| 7         | Chelsea   |
| 8         | Chelsea   |

Passes:  
| pass_from | pass_to | time_stamp |
|-----------|---------|------------|
| 1         | 2       | 1          |
| 2         | 3       | 2          |
| 3         | 4       | 3          |
| 4         | 5       | 4          |
| 6         | 7       | 5          |
| 7         | 8       | 6          |
| 8         | 6       | 7          |
| 6         | 5       | 8          |

Output:  
| team_name | longest_streak |
|-----------|----------------|
| Arsenal   | 3              |
| Chelsea   | 4              |

*Explanation*:  
Arsenal: The streak 1→2→3→4 (player IDs) is 3 consecutive passes before the ball is passed to Chelsea’s player 5, which breaks the streak. Chelsea: The passes 6→7→8→6→5 count as a streak of 4 same-team passes before being broken.

**Example 2:**  
Teams:  
| player_id | team_name |
|-----------|-----------|
| 1         | A         |
| 2         | A         |
| 3         | B         |

Passes:  
| pass_from | pass_to | time_stamp |
|-----------|---------|------------|
| 1         | 2       | 1          |
| 2         | 3       | 2          |
| 3         | 1       | 3          |
| 1         | 2       | 4          |

Output:  
| team_name | longest_streak |
|-----------|----------------|
| A         | 2              |
| B         | 1              |

*Explanation*:  
A: streak of 1→2 is 1, broken when 2 passes to 3 (opponent), and later 1→2 is another streak of 1. Max streak for team A is 2 (1→2, then 2→3 breaks it).  
B: Only gets the ball once (3→1 is not a same-team pass), so their max streak is 1.

**Example 3:**  
Teams:  
| player_id | team_name |
|-----------|-----------|
| 10        | Red       |
| 20        | Blue      |

Passes:  
| pass_from | pass_to | time_stamp |
|-----------|---------|------------|
| 10        | 20      | 1          |
| 20        | 10      | 2          |
| 10        | 20      | 3          |

Output:  
| team_name | longest_streak |
|-----------|----------------|
| Blue      | 1              |
| Red       | 1              |

*Explanation*:  
All passes are to the other team, so each team has no consecutive same-team pass, so their maximum streak is 1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each team, scan the pass sequence, tracking consecutive passes where both the sender and receiver are from the same team. Reset the streak counter when a pass is made to another team. For every streak, update the max until all passes are processed.
- **Optimized approach:**  
  Preprocess player-to-team mapping for fast lookup. As passes are ordered by time_stamp, iterate through all passes, and use a per-team streak variable:  
  - On each pass, check if both pass_from and pass_to belong to the same team.  
    - If yes, increment current streak for that team, else reset the streak counter.  
  - After every streak-break, update the team's max streak.
- **Trade-offs:**  
  All approaches are essentially O(p), where p is the number of passes—processing per team is required only to output the final result. Memory needed boils down to storing the current and max streak per team.  
  No need for complex data structures or recursion since the streak-breaking condition is straightforward.

### Corner cases to consider  
- No passes (`Passes` table empty): Each team's streak is 0.
- Only one player in a team: Passes within team are impossible.
- Consecutive passes go to opposite teams (no team has a streak longer than 1).
- Streak resets when pass changes to a different team.
- Multiple teams with the same streak.

### Solution

```python
def longest_team_pass_streak(teams, passes):
    # teams: list of dicts, each {'player_id': int, 'team_name': str}
    # passes: list of dicts, each {'pass_from': int, 'pass_to': int, 'time_stamp': int}

    # Step 1: Build player_id -> team_name mapping
    player_to_team = {}
    for t in teams:
        player_to_team[t['player_id']] = t['team_name']

    # Step 2: Group passes by time_stamp so they're processed in order
    passes_sorted = sorted(passes, key=lambda x: x['time_stamp'])
    
    # Step 3: Initialize per-team tracking of current and max streak
    team_streak = {}         # team_name: current streak counter
    team_max_streak = {}     # team_name: max streak found

    # Pre-initialize for all teams (covers cases even with no passes)
    for teamname in set(t['team_name'] for t in teams):
        team_streak[teamname] = 0
        team_max_streak[teamname] = 0

    # Step 4: Process each pass
    for p in passes_sorted:
        from_team = player_to_team.get(p['pass_from'])
        to_team = player_to_team.get(p['pass_to'])

        # If same team pass, increment streak and update max
        if from_team == to_team:
            team_streak[from_team] += 1
            team_max_streak[from_team] = max(team_max_streak[from_team], team_streak[from_team])
            # All other teams streaks should reset if interrupted? Only this team can continue streak
            for tn in team_streak:
                if tn != from_team:
                    team_streak[tn] = 0
        else:
            # Streak for the pass_from's team breaks
            if from_team in team_streak:
                team_streak[from_team] = 0
            # Streak for the pass_to's team doesn't change until their own same-team pass resumes

    # Step 5: Prepare output sorted by team_name
    result = []
    for team in sorted(team_max_streak.keys()):
        result.append({'team_name': team, 'longest_streak': team_max_streak[team]})

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(p + t), where p is the number of passes and t is the number of teams.  
  Sorting passes by time_stamp is O(p log p) but if input is already sorted, it's O(p).  
  Each pass is processed in O(1), and all teams are initialized and output in O(t).
- **Space Complexity:** O(n + t), where n is the number of players (for mapping), and t is for per-team streak counters.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle real-time streams of passes (instead of a static table)?
  *Hint: Focus on updating streaks incrementally and state storage.*

- What if passes have additional meta-data (e.g., subteams, pass quality)?  
  *Hint: Think about grouping logic by new attributes or filtering.*

- If a team never completes a same-team pass, what should the streak value be?  
  *Hint: Should it be 0, or do you treat a single isolated pass as a streak of 1?*

### Summary
This problem is a variant of a **sliding window / group-streak tracking** pattern, commonly seen when handling sequences with reset/break conditions. The main insight is to maintain a per-team streak counter, increment/reset based on the current pass, and always record the maximum. Patterns like this appear in logs analysis (session streaks), LeetCode's "longest continuous segment", or sequence tracking in time-series data.


### Flashcard
For each team, track consecutive passes where sender and receiver are both from that team; reset streak on cross-team pass, maintain maximum.

### Tags
Database(#database)

### Similar Problems
