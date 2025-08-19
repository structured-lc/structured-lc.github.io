### Leetcode 1194 (Hard): Tournament Winners [Practice](https://leetcode.com/problems/tournament-winners)

### Description  
Given two database tables:  
- **Players:** Each row has a player_id and a group_id.
- **Matches:** Each row has a match_id, first_player, second_player, first_score, and second_score.

Each player appears in exactly one group. Matches table lists the results of games between two players, giving each player’s score in the match.  

**Task:**  
For every group, return the player_id(s) who scored the highest *total* number of points across all his or her matches (regardless of whether the points were earned as first_player or second_player). If tie, return the player with the lower player_id.

### Examples  

**Example 1:**  
Players =  
| player_id | group_id |
|-----------|----------|
| 15        | 1        |
| 25        | 1        |
| 30        | 1        |
| 45        | 1        |
| 10        | 2        |
| 35        | 2        |
| 50        | 2        |
| 20        | 3        |
| 40        | 3        |

Matches =  
| match_id | first_player | second_player | first_score | second_score |
|----------|-------------|--------------|-------------|--------------|
| 1        | 15          | 45           | 3           | 0            |
| 2        | 30          | 25           | 1           | 2            |
| 3        | 30          | 15           | 2           | 0            |
| 4        | 40          | 20           | 5           | 2            |
| 5        | 35          | 50           | 1           | 1            |

Output:  
| group_id | player_id |
|----------|-----------|
| 1        | 15        |
| 2        | 35        |
| 3        | 40        |

*Explanation:*
- **Group 1:**  
  Player 15: 3 (vs 45) + 0 (vs 30) = 3  
  Player 25: 2 (vs 30) = 2  
  Player 30: 1 (vs 25) + 2 (vs 15) = 3  
  Player 45: 0 (vs 15) = 0  
  Highest: 15 and 30 tie at 3, pick lower id = 15

- **Group 2:**  
  Player 35: 1 (vs 50) = 1  
  Player 50: 1 (vs 35) = 1  
  Player 10: 0  
  Highest: 35 and 50 tie, pick lower id = 35

- **Group 3:**  
  Player 40: 5 (vs 20) = 5  
  Player 20: 2 (vs 40) = 2  
  Highest: 40

**Example 2:**  
Players =  
| player_id | group_id |
|-----------|----------|
| 1         | 1        |
| 2         | 1        |

Matches =  
| match_id | first_player | second_player | first_score | second_score |
|----------|-------------|--------------|-------------|--------------|
| 1        | 1           | 2            | 0           | 0            |

Output:  
| group_id | player_id |
|----------|-----------|
| 1        | 1         |

*Explanation:* Both players have 0 points; tie broken by smallest player_id → 1.

**Example 3:**  
Players =  
| player_id | group_id |
|-----------|----------|
| 99        | 5        |

Matches =  
(empty)

Output:  
| group_id | player_id |
|----------|-----------|
| 5        | 99        |

*Explanation:* Only one player in the group; that player wins by default.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - For each player, sum all points earned as first_player (from first_score) and second_player (from second_score).
  - For each group, find the player(s) with the maximum total points.  
  - If tie, select the player with lower player_id.
- **How to implement:**  
  - Join Players and Matches on both first_player and second_player, summing all scores by player_id.
  - Group the result by group_id and pick player_id with the highest total.  
  - In case of empty matches, ensure players are included with a total score of 0.
  - Use SQL window functions or corresponding logic to rank within each group.
- **Why this approach:**  
  - It directly reflects the problem statement and is efficient by leveraging proper grouping and aggregation.
  - Handles edge cases (e.g., players with no matches) cleanly.

### Corner cases to consider  
- Players who haven’t played any match (total points = 0).
- Multiple players with same max total; select the lowest player_id.
- Groups with only 1 player.
- Players whose scores only appear as one of first_player or second_player.
- No matches at all (everyone's score is 0).

### Solution

```python
def tournament_winners(players, matches):
    # players: List of dicts with 'player_id' and 'group_id'
    # matches: List of dicts with 'match_id', 'first_player', 'second_player', 'first_score', 'second_score'

    # Map player_id to group_id
    player_to_group = {p['player_id']: p['group_id'] for p in players}
    # Initialize total score dict
    player_scores = {p['player_id']: 0 for p in players}

    # Go through each match, add scores to correct players
    for match in matches:
        fp, sp = match['first_player'], match['second_player']
        fs, ss = match['first_score'], match['second_score']
        if fp in player_scores:
            player_scores[fp] += fs
        if sp in player_scores:
            player_scores[sp] += ss

    # Group players by group_id
    group_players = {}
    for pid, gid in player_to_group.items():
        group_players.setdefault(gid, []).append(pid)

    # Find winner for each group
    res = []
    for gid, pids in group_players.items():
        # Create list of (player_id, score)
        scores = [(pid, player_scores[pid]) for pid in pids]
        # Find the max score in group
        max_score = max(s for _, s in scores)
        # Get all players with max score; break tie by min player_id
        winner = min(pid for pid, s in scores if s == max_score)
        res.append({'group_id': gid, 'player_id': winner})

    # Optional: sort results by group_id for output consistency
    res.sort(key=lambda x: x['group_id'])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N = number of players and M = number of matches. Mapping, aggregation, and per-group max/min scans are all linear.
- **Space Complexity:** O(N + G), where N = number of players (player_scores dict), G = number of groups (group_players dict).

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if there could be multiple winners per group (no tie-break on player_id)?
  *Hint: Instead of min(), keep all player_ids with max total.*

- If matches may occur between players of different groups, how would you change your approach?
  *Hint: Validate or filter only intra-group matches before summing scores.*

- How would you handle a much larger dataset (e.g., millions of rows) efficiently?
  *Hint: Consider using a streaming/aggregation pattern—you may need database-level or distributed solutions to avoid holding everything in memory.*

### Summary
This solution is a classic *aggregation and group-by* pattern (grouping, computing per-key aggregates, picking maximums, tie-breaking deterministically). It applies cleanly to leaderboard problems, score summaries, or winner-selection for partitioned/grouped data. The pattern appears often in analytics, competitive platforms, and basic SQL reporting.

### Tags
Database(#database)

### Similar Problems
