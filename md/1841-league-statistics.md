### Leetcode 1841 (Medium): League Statistics [Practice](https://leetcode.com/problems/league-statistics)

### Description  
Given a list of teams and a list of match results (home vs. away), calculate the statistics for each team in the league:  
- **team_name**: name of the team  
- **matches_played**: total matches played (as home or away)  
- **points**: awarded as follows: 3 for a win, 1 for a draw, 0 for a loss  
- **goal_for**: total goals scored by the team in all matches  
- **goal_against**: total goals scored against the team  
- **goal_diff**: goal_for - goal_against  
Return a leaderboard sorted by points (descending), then goal_diff (descending), then team_name (lex order).  

### Examples  

**Example 1:**  
Input:  
Teams =  
| team_id | team_name |
|---------|-----------|
| 1       | Ajax      |
| 4       | Dortmund  |
| 6       | Arsenal   |  

Matches =  
| home_team_id | away_team_id | home_team_goals | away_team_goals |
|--------------|--------------|-----------------|-----------------|
|      1       |      4       |       0         |       1         |
|      1       |      6       |       3         |       3         |
|      4       |      1       |       5         |       2         |
|      6       |      1       |       0         |       0         |  

Output:  
| team_name | matches_played | points | goal_for | goal_against | goal_diff |
|-----------|----------------|--------|----------|--------------|-----------|
| Dortmund  |       2        |   6    |    6     |      2       |     4     |
| Arsenal   |       2        |   2    |    3     |      3       |     0     |
| Ajax      |       4        |   2    |    5     |      9       |    -4     |
*Explanation:*
- Ajax: played 4 matches, drew 2, lost 2 (points=2, goals for=5, against=9)
- Dortmund: played 2, won both (points=6, goals for=6, against=2)
- Arsenal: played 2, drew both (points=2, goals for=3, against=3)

**Example 2:**  
Input:  
Teams =  
| team_id | team_name |
|---------|-----------|
| 1       | Milan     |
| 2       | Roma      |  

Matches =  
| home_team_id | away_team_id | home_team_goals | away_team_goals |
|--------------|--------------|-----------------|-----------------|
|      1       |      2       |      2          |       2         |  

Output:  
| team_name | matches_played | points | goal_for | goal_against | goal_diff |
|-----------|----------------|--------|----------|--------------|-----------|
| Milan     |      1         |   1    |    2     |      2       |     0     |
| Roma      |      1         |   1    |    2     |      2       |     0     |
*Explanation:* Both teams drew, so get 1 point each, 2 goals for, 2 goals against, and goal diff 0.

**Example 3:**  
Input:  
Teams =  
| team_id | team_name |
|---------|-----------|
| 10      | Barca     |  
Matches =  
| home_team_id | away_team_id | home_team_goals | away_team_goals |
|--------------|--------------|-----------------|-----------------|
(Empty)  

Output:  
| team_name | matches_played | points | goal_for | goal_against | goal_diff |
|-----------|----------------|--------|----------|--------------|-----------|
| Barca     |      0         |   0    |    0     |      0       |     0     |
*Explanation:* Team with no matches just gets zero everywhere.

### Thought Process (as if you’re the interviewee)  
- The key is to aggregate each team's statistics, considering both their home and away games.
- For each team, calculate:
  - *matches_played*: count as both home and away team.
  - *points*: 3 for win, 1 for draw, 0 for loss (check match outcome for both home/away).
  - *goal_for*: sum their goals as both home and away.
  - *goal_against*: sum opponents’ goals.
  - *goal_diff*: goal_for - goal_against.
- Brute-force idea: Go through the Matches table twice (once for home, once for away), then combine.
- The optimized approach: process both home and away stats into a unified format ("team_id", game result, etc.), aggregate by team, then join with Teams to get the name.
- Results are sorted by points desc, goal_diff desc, and team name asc.

### Corner cases to consider  
- Team has no matches at all (should show zeroes)
- Multiple teams with same stats (ranking by name)
- All matches end in draw (points distributed correctly)
- Only one team (and no matches)
- Teams with only home or only away games

### Solution

```python
# Problem expects an SQL query, but for understanding and code structure,
# here is a step-by-step simulation in Python

def league_statistics(teams, matches):
    # teams: List of (team_id, team_name)
    # matches: List of (home_team_id, away_team_id, home_team_goals, away_team_goals)
    # Build stats map: {team_id: [matches_played, points, goal_for, goal_against]}
    stats = {tid: [0, 0, 0, 0] for tid, _ in teams}

    # Process all matches
    for home_id, away_id, home_goals, away_goals in matches:
        # Home team update
        stats[home_id][0] += 1  # matches played
        stats[home_id][2] += home_goals  # goal_for
        stats[home_id][3] += away_goals  # goal_against

        # Away team update
        stats[away_id][0] += 1
        stats[away_id][2] += away_goals
        stats[away_id][3] += home_goals

        # Points:
        if home_goals > away_goals:
            # Home win
            stats[home_id][1] += 3
        elif home_goals < away_goals:
            # Away win
            stats[away_id][1] += 3
        else:
            # Draw
            stats[home_id][1] += 1
            stats[away_id][1] += 1

    # Combine stats with team name and sort
    res = []
    for tid, name in teams:
        matches_played, points, goal_for, goal_against = stats[tid]
        goal_diff = goal_for - goal_against
        res.append([name, matches_played, points, goal_for, goal_against, goal_diff])

    # Sort: points desc, goal_diff desc, team_name asc
    res.sort(key=lambda x: (-x[2], -x[5], x[0]))
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M + N + NlogN)  
  M = number of matches, N = number of teams. Process all matches (O(M)), build stats for all teams (O(N)), final sort is O(NlogN).
- **Space Complexity:** O(N) for stats storage and output, where N is number of teams.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle leagues where a win/draw/loss has different point values?  
  *Hint: Use a config or extra column for point values per result.*

- How would you change approach if matches can be played simultaneously/coinciding IDs?  
  *Hint: Make sure match IDs are unique, and think of handling tiebreakers with more criteria.*

- How would you implement team stats update in real-time after every match?  
  *Hint: Use incremental update, avoid recomputing from scratch for every match.*

### Summary
This solution applies the “aggregate and sort by key” coding pattern that’s foundational in SQL and common in leaderboard-type problems. It’s a direct application of counting/group-by and then sorting by multiple criteria. The pattern is common in ranking problems, leaderboards, sports statistics, and can be adapted for analytics over partitioned/grouped data in many fields.

### Tags
Database(#database)

### Similar Problems
