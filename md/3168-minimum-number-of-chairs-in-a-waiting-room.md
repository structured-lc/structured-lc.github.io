### Leetcode 3168 (Easy): Minimum Number of Chairs in a Waiting Room [Practice](https://leetcode.com/problems/minimum-number-of-chairs-in-a-waiting-room)

### Description  
Given a string describing people entering ('E') and leaving ('L') a waiting room in sequence, determine the minimum number of chairs needed so that every person who enters always finds a chair available.  
Every 'E' means one person enters and needs a chair. Every 'L' means one person leaves, freeing a chair.  
Return the maximum number of people present at any single moment—that is, the minimum number of chairs needed to guarantee everyone can sit.

### Examples  

**Example 1:**  
Input: `EEEEEEE`  
Output: `7`  
*Explanation: There are 7 'E's and no 'L's, so 7 people enter and none leave. The room needs 7 chairs.*

**Example 2:**  
Input: `ELEELEE`  
Output: `2`  
*Explanation:  
Step 1: E (1 in, 1 chair),  
Step 2: L (0 in room),  
Step 3: E (1),  
Step 4: E (2),  
Step 5: L (1),  
Step 6: E (2),  
Step 7: E (3).  
But maximum simultaneous in-room is 2 (after step 4 and step 7), so 2 chairs suffice.*

**Example 3:**  
Input: `EELEE`  
Output: `3`  
*Explanation:  
Step 1: E (1),  
Step 2: E (2),  
Step 3: L (1),  
Step 4: E (2),  
Step 5: E (3).  
Maximum in-room is 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Simulate the waiting room one event at a time:  
  - With every 'E', increment a counter for people in-room.  
  - With every 'L', decrement the counter.  
  - Track the maximum the counter ever reaches, that’s the answer.

- **Optimized approach:**  
  This simulation can be done in a single pass.  
  No advanced data structures needed, just two integer variables: `current` (current people in room) and `max_chairs` (max observed so far).  
  This is most space- and time-efficient, O(n) time, O(1) space.

### Corner cases to consider  
- All 'E's, no 'L's (everyone stays, need n chairs).
- More 'L's than 'E's (invalid, problem may not specify but assume input well-formed).
- Alternate 'E', 'L' ("EL"), only need 1 chair.
- Empty input string (output should be 0).
- 'L' at the start (should not occur with valid input, but best to note).

### Solution

```python
def minimumChairs(s: str) -> int:
    # Track the current number of people in the waiting room
    current = 0
    # Track the maximum ever in the room at the same time
    max_chairs = 0
    
    for event in s:
        if event == 'E':
            current += 1
        elif event == 'L':
            current -= 1
        # Update the maximum chairs seen so far
        max_chairs = max(max_chairs, current)
    
    return max_chairs
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of the input string. We do a single pass.
- **Space Complexity:** O(1). Only a constant number of variables are used; no additional storage scales with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to output not just the minimum chair count, but also the time(s) when the count was max?
  *Hint: Track the indices (positions) where you update the max.*

- How would you adjust if each 'E' and 'L' event had a timestamp and could arrive out of order?
  *Hint: Sort the events by timestamp before processing.*

- Suppose at most k people are allowed in the waiting room at any time. How do you detect if this rule is ever broken?
  *Hint: Track current count and check against k after every step.*

### Summary
This problem uses a **running counter pattern**—increment for entry, decrement for exit, and track the peak value.  
It's a classic simulation or counting problem and this approach is common for maximum interval overlap (meeting room, parking lot, elevator capacity).  
Key pattern: one-pass scan + running max = robust, efficient solution.

### Tags
String(#string), Simulation(#simulation)

### Similar Problems
- Consecutive Characters(consecutive-characters) (Easy)