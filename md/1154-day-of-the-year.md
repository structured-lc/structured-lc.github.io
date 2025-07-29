### Leetcode 1154 (Easy): Day of the Year [Practice](https://leetcode.com/problems/day-of-the-year)

### Description  
Given a date string in the format "YYYY-MM-DD" (representing a day in the Gregorian calendar), return the day number of the year for that date. For example, "2019-01-09" should return 9, because January 9 is the 9ᵗʰ day of the year. You must account for leap years, where February has 29 days, and otherwise has 28 days. A leap year occurs if the year is divisible by 400, or divisible by 4 but not by 100.

### Examples  

**Example 1:**  
Input: `date = "2019-01-09"`  
Output: `9`  
*Explanation: January 1 - January 9 covers 9 days. There's no leap year or month transition to consider here.*

**Example 2:**  
Input: `date = "2019-02-10"`  
Output: `41`  
*Explanation: January has 31 days, so add January (31) and February (10 so far): 31 + 10 = 41.*

**Example 3:**  
Input: `date = "2003-03-01"`  
Output: `60`  
*Explanation: January (31 days) + February (28 days in 2003, not a leap year) + March 1 (1 day) = 31 + 28 + 1 = 60.*

**Example 4:**  
Input: `date = "2004-03-01"`  
Output: `61`  
*Explanation: 2004 is a leap year, so January (31) + February (29) + March 1 (1) = 31 + 29 + 1 = 61.*

### Thought Process (as if you’re the interviewee)  
Let's parse the year, month, and day from the input string.  
- The task reduces to summing the days in all full months before the current month, and then adding the current day.
- Leap years only affect February, so we need to check if the current year is a leap year (divisible by 400 or divisible by 4 and not by 100).
- Store the number of days in each month in a list, update February to 29 if it’s a leap year.
- Sum days for months before the given month (0-based: months 0 to (month-2)), then add the day.

Time and space complexity should be O(1) since the number of months is constant and date parsing is direct.

### Corner cases to consider  
- Leap years vs. regular years (especially checking February dates).
- First day of the year ("YYYY-01-01" should always return 1).
- Last day of the year ("YYYY-12-31", including leap years for 366).
- Input dates on February 29 in a leap year.
- Minimum and maximum valid years (e.g., "1900-01-01" vs. "2019-12-31").
- Correct date format (the problem guarantees valid input, but it’s always good to watch for).

### Solution

```python
def dayOfYear(date: str) -> int:
    # Parse year, month, day from string
    year, month, day = map(int, date.split('-'))

    # Days in each month, default February to 28
    days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    # Check and adjust February for leap year
    is_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)
    if is_leap:
        days_in_month[1] = 29

    # Sum days in full months before the current month
    days_before = sum(days_in_month[:month - 1])
    return days_before + day
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1).  
  The number calculations and string parsing are all constant time, and the month sum is over a fixed-size (12 element) list.
- **Space Complexity:** O(1).  
  Only a couple of variables and a constant-size list independent of input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you efficiently handle a *batch* of dates in a single call?
  *Hint: Try to reuse the month-days list and only recompute leap years when the year changes.*

- What changes if the date format is different or lacks leading zeros?
  *Hint: Robustness in parsing, such as splitting and converting to integer safely.*

- Could you handle *historical* calendars (Julian rather than Gregorian)?
  *Hint: The leap year calculation would differ and date ranges might not be consistent.*

### Summary
This is a classic "calendar math" problem and a good example of constant-time array summing for month data, with a simple edge case (leap years). The approach is direct: parse, check leap year, sum array slice, and add. This pattern (slicing an array to sum ranges, adjusting based on edge rules) is common for problems involving dates, ranges, or cumulative data.