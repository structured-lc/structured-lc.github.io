### Leetcode 1450 (Easy): Number of Students Doing Homework at a Given Time [Practice](https://leetcode.com/problems/number-of-students-doing-homework-at-a-given-time)

### Description  
Given two integer arrays `startTime` and `endTime` (each length n), where `startTime[i]` and `endTime[i]` are the start and end times (inclusive) when the iᵗʰ student was doing homework, and an integer `queryTime`, return the number of students doing homework at `queryTime` (i.e., `startTime[i] ≤ queryTime ≤ endTime[i]`).

### Examples  

**Example 1:**  
Input: `startTime = [1,2,3]`, `endTime = [3,2,7]`, `queryTime = 4`  
Output: `1`  
*Explanation: Only the 3ʳᵈ student (3 ≤ 4 ≤ 7) was working at time 4.*

**Example 2:**  
Input: `startTime = [4]`, `endTime = [4]`, `queryTime = 4`  
Output: `1`  
*Explanation: Student started and finished at 4.*

**Example 3:**  
Input: `startTime = [4]`, `endTime = [4]`, `queryTime = 5`  
Output: `0`  
*Explanation: No student was working at 5.*

### Thought Process (as if you’re the interviewee)  
Check for each student if the queryTime falls within their start and end interval (inclusive). Just iterate through the arrays and count the matches.

### Corner cases to consider  
- Empty startTime/endTime arrays.
- All intervals before or after queryTime.
- Edge cases: queryTime equals start or end.

### Solution

```python
def busyStudent(startTime: list[int], endTime: list[int], queryTime: int) -> int:
    count = 0
    for s, e in zip(startTime, endTime):
        if s <= queryTime <= e:
            count += 1
    return count
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n = number of students.
- **Space Complexity:** O(1), only uses a counter variable.

### Potential follow-up questions (as if you’re the interviewer)  
- What if multiple queryTimes are given (as an array)?
  *Hint: Use a frequency array, or answer each independently.*

- What if homework intervals are very large and overlapping is heavy? Can you process many queries efficiently?
  *Hint: Use prefix sums, segment trees, or sweep line for many intervals/queries.*

- What if intervals include start > end (invalid input)?
  *Hint: Add input validation to return 0 or an error if inconsistent.*

### Summary
A simple interval membership scan suffices. This is a classic for-loop counting problem, common in work scheduling, event logs, or similar overlapping-interval tasks.

### Tags
Array(#array)

### Similar Problems
