### Leetcode 1732 (Easy): Find the Highest Altitude [Practice](https://leetcode.com/problems/find-the-highest-altitude)

### Description  
Given a list of **altitude gains** between each checkpoint on a biker's trip, you start at altitude 0 and apply each gain in order to get to the next point. The task is to **find the highest altitude** reached at any checkpoint, including the start at 0.  
You are given an integer array `gain` where `gain[i]` is the net gain in altitude from point `i` to point `i+1`.   
Return the *maximum altitude* encountered throughout the trip.

### Examples  

**Example 1:**  
Input: `gain = [-5, 1, 5, 0, -7]`  
Output: `1`  
*Explanation: Start at 0 → -5 → -4 → 1 → 1 → -6*. Highest altitude is **1**.

**Example 2:**  
Input: `gain = [-4, -3, -2, -1, 4, 3, 2]`  
Output: `0`  
*Explanation: Start at 0 → -4 → -7 → -9 → -10 → -6 → -3 → -1*. Highest altitude is **0** (the starting altitude).

**Example 3:**  
Input: `gain = [0, 1, 2, 3, 4]`  
Output: `10`  
*Explanation: Start at 0 → 0 → 1 → 3 → 6 → 10*. Highest altitude is **10**.

### Thought Process (as if you’re the interviewee)  
First, I'll clarify the process:  
- Initial altitude is always **0**.
- Each value in `gain` is added to the previous altitude to reach the next checkpoint.
- We want the highest value across all checkpoints, including starting point.

**Brute-Force:**  
I could build the entire list of altitudes starting from zero, but that's not necessary since we only need the maximum.

**Optimized:**  
We can do this in a single pass:
- Track the current altitude starting from zero.
- At each step, update the altitude and record the max seen so far.

Why?  
- Only need to store the current altitude and running max.
- No need for any additional data structures or to remember the full path.

**Trade-offs:**  
- This approach uses O(1) space and O(n) time: best we can do since we must look at every gain.

### Corner cases to consider  
- All gains are negative (never go above start).
- All gains are positive.
- Mix of positive and negative.
- Empty array (`gain=[]`): must return 0, since starting altitude is 0.
- Gain array with one element (positive/negative/zero).
- Large values in gain (no integer overflow in Python, but in other languages might matter).
- Repeated maximums (maximum reached more than once).

### Solution

```python
def largestAltitude(gain):
    # Start from zero altitude
    current_altitude = 0
    highest_altitude = 0
    
    for change in gain:
        # Update current altitude at this step
        current_altitude += change
        # Update highest altitude if we've gone higher
        if current_altitude > highest_altitude:
            highest_altitude = current_altitude
            
    return highest_altitude
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We traverse the gain array once, doing O(1) work per element.

- **Space Complexity:** O(1)  
  We only store two variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted to return *all unique altitudes* visited?
  *Hint: Use a set to keep track and return the list of altitudes built up step-by-step.*

- How would you handle *very large gain arrays*?  
  *Hint: Can use generators or streaming approaches if memory is a concern, but current solution is already O(1) space.*

- What if checkpoints were labeled and you wanted to return *the checkpoint index of highest altitude*?  
  *Hint: Track the index alongside the altitudes as you update the maximum.*

### Summary
We used a *prefix sum* pattern, tracking the running sum and the maximum value reached.  
This single-pass, constant-space approach is common in cumulative problems like stock trading, running totals, and subarray computations.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
