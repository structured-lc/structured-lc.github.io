### Leetcode 1629 (Easy): Slowest Key [Practice](https://leetcode.com/problems/slowest-key)

### Description  
Given release times for n key presses and the keys pressed, find the **key with the longest single press duration**. If multiple keys have the same duration, return the lexicographically largest key (a single lowercase English letter).

### Examples  
**Example 1:**  
Input: `releaseTimes = [9,29,49,50], keysPressed = "cbcd"`  
Output: `c`  
*Explanation: Durations = [9,20,20,1]. Both 'b' and 'c' last 20, but 'c' is larger.*

**Example 2:**  
Input: `releaseTimes = [12,23,36,46,62], keysPressed = "spuda"`  
Output: `a`  
*Explanation: Durations = [12,11,13,10,16], so 'a' has the longest: 16.*

**Example 3:**  
Input: `releaseTimes = [1], keysPressed = "j"`  
Output: `j`  
*Explanation: Only one key, its duration is 1.*

### Thought Process (as if you’re the interviewee)  
- For each key, its press duration is releaseTimes[i] - releaseTimes[i-1] (releaseTimes itself for first key)
- Find the largest duration, breaking ties by lexicographically largest key.
- Just iterate through both lists and track the max (duration, key).

### Corner cases to consider  
- Only one key pressed
- Multiple keys with same longest duration
- All durations are 1
- List of length > 1, but all keys are same

### Solution

```python
from typing import List

def slowestKey(releaseTimes: List[int], keysPressed: str) -> str:
    max_duration = releaseTimes[0]
    answer = keysPressed[0]
    for i in range(1, len(releaseTimes)):
        duration = releaseTimes[i] - releaseTimes[i - 1]
        if duration > max_duration or (duration == max_duration and keysPressed[i] > answer):
            max_duration = duration
            answer = keysPressed[i]
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), single pass
- **Space Complexity:** O(1), constant extra vars

### Potential follow-up questions (as if you’re the interviewer)  
- What if keysPressed contains capital letters too?  
  *Hint: Adjust lexicographical comparison, potentially add normalization.*

- What if you had to return all keys tied for the slowest?  
  *Hint: Use a list or set for max keys.*

- Could this be solved without using if-else structure?  
  *Hint: Use built-in max with custom key function.*

### Summary
This is a typical **iteration and comparison** problem; tracks maximum with tiebreaker. Useful for logs or stream monitoring.


### Flashcard
Track the longest key press duration and lexicographically largest key in case of ties.

### Tags
Array(#array), String(#string)

### Similar Problems
