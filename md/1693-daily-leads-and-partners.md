### Leetcode 1693 (Easy): Daily Leads and Partners [Practice](https://leetcode.com/problems/daily-leads-and-partners)

### Description  
Given a table containing daily records of leads and partners reported by date, count for each day, how many reports were made. Essentially, for each unique date in the records, you want to count how many times each date appears.

### Examples  

**Example 1:**  
Input: `leads_and_partners = [["2020-12-01","lead1","partner1"], ["2020-12-01","lead2","partner2"], ["2020-12-02","lead3","partner1"]]`  
Output: `[["2020-12-01",2],["2020-12-02",1]]`  
*Explanation: "2020-12-01" appears twice; "2020-12-02" appears once.*

**Example 2:**  
Input: `[["2021-01-01","A","B"], ["2021-01-01","C","D"], ["2021-01-02","E","F"], ["2021-01-01","G","H"]]`  
Output: `[["2021-01-01",3],["2021-01-02",1]]`  
*Explanation: "2021-01-01" has 3 entries; "2021-01-02" has 1.*

**Example 3:**  
Input: `[["2023-03-14","hello","world"]]`  
Output: `[["2023-03-14",1]]`  
*Explanation: Only one entry for that date.*

### Thought Process (as if you’re the interviewee)  
- The problem is essentially grouping records by date and counting the number of entries for each date.
- The brute-force way would be to loop over all rows for each date, but that's O(n²) and inefficient.
- Optimal: Use a dictionary to count occurrences as we go through the table. Sort the output by date if required by the problem statement.

### Corner cases to consider  
- All dates are the same (should output one date with count equal to n)
- All dates are unique (each date count is 1)
- Dates are not in order (need to sort output)
- Empty input (should return empty output)

### Solution

```python
from collections import defaultdict

def daily_leads_and_partners(leads_and_partners):
    # Count occurrence per date
    count = defaultdict(int)
    for row in leads_and_partners:
        date = row[0]
        count[date] += 1
    # Convert to required format, sorted by date string
    res = []
    for date in sorted(count.keys()):
        res.append([date, count[date]])
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) due to sorting the dates at the end. Counting itself is O(n).  
- **Space Complexity:** O(m), where m is the number of unique dates, for storing counts.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large input files that can’t fit into memory?  
  *Hint: Use streaming or chunk processing, or use a database aggregation.*

- Can you combine this with partner-level counts by date as well?  
  *Hint: Use a tuple (date, partner) as the key instead of just the date.*

- How would you update the result if daily data is added incrementally?  
  *Hint: Update the counts dictionary live as new records come in.*

### Summary
Simple hash map aggregation is the standard approach for grouping and counting. This is a common data processing pattern, very useful for frequency counting, histogram building, or grouping operations in databases and logs.


### Flashcard
Daily Leads and Partners

### Tags
Database(#database)

### Similar Problems
