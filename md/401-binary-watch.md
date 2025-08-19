### Leetcode 401 (Easy): Binary Watch [Practice](https://leetcode.com/problems/binary-watch)

### Description  
A **binary watch** uses LED lights to represent time:
- The top 4 LEDs represent the **hours** (0–11).
- The bottom 6 LEDs represent the **minutes** (0–59).
Each LED corresponds to a binary digit (bit), with the rightmost as the least significant bit.  
Given an integer `turnedOn` (number of LEDs that are ON), return *all possible valid times* the watch can display, formatted as "h:mm" (no leading zero on hours, two digits for minutes).

### Examples  

**Example 1:**  
Input: `turnedOn = 1`  
Output: `["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]`  
*Explanation: All times where exactly one LED is on, either for hour or minute.*

**Example 2:**  
Input: `turnedOn = 2`  
Output:  
`["0:03","0:05","0:09","0:17","0:33","0:06","0:10","0:18","0:34","0:12","0:20","0:36","0:24","0:40","0:48","1:01","1:02","1:04","1:08","1:16","1:32","2:01","2:02","2:04","2:08","2:16","2:32","3:00","4:01","4:02","4:04","4:08","4:16","4:32","5:00","6:00","8:01","8:02","8:04","8:08","8:16","8:32","9:00","10:00"]`  
*Explanation: Each time has two bits set in total, distributed between hour and minute LEDs.*

**Example 3:**  
Input: `turnedOn = 0`  
Output: `["0:00"]`  
*Explanation: No LEDs are on, representing 0 hours and 0 minutes.*

### Thought Process (as if you’re the interviewee)  
- The number of combinations is manageable (0 ≤ hours < 12, 0 ≤ minutes < 60); total: 12 × 60 = 720 possible times.
- For each possible (hour, minute) pair:
    - Count the total number of 'ON' bits in their binary representations.
    - If the total equals `turnedOn`, it’s a valid time.
    - Add to results, ensuring correct formatting: hours no leading zero, minutes always 2 digits.
- This brute-force approach is acceptable because the search space is small enough for real-time computation.
- Backtracking could enumerate every possible way to distribute the LEDs, but iterating over all hour/minute pairs and counting bits is simpler and more direct.
- Bitwise operations (using bit shifts & masks or bin(num).count('1')) make counting 'ON' LEDs straightforward.

### Corner cases to consider  
- `turnedOn = 0`: Only possible time is '0:00'.
- `turnedOn` > 8 or < 0: No possible time (hours ≤ 4 bits, minutes ≤ 6 bits).
- Minutes < 10: Must be formatted with a leading zero (e.g. "1:05").
- Result order: Any order is acceptable unless otherwise required.

### Solution

```python
def readBinaryWatch(turnedOn):
    result = []
    # Hours can be from 0 to 11 (4 bits), minutes from 0 to 59 (6 bits)
    for hour in range(12):
        for minute in range(60):
            # Count the number of '1' bits for hour and minute
            count = 0
            n = hour
            while n:
                count += n & 1
                n >>= 1
            n = minute
            while n:
                count += n & 1
                n >>= 1
            # If total 'on' LEDs equals turnedOn, format and add to result
            if count == turnedOn:
                time_str = f"{hour}:{minute:02d}"
                result.append(time_str)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(720), since we iterate over every possible hour (12) and minute (60), and checking number of bits per pair takes constant time due to small ranges.
- **Space Complexity:** O(1) (excluding output list), since no extra storage beyond the result array for valid times.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of LEDs increases?  
  *Hint: How would you generalize or optimize bit-counting for larger input constraints?*

- Can you generate times in lexicographical order?  
  *Hint: Consider how your iteration order (hour, minute) affects output sorting.*

- How would you minimize space usage?
  *Hint: Can you write output directly without storing all intermediate results?*

### Summary
This problem is a classic enumeration/combinatorics pattern where the total state space is small. Brute-force iteration over all possible combinations is feasible and, in fact, the simplest and most readable approach. The core trick is counting set bits in binary representations, a common pattern in bit manipulation problems. This technique is applicable in subset enumeration, combinatorial state exploration, and problems involving digital representations.

### Tags
Backtracking(#backtracking), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Letter Combinations of a Phone Number(letter-combinations-of-a-phone-number) (Medium)
- Number of 1 Bits(number-of-1-bits) (Easy)