### Leetcode 534 (Medium): Game Play Analysis III [Practice](https://leetcode.com/problems/game-play-analysis-iii)

### Description  
You are given a table `Activity` that logs the games played by various players in a game. Each row records:  
- `player_id`: unique ID for the player  
- `device_id`: ID for the device player used  
- `event_date`: date of activity (one player per date)  
- `games_played`: number of games played that day  
The task is to, for each player and date, output the player's *cumulative* number of games played up through and including that day.

### Examples  

**Example 1:**  
Input:  
```
Activity table:
player_id | device_id | event_date | games_played
-----------------------------------------------
1         | 2         | 2016-03-01 | 5
1         | 2         | 2016-03-02 | 6
2         | 3         | 2017-06-25 | 1
2         | 3         | 2017-06-26 | 5
2         | 4         | 2017-06-27 | 6
```
Output:  
```
player_id | event_date  | games_played_so_far
---------------------------------------------
1         | 2016-03-01  | 5
1         | 2016-03-02  | 11
2         | 2017-06-25  | 1
2         | 2017-06-26  | 6
2         | 2017-06-27  | 12
```
*Explanation: For player 1, 5 games on 3/1 plus 6 on 3/2 → 11 cumulative by 3/2. For player 2, the games are summed across days in date order.*

**Example 2:**  
Input:  
```
Activity table:
player_id | device_id | event_date | games_played
-----------------------------------------------
3         | 1         | 2022-12-01 | 0
```
Output:  
```
player_id | event_date | games_played_so_far
--------------------------------------------
3         | 2022-12-01 | 0
```
*Explanation: Only one row, so cumulative sum is just the day's value.*

**Example 3:**  
Input:  
```
Activity table:
player_id | device_id | event_date | games_played
-----------------------------------------------
4         | 7         | 2020-09-10 | 3
4         | 7         | 2020-09-11 | 2
4         | 8         | 2020-09-12 | 1
```
Output:  
```
player_id | event_date | games_played_so_far
--------------------------------------------
4         | 2020-09-10 | 3
4         | 2020-09-11 | 5
4         | 2020-09-12 | 6
```
*Explanation: Each date's value is cumulative sum, regardless of device.*

### Thought Process (as if you’re the interviewee)  
- Start by understanding that for each player you need, **for every date**, the **sum of games_played up to and including that date** (cumulative sum, per player, in event_date order).
- **Brute-force:** For each row (player \& date), sum all previous games_played for that player on or before that date. This is O(n²) and inefficient for large data.
- **Optimized:**  
  - Use a **window function (SQL)** or **groupby/accumulate (Python)** to calculate a running sum for each player (partition by player, order by date).
  - This approach is linear (O(n) after sorting) and leverages database or data structure windowing capabilities.

Trade-off:  
- SQL/window function is concise and scales. In Python, need to group and sort for each player before accumulating.

### Corner cases to consider  
- Player has only one activity row.
- Player has multiple devices but should aggregate by player only.
- Non-consecutive dates (gaps between dates).
- Zero games played on some days.
- Empty Activity table.
- Multiple players (make sure grouping works per player).

### Solution

```python
# We'll use plain Python (no pandas).
# Assume 'activity' is a list of dicts with keys:
# 'player_id', 'device_id', 'event_date', 'games_played'

from collections import defaultdict

def get_cumulative_games(activity):
    # Group activities by player, then sort by date for each player
    player_rows = defaultdict(list)
    for row in activity:
        player_rows[row['player_id']].append(row)
    # Prepare result
    result = []
    for player, rows in player_rows.items():
        # Sort rows by event_date
        rows.sort(key=lambda x: x['event_date'])
        cum_sum = 0
        for r in rows:
            cum_sum += r['games_played']
            result.append({
                'player_id': player,
                'event_date': r['event_date'],
                'games_played_so_far': cum_sum
            })
    # Optionally, sort final output as per Leetcode (by player_id, event_date)
    result.sort(key=lambda x: (x['player_id'], x['event_date']))
    return result

# Example usage:
# activity = [
#   {'player_id':1, 'device_id':2, 'event_date':"2016-03-01", 'games_played':5},
#   {'player_id':1, 'device_id':2, 'event_date':"2016-03-02", 'games_played':6},
#   {'player_id':2, 'device_id':3, 'event_date':"2017-06-25", 'games_played':1}
# ]
# print(get_cumulative_games(activity))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - n for grouping + for each player, sorting their rows by date. If already sorted, it's linear.
- **Space Complexity:** O(n)  
  - Extra storage for grouping and result.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you write this more efficiently if the input is already sorted by player and date?  
  *Hint: Track and output cum_sum as you read.*

- What if there are millions of rows? Would you use batch processing or streaming?  
  *Hint: Try generator/yield per player chunk.*

- How would you do this using SQL window functions?  
  *Hint: SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date).*

### Summary
This problem uses the **cumulative/running sum** pattern, commonly solved with window functions in SQL, or with groupby and accumulate in Python. It’s useful in scenarios requiring progressive totals by group, such as daily balances, progress tracking, or leaderboards. The key is to group by the appropriate id, sort by the relevant key (date), and accumulate.

### Tags
Database(#database)

### Similar Problems
- Game Play Analysis II(game-play-analysis-ii) (Easy)
- Game Play Analysis IV(game-play-analysis-iv) (Medium)