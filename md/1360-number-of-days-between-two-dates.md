### Leetcode 1360 (Easy): Number of Days Between Two Dates [Practice](https://leetcode.com/problems/number-of-days-between-two-dates)

### Description  
Given two valid dates between the years 1971 and 2100 in the string format "YYYY-MM-DD", count the number of days between the two dates. The result should be the absolute difference (i.e., never negative).  
You cannot use Python built-in date libraries in a typical interview setting, so you must write logic to account for leap years and different numbers of days in each month.  
For example:  
- A leap year has 366 days; a regular year has 365 days.  
- February has 28 days, except in leap years, when it has 29.

### Examples  

**Example 1:**  
Input: `date1 = "2019-06-29", date2 = "2019-06-30"`  
Output: `1`  
*Explanation: The dates are consecutive days (June 29 and June 30 of 2019), so the difference is 1.*

**Example 2:**  
Input: `date1 = "2020-01-15", date2 = "2019-12-31"`  
Output: `15`  
*Explanation: From Dec 31, 2019 to Jan 15, 2020 is 15 days. Counting: Dec 31 → Jan 1 (1), Jan 1 → Jan 15 (14), total 15 days.*

**Example 3:**  
Input: `date1 = "2023-01-12", date2 = "2023-03-04"`  
Output: `51`  
*Explanation: In 2023 (non-leap), days from Jan 12 to Mar 4 is 51. (Jan: 19 left, Feb: 28, Mar: 4, sum: 19+28+4=51; or, compute absolute day counts from 1971-01-01 and take their difference).*

### Thought Process (as if you’re the interviewee)  
First, I would parse both date strings into year, month, and day integers.  
Brute-force would be incrementing a day at a time from one date to the other, counting up, but this is too slow if dates are far apart.  
A better approach is:  
- Convert each date to its absolute day count since a fixed reference date (for example, 1971-01-01).
- For each date, add:
  - Days from 1971 up to the previous year.
  - Days for full months in the current year (before the given month).
  - Add the day number (in the current month).
- For leap years, adjust February's days as needed.
- Take the absolute difference between these two numbers.

This method avoids looping over every day, making it constant time regardless of date distance.

Trade-offs:
- No built-in library use, so manual leap year logic and month day table is required.
- Time and memory cost are minimal—just arithmetic calculations.

### Corner cases to consider  
- Dates are equal (should return 0).
- Dates are at year boundaries or month boundaries.
- Leap years (check "2016-02-28" vs "2016-03-01", leap years like 2000, non-leap like 2100).
- Date order (date1 after date2 and vice versa).
- Different centuries (but always between 1971–2100).

### Solution

```python
def daysBetweenDates(date1: str, date2: str) -> int:
    # Helper function to check if year is leap
    def is_leap(year):
        # Divisible by 4 AND (not divisible by 100 OR divisible by 400)
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

    # Days in each month for non-leap years
    days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    def to_ordinal(date: str) -> int:
        year, month, day = map(int, date.split('-'))
        # Days for all full years before current year
        days = 0
        for y in range(1971, year):
            days += 366 if is_leap(y) else 365
        # Days for all full months before current month in current year
        for m in range(1, month):
            if m == 2 and is_leap(year):
                days += 29
            else:
                days += days_in_month[m - 1]
        # Days in current month
        days += day
        return days

    return abs(to_ordinal(date1) - to_ordinal(date2))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Maximum range is just over 100 years, and all loops have a fixed, bounded length (years: 1971..2100, months: 12).
- **Space Complexity:** O(1) — Only variables for calculation; no extra data structures or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What if dates can be outside the range 1971–2100?
  *Hint: How would you generalize leap year handling and bounds?*

- How would you handle invalid dates gracefully?
  *Hint: Consider input validation and error handling (e.g., incorrect string format, February 30, etc).*

- Can you extend this to account for business days (i.e., skipping weekends and holidays)?
  *Hint: How to determine if a day is a weekend; how to store a holiday calendar.*

### Summary
This problem is a classic example of avoiding naive day-by-day iteration by mapping each date to a serial number or "ordinal day count," making interval calculation fast. This “reduce-to-origin and subtract” pattern also shows up in range sum problems, date differences, and prefix sum applications. Handling leap years carefully is the main subtlety. This pattern recurs with date/time intervals, and in interval merging or booking system problems.