### Leetcode 2224 (Easy): Minimum Number of Operations to Convert Time [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-convert-time)

### Description  
You are given two times in 24-hour "HH:MM" format, `current` and `correct`. In one operation, you can increase the current time by 1, 5, 15, or 60 minutes. The goal is to find the **minimum number of operations** needed to convert `current` to `correct`, where `current` ≤ `correct` in time.

### Examples  

**Example 1:**  
Input: `current = "02:30", correct = "04:35"`  
Output: `3`  
*Explanation: Convert as follows:*  
*+60 min → "03:30"*  
*+60 min → "04:30"*  
*+5 min → "04:35"*  

**Example 2:**  
Input: `current = "11:00", correct = "11:01"`  
Output: `1`  
*Explanation: Only need to add 1 minute: +1 min → "11:01".*

**Example 3:**  
Input: `current = "01:15", correct = "03:16"`  
Output: `4`  
*Explanation: +60 min → "02:15", +60 min → "03:15", +1 min → "03:16".*

### Thought Process (as if you’re the interviewee)  
To solve this:

- First, convert both `current` and `correct` to minutes since midnight for easier calculations.
- Compute the difference in minutes.
- To minimize operations:
  - Use as many of the largest increments (60, 15, 5, 1) as possible at each step (i.e., greedy approach).
- For every increment, use integer division to get count and reduce the difference accordingly.
- Greedy works here because using bigger steps first will always lead us to the smallest number of operations.

### Corner cases to consider  
- `current` equals `correct` (output should be 0).
- The difference is less than 5, 15, or 60 (need to handle single-minutes properly).
- Exactly on the increment bounds (like 15 or 60 min difference).
- Times early in day (`00:00`) or late in day (`23:59`).
- Leading zeros in time strings.

### Solution

```python
def convertTime(current: str, correct: str) -> int:
    # Helper to convert "HH:MM" to minutes since midnight
    def to_minutes(time_str):
        h, m = map(int, time_str.split(":"))
        return h * 60 + m

    current_minutes = to_minutes(current)
    correct_minutes = to_minutes(correct)

    diff = correct_minutes - current_minutes
    operations = 0

    # Greedily use the largest increments first
    for inc in [60, 15, 5, 1]:
        operations += diff // inc
        diff %= inc

    return operations
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — All operations (conversion, calculation) are fixed and do not scale with input size.  
- **Space Complexity:** O(1) — Only a few integer variables are used; extra space does not depend on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could also *decrement* time (go backward)?  
  *Hint: Allow negative increments, what changes in the implementation?*

- What if each increment had a cost instead of just number of steps?  
  *Hint: Dynamic programming or greedy with custom cost logic.*

- How would you do this if `current` could be *later* than `correct`, wrapping around midnight?  
  *Hint: Take care of the day wrap-around by normalizing the difference.*

### Summary
This problem is a **greedy** time-conversion scenario. The key insight is to work from largest to smallest increments to minimize operation count, a common pattern in making change (like counting coins in currency problems), thus it’s broadly useful for "min operations with limited choices" style problems.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
- Coin Change(coin-change) (Medium)
- Design an ATM Machine(design-an-atm-machine) (Medium)
- Count Days Spent Together(count-days-spent-together) (Easy)