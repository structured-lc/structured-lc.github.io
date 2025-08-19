### Leetcode 1783 (Medium): Grand Slam Titles [Practice](https://leetcode.com/problems/grand-slam-titles)

### Description  
Given two tables:  
- **Players**: Contains player_id and player_name.
- **Championships**: For each year, contains the player_id who won Wimbledon, French Open (Fr_open), US Open, and Australian Open (Au_open).

Write a query to return, for each player who has won at least one Grand Slam (any of those 4 tournaments, any year), their player_id, player_name, and how many Grand Slams they have won in total.  
Do not include players who have not won any Grand Slam tournament.

### Examples  

**Example 1:**  
Input:  
Players  
```
player_id | player_name
   1      | Federer
   2      | Nadal
   3      | Djokovic
   4      | Sampras
```
Championships  
```
year | Wimbledon | Fr_open | US_open | Au_open
2018 |     2     |    2    |    3    |    3
2019 |     3     |    2    |    2    |    1
```
Output:  
```
player_id | player_name | grand_slams_count
   1      | Federer     |      1
   2      | Nadal       |      4
   3      | Djokovic    |      3
```
*Explanation: Nadal won 2018 Wimbledon, 2018 Fr_open, 2019 Fr_open, 2019 US_open; Federer won 2019 Au_open; Djokovic won 2018 US_open, 2018 Au_open, 2019 Wimbledon.*

**Example 2:**  
Input:  
Players  
```
player_id | player_name
   1      | Serena
   2      | Venus
```
Championships  
```
year | Wimbledon | Fr_open | US_open | Au_open
2020 |     1     |    2    |    1    |    1
```
Output:  
```
player_id | player_name | grand_slams_count
   1      | Serena      |      3
   2      | Venus       |      1
```
*Explanation: Serena won 2020 Wimbledon, US Open, and Au_open; Venus won 2020 Fr_open.*

**Example 3:**  
Input:  
Players  
```
player_id | player_name
   1      | Andy
   2      | Nadal
```
Championships  
```
year | Wimbledon | Fr_open | US_open | Au_open
2020 |     2     |    2    |    2    |    2
```
Output:  
```
player_id | player_name | grand_slams_count
   2      | Nadal       |      4
```
*Explanation: Nadal won all four tournaments in 2020. Andy did not win any Grand Slam.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force Approach:**  
  For each player, count how many times their player_id appears in each of the four tournaments’ columns, across all years.  
  We could write a query that sums up matches against their id in all columns.

- **Better Approach – “Unpivot” Table:**  
  Since the tournaments are in columns, it’s easier to “unpivot” the Championships table, making one row per (year, tournament, player_id).  
  Then, just GROUP BY player_id and COUNT.  
  Join the result with Players table for names.

- **Trade-offs:**  
  - The UNPIVOT (using UNION ALL) is cleaner, more readable, and more generalizable than manually summing each column.
  - Both approaches can be written using SQL.
  - The manual sum approach can be less maintainable if new tournaments are added.

### Corner cases to consider  
- A player has not won any Grand Slam (shouldn’t be listed).
- A player has won multiple times in the same year and/or across different years.
- There are years where some or all tournament fields are null.
- Players appear in Players table but have no championship wins.
- Duplicate winners unlikely (since each tournament has one winner per year), but check for any unlikely data errors.
- All tournaments won by the same player in a year (“calendar Grand Slam”).

### Solution

```python
# This is equivalent to how you would write the SQL for this problem.
# We'll demonstrate the unpivot (long table) approach.

# Sample input as Python lists for demonstration:
players = [
    {'player_id': 1, 'player_name': 'Federer'},
    {'player_id': 2, 'player_name': 'Nadal'},
    {'player_id': 3, 'player_name': 'Djokovic'},
    {'player_id': 4, 'player_name': 'Sampras'}
]

championships = [
    {'year': 2018, 'Wimbledon': 2, 'Fr_open': 2, 'US_open': 3, 'Au_open': 3},
    {'year': 2019, 'Wimbledon': 3, 'Fr_open': 2, 'US_open': 2, 'Au_open': 1}
]

from collections import defaultdict

def get_grand_slam_titles(players, championships):
    # Step 1: Build player dictionary for quick lookup
    player_dict = {p['player_id']: p['player_name'] for p in players}
    
    # Step 2: Unpivot the championships
    title_counts = defaultdict(int)
    for row in championships:
        for tour in ['Wimbledon', 'Fr_open', 'US_open', 'Au_open']:
            winner_id = row[tour]
            # Defensive: skip if winner_id is None
            if winner_id is not None:
                title_counts[winner_id] += 1

    # Step 3: Build output for players with at least one Grand Slam
    result = []
    for pid, count in title_counts.items():
        # Only list winners present in player_dict
        if pid in player_dict:
            result.append({
                'player_id': pid,
                'player_name': player_dict[pid],
                'grand_slams_count': count
            })
    return result

# Output: List of dicts with player_id, player_name, grand_slams_count

# Example usage:
for row in get_grand_slam_titles(players, championships):
    print(row)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(R), where R is the number of rows × tournaments (years × 4), since every championship row is scanned and each tournament column is processed once.
- **Space Complexity:** O(P) for the player dictionary and result, where P is the number of players with at least one title.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a dynamically changing number of tournaments (columns) in the Championships table?  
  *Hint: Think about how queries might change if more tournaments are introduced.*

- What if some tournaments in some years have no winner (NULL)?  
  *Hint: Consider filtering out or coalescing NULLs during aggregation.*

- How would you write the SQL to return the top-N players by number of Grand Slam wins?  
  *Hint: Use ORDER BY and LIMIT clauses.*

### Summary
This problem demonstrates the **table unpivoting** (“wide-to-long” transform) and result aggregation pattern.  
The pattern appears in scenarios involving denormalized tables (multiple value columns representing the same category), and often appears in data analysis/data wrangling tasks.  
It is also a common SQL and ETL interview question for analytics or data-adjacent engineering roles.

### Tags
Database(#database)

### Similar Problems
