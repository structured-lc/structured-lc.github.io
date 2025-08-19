### Leetcode 681 (Medium): Next Closest Time [Practice](https://leetcode.com/problems/next-closest-time)

### Description  
Given a valid time in the "HH:MM" 24-hour format, find the next closest time that can be formed by reusing only the digits from the current time. Each digit can be used more than once. If you hit "23:59", the answer should wrap around to the earliest possible time the next day using the same digits.

### Examples  

**Example 1:**  
Input=`"19:34"`  
Output=`"19:39"`  
Explanation: Allowed digits are 1, 9, 3, 4. Adding 1 minute gives "19:35" (invalid). The next valid time with these digits is "19:39". "19:33" would be 23h+59m later.

**Example 2:**  
Input=`"23:59"`  
Output=`"22:22"`  
Explanation: Allowed digits are 2, 3, 5, 9. There is no possible valid time later in the same day with these digits, so we wrap around and return the smallest time possible the next day, "22:22".

**Example 3:**  
Input=`"13:59"`  
Output=`"15:11"`  
Explanation: Allowed digits are 1, 3, 5, 9. After "13:59", there is no valid later time in the same day that can be formed. The next valid, earliest time is "15:11"—the smallest time in a new day using these digits.

### Thought Process (as if you’re the interviewee)  
First, I need to extract the unique digits from the given time. My goal is to find the next valid time using only these digits, minimizing the time difference. If I go past "23:59", I wrap around to "00:00" and search from there.

**Brute-Force Approach:**  
Generate all possible 4-digit combinations (HHMM) using the allowed digits, check which ones are valid times, and find the one with the smallest positive difference from the original time. This is O(4⁴) since there are 4 digits and 4 positions. For a small set, it's manageable.

**Optimized Approach:**  
Instead of checking all permutations, simulate time moving forward by one minute at a time. At each step, check if the new time uses only the allowed digits. This is O(1440) since there are 1440 minutes in a day. It's simple, efficient for this problem, and easy to implement.

**Trade-offs:**  
The permutative approach has a clear limit on operations and is optimal in the worst case, but a bit tricky to implement. Incremental checking is straightforward and performs well for this problem size. I choose the incremental approach for clarity and maintainability.

### Corner cases to consider  
- Input is the last possible time of the day ("23:59"), requiring wrap-around.
- All digits are the same (e.g., "11:11"), so the answer is the same.
- The only possible valid next time is much later (e.g., "13:59" → "15:11").
- Validating that no digit outside the input set is used.
- Input time is the only possible valid time (e.g., "23:59" with digits 2,3,5,9—no earlier time is possible).
- Check leading zeros are handled properly in the output.

### Solution

```python
def nextClosestTime(time):
    # Parse hours and minutes from input
    hour = int(time[0:2])
    minute = int(time[3:5])
    # Collect the allowed digits
    allowed = set(time.replace(':', ''))
    
    while True:
        # Increment the time by 1 minute
        minute += 1
        if minute == 60:
            minute = 0
            hour = 0 if hour == 23 else hour + 1
        # Convert back to HH:MM string
        new_time = f"{hour:02d}:{minute:02d}"
        # Check if all digits are in the allowed set
        if set(new_time.replace(':', '')) <= allowed:
            return new_time
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1440) in the worst case, since in the worst scenario (e.g., "00:00" with allow set=0), you might check every minute of the day. For most cases, it is much faster.
- **Space Complexity:** O(1), since we use a fixed set for digit checking and a constant amount of additional storage.  

### Potential follow-up questions  

- How would you handle if the digits could not be reused?  
  *Hint: Track usage count per digit; include permutations with limited counts.*
- What if you needed to find the Kᵗʰ closest time instead of the next?  
  *Hint: Generate and sort all candidate times, then pick the Kᵗʰ smallest positive difference.*
- Can you optimize if some digits are repeated in the input?  
  *Hint: Yes—use a frequency map and generate only possible permutations respecting digit counts.*

### Summary  
This problem is solved by incrementing the time minute-by-minute and checking at each step if the new time uses only the original digits. The approach is a simulation/brute-force pattern, optimized by leveraging the small input size. The pattern is common when you must generate candidates by iterating or simulating a process and validating each candidate. Similar patterns appear in password brute-forcing, sequential ID checks, and resource scheduling.

### Tags
Hash Table(#hash-table), String(#string), Backtracking(#backtracking), Enumeration(#enumeration)

### Similar Problems
