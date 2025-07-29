### Leetcode 1604 (Medium): Alert Using Same Key-Card Three or More Times in a One Hour Period [Practice](https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period)

### Description  
Given lists of key card uses: employee names and corresponding times they swiped their key card, return the sorted list of names whose key card was used three or more times in any one-hour period (60-minute window, inclusive).
- Each time is a string "HH:MM" (24-hour format).
- A usage window can span over the hour mark (i.e., 10:00, 10:20, 11:00 counts as not within one hour; but 10:00, 10:20, 10:50 is).

### Examples  

**Example 1:**  
Input: `keyName = ["daniel","daniel","daniel","luis","luis","luis","luis"], keyTime = ["10:00","10:40","11:00","09:00","11:00","13:00","15:00"]`
Output: `["daniel"]`
*Explanation: daniel used the key card at 10:00, 10:40, and 11:00. All within 1 hour.*

**Example 2:**  
Input: `keyName = ["alice","alice","alice","bob","bob","bob","bob"], keyTime = ["12:01","12:02","12:03","12:01","13:00","13:01","13:02"]`
Output: `["alice"]`
*Explanation: Only alice had three swipes within 1 hour.*

**Example 3:**  
Input: `keyName = ["john","john","john"], keyTime = ["23:58","23:59","00:01"]`
Output: `[]`
*Explanation: Swipes are over midnight, not in single hour window.*

### Thought Process (as if you’re the interviewee)  
- For each person, collect all their swipe times.
- To efficiently check for any three swipes in one hour, convert times to minutes since midnight, sort, then scan windows of 3 values: if the third entry is within 60 mins of the first, flag the name.
- Store flagged names, sort in lexicographical order for final answer.

### Corner cases to consider  
- Times crossing midnight (e.g., 23:50 and 00:20)
- Duplicate times
- Names with fewer than three swipes
- Swipes at exactly hour mark boundaries

### Solution

```python
from collections import defaultdict

def alertNames(keyName, keyTime):
    def str2min(t):
        # Convert 'HH:MM' to minutes since midnight
        h, m = map(int, t.split(':'))
        return h * 60 + m
    record = defaultdict(list)
    for name, time in zip(keyName, keyTime):
        record[name].append(str2min(time))
    result = []
    for name, times in record.items():
        times.sort()
        for i in range(len(times) - 2):
            if times[i+2] - times[i] <= 60:
                result.append(name)
                break
    return sorted(result)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n + k * m), where n = number of entries, k = number of names, m = swipes per name
- **Space Complexity:** O(n), storing all times per name

### Potential follow-up questions (as if you’re the interviewer)  
- What if we cared about every alert window (not just if someone triggered at least once)?  
  *Hint: Instead of break, collect all intervals.*

- What if there are millions of records, streaming in real time?  
  *Hint: Use online algorithms, rolling window.*

- Can you return the actual key times where alert is triggered?  
  *Hint: Return list of times instead of just names.*

### Summary
The main pattern here is windowed scan on sorted data. Converting to integer minutes simplifies comparisons. Similar scan-window patterns arise in logs, time-series, and pattern-detection problems.