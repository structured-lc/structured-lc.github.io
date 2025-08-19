### Leetcode 2409 (Easy): Count Days Spent Together [Practice](https://leetcode.com/problems/count-days-spent-together)

### Description  
Given four dates in "MM-DD" format for the same (non-leap) year — Alice's arrival and departure (`arriveAlice`, `leaveAlice`), and Bob's arrival and departure (`arriveBob`, `leaveBob`) — find how many days both are in Rome together. The answer is the total number of overlapping days, counting both arrival and departure if they overlap. All dates are in the same year, which is not a leap year (February has 28 days).

### Examples  

**Example 1:**  
Input: `arriveAlice="08-15", leaveAlice="08-18", arriveBob="08-16", leaveBob="08-19"`  
Output: `3`  
*Explanation: Overlapping days are 08-16, 08-17, 08-18.*

**Example 2:**  
Input: `arriveAlice="10-01", leaveAlice="10-31", arriveBob="11-01", leaveBob="12-31"`  
Output: `0`  
*Explanation: Alice leaves on 10-31, Bob arrives on 11-01. No overlap.*

**Example 3:**  
Input: `arriveAlice="04-15", leaveAlice="04-18", arriveBob="04-16", leaveBob="04-19"`  
Output: `3`  
*Explanation: Overlap is 04-16, 04-17, 04-18.*

### Thought Process (as if you’re the interviewee)  
First, observe the need to calculate the overlap period between Alice's and Bob's stays.  
A brute-force approach would enumerate all days in both ranges, but that’s inefficient.

Instead, since dates are "MM-DD" strings, the overlap is  
- start = later of the two arrivals  
- end = earlier of the two departures

If start > end, there is no overlap (return 0).  
Otherwise, convert both dates to the day count of the year (e.g., 02-01 → 32), then answer is end_day - start_day + 1. This is O(1) and needs only date parsing.

Chosen approach is compact, clear, and optimal for this problem.

### Corner cases to consider  
- Ranges do not overlap at all  
- Arrivals and departures are on the same day (overlap of 1 day)  
- All dates are in January or December  
- Alice's and Bob's intervals are fully contained within each other  
- Dates are adjacent but not overlapping (e.g., 01-10 & 01-11)  
- Dates presented in any order (Alice may arrive earlier or later than Bob)

### Solution

```python
def countDaysTogether(arriveAlice, leaveAlice, arriveBob, leaveBob):
    # Number of days per month for non-leap year
    days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    # Helper to convert MM-DD to day-of-year (1-indexed)
    def date_to_ordinal(date):
        month = int(date[:2])
        day = int(date[3:])
        # Sum days in all months before this one, then add day
        return sum(days_in_month[:month - 1]) + day

    # Calculate overlap interval (inclusive)
    overlap_start = max(arriveAlice, arriveBob)
    overlap_end = min(leaveAlice, leaveBob)
    if overlap_start > overlap_end:
        return 0  # No days together

    start_ordinal = date_to_ordinal(overlap_start)
    end_ordinal = date_to_ordinal(overlap_end)
    return end_ordinal - start_ordinal + 1  # Inclusive count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Date parsing and small fixed-size lists only. No dependency on input size.
- **Space Complexity:** O(1)  
  Uses a few integer variables and a constant-size list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the dates are in different years, or include leap years?  
  *Hint: Need to handle 366-day years and potentially multiple years.*

- How would you handle if either Alice or Bob made multiple trips (multiple intervals)?  
  *Hint: Treat as interval intersection — merge multiple periods, then sum up overlaps.*

- If instead of days, you had resources assigned to each day (e.g., bookings), how would you count total overlap?  
  *Hint: Map individual bookings to days or use sweep line algorithm to count overlaps.*

### Summary
This problem is a classic interval-overlap task mapped onto dates. The main technique is **interval intersection**, implemented by computing the overlapping window and then calculating its size, with string-to-day-of-year conversion. This pattern is broadly applicable on calendars, booking problems, range overlaps, and event analysis.

### Tags
Math(#math), String(#string)

### Similar Problems
- Number of Days Between Two Dates(number-of-days-between-two-dates) (Easy)
- Minimum Number of Operations to Convert Time(minimum-number-of-operations-to-convert-time) (Easy)