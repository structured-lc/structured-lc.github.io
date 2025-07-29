### Leetcode 1904 (Medium): The Number of Full Rounds You Have Played [Practice](https://leetcode.com/problems/the-number-of-full-rounds-you-have-played)

### Description  
Given a start time and a finish time as `"HH:MM"` strings on a 24-hour clock, you play a video game where rounds start every 15 minutes at `HH:00`, `HH:15`, `HH:30`, and `HH:45`. You play a full round if you are logged in for *the entire* 15 minutes of that round.
Return the number of full rounds you played during your game session.  
If `finishTime` is earlier than `startTime`, you played overnight through midnight.

### Examples  

**Example 1:**  
Input: `startTime = "12:01", finishTime = "12:44"`  
Output: `1`  
*Explanation: The only full round is from 12:15 to 12:30. You miss 12:00–12:15 since you started at 12:01, and you don't finish 12:30–12:45 since you leave at 12:44.*

**Example 2:**  
Input: `startTime = "20:00", finishTime = "06:00"`  
Output: `40`  
*Explanation: Since finishTime < startTime, your session covers overnight: 20:00 on day 1 to 06:00 on day 2, so total time played is 10 hours = 600 min. The first full round starts at 20:00, last at 05:45. 600 / 15 = 40 full rounds.*

**Example 3:**  
Input: `startTime = "00:00", finishTime = "23:59"`  
Output: `95`  
*Explanation: The interval is almost 24 hours. The first full round starts at 00:00, the last ends at 23:45. There are 95 full rounds in the day (not 96, as you don't finish the very last round to 00:00 of next day).*

### Thought Process (as if you’re the interviewee)  
Brute force: Loop through every 15-minute window from `startTime` to `finishTime`, check if that window is fully contained in the played interval.  
But that's inefficient and unnecessary.

**Optimize:**  
- Convert both times to minutes since midnight for easy calculation.
- If finishTime < startTime, add 24 \* 60 = 1440 to finishTime to handle overnight.
- Align startTime to the **next** 15-minute mark (round up), because you need to be present for a full round.  
- Align finishTime to the **previous** 15-minute mark (round down), because you need to already have been present at the start of this round to finish it.  
- If after alignment, start > end, return 0 (not enough for a full round).
- Else, number of rounds = (aligned_end - aligned_start) // 15 + 1 (if inclusive), but since we need start < end, better to compute (aligned_end - aligned_start) // 15.

**Why this works:**  
Aligning times avoids partial rounds at beginning or end.

### Corner cases to consider  
- Start and finish are the same (no rounds: "05:00", "05:00").
- Start time is after finish time (overnight session).
- Start time or finish time exactly on a quarter (already aligned).
- Less than 15 minutes total time.
- Interval covers full 24 hours.
- Both times at "23:59".

### Solution

```python
def numberOfRounds(startTime: str, finishTime: str) -> int:
    # Helper to convert HH:MM -> minutes
    def to_minutes(s):
        h, m = map(int, s.split(":"))
        return h * 60 + m

    start = to_minutes(startTime)
    end = to_minutes(finishTime)

    # If finish is less than start, add 24h (overnight)
    if end < start:
        end += 24 * 60

    # Align start to next 15-min mark (round up)
    if start % 15 != 0:
        start = ((start // 15) + 1) * 15

    # Align end to previous 15-min mark (round down)
    end = (end // 15) * 15

    # If after alignment, no time left for full round
    if start > end:
        return 0

    # Number of full rounds is (end - start) // 15
    return (end - start) // 15
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  All operations are simple arithmetic and do not depend on input size.

- **Space Complexity:** O(1)  
  No extra storage aside from variables. No recursion or complex data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle arbitrary round durations (not 15 min)?
  *Hint: Make the round interval a parameter and divide/time align accordingly.*

- What if there are blackout periods (breaks) within the session?
  *Hint: Subtract blackout periods from the total interval and recompute.*

- What if you needed the actual start times of each full round?
  *Hint: After aligning, enumerate all multiples of 15 min between start and end.*

### Summary
This problem uses an **interval alignment** and **greedy count** technique. "Rounding" the times to valid quarter hours avoids brute force looping.  
The coding pattern is common in time-based scheduling and can be applied to any regular interval counting or booking system (calendar, logs, shifts, etc.).