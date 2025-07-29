### Leetcode 551 (Easy): Student Attendance Record I [Practice](https://leetcode.com/problems/student-attendance-record-i)

### Description  
You are given a string representing a student's attendance record, where each character is one of:
- `'A'` (Absent)
- `'L'` (Late)
- `'P'` (Present)

A student can receive a reward if:
- They have been absent (`'A'`) strictly fewer than 2 times (at most 1 absence).
- They have never been late (`'L'`) for 3 or more days in a row.

Given the attendance string, return `True` if the student qualifies for a reward, otherwise return `False`.

### Examples  

**Example 1:**  
Input: `PPALLP`  
Output: `True`  
*Explanation: Only 1 absence, and no 3 consecutive L's.*

**Example 2:**  
Input: `PPALLL`  
Output: `False`  
*Explanation: Has 3 consecutive late days at the end.*

**Example 3:**  
Input: `PPLPLPLAA`  
Output: `False`  
*Explanation: Has 2 absences (A), which exceeds the allowed one.*

### Thought Process (as if you’re the interviewee)  
- The prompt requires checking two conditions: at most 1 `'A'` and no substring of `"LLL"`.
- A brute-force solution would involve counting all `'A'`s (linear scan), and separately scanning for any occurrence of 3 consecutive `'L'`s.
- Alternatively, since both can be checked in a single pass, iterate over the string, counting absences and maintaining a running counter for consecutive `'L'`s.
- If absences exceed 1, or 3 consecutive late days are found, return `False` early for efficiency.
- This single-pass approach uses constant space and linear time.

### Corner cases to consider  
- Empty string (should return True; no absences or lates).
- All present: `"PPPP"` (should return True).
- Absence right at the start or end.
- Multiple separated late sequences, but none with 3 consecutive.
- Long string with no violations.
- A string like `"LLLAA"` (should return False for lateness before counting absences).
- Single character strings: `"A"`, `"L"`, `"P"`.

### Solution

```python
def checkRecord(s: str) -> bool:
    absent = 0      # Count of 'A'
    late_streak = 0 # Current streak of consecutive 'L'
    for c in s:
        if c == 'A':
            absent += 1
            if absent > 1:
                return False    # More than one absence is not allowed
            late_streak = 0     # Reset late streak
        elif c == 'L':
            late_streak += 1
            if late_streak > 2:
                return False   # 3 consecutive 'L' not allowed
        else:      # c == 'P'
            late_streak = 0   # Reset late streak
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the length of the input string `s`, as we examine each character once.
- **Space Complexity:** O(1), since only a fixed amount of extra memory is used for counting.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to count the minimum number of days to be changed to make the student reward-eligible?  
  *Hint: Think about replacing extra `'A'`s or trimming consecutive `'L'`s.*

- Suppose the absence/late rules change (e.g., allow up to 2 absences, or 4 consecutive late days). How would you update your code?  
  *Hint: Parameterize your thresholds for flexibility.*

- Can you implement this using regular expressions or functional programming?  
  *Hint: Regex for 'LLL' and counting `'A'`, or use generators and itertools.*

### Summary
This problem is a classic **linear scan with state management**. The solution checks constraints by incrementally updating counters. This pattern is common in validation problems, such as tracking streaks, windowed checks, or simple parsing tasks. Recognizing that both checks can be performed in a single loop optimizes both time and space, making the code straightforward and efficient.