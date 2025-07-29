### Leetcode 1742 (Easy): Maximum Number of Balls in a Box [Practice](https://leetcode.com/problems/maximum-number-of-balls-in-a-box)

### Description  
Given two integers `lowLimit` and `highLimit`, there is a ball with label from every number between `lowLimit` and `highLimit` inclusive. Each ball is placed into a box where the box number equals the sum of the digits of the ball's label. For example, ball 321 goes into box 3+2+1=6. The goal is to find the largest number of balls present in any single box after all placements.

### Examples  

**Example 1:**  
Input: `lowLimit = 1, highLimit = 10`  
Output: `2`  
*Explanation: Balls with labels 1–9 go to boxes 1–9, while label 10 (1+0) goes to box 1. Box 1 ends up with 2 balls; others have 1 each.*

**Example 2:**  
Input: `lowLimit = 5, highLimit = 15`  
Output: `2`  
*Explanation:  
- Ball 5 → box 5  
- Ball 6 → box 6  
- Ball 7 → box 7  
- Ball 8 → box 8  
- Ball 9 → box 9  
- Ball 10 (1+0) → box 1  
- Ball 11 (1+1) → box 2  
- Ball 12 (1+2) → box 3  
- Ball 13 (1+3) → box 4  
- Ball 14 (1+4) → box 5 (now 2 balls in box 5)  
- Ball 15 (1+5) → box 6 (now 2 balls in box 6)  
Boxes 5 and 6 each have 2 balls; that's the most for any box.*

**Example 3:**  
Input: `lowLimit = 19, highLimit = 28`  
Output: `2`  
*Explanation:  
Labels 19–28 go to boxes: 10, 2, 3, 4, 5, 6, 7, 8, 9, 10.  
Box 10 ends up with 2 balls (labels 19 and 28), all others have at most 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For every label from lowLimit to highLimit, calculate the sum of its digits and count how many balls go into each box.
- Use a dictionary or array to track the count of balls per box.
- At the end, find the maximum value among all box counts.
- This is O(n × d), where n = highLimit - lowLimit + 1 and d is the number of digits, which is efficient enough for guarantees (since highLimit ≤ 10⁵).

**Optimization:**  
- Since the range of possible digit sum is small (max possible is 9×6=54 for 6 digits), a fixed-size array could be used for slightly less overhead.
- No need for further math tricks since every number needs individual processing.

**Trade-offs:**  
This is essentially optimal given each ball must be assigned by digit sum. Simple, clean, and direct.

### Corner cases to consider  
- lowLimit = highLimit (single label, only one ball).
- All labels are single-digit (they all go to different boxes).
- All labels’ digit sum is the same (e.g., 10, 100, 1000, etc.).
- More than one box can tie for maximum.

### Solution

```python
def countBalls(lowLimit, highLimit):
    # Initialize a dictionary to keep the count of balls in each box
    count = dict()
    
    # Helper function to compute sum of digits of n
    def digit_sum(n):
        s = 0
        while n > 0:
            s += n % 10
            n //= 10
        return s
    
    # Put each ball into its box
    for label in range(lowLimit, highLimit + 1):
        box = digit_sum(label)
        if box in count:
            count[box] += 1
        else:
            count[box] = 1
    
    # The answer is the box with the maximum balls
    return max(count.values())
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × d), where n = highLimit - lowLimit + 1, and d is the number of digits in the largest ball's label (since summing digits is O(d)).
- **Space Complexity:** O(1) for box counts, since max digit sum is small (boxes ≤ 54-ish), so at most a fixed number of boxes.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the range was much larger (like up to 10¹⁸)?  
  *Hint: Is there an efficient way to count digit sum occurrences over a large interval?*

- What if some balls are removed after being placed?  
  *Hint: How would your data structure change for O(1) removals and inserts?*

- How would you handle returning all box numbers that have the maximum count?  
  *Hint: Simple extension after finding max, collect all with that count.*

### Summary
The approach uses a simple counting pattern, hashing or array counting by the digit sum. It’s a frequent coding interview pattern: map items by a computation (sum of digits), then aggregate by those keys. This solution is efficient, direct, and easily generalizable for many similar “bucket by key and count” scenarios.