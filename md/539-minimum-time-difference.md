### Leetcode 539 (Medium): Minimum Time Difference [Practice](https://leetcode.com/problems/minimum-time-difference)

### Description  
Given a list of times in "HH:MM" 24-hour format, find the minimum difference in minutes between any two time points in the list. Times wrap cyclically (so the difference between "23:59" and "00:00" is 1 minute). If times repeat, the answer is 0.

### Examples  

**Example 1:**  
Input: `["23:59","00:00"]`  
Output: `1`  
*Explanation: 00:00 is just 1 minute after 23:59, so the minimum difference is 1 minute.*

**Example 2:**  
Input: `["00:00","23:59","00:00"]`  
Output: `0`  
*Explanation: The time "00:00" occurs twice: difference is 0 minutes.*

**Example 3:**  
Input: `["01:01","02:01","03:00"]`  
Output: `59`  
*Explanation:  
- 01:01 and 02:01: 60 min  
- 02:01 and 03:00: 59 min  
- 03:00 and 01:01: 119 min  
So, minimum is 59 minutes.*

### Thought Process (as if you’re the interviewee)  
Start by thinking brute-force: for every pair, compute their absolute time difference considering the wrap at midnight, and select the minimum. This would be O(n²) and inefficient for large inputs.

**Optimization:**  
- First, convert each time to "minutes since 00:00" for ease of calculation.  
- If all times are put onto a linear 0..1439 minute axis, time differences can be computed easily.  
- Sort the list of minutes: now the smallest difference is always between two consecutive times.
- However, to handle wraparound, also check the difference between the earliest and latest times (circle around, e.g., "23:59" to "00:00").
- For speed, it's worth noting that there are only 1440 possible minute values in a day. If there's a duplicate time, minimum difference is instantly 0.

This approach gives O(n log n) with sorting, or O(n) using a boolean array of length 1440.

### Corner cases to consider  
- Duplicate time entries (answer is 0)
- Times at "00:00" and "23:59" (wraparound)
- Only two times in the input
- All times evenly spaced
- Large number of time strings (should not time out)

### Solution

```python
def findMinDifference(timePoints):
    # Total minutes available in one day
    MINUTES_IN_DAY = 1440

    # Helper to convert "HH:MM" to minutes
    def to_minutes(t):
        h, m = t.split(':')
        return int(h) * 60 + int(m)

    # Mark minutes in a boolean array for O(1) duplicate detection
    seen = [False] * MINUTES_IN_DAY
    for t in timePoints:
        mins = to_minutes(t)
        if seen[mins]:
            return 0  # Duplicate found
        seen[mins] = True

    # Gather all seen minutes and sort (collect indices with True)
    minutes = [i for i, v in enumerate(seen) if v]
    minutes.sort()

    # Initialize min_diff with a large value
    min_diff = MINUTES_IN_DAY

    # Go through the sorted list to find min difference between adjacent times
    for i in range(1, len(minutes)):
        diff = minutes[i] - minutes[i - 1]
        min_diff = min(min_diff, diff)

    # Also check difference between first and last to handle wraparound (circular time)
    circular_diff = MINUTES_IN_DAY + minutes[0] - minutes[-1]
    min_diff = min(min_diff, circular_diff)
    return min_diff
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since converting to minutes and filling the "seen" array is O(n), and extracting/sorting the unique minute values is O(1440) at most (since there are only 1440 possible times in a day).
- **Space Complexity:** O(1), as the extra array size is fixed to 1440 (the maximum number of minutes in a day), not proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large lists of times, possibly millions, with many duplicates?  
  *Hint: Early duplicate detection with a boolean array avoids O(n²) time.*

- Could you solve this without explicitly sorting the list?  
  *Hint: By mapping all times into a fixed-size array, and scanning linearly, you can.*

- Can you generalize this to time zones, or "X:YY" formats with arbitrary precision?  
  *Hint: Carefully define the conversion function; may need larger or variable-size arrays.*

### Summary
This problem is a great example of *bucketization* or *fixed-size boolean array marking* and is a classic use of conversion, sorting, and adjacent differencing for minimum distance on a circle. This pattern is seen in many "modulo" or wraparound difference problems, and applies for any fixed-size discrete domain. The early-out for duplicate detection is an efficient trick for fixed-range problems.


### Flashcard
Convert times to minutes, sort, then find the smallest difference between consecutive values (including wrap-around).

### Tags
Array(#array), Math(#math), String(#string), Sorting(#sorting)

### Similar Problems
- Minimum Cost to Set Cooking Time(minimum-cost-to-set-cooking-time) (Medium)