### Leetcode 1118 (Easy): Number of Days in a Month [Practice](https://leetcode.com/problems/number-of-days-in-a-month)

### Description  
Given a year and a month, return the number of days in that month.  
You must account for leap years where February has 29 days. Leap year rules:
- A year is a leap year if it’s divisible by 4, but not by 100, unless it’s also divisible by 400.
- Otherwise, February has 28 days.
All months except February have a fixed number of days.

### Examples  

**Example 1:**  
Input: `year = 1992, month = 7`  
Output: `31`  
*Explanation: July always has 31 days. No leap year rules required.*

**Example 2:**  
Input: `year = 2000, month = 2`  
Output: `29`  
*Explanation: Year 2000 is a leap year (divisible by 400), so February has 29 days.*

**Example 3:**  
Input: `year = 1900, month = 2`  
Output: `28`  
*Explanation: 1900 is divisible by 100 but not by 400, so not a leap year. February has 28 days.*

### Thought Process (as if you’re the interviewee)  
- First, list how many days are in each month. Most months are fixed (e.g., Jan is always 31 days, etc.).
- *February* is special because it can have 28 or 29 days depending on whether the year is a leap year.
- Leap years occur if the year is divisible by 4 AND ( not divisible by 100 OR divisible by 400 ).
- Use a list or array to store days for each month, set February's days based on leap year calculation.
- No need for complex validation, since constraints guarantee valid year/month.
- This approach is simple, very readable, and O(1) in time and space.

### Corner cases to consider  
- Year is on an edge of leap century rule: 2000 (leap year), 1900 (not a leap year).
- Months at edge: January (month=1), December (month=12).
- Regular years vs. leap years for February.
- All other months should always return their fixed value, regardless of year.

### Solution

```python
def numberOfDays(year: int, month: int) -> int:
    # List for number of days in each month (not considering leap years)
    # Index 0: January, Index 1: February, etc.
    days_in_month = [31, 28, 31, 30, 31, 30,
                     31, 31, 30, 31, 30, 31]

    # Check leap year for February
    if month == 2:
        # Leap year if (divisible by 4 and not by 100) or (divisible by 400)
        if (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0):
            return 29
        else:
            return 28
    # For other months, return from the list
    return days_in_month[month - 1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Only a few arithmetic checks and a direct lookup. Independent of input size.
- **Space Complexity:** O(1) — Fixed array of 12 integers, no extra space per input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle invalid input for month or year?  
  *Hint: Consider input validation and error handling strategies.*

- Can you return the result for multiple queries efficiently?  
  *Hint: Think about pre-processing or batching, or using a cache.*

- How would you generalize this function for other calendar systems?  
  *Hint: Research calendars with different leap year rules.*

### Summary
This problem relies on *array lookup* and a simple *conditional check* for leap years—both are foundational patterns in coding interviews.  
The leap year rules or similar lookup-table patterns are common in date manipulation and calendar calculation problems.  
This type of approach generalizes to scenarios where a fixed mapping exists with a handful of exceptions handled by business logic.