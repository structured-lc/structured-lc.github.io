### Leetcode 3322 (Medium): Premier League Table Ranking III [Practice](https://leetcode.com/problems/premier-league-table-ranking-iii)

### Description  
Given a SQL table `SeasonStats` with season-by-season team statistics for a football (soccer) league, compute each team's:
- **points** (3 per win, 1 per draw, 0 per loss)
- **goal difference** (goals_for − goals_against)
- **rank position** within each season, ranked by:
  - highest points first,
  - if tied, highest goal difference,
  - if still tied, alphabetical team name.
Output season_id, team_id, team_name, points, goal difference, and each team's position within their season ordered by season, then position, then team name.

### Examples  

**Example 1:**  
Input:  
SeasonStats table:
| season_id | team_id | team_name | matches_played | wins | draws | losses | goals_for | goals_against |
|-----------|---------|-----------|----------------|------|-------|--------|-----------|--------------|
|    101    |    1    |  "ManC"   |       38       |  32  |   2   |   4    |    104    |      32      |
|    101    |    2    |  "Liver"  |       38       |  30  |   7   |   1    |     89    |      33      |
|    101    |    3    |  "Chels"  |       38       |  26  |   8   |   4    |     85    |      39      |
Output:  
| season_id | team_id | team_name | points | goal_difference | position |
|-----------|---------|-----------|--------|-----------------|----------|
|    101    |    1    |  "ManC"   |  98    |       72        |     1    |
|    101    |    2    |  "Liver"  |  97    |       56        |     2    |
|    101    |    3    |  "Chels"  |  86    |       46        |     3    |

*Explanation:  
ManC: 32×3 + 2×1 = 98 points, 104-32=72 GD.  
Liver: 30×3 + 7×1 = 97 pts, 89-33=56 GD.  
Chels: 26×3 + 8×1 = 86 pts, 85-39=46 GD.  
Sorted by points.*

**Example 2:**  
Input:  
| season_id | team_id | team_name | ... | wins | draws | losses | goals_for | goals_against |
|-----------|---------|-----------|-----|------|-------|--------|-----------|--------------|
|   2020    |   1     | "Alpha"   | ... |  10  |   5   |   5    |    20     |     10       |
|   2020    |   2     | "Beta"    | ... |  10  |   5   |   5    |    24     |     14       |
|   2020    |   3     | "Gamma"   | ... |  10  |   5   |   5    |    24     |     14       |
|   2020    |   4     | "Delta"   | ... |   7  |   6   |   7    |    17     |     15       |
Output:  
| season_id | team_id | team_name | points | goal_difference | position |
|-----------|---------|-----------|--------|-----------------|----------|
|   2020    |   2     | "Beta"    |  35    |       10        |   1      |
|   2020    |   3     | "Gamma"   |  35    |       10        |   2      |
|   2020    |   1     | "Alpha"   |  35    |       10        |   3      |
|   2020    |   4     | "Delta"   |  27    |        2        |   4      |

*Explanation:
All of Beta, Gamma, and Alpha have 35 points, but Beta and Gamma have higher goal difference than Alpha, and between Beta and Gamma, alphabetical order applies.*

**Example 3:**  
Input:  
| season_id | team_id | team_name | ... | wins | draws | losses | goals_for | goals_against |
|-----------|---------|-----------|-----|------|-------|--------|-----------|--------------|
(no data)
Output:  
(empty)
*Explanation:  
If the table is empty, output is empty.*

### Thought Process (as if you’re the interviewee)  
- First, for each team, **calculate points:** wins × 3 + draws × 1.
- Then, **calculate goal_difference:** goals_for − goals_against.
- For ranking, sort by season_id, within each season by points desc, then goal_difference desc, then team_name asc.
- Assign rank position for each team in its season according to that sort.
- SQL window functions (`RANK()") or implementing a custom rank algorithm can be used; in Python, we simulate this by grouping by season and sorting.
- Final approach:  
  - Group all rows by season_id.
  - For each season, create a list of teams with calculated points, goal difference, and team name.
  - Sort by points desc, goal_difference desc, team_name asc.
  - Assign positions: position increases only when a tie is broken (like RANK()), or choose DENSE_RANK() as per requirements.
  - Build result rows for all seasons, sort final table as per requirements.
- Doing this without using Python's sort key or libraries is important—explicitly write the sort logic and ranking.

### Corner cases to consider  
- Empty table (should return an empty output).
- Teams with exact same points and goal difference and identical names (rare/impossible but test uniqueness).
- Ties on all criteria except team name (alphabetical tie-break).
- Single season, single team.
- Multiple seasons.
- Negative or zero values in any stat.

### Solution

```python
def premier_league_table_ranking_iii(season_stats):
    # season_stats: list of dicts, each with keys:
    # 'season_id', 'team_id', 'team_name', 'matches_played', 'wins', 'draws', 'losses', 'goals_for', 'goals_against'
    from collections import defaultdict

    # 1. Precompute points and goal_difference for each row
    stats_by_season = defaultdict(list)
    for entry in season_stats:
        points = entry['wins'] * 3 + entry['draws']
        goal_diff = entry['goals_for'] - entry['goals_against']
        stats_by_season[entry['season_id']].append({
            'season_id': entry['season_id'],
            'team_id': entry['team_id'],
            'team_name': entry['team_name'],
            'points': points,
            'goal_difference': goal_diff
        })
    
    result = []
    # 2. For each season, sort and assign position
    for season_id in sorted(stats_by_season):
        teams = stats_by_season[season_id]
        
        # Sort: points desc, goal_difference desc, team_name asc
        teams.sort(key=lambda x: (-x['points'], -x['goal_difference'], x['team_name']))

        position = 1
        last = None
        pos_count = 1  # Rank position for current team
        for idx, team in enumerate(teams):
            if last is not None:
                # Check if same as previous team by points and goal_diff and team_name
                if (team['points'], team['goal_difference'], team['team_name']) != (last['points'], last['goal_difference'], last['team_name']):
                    position = pos_count
            team['position'] = position
            result.append({
                'season_id': team['season_id'],
                'team_id': team['team_id'],
                'team_name': team['team_name'],
                'points': team['points'],
                'goal_difference': team['goal_difference'],
                'position': team['position']
            })
            last = team
            pos_count += 1
    
    # 3. Final sort: season_id asc, position asc, team_name asc
    result.sort(key=lambda x: (x['season_id'], x['position'], x['team_name']))
    return result

# Example usage:
season_stats = [
    {'season_id':101, 'team_id':1, 'team_name':'ManC', 'matches_played':38, 'wins':32, 'draws':2, 'losses':4, 'goals_for':104, 'goals_against':32},
    {'season_id':101, 'team_id':2, 'team_name':'Liver', 'matches_played':38, 'wins':30, 'draws':7, 'losses':1, 'goals_for':89, 'goals_against':33},
    {'season_id':101, 'team_id':3, 'team_name':'Chels', 'matches_played':38, 'wins':26, 'draws':8, 'losses':4, 'goals_for':85, 'goals_against':39},
]
print(premier_league_table_ranking_iii(season_stats))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(S × T log T), where S = number of seasons, T = teams per season. Sorting for each season dominates, plus one pass for building output.
- **Space Complexity:** O(N), where N = total number of rows (all teams in all seasons), for storing intermediate and result lists.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle updating points live as results stream in?  
  *Hint: Think about using a database index or real-time computation.*

- How to efficiently handle millions of teams and historical seasons?  
  *Hint: Consider partitioning, lazy evaluation, batch processing.*

- Can you return the entire league standings at any round, not just at season end?  
  *Hint: Track partial results after each match ("round") field.*

### Summary
This problem uses **sorting, grouping, and ranking patterns** commonly needed in leaderboard or ranking system designs.  
The explicit breaking of ties by secondary and tertiary fields (goal difference, alphabetical order) is a typical multi-key sort, and assigning ranks using these criteria is a classic DENSE_RANK or RANK windowing problem.  
Such an algorithm can be adapted for any leaderboard with tie-breaking.

### Tags
Database(#database)

### Similar Problems
