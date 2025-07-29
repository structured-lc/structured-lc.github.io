### Leetcode 1185 (Easy): Day of the Week [Practice](https://leetcode.com/problems/day-of-the-week)

### Description  
Given three integers representing a date — **day**, **month**, and **year** — determine what day of the week that date falls on. Return the answer as one of: "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", or "Saturday". The input date will always be valid and between 1971 and 2100.

### Examples  

**Example 1:**  
Input: `day = 31, month = 8, year = 2019`  
Output: `"Saturday"`  
*Explanation: August 31, 2019 was a Saturday.*

**Example 2:**  
Input: `day = 18, month = 7, year = 1999`  
Output: `"Sunday"`  
*Explanation: July 18, 1999 was a Sunday.*

**Example 3:**  
Input: `day = 15, month = 8, year = 1993`  
Output: `"Sunday"`  
*Explanation: August 15, 1993 was a Sunday.*

### Thought Process (as if you’re the interviewee)  
- My goal is to map a given date to the correct weekday name.
- The brute-force way is to count the total number of days from a known reference date (like 1971-01-01) up to the target date, then modulo 7.
- A better way is to use a mathematical formula designed for this task, such as **Zeller's Congruence**, which directly computes the day of the week from a date.
- Zeller's formula requires some adjustment: for January and February, months are treated as 13 and 14 of the previous year.
- After applying the formula, the result is an index, which can be mapped to the weekday name using a lookup array.
- This approach avoids using built-in date libraries (which is not always allowed in interviews) and works efficiently for the required range.

### Corner cases to consider  
- Dates in January and February: these require special handling (treated as months 13, 14 of previous year).
- Leap years: correctly handled by Zeller's Congruence.
- Upper and lower year bounds (1971 and 2100): ensure formula works for all valid inputs.
- Minimal day and month (e.g. January 1).
- December 31 edge case.

### Solution

```python
def dayOfTheWeek(day, month, year):
    # Days of the week as per Zeller's Congruence result
    week = [
        "Saturday", "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday"
    ]
    
    # Zeller's adjustment for Jan and Feb
    if month < 3:
        month += 12
        year -= 1
    
    q = day
    m = month
    k = year % 100      # Year of the century
    j = year // 100     # Zero-based century

    # Zeller's Congruence formula
    h = (q + (13*(m + 1)) // 5 + k + (k // 4) + (j // 4) + 5*j) % 7
    
    return week[h]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — The formula involves a fixed number of arithmetic operations.
- **Space Complexity:** O(1) — Only a constant-sized list for weekday names and a few variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input date range was much larger, including years from the past or far future?  
  *Hint: Check if the formula covers all Gregorian calendar dates.*

- How would you determine the weekday for dates before the adoption of the Gregorian calendar?  
  *Hint: Discuss the limitations of Zeller’s Congruence and Julian calendar.*

- Can you optimize this if you need to process a million dates?  
  *Hint: Explore precomputing or caching for repeated years or using batch calculation.*

### Summary
This problem is a classic date-to-weekday conversion and can be solved using **Zeller's Congruence**, a robust O(1) math formula that works for all Gregorian dates in the valid range. The general coding pattern is **mathematical formula implementation** or **date arithmetic**, which is common for scheduling applications, calendar algorithms, or time-based computations. It highlights careful handling of month and year rollovers and reinforces the critical thinking needed when not allowed to use built-in libraries.