### Leetcode 2758 (Easy): Next Day [Practice](https://leetcode.com/problems/next-day)

### Description  
Given a date object, implement a method so that calling `date.nextDay()` returns a new date object representing the *next* calendar day, correctly handling month-end transitions (including leap years).  
You should not mutate the original date object, but instead return a new one.  
This is essentially extending the JavaScript `Date` prototype, but here rephrased as a general function:  
Given a date (year, month, day), return the next day's date.

### Examples  

**Example 1:**  
Input: `year=2023, month=3, day=31`  
Output: `2023-04-01`  
*Explanation: March has 31 days. The next day after March 31 is April 1 of the same year.*

**Example 2:**  
Input: `year=2000, month=2, day=28`  
Output: `2000-02-29`  
*Explanation: Year 2000 is a leap year, so February has 29 days. The next day after Feb 28 is Feb 29.*

**Example 3:**  
Input: `year=2021, month=12, day=31`  
Output: `2022-01-01`  
*Explanation: December 31 is the last day of the year. Next day is January 1 of the next year.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is:
- Use lists to keep track of days in each month.
- Increment the day by 1. If it exceeds the last day of the current month, set day = 1 and increment the month by 1.  
- If the month exceeds 12, set month = 1 and increment the year.
- Special care is needed for February, taking leap years into account (leap year if divisible by 4, not 100 unless also 400).
- I would write a function `is_leap_year(year)` to help handle February.

A more optimal and robust method is to use the language's native date/time library. However, for interviews, manual implementation is preferred to show logic.  
Trade-offs: Using provided date libraries saves effort and handles tricky transitions, but is usually discouraged unless explicitly allowed.

### Corner cases to consider  
- End of February on leap years and non-leap years.
- End of December to New Year transition.
- Months with 30, 31 days (April, June, etc.).
- Dates like Jan 1 or Feb 28 (edge cases at the start or end).
- Single-digit month/day values.
- Input validation.

### Solution

```python
def is_leap_year(year):
    # Leap year if divisible by 4 and (not by 100 unless also by 400)
    return (year % 4 == 0 and (year % 100 != 0 or year % 400 == 0))

def next_day(year, month, day):
    # Days in each month, 0-th index unused for 1-based month numbers
    days_in_month = [0, 31, 28, 31, 30, 31, 30,
                     31, 31, 30, 31, 30, 31]
    # Handle leap years for February
    if month == 2 and is_leap_year(year):
        max_day = 29
    else:
        max_day = days_in_month[month]
    if day < max_day:
        # Just increment day
        return (year, month, day + 1)
    else:
        if month == 12:
            # End of year
            return (year + 1, 1, 1)
        else:
            # Next month
            return (year, month + 1, 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — All operations are basic arithmetic checks and table lookups, with no loops or recursion.
- **Space Complexity:** O(1) — Just a fixed small list and variables, no extra storage depending on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle time as well as date?  
  *Hint: Consider adding hour/minute/second and deal with overflows.*

- How can you handle invalid input or non-existent dates?  
  *Hint: Consider validation before processing, e.g., 2023-2-30.*

- Could you generalize this to N days, not just next day?
  *Hint: Loop or adjust logic to repeat N times, or leverage ordinal calculations.*

### Summary
This problem demonstrates careful handling of date arithmetic, especially leap year logic and month/year boundaries.  
It is a classic *calendar math* pattern — common in scheduling, logging, and incremental date processing tasks, and is useful practice for clean edge case handling without relying on built-in helpers.

### Tags

### Similar Problems
