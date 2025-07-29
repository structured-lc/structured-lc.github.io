### Leetcode 2173 (Hard): Longest Winning Streak [Practice](https://leetcode.com/problems/longest-winning-streak)

### Description  
Given a matches table (or list), each row records: `player_id`, `match_day`, and `result` ('Win'/'Lose'). For each player, find the length of their **longest consecutive sequence of wins** ("winning streak"). Return each player's id with their max streak.

### Examples  

**Example 1:**  
Input:  
matches =  
```
[ 
  [1, 20210101, 'Win'], 
  [1, 20210102, 'Win'], 
  [1, 20210103, 'Lose'],
  [1, 20210104, 'Win'],
  [2, 20210101, 'Lose'], 
  [2, 20210102, 'Win'],
  [2, 20210103, 'Win'], 
  [2, 20210104, 'Win'],
  [2, 20210105, 'Lose']
] 
```
Output:  
```
[[1,2],[2,3]]
```
Explanation:  
Player 1's longest winning streak is 2 (first two matches), player 2's is 3 (days 2-4).

**Example 2:**  
Input:  
matches =  
```
[ 
  [1, 20210101, 'Lose'],
  [1, 20210102, 'Lose']
]
```
Output:  
```
[[1,0]]
```
Explanation:  
Player 1 has no win, so streak is 0.

**Example 3:**  
Input:  
matches =  
```
[ 
  [1, 20210101, 'Win'],
  [1, 20210102, 'Win'],
  [1, 20210110, 'Win'],
  [2, 20210105, 'Lose']
]
```
Output:  
```
[[1,3],[2,0]]
```
Explanation:  
Player 1 won three non-consecutive matches, but as no lose between them, the max streak is 3.

### Thought Process (as if you’re the interviewee)  
- Brute force:  
  For each player, sort their matches by `match_day`. Iterate, track current win streak, keep max streak.  
  This is O(n log n) (for sorting) per player, O(n log n) overall for all matches.

- Can we do better?  
  Not really: sorting by `match_day` per player is essential if the input is unsorted.

- SQL Approach:  
  - Partition by player, order by day.
  - Use a group ID based on row number and count of wins to spot consecutive wins streaks.
  - For Python, just process the sorted list for each player.

Final Approach:
- Sort matches for each player by day.
- Track current and max streaks during a single pass.

### Corner cases to consider  
- Player has no wins (all 'Lose')  
- Player has all wins (full sequence)  
- Player has only one match  
- Player has mix of single win streaks  
- Multiple players, some may not appear in every match-day  
- Input is unsorted by day or by player

### Solution

```python
def longestWinningStreak(matches):
    # matches: List of [player_id, match_day, result]
    from collections import defaultdict

    # Group matches by player_id
    player_matches = defaultdict(list)
    for player_id, match_day, result in matches:
        player_matches[player_id].append((match_day, result))
    
    res = []
    for player_id, games in player_matches.items():
        # Sort all matches by match_day for current player
        games.sort()
        max_streak = 0
        cur_streak = 0
        for _, result in games:
            if result == 'Win':
                cur_streak += 1
                if cur_streak > max_streak:
                    max_streak = cur_streak
            else:
                cur_streak = 0
        res.append([player_id, max_streak])
    
    # If all players are not in the matches, add them with streak 0 (if required by problem)
    # If you only want to output players in input, comment the following code.
    # player_ids = set(x[0] for x in matches)
    # for id in all_possible_players:
    #     if id not in player_matches:
    #         res.append([id, 0])
        
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), n = total matches. For each player, matches are sorted (if not already sorted in input), and all results traversed.
- **Space Complexity:** O(n), storing all matches grouped per player.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose we want the longest **non-losing** streak (treating 'Draw' as win or not lose).
  *Hint: Track and reset streak only on explicit loss, not draw.*

- Can you output the **subarrays** or the dates where the streak starts and ends?
  *Hint: Store starting index/date when streak increments from zero, and return when streak updates max.*

- What if matches are **streaming in real-time**?  
  *Hint: Maintain current streak and max with a per-player state map; no batch processing.*

### Summary
This is a classical **group-by-and-scan** problem: process by key (player), sort-then-scan with a streak counter.  
Common in problems involving **longest consecutive runs**, **grouping and sorting**, and **window scanning** patterns.  
Patterns here apply widely—to max subarray, sliding windows, and interval analysis in logs, time series, etc.