### Leetcode 3709 (Medium): Design Exam Scores Tracker [Practice](https://leetcode.com/problems/design-exam-scores-tracker)

### Description  
Design a class that can **record the score of each exam attempt at a strictly increasing timestamp** and efficiently **return the total score for exams taken within a given time range \([startTime, endTime]\)**.  
Think of a user like Alice, who regularly takes exams and wants to quickly see her total score for any interval of time.

### Examples  

**Example 1:**  
Input:  
```
ExamTracker()
record(1, 10)
record(2, 15)
totalScore(1, 2)
```
Output:  
```
25
```
*Explanation: Both exams at times 1 and 2 are within the query range, so 10 + 15 = 25.*

**Example 2:**  
Input:  
```
ExamTracker()
record(3, 20)
record(8, 40)
record(15, 25)
totalScore(4, 10)
```
Output:  
```
40
```
*Explanation: Only the exam at time 8 is in [4,10].*

**Example 3:**  
Input:  
```
ExamTracker()
record(5, 30)
record(10, 50)
record(15, 20)
totalScore(1, 9)
```
Output:  
```
30
```
*Explanation: Only the first recorded exam (time 5) is in [1,9].*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each query, scan all recorded exams, check if timestamp in range, and sum scores.  
  This has O(n) query time, which is inefficient if there are many scores and queries.

- **Optimized approach:**  
  Since timestamps for `record` are strictly increasing, we can maintain:
  - A `times` list of all timestamps.
  - A prefix sum list \( totalScores \) to store the running total of scores up to each timestamp.
  
  When querying with \([startTime, endTime]\), binary search on `times` finds indices `i` (first timestamp ≥ startTime) and `j` (first timestamp > endTime), then return \( totalScores[j] - totalScores[i] \).

- Trade-off:  
  - **record:** O(1) time, simply append.
  - **totalScore:** O(log n) for each query with binary search.
  - Space: O(n)

### Corner cases to consider  
- Empty: No recorded exams (query should return 0).
- No exams in queried range (should return 0).
- All exams in range.
- Exams at the exact boundaries (should be included).
- Multiple exams with same scores.
- High frequency queries.

### Solution

```python
import bisect

class ExamTracker:
    def __init__(self):
        # List of strictly increasing timestamps
        self.times = []
        # Prefix sum of scores. Initial 0 for easier subtraction.
        self.prefix = [0]

    def record(self, time: int, score: int) -> None:
        self.times.append(time)      # add time
        # add score to running total
        self.prefix.append(self.prefix[-1] + score)

    def totalScore(self, startTime: int, endTime: int) -> int:
        # Find first exam with time >= startTime
        i = bisect.bisect_left(self.times, startTime)
        # Find first exam with time > endTime
        j = bisect.bisect_right(self.times, endTime)
        return self.prefix[j] - self.prefix[i]
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - `record`: O(1) per call (append operations)
  - `totalScore`: O(log n) per call (binary search, since times always sorted)
- **Space Complexity:**
  - O(n): storage for all timestamps and prefix sums (n = total exams recorded)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if `record` calls could arrive out of order?
  *Hint: You’d need a sorted structure and may have to recompute prefix sums.*

- What if scores can be modified or deleted?
  *Hint: Consider segment trees or indexed trees for efficient updates and queries.*

- How do you handle concurrent queries or updates?  
  *Hint: Think about thread safety and data consistency strategies like locks or concurrent structures.*

### Summary
This approach uses the **prefix sum pattern with sorted binary search**, leveraging the fact that timestamps are strictly increasing.  
It's an efficient design for range sum queries on immutable data, a pattern widely used in interval sum problems, logs/statistics, or time-series queries.  
Can be adapted to mutable or unordered data using balanced trees or segment trees.


### Flashcard
Maintain a sorted list of timestamps with prefix sums of scores; use binary search to find the range [startTime, endTime] and compute the sum in O(log n).

### Tags
Array(#array), Binary Search(#binary-search), Design(#design), Prefix Sum(#prefix-sum)

### Similar Problems
