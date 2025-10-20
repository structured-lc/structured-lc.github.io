### Leetcode 511 (Easy): Game Play Analysis I [Practice](https://leetcode.com/problems/game-play-analysis-i)

### Description  
Given a table called **Activity** containing player activity logs with the following columns:

- **player_id** (integer): Unique identifier for each player.
- **device_id** (integer): Device used (not required for this problem).
- **event_date** (date): Date the player logged in.
- **games_played** (integer): Number of games played (also not needed for this problem).

Your task: **For each player, find the earliest login date (their first login).** Return a table with `player_id` and their `first_login` (the minimum event_date), with one row per player.

### Examples  

**Example 1:**  
Input:  
```
Activity table:
player_id | device_id | event_date  | games_played
1         | 2         | 2016-03-01  | 5
1         | 2         | 2016-05-02  | 6
2         | 3         | 2017-06-25  | 1
3         | 1         | 2016-03-01  | 0
3         | 4         | 2016-07-03  | 5
```
Output:  
```
player_id | first_login
1         | 2016-03-01
2         | 2017-06-25
3         | 2016-03-01
```
*Explanation: For each player, find the earliest `event_date`. For player 1 it's 2016-03-01, for player 2 it's 2017-06-25, for player 3 it's 2016-03-01.*

**Example 2:**  
Input:  
```
Activity table:
player_id | device_id | event_date  | games_played
1         | 2         | 2024-01-01  | 2
1         | 2         | 2024-02-10  | 1
2         | 3         | 2024-01-01  | 3
2         | 1         | 2024-05-02  | 9
```
Output:  
```
player_id | first_login
1         | 2024-01-01
2         | 2024-01-01
```
*Explanation: For player 1 and 2, find their earliest `event_date`.*

**Example 3:**  
Input:  
```
Activity table:
player_id | device_id | event_date  | games_played
1         | 7         | 2025-04-03  | 1
```
Output:  
```
player_id | first_login
1         | 2025-04-03
```
*Explanation: Only one login present, so that is the first login.*

### Thought Process (as if you’re the interviewee)  
- The key task is **"find the earliest date for each player"**, which is classic "group by" and "min" aggregation.
- Brute force in Python: For each player, scan all their logins and keep track of the earliest date. This requires grouping by player_id.
- In SQL: Use `GROUP BY player_id`, then `MIN(event_date) AS first_login`.
- For optimal performance: Use dictionary to aggregate per player while iterating through the data.
- No sorting needed, just single pass and tracking min date for each player.
- Tradeoff: This is the most efficient approach — time O(n), space proportional to unique players.

### Corner cases to consider  
- Activity table is empty.
- Only one row/activity in the table.
- Players with only one login.
- Multiple players with the same earliest login date.
- All logins on the same date for a player.
- Dates are not sorted for each player.

### Solution

```python
def first_login_per_player(activity_log):
    """
    activity_log: List of dictionaries, each with keys: 'player_id', 'event_date'
    Returns: List of dicts with player_id and their first login date
    """
    first_login = {}  # key: player_id, value: earliest (min) event_date as string

    for row in activity_log:
        pid = row['player_id']
        date = row['event_date']
        # If player not tracked or found earlier login date, update
        if (pid not in first_login) or (date < first_login[pid]):
            first_login[pid] = date

    # Return list of dicts with required format
    return [{'player_id': pid, 'first_login': date}
            for pid, date in first_login.items()]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  *n = number of activity records; each row is processed once, checking and updating a dictionary.*
- **Space Complexity:** O(m)  
  *m = number of unique players; that's the size of the `first_login` dictionary.*

### Potential follow-up questions (as if you’re the interviewer)  

- How would you scale this if the table was billions of rows?
  *Hint: Think about database indexes, distributed processing, or MapReduce-style aggregation.*

- What if you also needed the device used for their first login?
  *Hint: Store both event_date and device_id, and update when a new minimal date is found.*

- Can you get the first login in pure SQL without subqueries?
  *Hint: Use GROUP BY with MIN, or window functions (ROW_NUMBER()).*

### Summary
This problem uses the classic **group-by aggregation** pattern to extract per-entity minimums (first login per player). The coding pattern is widely applicable for **finding per-group extrema** (min, max, first, last, etc.), which arises in log data analysis, time-series analytics, and more. This is also a foundational database skill: knowing how to aggregate and summarize large tables efficiently.


### Flashcard
Group by player_id and select the minimum event_date for each to find every player’s first login.

### Tags
Database(#database)

### Similar Problems
- Game Play Analysis II(game-play-analysis-ii) (Easy)