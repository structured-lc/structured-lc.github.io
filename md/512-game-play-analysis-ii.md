### Leetcode 512 (Easy): Game Play Analysis II [Practice](https://leetcode.com/problems/game-play-analysis-ii)

### Description  
You are given an **Activity** table tracking each time a player logs into a game. Each row records:
- playerᵢd: a unique ID for the player  
- deviceᵢd: which device they used
- event_dᵃtᵉ: the login date  
- games_played: how many games that player played that day  

Your task: For each player, report the **deviceᵢd they used the very first time they logged in** (the earliest event_dᵃtᵉ for that player).  
- If a player logged in multiple times on their first date (possibly on more than one device), report the device used on their **first login** (if unspecified, return any device for first date).

### Examples  

**Example 1:**  
Input:  
```  
Activity table:  
player_id | device_id | event_date  | games_played  
    1     |     2     | 2016-03-01  |      5  
    1     |     3     | 2016-05-02  |      6  
    2     |     3     | 2017-06-25  |      1  
    3     |     1     | 2016-03-02  |      0  
    3     |     4     | 2018-07-03  |      5  
```
Output:  
```  
player_id | device_id  
    1     |     2  
    2     |     3  
    3     |     1  
```
*Explanation:*
- Player 1: earliest event_date is 2016-03-01, used device 2.
- Player 2: only 1 login, so device 3.
- Player 3: earliest event_date is 2016-03-02, used device 1.

**Example 2:**  
Input:  
```  
Activity table:  
player_id | device_id | event_date  | games_played  
    4     |     1     | 2022-09-02  |      2  
    4     |     2     | 2022-09-02  |      3  
    4     |     1     | 2022-09-03  |      5  
```
Output:  
```  
player_id | device_id  
    4     |     1  
```
*Explanation:*
- Player 4 logged in on two devices on 2022-09-02, both are on the first date, either can be reported as "first device".

**Example 3:**  
Input:  
```  
Activity table:  
player_id | device_id | event_date  | games_played  
    5     |     2     | 2020-01-01  |      4  
```
Output:  
```  
player_id | device_id  
    5     |     2  
```
*Explanation:*
- Only one login.

### Thought Process (as if you’re the interviewee)  
- To answer which device a player used for their very first login, I need for each player the **row(s) with their earliest event_dᵃtᵉ**.
- Brute-force idea: For each player, filter their rows and pick the row with the smallest date.
- Optimized approach: In SQL, I can use `MIN(event_date)` per player, then join back to the original table to discover which device(s) were used then.
- If multiple logins (rows) exist on the same first date, typically any deviceᵢd is accepted.
- In code (Python, pandas, or SQL), this is a groupby/min followed by a merge, or filtering.

### Corner cases to consider  
- Player logs in on multiple devices on their first day — more than one valid answer (return any).
- Player with only one login.
- Table with only one row.
- Players with multiple logins on different dates.
- No activity rows (shouldn't happen per problem).

### Solution

```python
# We assume input as a list of dicts, similar to rows from a database.

def get_first_device_by_player(activity):
    first_login = {}

    # Step 1: Find the min event_date for each player_id
    min_dates = {}
    for row in activity:
        pid = row["player_id"]
        date = row["event_date"]
        if pid not in min_dates or date < min_dates[pid]:
            min_dates[pid] = date

    # Step 2: For each row, if it's the min date for that player, record device_id
    for row in activity:
        pid = row["player_id"]
        if row["event_date"] == min_dates[pid]:
            # Only pick first found device for a player
            if pid not in first_login:
                first_login[pid] = row["device_id"]

    # Collect result as sorted list of [player_id, device_id]
    result = []
    for pid in sorted(first_login):
        result.append([pid, first_login[pid]])

    return result

# Example usage:
activity = [
    {"player_id": 1, "device_id": 2, "event_date": "2016-03-01", "games_played": 5},
    {"player_id": 1, "device_id": 3, "event_date": "2016-05-02", "games_played": 6},
    {"player_id": 2, "device_id": 3, "event_date": "2017-06-25", "games_played": 1},
    {"player_id": 3, "device_id": 1, "event_date": "2016-03-02", "games_played": 0},
    {"player_id": 3, "device_id": 4, "event_date": "2018-07-03", "games_played": 5},
]
print(get_first_device_by_player(activity))
# Output: [[1, 2], [2, 3], [3, 1]]

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), n = number of rows. Each pass over activity is O(n).
- **Space Complexity:** O(n), storing entries for each player; could also be O(p) where p = unique player IDs.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to report all devices used on the first login date if a player logged in from multiple devices?  
  *Hint: Track all rows matching the earliest date per player and return a list per player.*

- How do you get device use on the second (or kᵗʰ) login date for each player?  
  *Hint: Rank event_dates per player, select where rank is 2 (or k).*

- Can you do this in a single SQL query efficiently?  
  *Hint: Use window functions like ROW_NUMBER() over partitioned groups.*

### Summary
This problem follows the **“group by and filter”** pattern — find a minimum or maximum per group, then match/include rows accordingly.  
This approach is common for extracting first/latest events, for user analytics, or similar aggregate → join/filter use cases.  
It generalizes: replace “min” with “rank-k”, or perform aggregations per group, across all analytics problems.


### Flashcard
For each player, find the device(s) used on their earliest event_date by joining the min-date result back to the original data.

### Tags
Database(#database)

### Similar Problems
- Game Play Analysis I(game-play-analysis-i) (Easy)
- Game Play Analysis III(game-play-analysis-iii) (Medium)