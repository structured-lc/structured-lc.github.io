### Leetcode 2777 (Medium): Date Range Generator [Practice](https://leetcode.com/problems/date-range-generator)

### Description  
Given a **start date** and **end date** (both as `"YYYY-MM-DD"` string), and a positive integer **step**, create a generator that yields date strings from **start** to **end** (inclusive), advancing by `step` days each time.  
The generator should yield each date in the same `"YYYY-MM-DD"` format until passing `end`.

### Examples  

**Example 1:**  
Input: `start = "2021-11-01", end = "2021-11-05", step = 2`  
Output: `["2021-11-01", "2021-11-03", "2021-11-05"]`  
*Explanation: Start at "2021-11-01", next is 2 days later: "2021-11-03", then "2021-11-05" is within range, stop since next ("2021-11-07") is past end.*

**Example 2:**  
Input: `start = "2023-04-01", end = "2023-04-04", step = 1`  
Output: `["2023-04-01", "2023-04-02", "2023-04-03", "2023-04-04"]`  
*Explanation: Every day between start and end (inclusive) is generated.*

**Example 3:**  
Input: `start = "2021-12-28", end = "2022-01-03", step = 3`  
Output: `["2021-12-28", "2021-12-31", "2022-01-03"]`  
*Explanation: +3 days each time, stops since the next would be "2022-01-06", which is after end.*

### Thought Process (as if you’re the interviewee)  
At first, I’d parse the input strings into date objects so I can increment dates easily.  
The brute-force idea is to start at the **start date**, keep adding `step` days, and for each, yield the date in `"YYYY-MM-DD"` format until we reach or pass the **end date**.

A generator is ideal for this because it yields one value at a time and can be paused.  
To avoid mutating the original start object, work with a copy while generating dates.

For each iteration:
- Yield `current` date string.
- Increment `current` by `step` days.
- Stop when `current > end`.

Optimizations:  
- Only string parsing (to date) and string formatting (back) are needed, as date increments are O(1).
- Tradeoff: using datetime makes implementation easy and robust across months and years.

### Corner cases to consider  
- Start equals end.
- Step longer than the distance between start and end (should yield only start).
- Step is 1 (daily generation).
- Start after end: yield nothing.
- Crossing month or year boundaries.
- Large `step`.
- Dates at ends of months (e.g., "2021-01-31" to "2021-02-28", step 1).

### Solution

```python
from datetime import datetime, timedelta

def date_range_generator(start, end, step):
    # Parse input dates from string to datetime objects
    current = datetime.strptime(start, "%Y-%m-%d")
    end_date = datetime.strptime(end, "%Y-%m-%d")

    while current <= end_date:
        # Yield current date formatted as 'YYYY-MM-DD'
        yield current.strftime("%Y-%m-%d")
        # Advance by 'step' days
        current += timedelta(days=step)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of dates generated (up to ⌊(end−start)/step⌋ + 1). Each step is O(1) work (parsing & formatting), and loop runs in proportion to output length.
- **Space Complexity:** O(1) auxiliary, as the generator yields one at a time (no extra storage besides local vars). If output is collected as a list, space would be proportional to the number of dates produced.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the step is 0 or negative?
  *Hint: Input validation; should you raise an error or yield nothing?*

- Can you implement this without using Python's `datetime` module?
  *Hint: Parse and increment year/month/day manually, considering leap years/month boundaries.*

- How would you adapt this to support business days only or to exclude weekends?
  *Hint: Skip weekends by checking weekday(), or create a custom filter inside the loop.*

### Summary
This problem is a classic **iterator/generator** pattern using date arithmetic.  
It’s common in data pipelines, report generation, or systems that process events at regular intervals.  
**Key ideas:**
- Robust date math (handle month/year rollover)
- Efficient (yield/generator)
- Input validation edge cases

Pattern applies to tasks like time/windowed iteration, and can be reused for other range or calendar problems.


### Flashcard
Use a generator to yield each date from start to end, incrementing by step days and formatting as "YYYY-MM-DD" at each iteration.

### Tags

### Similar Problems
