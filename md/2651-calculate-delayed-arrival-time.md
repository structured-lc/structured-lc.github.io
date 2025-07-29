### Leetcode 2651 (Easy): Calculate Delayed Arrival Time [Practice](https://leetcode.com/problems/calculate-delayed-arrival-time)

### Description  
Given two integers, **arrivalTime** and **delayedTime**, representing the scheduled hour of train arrival and the number of hours delay respectively (both in 24-hour format), compute the new arrival time.  
If the result exceeds 23 (i.e., wraps past midnight), output the hour modulo 24 to stay within the valid range.

### Examples  

**Example 1:**  
Input: `arrivalTime = 15, delayedTime = 5`  
Output: `20`  
*Explanation: 15 + 5 = 20. The arrival is moved 5 hours ahead from hour 15 (3 pm) to hour 20 (8 pm). 20 is within 0-23, so output is 20.*

**Example 2:**  
Input: `arrivalTime = 13, delayedTime = 11`  
Output: `0`  
*Explanation: 13 + 11 = 24. In a 24-hour clock, 24 equals 0 (midnight). Output is 0.*

**Example 3:**  
Input: `arrivalTime = 23, delayedTime = 2`  
Output: `1`  
*Explanation: 23 + 2 = 25. 25 mod 24 = 1. Arrival time wraps around to hour 1 (1 am).*

### Thought Process (as if you’re the interviewee)  
First, add **arrivalTime** and **delayedTime** for the raw new hour.  
But since a 24-hour clock wraps at 23, if the sum is 24 or more, it must wrap back to 0 by using modulo 24.  
No need for loops or special cases, as modulo handles the date boundary directly.  
This mathematical approach is O(1), concise, and avoids unnecessary conditionals.

### Corner cases to consider  
- If **delayedTime** is 0, should return **arrivalTime**.
- If **arrivalTime** + **delayedTime** is exactly 24, should return 0.
- If sum > 24 (e.g., 23 + 2 = 25), should wrap (25 mod 24 = 1).
- If both inputs are 0 (midnight start, no delay), should return 0.
- **arrivalTime** always in 0–23 by problem constraints.

### Solution

```python
def findDelayedArrivalTime(arrivalTime: int, delayedTime: int) -> int:
    # Add arrivalTime and delayedTime
    total_time = arrivalTime + delayedTime
    # Use modulo 24 to ensure time wraps around in a 24-hour format
    return total_time % 24
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Direct arithmetic and modulo; no loops or recursion.

- **Space Complexity:** O(1)  
  Uses only fixed variables, no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input used minutes and not just hours?  
  *Hint: Consider converting everything to minutes, then use modulo 24×60.*

- How would you handle negative delays?  
  *Hint: Make sure (arrivalTime + delayedTime) % 24 stays in 0-23; for negatives, Python modulo automatically corrects.*

- What if the problem asked for an actual "date" as well (crossing days)?  
  *Hint: Calculate new day count using integer division by 24, not just the hour.*

### Summary
This problem uses the classic modulo pattern for cyclic values (time arithmetic).  
The key is `result = (arrivalTime + delayedTime) % 24`, ensuring hour wrap-around.  
Modulo math for clock arithmetic is a universal coding pattern that appears in scheduling, queue rounding, and circular buffer problems.